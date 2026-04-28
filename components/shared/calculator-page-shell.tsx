import type { ReactNode } from "react";

type CalculatorPageShellProps = {
  hero: ReactNode;
  calculator: ReactNode;
  quickInfo?: ReactNode;
  quickActions?: ReactNode;
  seoContent?: ReactNode;
};

export function CalculatorPageShell({
  hero,
  calculator,
  quickInfo,
  quickActions,
  seoContent
}: CalculatorPageShellProps) {
  return (
    <div className="container-max py-12 sm:py-16">
      <section className="container-max hero-first-screen py-4 sm:py-6 md:py-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-5">
            {hero}
            {quickInfo}
            {quickActions ? <div className="pt-1">{quickActions}</div> : null}
          </div>
          <div className="space-y-6">{calculator}</div>
        </div>
      </section>
      <section className="mt-16 space-y-10">{seoContent}</section>
    </div>
  );
}
