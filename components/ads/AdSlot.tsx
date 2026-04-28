"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type AdSlotVariant = "top-banner" | "in-content" | "sidebar" | "sticky-mobile-footer" | "calculator-bottom";

type AdSlotProps = {
  variant: AdSlotVariant;
  className?: string;
  id?: string;
};

const heights: Record<Exclude<AdSlotVariant, "sidebar">, number> = {
  "top-banner": 90,
  "in-content": 250,
  "sticky-mobile-footer": 70,
  "calculator-bottom": 250
};

function adsEnabled() {
  if (typeof window === "undefined") return false;
  const flag = window.localStorage.getItem("cc:ads:enabled");
  if (flag === "0") return false;
  if (flag === "1") return true;
  return process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
}

export function AdSlot({ variant, className, id }: AdSlotProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (variant !== "sticky-mobile-footer") return;

    try {
      const v = window.localStorage.getItem("cc:ads:dismissed:sticky");
      if (v === "1") setDismissed(true);
    } catch {
      // ignore
    }
  }, [mounted, variant]);

  const reservedHeight = useMemo(() => {
    if (variant === "sidebar") return 600;
    return heights[variant];
  }, [variant]);

  useEffect(() => {
    if (!mounted) return;

    const el = id ? document.getElementById(id) : null;
    const target = el ?? undefined;

    if (!target) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [id, mounted]);

  if (variant === "sticky-mobile-footer" && dismissed) return null;

  const enabled = mounted && adsEnabled();

  if (!mounted) {
    return <div className={cn("w-full", variant === "sidebar" ? "hidden lg:block" : "")} style={{ height: reservedHeight }} />;
  }

  if (variant === "sidebar") {
    return (
      <aside className={cn("hidden lg:block", className)}>
        <div
          id={id}
          className={cn(
            "w-full rounded-xl border border-slate-200 bg-white",
            "shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
          )}
          style={{ height: reservedHeight }}
        >
          <div className="flex h-full items-center justify-center px-4 text-center text-xs font-medium text-slate-500">
            {enabled && visible ? "Sidebar ad" : "Ad space"}
          </div>
        </div>
      </aside>
    );
  }

  if (variant === "sticky-mobile-footer") {
    return (
      <div className={cn("fixed inset-x-0 bottom-0 z-50 md:hidden", className)}>
        <div
          id={id}
          className={cn(
            "mx-auto w-full max-w-[1200px]",
            "border-t border-slate-200 bg-white/95 backdrop-blur",
            "px-4 py-2"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex-1 rounded-lg border border-slate-200 bg-slate-50",
                "flex items-center justify-center text-xs font-medium text-slate-500"
              )}
              style={{ height: reservedHeight }}
            >
              {enabled && visible ? "Mobile footer ad" : "Ad space"}
            </div>
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
              onClick={() => {
                setDismissed(true);
                try {
                  window.localStorage.setItem("cc:ads:dismissed:sticky", "1");
                } catch {
                  // ignore
                }
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white",
        "shadow-[0_12px_30px_rgba(15,23,42,0.06)]",
        className
      )}
      style={{ height: reservedHeight }}
    >
      <div className="flex h-full items-center justify-center px-4 text-center text-xs font-medium text-slate-500">
        {enabled && visible ? "Ad slot" : "Ad space"}
      </div>
    </div>
  );
}
