/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['fetch-site-metadata'],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
