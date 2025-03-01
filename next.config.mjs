/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },

  // reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.tebi.io",
        port: "",
        pathname: "/test1345/**",
      },
    ],
  },
};

export default nextConfig;
