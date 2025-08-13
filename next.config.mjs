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

// /** @type {import('next').NextConfig} */
// import withBundleAnalyzer from "@next/bundle-analyzer";
// const nextConfig = {
//   experimental: {
//     ppr: true,
//   },

//   // reactStrictMode: false,
//   images: {
//     formats: ["image/avif", "image/webp"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "s3.tebi.io",
//         port: "",
//         pathname: "/test1345/**",
//       },
//       {
//         protocol: "https",
//         hostname: "tebi.bubblemusic.dpdns.org",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
// };
// const analyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

// export default analyzer(nextConfig);
