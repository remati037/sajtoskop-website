import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fontovi za OG sliku se čitaju sa diska u runtime-u — Vercel mora da ih spakuje.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./assets/**"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
