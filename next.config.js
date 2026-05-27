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
      "/api/render": [".fonts/**/*", ".emoji/**/*", "baby-mo-poses/**/*", "public/babymo-logo.png"],
      "/api/export-zip": [".fonts/**/*", ".emoji/**/*", "baby-mo-poses/**/*", "public/babymo-logo.png"],
      "/api/warmup": [".fonts/**/*", "public/babymo-logo.png"],
      "/api/pose/[name]": ["baby-mo-poses/**/*"],
      "/api/arabic": [".fonts/**/*"],
      "/api/generate": [".fonts/**/*", ".emoji/**/*"],
      "/api/calendar": [".fonts/**/*", ".emoji/**/*"],
    },
  },
};

module.exports = nextConfig;
