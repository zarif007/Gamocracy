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
    domains: ['lh3.googleusercontent.com', 'variety.com', "gc-s3contents.s3.amazonaws.com"],
  },
  experimental: {
    scrollRestoration: true
  },
})

module.exports = nextConfig



