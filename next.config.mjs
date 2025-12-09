/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,

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
      {
        protocol: "https",
        hostname: "tebi.bubblemusic.dpdns.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
