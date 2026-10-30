/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    // Restore window scroll on browser back/forward (Pages Router).
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
