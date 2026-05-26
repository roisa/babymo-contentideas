import { NextResponse } from "next/server";
import { generateCalendar } from "@/lib/ai-engine";
import type { ThemeId } from "@/lib/themes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { theme } = (await req.json()) as { theme: ThemeId };
    const items = generateCalendar(theme);
    // `items` carries an optional `meta` (non-enumerable on the array) —
    // pull it out so JSON serialization picks it up at the top level.
    const meta = (items as typeof items & { meta?: { islamic: unknown } }).meta;
    return NextResponse.json({ items: [...items], meta });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
