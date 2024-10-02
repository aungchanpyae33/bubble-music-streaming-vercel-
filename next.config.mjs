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
  async headers() {
    return [
      {
        source: "/search",
        headers: [
          {
            key: "CDN-Cache-Control",
            value:
              "public, max-age=36000,s-maxage=36000 stale-while-revalidate=36000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
