const { withPlaiceholder } = require('@plaiceholder/next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['plaiceholder', '@plaiceholder/next'],
    appDir: true,
    // typedRoutes: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
}

module.exports = withPlaiceholder(nextConfig)
