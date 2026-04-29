import type { MetadataRoute } from "next";
import { staticRoutes } from "@/lib/site-routes";
import { getIndexableProgrammaticRoutes } from "@/lib/programmatic-pages";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clearcalculate.com";
export const dynamic = "force-static";

function priorityForRoute(route: string) {
  if (route === "/") return 1.0;
  if (
    route === "/calculators" ||
    route === "/education" ||
    route === "/finance" ||
    route === "/health"
  )
    return 0.8;
  return 0.9;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const programmaticRoutes = getIndexableProgrammaticRoutes();

  const routes = [...staticRoutes, ...programmaticRoutes];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: priorityForRoute(route)
  }));
}
