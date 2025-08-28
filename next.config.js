/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Uncommented for production deployment
  output: 'export',
  basePath: '/gcs-demo',
  assetPrefix: '/gcs-demo/',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig