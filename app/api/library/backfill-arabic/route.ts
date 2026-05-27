import { NextResponse } from "next/server";
import {
  getItems,
  isLibraryStoreConfigured,
  updateItems,
} from "@/lib/library-store";
import { backfillArabicInItems } from "@/lib/arabic-lookup";
import type { GeneratedContent } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Sweep the team library, inject canonical Arabic into any slide
 * whose attribution matches the curated lookup but has no arabic.
 * Returns the updated item count + the latest page so the client can
 * refresh without a second round-trip.
 *
 * No-op for slides that already have Arabic or whose attribution
 * isn't in the lookup — never overwrites existing content.
 */
export async function POST(req: Request) {
  // The endpoint accepts an optional body of items for clients that
  // want to backfill their local store without a configured backend.
  // When the server is configured, we backfill the team library
  // directly and return the updated page.
  let bodyItems: GeneratedContent[] | undefined;
  try {
    const body = (await req.json()) as { items?: GeneratedContent[] } | null;
    bodyItems = body?.items;
  } catch {
    /* no body, that's fine */
  }

  // Server-backed flow — fix items in the team library.
  if (isLibraryStoreConfigured()) {
    try {
      const { items: existing, total } = await getItems({ limit: 500 });
      const { items: backfilled, fixedCount } = backfillArabicInItems(existing);
      if (fixedCount > 0) {
        // Only write items that actually changed — diff by id.
        const existingById = new Map(existing.map((i) => [i.id, i]));
        const changed = backfilled.filter((b) => existingById.get(b.id) !== b);
        await updateItems(changed);
      }
      return NextResponse.json({
        configured: true,
        fixedCount,
        total,
        items: backfilled,
      });
    } catch (e) {
      return NextResponse.json(
        { error: e instanceof Error ? e.message : String(e) },
        { status: 500 }
      );
    }
  }

  // Local-only flow — sweep the items the client sent us, return them.
  if (Array.isArray(bodyItems) && bodyItems.length > 0) {
    const { items, fixedCount } = backfillArabicInItems(bodyItems);
    return NextResponse.json({ configured: false, fixedCount, items });
  }

  return NextResponse.json(
    { configured: false, fixedCount: 0, items: [] },
    { status: 200 }
  );
}
