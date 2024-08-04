/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "fikdisavtipodbzfiafd.supabase.co"
      },
      {
        hostname: "images.unsplash.com"
      },
      {
        hostname: "search.pstatic.net"
      }
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  }
};

export default nextConfig;
