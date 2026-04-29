"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type AdBlockProps = {
  slot: string;
  format?: string;
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const initializedElements = new WeakSet<HTMLElement>();

function safePushAd(ins: HTMLElement) {
  if (typeof window === "undefined") return;
  if (!window.adsbygoogle) window.adsbygoogle = [];

  try {
    window.adsbygoogle.push({});
    initializedElements.add(ins);
  } catch {
    // AdSense throws if it believes an ad already exists in this slot.
    // Ignore to keep navigation stable.
  }
}

export function AdBlock({ slot, format = "auto", className }: AdBlockProps) {
  const pathname = usePathname();
  const insRef = useRef<HTMLModElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const client = useMemo(() => process.env.NEXT_PUBLIC_ADSENSE_CLIENT, []);

  useEffect(() => {
    const el = insRef.current as unknown as HTMLElement | null;
    if (!el) return;

    if (typeof window === "undefined") return;

    let observer: IntersectionObserver | null = null;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            setIsVisible(true);
          }
        },
        { rootMargin: "200px" }
      );
      observer.observe(el);
    } else {
      setIsVisible(true);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!client) return;
    if (!isVisible) return;

    const el = insRef.current as unknown as HTMLElement | null;
    if (!el) return;

    const status = el.getAttribute("data-adsbygoogle-status");
    const alreadyDone = status === "done";

    if (alreadyDone) return;
    if (initializedElements.has(el)) return;

    safePushAd(el);
  }, [client, isVisible, pathname, slot, format]);

  if (!client) return null;

  return (
    <ins
      ref={insRef}
      className={cn("adsbygoogle block", className)}
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
