import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteConfig = {
  name: "ClearCalculate",
  description:
    "Free online calculators for finance, education, and health. Simple tools with fast and accurate results.",
  url: "https://clearcalculate.com"
};
