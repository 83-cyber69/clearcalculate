import type { ReactNode } from "react";
import Link from "next/link";
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
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[280px_1fr] xl:items-start">
          <aside className="order-2 space-y-6 xl:order-1 xl:sticky xl:top-24">
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

          <div className="order-1 min-w-0 space-y-10 xl:order-2">
            <div id="calculator" className="space-y-6 scroll-mt-24">
              {calculator}
              <AdSlot variant="calculator-bottom" />
              <EmailCaptureCard />
            </div>

            <div className="space-y-10">
              <AdSlot variant="in-content" />
              <div className="glass-card p-6 sm:p-8">
                <h2 className="section-title">Recommended next steps</h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                  <p>
                    After you get your result, compare a few scenarios or explore related tools.
                  </p>
                  <div className="grid gap-2">
                    <Link href="/calculators" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Browse all calculators
                    </Link>
                    <Link href="/health" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Health calculators
                    </Link>
                    <Link href="/finance" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Finance calculators
                    </Link>
                    <Link href="/education" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Education calculators
                    </Link>
                  </div>
                </div>
              </div>
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
