import { NextResponse } from "next/server";
import { CANVA_TEMPLATES } from "@/lib/canva-mapping";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Reports which Canva env vars are present (no secrets revealed). */
export async function GET() {
  const has = (k: string) => Boolean(process.env[k] && process.env[k]!.length > 0);
  return NextResponse.json({
    clientId: has("CANVA_CLIENT_ID"),
    clientSecret: has("CANVA_CLIENT_SECRET"),
    refreshToken: has("CANVA_REFRESH_TOKEN"),
    redirectUri: process.env.CANVA_REDIRECT_URI ?? null,
    templates: {
      single: Boolean(CANVA_TEMPLATES.single),
      carousel: Boolean(CANVA_TEMPLATES.carousel),
      reels: Boolean(CANVA_TEMPLATES.reels),
    },
    connected:
      has("CANVA_CLIENT_ID") &&
      has("CANVA_CLIENT_SECRET") &&
      has("CANVA_REFRESH_TOKEN") &&
      Boolean(CANVA_TEMPLATES.single ?? CANVA_TEMPLATES.carousel ?? CANVA_TEMPLATES.reels),
  });
}
