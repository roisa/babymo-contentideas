/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["@resvg/resvg-js", "satori"],
  },
};

module.exports = nextConfig;
