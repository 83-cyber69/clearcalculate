import type { ReactNode } from "react";
import { AdSlot } from "@/components/ads/AdSlot";
import { EmailCaptureCard } from "@/components/monetization/EmailCaptureCard";

type CalculatorPageShellProps = {
  hero: ReactNode;
  calculator: ReactNode;
  quickInfo?: ReactNode;
  quickActions?: ReactNode;
  seoContent?: ReactNode;
  sidebar?: ReactNode;
};

export function CalculatorPageShell({
  hero,
  calculator,
  quickInfo,
  quickActions,
  seoContent,
  sidebar
}: CalculatorPageShellProps) {
  return (
    <div className="container-max py-10 sm:py-14">
      <section className="hero-first-screen py-4 sm:py-6 md:py-8">
        <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
          <aside className="order-2 space-y-6 lg:order-1 lg:sticky lg:top-24">
            <div className="space-y-5">
              {hero}
              {quickInfo}
              {quickActions ? <div className="pt-1">{quickActions}</div> : null}
            </div>

            <div className="glass-card p-5">
              <p className="text-sm font-semibold text-slate-900">Quick tip</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Double-check your inputs and units before saving or sharing results.
              </p>
            </div>

            {sidebar}
          </aside>

          <div className="order-1 space-y-10 lg:order-2">
            <div id="calculator" className="space-y-6 scroll-mt-24">
              {calculator}
              <AdSlot variant="calculator-bottom" />
              <EmailCaptureCard />
            </div>

            <div className="space-y-10">
              <AdSlot variant="in-content" />
              {seoContent}
              <AdSlot variant="in-content" />
            </div>
          </div>
        </div>
      </section>

      <AdSlot variant="sticky-mobile-footer" />
    </div>
  );
}
