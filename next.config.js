/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["@resvg/resvg-js", "satori"],
    // Make sure Vercel's serverless function bundle includes our font
    // and emoji files (referenced via fs.readFile at runtime — not tracked
    // by Webpack on its own).
    outputFileTracingIncludes: {
      "/api/render": [".fonts/**/*", ".emoji/**/*", "baby-mo-poses/**/*", "public/babymo-logo.png"],
      "/api/export-zip": [".fonts/**/*", ".emoji/**/*", "baby-mo-poses/**/*", "public/babymo-logo.png"],
      "/api/warmup": [".fonts/**/*", "public/babymo-logo.png"],
      "/api/generate": [".fonts/**/*", ".emoji/**/*"],
      "/api/calendar": [".fonts/**/*", ".emoji/**/*"],
    },
  },
};

module.exports = nextConfig;
