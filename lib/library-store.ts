/**
 * Server-side library storage. When Upstash Redis env vars are
 * configured (`UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`,
 * or Vercel's `KV_REST_API_URL` + `KV_REST_API_TOKEN`), the team
 * library is shared across everyone hitting this deployment.
 *
 * Without those env vars, every endpoint returns `configured: false`
 * and the client falls back to localStorage (status quo).
 *
 * Storage model (v2): sorted set + per-item keys.
 *
 *   babymo:library:v2:index            — sorted set, score=createdAt, member=id
 *   babymo:library:v2:item:<id>        — JSON-serialized GeneratedContent
 *
 * GET pages backwards from `before` (or now) for `limit` items, so the
 * library can grow indefinitely without a hard cap evicting old work.
 * Most-recent-first ordering comes from the sorted-set REV traversal.
 *
 * v1 legacy: a single JSON-array key at `babymo:library:v1`. On any
 * read or write we transparently migrate it into v2 once, then delete
 * the old key. No data lost on upgrade.
 */
import { Redis } from "@upstash/redis";
import type { GeneratedContent } from "./types";

const INDEX_KEY = "babymo:library:v2:index";
const ITEM_PREFIX = "babymo:library:v2:item:";
const LEGACY_KEY = "babymo:library:v1";
const DEFAULT_LIMIT = 200;
const MAX_LIMIT = 500;

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

export function isLibraryStoreConfigured(): boolean {
  return getRedis() !== null;
}

/**
 * Migrate the v1 single-blob format to v2 sorted-set on first read.
 * Idempotent: subsequent calls notice the legacy key is gone and no-op.
 */
let migrated = false;
async function migrateIfNeeded(r: Redis): Promise<void> {
  if (migrated) return;
  const legacy = await r.get<GeneratedContent[]>(LEGACY_KEY);
  if (Array.isArray(legacy) && legacy.length > 0) {
    const pipeline = r.pipeline();
    for (const it of legacy) {
      pipeline.set(ITEM_PREFIX + it.id, it);
      pipeline.zadd(INDEX_KEY, { score: it.createdAt, member: it.id });
    }
    pipeline.del(LEGACY_KEY);
    await pipeline.exec();
  }
  migrated = true;
}

export interface GetItemsOptions {
  /** Page size. Default 200, max 500. */
  limit?: number;
  /** Return items created strictly before this timestamp (ms). */
  before?: number;
}

export interface GetItemsResult {
  items: GeneratedContent[];
  /** Pass back as `before` to fetch the next page. Null when no more. */
  nextBefore: number | null;
  /** Total items in the team library — useful for the Settings card. */
  total: number;
}

export async function getItems(opts: GetItemsOptions = {}): Promise<GetItemsResult> {
  const r = getRedis();
  if (!r) throw new Error("Library store not configured");
  await migrateIfNeeded(r);

  const limit = Math.min(Math.max(opts.limit ?? DEFAULT_LIMIT, 1), MAX_LIMIT);
  const max = opts.before ? opts.before - 1 : "+inf";

  // ZRANGE with REV+BYSCORE gives us newest-first paginated traversal.
  // The Upstash SDK exposes this via `zrange(key, min, max, { rev, byScore, ... })`.
  const ids = (await r.zrange(INDEX_KEY, max, "-inf", {
    rev: true,
    byScore: true,
    offset: 0,
    count: limit,
  })) as string[];

  if (ids.length === 0) {
    const total = await r.zcard(INDEX_KEY);
    return { items: [], nextBefore: null, total };
  }

  const pipeline = r.pipeline();
  for (const id of ids) pipeline.get<GeneratedContent>(ITEM_PREFIX + id);
  const raw = (await pipeline.exec()) as Array<GeneratedContent | null>;
  const items = raw.filter((x): x is GeneratedContent => x !== null);

  // nextBefore = oldest item's createdAt so the next page picks up below it.
  const oldest = items[items.length - 1];
  const nextBefore = items.length === limit && oldest ? oldest.createdAt : null;

  const total = await r.zcard(INDEX_KEY);
  return { items, nextBefore, total };
}

/** Back-compat for callers that just want "everything (up to a sensible cap)". */
export async function getAllItems(): Promise<GeneratedContent[]> {
  const { items } = await getItems({ limit: MAX_LIMIT });
  return items;
}

/** Add items, dedupe by id. Returns the current most-recent page so the
 *  client can refresh its in-memory view without a second round-trip. */
export async function addItems(newItems: GeneratedContent[]): Promise<GeneratedContent[]> {
  const r = getRedis();
  if (!r) throw new Error("Library store not configured");
  await migrateIfNeeded(r);

  const pipeline = r.pipeline();
  for (const it of newItems) {
    pipeline.set(ITEM_PREFIX + it.id, it);
    pipeline.zadd(INDEX_KEY, { score: it.createdAt, member: it.id });
  }
  await pipeline.exec();

  const { items } = await getItems();
  return items;
}

export async function removeItem(id: string): Promise<GeneratedContent[]> {
  const r = getRedis();
  if (!r) throw new Error("Library store not configured");
  await migrateIfNeeded(r);

  const pipeline = r.pipeline();
  pipeline.zrem(INDEX_KEY, id);
  pipeline.del(ITEM_PREFIX + id);
  await pipeline.exec();

  const { items } = await getItems();
  return items;
}

export async function clearAll(): Promise<void> {
  const r = getRedis();
  if (!r) throw new Error("Library store not configured");

  // Wipe all v2 item keys + the index + the legacy blob if it still
  // happens to be around. SCAN avoids loading millions of keys at once.
  const ids = (await r.zrange(INDEX_KEY, 0, -1)) as string[];
  if (ids.length > 0) {
    const pipeline = r.pipeline();
    for (const id of ids) pipeline.del(ITEM_PREFIX + id);
    pipeline.del(INDEX_KEY);
    pipeline.del(LEGACY_KEY);
    await pipeline.exec();
  } else {
    await r.del(INDEX_KEY);
    await r.del(LEGACY_KEY);
  }
  migrated = false;
}

/**
 * Update existing items in place (preserves createdAt — the sorted-set
 * entry stays unchanged). Used by /api/library/backfill-arabic to
 * inject the curated Arabic into pieces that were generated before the
 * lookup existed.
 */
export async function updateItems(items: GeneratedContent[]): Promise<void> {
  const r = getRedis();
  if (!r) throw new Error("Library store not configured");
  await migrateIfNeeded(r);
  if (items.length === 0) return;
  const pipeline = r.pipeline();
  for (const it of items) {
    pipeline.set(ITEM_PREFIX + it.id, it);
    // Re-add to sorted set with the SAME score so ordering is preserved.
    pipeline.zadd(INDEX_KEY, { score: it.createdAt, member: it.id });
  }
  await pipeline.exec();
}

/** Total item count — useful for the Settings card. */
export async function getTotalCount(): Promise<number> {
  const r = getRedis();
  if (!r) throw new Error("Library store not configured");
  await migrateIfNeeded(r);
  return await r.zcard(INDEX_KEY);
}

/**
 * `setAllItems` from v1 — preserved for compatibility, no longer the
 * recommended write path. (Used to be the only way to mutate; the new
 * model uses addItems / removeItem / clearAll.)
 */
export async function setAllItems(items: GeneratedContent[]): Promise<void> {
  const r = getRedis();
  if (!r) throw new Error("Library store not configured");
  await clearAll();
  if (items.length > 0) await addItems(items);
}
