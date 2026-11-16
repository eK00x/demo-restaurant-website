import type { MetadataRoute } from "next";
import { isPreviewDeploy, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isPreviewDeploy ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
