"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GeneratedContent } from "./types";

export type SyncStatus = "idle" | "hydrating" | "synced" | "local-only" | "error";

interface LibraryState {
  items: GeneratedContent[];
  sync: SyncStatus;
  syncError: string | null;
  /** True when the server-side store is reachable & configured. */
  serverEnabled: boolean;
  /** Last successful server sync timestamp (ms). */
  lastSyncedAt: number | null;
  addBatch: (items: GeneratedContent[]) => void;
  remove: (id: string) => void;
  clear: () => void;
  hydrate: () => Promise<void>;
  /** Replace the items array wholesale — used by backfill flows after
   *  the server returns the updated set. Doesn't touch the server. */
  replaceItems: (items: GeneratedContent[]) => void;
}

const MAX = 200;

/** Merge server items with local items, dedupe by id, sort by createdAt desc. */
function mergeUnique(a: GeneratedContent[], b: GeneratedContent[]): GeneratedContent[] {
  const map = new Map<string, GeneratedContent>();
  for (const it of [...a, ...b]) map.set(it.id, it);
  return Array.from(map.values())
    .sort((x, y) => y.createdAt - x.createdAt)
    .slice(0, MAX);
}

export const useLibrary = create<LibraryState>()(
  persist(
    (set, get) => ({
      items: [],
      sync: "idle",
      syncError: null,
      serverEnabled: false,
      lastSyncedAt: null,

      addBatch: (items) => {
        // Optimistic local update first — UI doesn't wait for the network.
        set((s) => ({ items: mergeUnique(items, s.items) }));
        if (!get().serverEnabled) return;
        fetch("/api/library", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        })
          .then(async (r) => {
            if (!r.ok) throw new Error(`POST /api/library → ${r.status}`);
            const data = (await r.json()) as { configured: boolean; items: GeneratedContent[] };
            if (!data.configured) {
              set({ serverEnabled: false, sync: "local-only" });
              return;
            }
            // Trust the server's view as canonical after a successful write.
            set({ items: data.items, sync: "synced", lastSyncedAt: Date.now(), syncError: null });
          })
          .catch((e) => {
            set({ sync: "error", syncError: e instanceof Error ? e.message : String(e) });
          });
      },

      remove: (id) => {
        set((s) => ({ items: s.items.filter((i) => i.id !== id) }));
        if (!get().serverEnabled) return;
        fetch(`/api/library/${encodeURIComponent(id)}`, { method: "DELETE" })
          .then(async (r) => {
            if (!r.ok) throw new Error(`DELETE /api/library/${id} → ${r.status}`);
            set({ sync: "synced", lastSyncedAt: Date.now(), syncError: null });
          })
          .catch((e) => {
            set({ sync: "error", syncError: e instanceof Error ? e.message : String(e) });
          });
      },

      clear: () => {
        set({ items: [] });
        if (!get().serverEnabled) return;
        fetch("/api/library", { method: "DELETE" })
          .then(async (r) => {
            if (!r.ok) throw new Error(`DELETE /api/library → ${r.status}`);
            set({ sync: "synced", lastSyncedAt: Date.now(), syncError: null });
          })
          .catch((e) => {
            set({ sync: "error", syncError: e instanceof Error ? e.message : String(e) });
          });
      },

      replaceItems: (items) => {
        set({ items });
      },

      hydrate: async () => {
        set({ sync: "hydrating", syncError: null });
        try {
          const res = await fetch("/api/library", { cache: "no-store" });
          if (!res.ok) throw new Error(`GET /api/library → ${res.status}`);
          const data = (await res.json()) as {
            configured: boolean;
            items: GeneratedContent[];
          };
          if (!data.configured) {
            // Server has no backend — stay local-only with whatever
            // localStorage already has.
            set({ serverEnabled: false, sync: "local-only" });
            return;
          }
          const localItems = get().items;
          const serverItems = data.items ?? [];
          // First-load migration: if server is empty but localStorage has
          // items, push them up so the team inherits the user's current work.
          if (serverItems.length === 0 && localItems.length > 0) {
            const pushRes = await fetch("/api/library", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ items: localItems }),
            });
            if (pushRes.ok) {
              const pushed = (await pushRes.json()) as { items: GeneratedContent[] };
              set({
                items: pushed.items,
                serverEnabled: true,
                sync: "synced",
                lastSyncedAt: Date.now(),
                syncError: null,
              });
              return;
            }
          }
          // Normal case: merge server + local (server wins on conflict via id dedupe).
          set({
            items: mergeUnique(serverItems, localItems),
            serverEnabled: true,
            sync: "synced",
            lastSyncedAt: Date.now(),
            syncError: null,
          });
        } catch (e) {
          set({
            sync: "error",
            syncError: e instanceof Error ? e.message : String(e),
          });
        }
      },
    }),
    // v3 introduces server-sync metadata fields. Items shape is unchanged
    // from v2, so existing localStorage data is forward-compatible.
    {
      name: "babymo-library-v2",
      // Don't persist sync state — that's runtime-only.
      partialize: (s) => ({ items: s.items }),
    }
  )
);
