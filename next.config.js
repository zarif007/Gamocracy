const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    // disable: process.env.NODE_ENV === 'development',
  },
  images: {
    domains: ['gc-s3images.s3.amazonaws.com'],
  },
  experimental: {
    scrollRestoration: true
  },
})

module.exports = nextConfig



