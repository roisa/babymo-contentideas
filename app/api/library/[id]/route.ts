import { NextResponse } from "next/server";
import { isLibraryStoreConfigured, removeItem } from "@/lib/library-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!isLibraryStoreConfigured()) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }
  if (!params.id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  try {
    const items = await removeItem(params.id);
    return NextResponse.json({ configured: true, items });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
