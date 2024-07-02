/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "imgnike-a.akamaihd.net",
      },
      {
        hostname: "img.clerk.com",
      },
      {
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;
