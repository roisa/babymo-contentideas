import { NextResponse } from "next/server";
import { getTotalCount, isLibraryStoreConfigured } from "@/lib/library-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    const itemCount = await getTotalCount();
    return NextResponse.json({ configured: true, reachable: true, itemCount });
  } catch (e) {
    return NextResponse.json({
      configured: true,
      reachable: false,
      error: e instanceof Error ? e.message : String(e),
    });
  }
}
