/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),

  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.gr-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
