import { calculatorRegistry, categoryRegistry } from "@/lib/calculators";

export const calculatorRoutes = calculatorRegistry.map((calc) => `/${calc.slug}`) as readonly string[];

export const categoryRoutes = categoryRegistry.map((cat) => `/${cat.slug}`) as readonly string[];

export const staticRoutes = ["/", "/calculators", ...categoryRoutes, ...calculatorRoutes] as readonly string[];
