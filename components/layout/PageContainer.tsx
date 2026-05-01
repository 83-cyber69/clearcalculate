import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Standardized page container for consistent responsive layout.
 * - Prevents horizontal overflow on all devices
 * - Centers content with max-width constraints
 * - Mobile-first responsive padding
 */
export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl overflow-x-clip px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
