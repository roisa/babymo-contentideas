/**
 * Usage telemetry — records per-day aggregates for AI generation calls
 * (token counts, cache-hit ratios, request counts) so the Settings page
 * can show whether prompt caching is actually paying off.
 *
 * Falls back to a no-op when Upstash isn't configured.
 *
 * Storage: one Redis HASH per day at `babymo:usage:v1:YYYY-MM-DD`,
 * incremented atomically via HINCRBY. Aggregating 7 days = read 7 keys.
 */
import { Redis } from "@upstash/redis";

const KEY_PREFIX = "babymo:usage:v1:";

function envVar(name: string): string | undefined {
  const v = process.env[name];
  return v && v.length > 0 ? v : undefined;
}

let cachedClient: Redis | null | undefined;

function getRedis(): Redis | null {
  if (cachedClient !== undefined) return cachedClient;
  const url = envVar("UPSTASH_REDIS_REST_URL") ?? envVar("KV_REST_API_URL");
  const token = envVar("UPSTASH_REDIS_REST_TOKEN") ?? envVar("KV_REST_API_TOKEN");
  if (!url || !token) {
    cachedClient = null;
    return null;
  }
  cachedClient = new Redis({ url, token });
  return cachedClient;
}

export function isUsageStoreConfigured(): boolean {
  return getRedis() !== null;
}

function todayKey(now: Date = new Date()): string {
  return KEY_PREFIX + now.toISOString().slice(0, 10);
}

export interface UsageEvent {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  /** Did the prompt cache hit on THIS request? */
  cacheHit: boolean;
}

/**
 * Fire-and-forget recording of one generation call's usage. Errors are
 * swallowed (never block the user's generation if telemetry is down).
 */
export async function trackUsage(event: UsageEvent): Promise<void> {
  const r = getRedis();
  if (!r) return;
  const key = todayKey();
  try {
    const pipeline = r.pipeline();
    pipeline.hincrby(key, "requests", 1);
    pipeline.hincrby(key, "input_tokens", event.inputTokens);
    pipeline.hincrby(key, "output_tokens", event.outputTokens);
    pipeline.hincrby(key, "cache_read_tokens", event.cacheReadTokens);
    pipeline.hincrby(key, "cache_creation_tokens", event.cacheCreationTokens);
    pipeline.hincrby(key, event.cacheHit ? "cache_hits" : "cache_misses", 1);
    // Expire daily aggregates after 90 days so storage doesn't grow forever.
    pipeline.expire(key, 90 * 24 * 3600);
    await pipeline.exec();
  } catch {
    /* swallow */
  }
}

export interface DayUsage {
  date: string;
  requests: number;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  cacheHits: number;
  cacheMisses: number;
}

function emptyDay(date: string): DayUsage {
  return {
    date,
    requests: 0,
    inputTokens: 0,
    outputTokens: 0,
    cacheReadTokens: 0,
    cacheCreationTokens: 0,
    cacheHits: 0,
    cacheMisses: 0,
  };
}

/**
 * Read the last N days (inclusive of today). Days with no activity
 * return as a zero-filled DayUsage so the timeline is dense.
 */
export async function getLastDays(days = 7): Promise<DayUsage[]> {
  const r = getRedis();
  if (!r) return [];

  const now = new Date();
  const out: DayUsage[] = [];
  const keys: string[] = [];
  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    const date = d.toISOString().slice(0, 10);
    dates.push(date);
    keys.push(KEY_PREFIX + date);
  }

  const pipeline = r.pipeline();
  for (const k of keys) pipeline.hgetall(k);
  const results = (await pipeline.exec()) as Array<Record<string, string> | null>;

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const row = results[i] ?? null;
    if (!row || Object.keys(row).length === 0) {
      out.push(emptyDay(date));
      continue;
    }
    out.push({
      date,
      requests: Number(row.requests ?? 0),
      inputTokens: Number(row.input_tokens ?? 0),
      outputTokens: Number(row.output_tokens ?? 0),
      cacheReadTokens: Number(row.cache_read_tokens ?? 0),
      cacheCreationTokens: Number(row.cache_creation_tokens ?? 0),
      cacheHits: Number(row.cache_hits ?? 0),
      cacheMisses: Number(row.cache_misses ?? 0),
    });
  }
  return out;
}

/**
 * Estimate USD cost from the token totals using Sonnet 4.6 pricing.
 * Updated when we change models in lib/ai-engine.ts.
 */
const PRICE_PER_MTOK = {
  input: 3.0,             // base input
  output: 15.0,
  cacheRead: 0.30,        // ~10% of base
  cacheCreation: 3.75,    // ~1.25× of base (5-min TTL)
};

export function estimateCostUsd(day: Pick<DayUsage, "inputTokens" | "outputTokens" | "cacheReadTokens" | "cacheCreationTokens">): number {
  return (
    (day.inputTokens / 1_000_000) * PRICE_PER_MTOK.input +
    (day.outputTokens / 1_000_000) * PRICE_PER_MTOK.output +
    (day.cacheReadTokens / 1_000_000) * PRICE_PER_MTOK.cacheRead +
    (day.cacheCreationTokens / 1_000_000) * PRICE_PER_MTOK.cacheCreation
  );
}
