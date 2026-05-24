import { NextResponse } from "next/server";
import { generateCalendar } from "@/lib/ai-engine";
import type { ThemeId } from "@/lib/themes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { theme } = (await req.json()) as { theme: ThemeId };
    const items = generateCalendar(theme);
    return NextResponse.json({ items });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
