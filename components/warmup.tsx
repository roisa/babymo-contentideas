"use client";

import { useEffect } from "react";

/**
 * Fire-and-forget GET to /api/warmup on first mount. Primes the render
 * caches (~3.5s cold-start tax) while the user is still navigating the
 * UI, so their first export feels instant.
 *
 * Idempotent — repeated calls hit the in-process memoizers and return
 * in <1ms.
 */
export function Warmup() {
  useEffect(() => {
    fetch("/api/warmup", { cache: "no-store" }).catch(() => {
      // Warmup is best-effort; a failure here just means the user pays
      // cold-start on their first real render, which is the status quo.
    });
  }, []);
  return null;
}
