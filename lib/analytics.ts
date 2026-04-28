export type AnalyticsEventName =
  | "homepage_search"
  | "category_click"
  | "calculator_open"
  | "share_click"
  | "monetization_ad_view"
  | "monetization_affiliate_click"
  | "email_capture_submit";

export function trackEvent(name: AnalyticsEventName, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  // Placeholder: wire to your analytics provider later (GA4/Plausible/PostHog/etc)
  // Keeping this tiny ensures no render blocking and no vendor lock-in.
  try {
    (window as any).__cc_events__ = (window as any).__cc_events__ || [];
    (window as any).__cc_events__.push({ name, payload, ts: Date.now() });

    const gtag = (window as any).gtag as undefined | ((...args: any[]) => void);
    if (typeof gtag === "function") {
      gtag("event", name, payload ?? {});
    }
  } catch {
    // ignore
  }
}
