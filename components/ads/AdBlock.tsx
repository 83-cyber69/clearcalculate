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
const CANONICAL_DOMAIN = "clearcalculate.com";
const RESERVED_HEIGHT = 280;

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
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const client = useMemo(() => process.env.NEXT_PUBLIC_ADSENSE_CLIENT, []);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (window.location.hostname !== CANONICAL_DOMAIN) return;

    const el = insRef.current as unknown as HTMLElement | null;
    if (!el) return;

    const status = el.getAttribute("data-adsbygoogle-status");
    const alreadyDone = status === "done";

    if (alreadyDone) return;
    if (initializedElements.has(el)) return;

    safePushAd(el);
  }, [client, isVisible, pathname, slot, format]);

  if (mounted && window.location.hostname !== CANONICAL_DOMAIN) {
    return null;
  }

  return (
    <div
      className={cn("mobile-safe my-8 w-full overflow-hidden rounded-xl border border-slate-200 bg-white", className)}
      style={{ minHeight: RESERVED_HEIGHT }}
    >
      {client ? (
        <ins
          ref={insRef}
          className="adsbygoogle block h-full w-full"
          style={{ display: "block", minHeight: RESERVED_HEIGHT }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : null}
    </div>
  );
}
