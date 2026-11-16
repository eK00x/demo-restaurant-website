import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Adressen der alten WordPress-Seite dauerhaft (308) auf die neuen Seiten umleiten,
  // damit Google-Treffer, Lesezeichen und alte Links weiter funktionieren.
  async redirects() {
    return [
      { source: "/getraenkekarte", destination: "/getraenke", permanent: true },
      { source: "/cookie-richtlinie", destination: "/datenschutz", permanent: true },
      { source: "/cookie-policy-eu", destination: "/datenschutz", permanent: true },
    ];
  },
  images: {
    // AVIF zuerst: deutlich kleiner als WebP, WebP bleibt als Fallback.
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
