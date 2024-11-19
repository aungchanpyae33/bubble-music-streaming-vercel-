/** @type {import('next').NextConfig} */
const nextConfig = {
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
