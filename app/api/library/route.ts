import { NextResponse } from "next/server";
import {
  addItems,
  clearAll,
  getItems,
  isLibraryStoreConfigured,
} from "@/lib/library-store";
import type { GeneratedContent } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isLibraryStoreConfigured()) {
    return NextResponse.json(
      { configured: false, items: [], nextBefore: null, total: 0 },
      { status: 200 }
    );
  }
  try {
    const url = new URL(req.url);
    const limit = url.searchParams.get("limit");
    const before = url.searchParams.get("before");
    const result = await getItems({
      limit: limit ? parseInt(limit, 10) : undefined,
      before: before ? parseInt(before, 10) : undefined,
    });
    return NextResponse.json({ configured: true, ...result });
  } catch (e) {
    return NextResponse.json(
      {
        configured: true,
        items: [],
        nextBefore: null,
        total: 0,
        error: e instanceof Error ? e.message : String(e),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!isLibraryStoreConfigured()) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }
  try {
    const body = (await req.json()) as { items?: GeneratedContent[] };
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "items array required" }, { status: 400 });
    }
    for (const it of body.items) {
      if (!it.id || !it.contentTypeId || !it.format || !Array.isArray(it.slides)) {
        return NextResponse.json({ error: "invalid item shape" }, { status: 400 });
      }
    }
    const items = await addItems(body.items);
    return NextResponse.json({ configured: true, items });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  if (!isLibraryStoreConfigured()) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }
  try {
    await clearAll();
    return NextResponse.json({ configured: true, items: [] });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
