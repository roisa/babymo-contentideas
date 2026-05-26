/**
 * Server-side library storage. When Upstash Redis env vars are
 * configured (`UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`,
 * or Vercel's `KV_REST_API_URL` + `KV_REST_API_TOKEN`), the team
 * library is shared across everyone hitting this deployment.
 *
 * Without those env vars, every endpoint returns `configured: false`
 * and the client falls back to localStorage (status quo).
 *
 * Storage model: ONE Redis key (`babymo:library`) holds the full
 * `GeneratedContent[]`. For a 200-item cap and ~5 internal writers
 * this is simpler than a sorted-set-per-item layout. Last writer
 * wins on concurrent writes — acceptable for this team size.
 */
import { Redis } from "@upstash/redis";
import type { GeneratedContent } from "./types";

const KEY = "babymo:library:v1";
const MAX_ITEMS = 200;

function envVar(name: string): string | undefined {
  const v = process.env[name];
  return v && v.length > 0 ? v : undefined;
}

let cachedClient: Redis | null | undefined;

function getRedis(): Redis | null {
  if (cachedClient !== undefined) return cachedClient;
  // Accept both Upstash-native and Vercel-KV-style env names.
  const url = envVar("UPSTASH_REDIS_REST_URL") ?? envVar("KV_REST_API_URL");
  const token = envVar("UPSTASH_REDIS_REST_TOKEN") ?? envVar("KV_REST_API_TOKEN");
  if (!url || !token) {
    cachedClient = null;
    return null;
  }
  cachedClient = new Redis({ url, token });
  return cachedClient;
}

export function isLibraryStoreConfigured(): boolean {
  return getRedis() !== null;
}

export async function getAllItems(): Promise<GeneratedContent[]> {
  const r = getRedis();
  if (!r) throw new Error("Library store not configured");
  // Upstash auto-deserializes JSON values stored via .set with an object.
  // It returns the parsed value directly, not a string.
  const value = await r.get<GeneratedContent[]>(KEY);
  return Array.isArray(value) ? value : [];
}

export async function setAllItems(items: GeneratedContent[]): Promise<void> {
  const r = getRedis();
  if (!r) throw new Error("Library store not configured");
  await r.set(KEY, items.slice(0, MAX_ITEMS));
}

/** Prepend new items, dedupe by id, cap to MAX_ITEMS. Returns the
 * post-write state so the client can sync without a second round-trip. */
export async function addItems(newItems: GeneratedContent[]): Promise<GeneratedContent[]> {
  const existing = await getAllItems();
  const existingIds = new Set(existing.map((i) => i.id));
  const fresh = newItems.filter((i) => !existingIds.has(i.id));
  const next = [...fresh, ...existing].slice(0, MAX_ITEMS);
  await setAllItems(next);
  return next;
}

export async function removeItem(id: string): Promise<GeneratedContent[]> {
  const existing = await getAllItems();
  const next = existing.filter((i) => i.id !== id);
  await setAllItems(next);
  return next;
}

export async function clearAll(): Promise<void> {
  const r = getRedis();
  if (!r) throw new Error("Library store not configured");
  await r.del(KEY);
}
