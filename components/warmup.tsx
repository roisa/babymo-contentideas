"use client";

import { useEffect } from "react";
import { useLibrary } from "@/lib/store";

/**
 * App-startup side effects, fired on first mount:
 *  1. Pre-warm the render pipeline (/api/warmup) so the first export
 *     doesn't pay the ~3.5s cold-start tax.
 *  2. Hydrate the library store from the server-side share (if
 *     configured). Without server config, this is a no-op and the
 *     library stays localStorage-only.
 */
export function Warmup() {
  const hydrate = useLibrary((s) => s.hydrate);

  useEffect(() => {
    fetch("/api/warmup", { cache: "no-store" }).catch(() => {
      // Best-effort: a failure means the user pays cold-start on their
      // first real render, which is the status quo.
    });
    hydrate();
  }, [hydrate]);

  return null;
}
