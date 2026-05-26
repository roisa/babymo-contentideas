import { NextResponse } from "next/server";
import { getLastDays, isUsageStoreConfigured, estimateCostUsd } from "@/lib/usage-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Last N days of AI generation telemetry. Used by the Settings page to
 * surface prompt-caching effectiveness and cost.
 */
export async function GET(req: Request) {
  if (!isUsageStoreConfigured()) {
    return NextResponse.json(
      { configured: false, days: [], totals: null },
      { status: 200 }
    );
  }
  try {
    const url = new URL(req.url);
    const daysParam = url.searchParams.get("days");
    const n = Math.min(Math.max(parseInt(daysParam ?? "7", 10) || 7, 1), 90);
    const days = await getLastDays(n);

    // Aggregate totals across the window.
    const totals = days.reduce(
      (acc, d) => {
        acc.requests += d.requests;
        acc.inputTokens += d.inputTokens;
        acc.outputTokens += d.outputTokens;
        acc.cacheReadTokens += d.cacheReadTokens;
        acc.cacheCreationTokens += d.cacheCreationTokens;
        acc.cacheHits += d.cacheHits;
        acc.cacheMisses += d.cacheMisses;
        return acc;
      },
      {
        requests: 0,
        inputTokens: 0,
        outputTokens: 0,
        cacheReadTokens: 0,
        cacheCreationTokens: 0,
        cacheHits: 0,
        cacheMisses: 0,
      }
    );

    const totalCalls = totals.cacheHits + totals.cacheMisses;
    const cacheHitRate = totalCalls > 0 ? totals.cacheHits / totalCalls : 0;
    const cost = estimateCostUsd(totals);

    return NextResponse.json({
      configured: true,
      days,
      totals: { ...totals, cacheHitRate, cost },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
