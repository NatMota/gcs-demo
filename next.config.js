/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/permutive-gcs-demo',
  assetPrefix: '/permutive-gcs-demo/',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig