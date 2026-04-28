import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clearcalculate.com";
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/icon", "/apple-icon"]
      }
    ],
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
