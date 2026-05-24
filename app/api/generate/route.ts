import { NextResponse } from "next/server";
import { generateBatch } from "@/lib/ai-engine";
import type { GenerationRequest } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as GenerationRequest;
    if (!body.contentTypeId || !body.format || !body.theme || !body.batchSize) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const clamped = Math.min(Math.max(body.batchSize, 1), 20);
    const result = await generateBatch({ ...body, batchSize: clamped });
    return NextResponse.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
