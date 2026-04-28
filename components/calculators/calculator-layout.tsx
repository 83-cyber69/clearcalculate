import type { ReactNode } from "react";
import { CalculatorHero } from "@/components/shared/calculator-hero";
import { CalculatorPageShell } from "@/components/shared/calculator-page-shell";

type CalculatorLayoutProps = {
  eyebrow: string;
  title: string;
  calculator: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  seoContent: ReactNode;
};

export function CalculatorLayout({ eyebrow, title, calculator, description, actions, seoContent }: CalculatorLayoutProps) {
  return (
    <CalculatorPageShell
      hero={<CalculatorHero eyebrow={eyebrow} title={title} />}
      calculator={calculator}
      quickInfo={description}
      quickActions={actions}
      seoContent={seoContent}
    />
  );
}
