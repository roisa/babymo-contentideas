import { NextResponse } from "next/server";
import { warmUp } from "@/lib/render";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Primes the in-process font + logo + Arabic-shaping caches that
 * /api/render uses, eliminating the ~3.5s cold-start tax on the user's
 * first render. Triggered from app/layout.tsx on first mount.
 *
 * Safe to call any number of times — the underlying loaders memoize.
 */
export async function GET() {
  const result = await warmUp();
  return NextResponse.json(result);
}
