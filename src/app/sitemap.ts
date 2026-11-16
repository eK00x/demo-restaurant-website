import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Alle öffentlichen Seiten für Suchmaschinen; Karten werden häufiger aktualisiert als Impressum & Co.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/speisekarte", priority: 0.9, changeFrequency: "monthly" },
    { path: "/mittagsangebote", priority: 0.8, changeFrequency: "monthly" },
    { path: "/getraenke", priority: 0.7, changeFrequency: "monthly" },
    { path: "/kontakt", priority: 0.7, changeFrequency: "yearly" },
    { path: "/ueber-uns", priority: 0.5, changeFrequency: "yearly" },
    { path: "/impressum", priority: 0.1, changeFrequency: "yearly" },
    { path: "/datenschutz", priority: 0.1, changeFrequency: "yearly" },
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
