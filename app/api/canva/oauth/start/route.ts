import { NextResponse } from "next/server";
import { buildAuthorizeUrl } from "@/lib/canva";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Single-account model: state isn't security-critical, but include
    // a value so Canva accepts it.
    const url = buildAuthorizeUrl("babymo-studio");
    return NextResponse.redirect(url);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return new NextResponse(
      `<h1>Canva OAuth not configured</h1><pre>${escapeHtml(msg)}</pre><p>Set CANVA_CLIENT_ID and CANVA_CLIENT_SECRET (and optionally CANVA_REDIRECT_URI) in your environment, then reload.</p>`,
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
