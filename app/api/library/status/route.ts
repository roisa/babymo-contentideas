import { NextResponse } from "next/server";
import { getAllItems, isLibraryStoreConfigured } from "@/lib/library-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Returns the team library's connection status — used by the Settings
 * page to surface whether Upstash Redis is wired up.
 */
export async function GET() {
  const configured = isLibraryStoreConfigured();
  if (!configured) {
    return NextResponse.json({
      configured: false,
      envHints: {
        upstashUrl: Boolean(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL),
        upstashToken: Boolean(process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN),
      },
    });
  }
  try {
    const items = await getAllItems();
    return NextResponse.json({ configured: true, reachable: true, itemCount: items.length });
  } catch (e) {
    return NextResponse.json({
      configured: true,
      reachable: false,
      error: e instanceof Error ? e.message : String(e),
    });
  }
}
