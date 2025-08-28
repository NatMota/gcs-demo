/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/permutive-gcs-demo' : '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig