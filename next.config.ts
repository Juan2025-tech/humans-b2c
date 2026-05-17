import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  serverExternalPackages: ["pg", "pg-cloudflare", "@prisma/client", "prisma"],
};

export default nextConfig;
