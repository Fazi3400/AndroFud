/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["sharp"],
  },
}

export default nextConfig
