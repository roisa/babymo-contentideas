/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Build metadata that the home page surfaces in a badge so the team
  // can verify what's actually live on a given URL.
  env: {
    NEXT_PUBLIC_BUILD_SHA:
      (process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_COMMIT_SHA || "").slice(0, 7) || "local",
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC",
  },
  experimental: {
    serverComponentsExternalPackages: ["@resvg/resvg-js", "satori"],
    // Make sure Vercel's serverless function bundle includes our font
    // and emoji files (referenced via fs.readFile at runtime — not tracked
    // by Webpack on its own).
    outputFileTracingIncludes: {
      // public/fonts/** is the canonical location (always bundled by
      // Vercel for /api/* routes since public/ is treated specially).
      // .fonts/** is kept as a fallback for legacy code paths — dotfile
      // dirs are inconsistently picked up by outputFileTracingIncludes
      // across Vercel runtime versions, which is exactly the bug we hit.
      // public/arabic-cache/** = pre-rendered Arabic PNGs + manifest,
      // committed to repo. Read by the static renderer to bypass
      // Vercel's broken runtime Arabic shaping.
      "/api/render":         ["public/fonts/**/*", ".fonts/**/*", "public/arabic-cache/**/*", ".emoji/**/*", "baby-mo-poses/**/*", "public/babymo-logo.png"],
      "/api/export-zip":     ["public/fonts/**/*", ".fonts/**/*", "public/arabic-cache/**/*", ".emoji/**/*", "baby-mo-poses/**/*", "public/babymo-logo.png"],
      "/api/warmup":         ["public/fonts/**/*", ".fonts/**/*", "public/babymo-logo.png"],
      "/api/pose/[name]":    ["baby-mo-poses/**/*"],
      "/api/arabic":         ["public/fonts/**/*", ".fonts/**/*"],
      "/api/arabic/debug":   ["public/fonts/**/*", ".fonts/**/*"],
      "/api/generate":       ["public/fonts/**/*", ".fonts/**/*", ".emoji/**/*"],
      "/api/calendar":       ["public/fonts/**/*", ".fonts/**/*", ".emoji/**/*"],
    },
  },
};

module.exports = nextConfig;
