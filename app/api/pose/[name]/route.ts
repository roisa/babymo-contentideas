import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

/**
 * Serves Baby Mo pose PNGs to the browser. Poses live at the repo root
 * (read server-side as data URLs by lib/render.tsx) — this route exposes
 * them for client-side use (the Animator page, pose picker thumbnails).
 *
 * Cache-Control: immutable, year-long. Pose files never change content
 * under a stable name.
 */
export async function GET(_req: Request, { params }: { params: { name: string } }) {
  const name = params.name;
  // Defense in depth: only allow our pose-file naming, no traversal.
  if (!/^baby-mo-[a-z0-9-]+\.png$/i.test(name)) {
    return new NextResponse("invalid name", { status: 400 });
  }
  try {
    const buf = await readFile(path.join(process.cwd(), "baby-mo-poses", name));
    return new NextResponse(new Uint8Array(buf), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("not found", { status: 404 });
  }
}
