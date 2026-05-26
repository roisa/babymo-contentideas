import { NextResponse } from "next/server";
import {
  addItems,
  clearAll,
  getAllItems,
  isLibraryStoreConfigured,
} from "@/lib/library-store";
import type { GeneratedContent } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isLibraryStoreConfigured()) {
    return NextResponse.json({ configured: false, items: [] }, { status: 200 });
  }
  try {
    const items = await getAllItems();
    return NextResponse.json({ configured: true, items });
  } catch (e) {
    return NextResponse.json(
      { configured: true, items: [], error: e instanceof Error ? e.message : String(e) },
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
    // Light validation — these fields are required for everything else to work.
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
