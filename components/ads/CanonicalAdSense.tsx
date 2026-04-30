"use client";

import Script from "next/script";
import { useMemo } from "react";

const CANONICAL_DOMAIN = "clearcalculate.com";

export function CanonicalAdSense() {
  const client = useMemo(() => process.env.NEXT_PUBLIC_ADSENSE_CLIENT, []);

  // Only render on canonical domain (non-www)
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    // Block AdSense on www subdomain or any non-canonical domain
    if (hostname !== CANONICAL_DOMAIN) {
      return null;
    }
  }

  if (!client) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="beforeInteractive"
    />
  );
}
