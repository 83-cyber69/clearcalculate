import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorHero } from "@/components/shared/calculator-hero";
import { CalculatorPageShell } from "@/components/shared/calculator-page-shell";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { TakeHomePayCalculator } from "@/components/finance/take-home-pay-calculator";
import { ShareButtons } from "@/components/shared/share-buttons";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Estimate salary take-home pay after taxes, retirement, and health deductions. Free online paycheck calculator with clear formulas, FAQ, and quick results.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Take Home Pay Calculator",
  description: pageDescription,
  path: "/take-home-pay-calculator",
  titleOverride: "Take Home Pay Calculator (Net Pay) | ClearCalculate"
});

const faqItems = [
  {
    question: "What is take-home pay?",
    answer:
      "Take-home pay is the amount you receive after payroll taxes and deductions are removed from gross salary."
  },
  {
    question: "Why is net pay different from gross salary?",
    answer:
      "Federal and state taxes, Social Security, Medicare, retirement contributions, and insurance premiums all reduce the final amount you keep."
  },
  {
    question: "Does state affect paycheck size?",
    answer:
      "Yes. Some states apply income tax while others have no state income tax, which changes your yearly and monthly net pay."
  },
  {
    question: "Does retirement reduce taxable income?",
    answer:
      "Often, yes. Many retirement contributions (like a traditional 401(k)) reduce taxable income, which can lower federal and state taxes."
  },
  {
    question: "What is FICA?",
    answer:
      "FICA is payroll tax for Social Security and Medicare. Many employees pay a combined 7.65% on wages up to certain limits."
  },
  {
    question: "Is this exact tax software?",
    answer:
      "This calculator provides estimates for planning. Final tax withholding can vary by deductions, local taxes, and payroll setup."
  },
  {
    question: "How do I estimate take-home pay from an hourly wage?",
    answer:
      "Convert hourly pay to annual pay (hourly rate x hours per week x 52), then use the annual salary in the calculator for an estimate."
  }
];

export default function TakeHomePayPage() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Take Home Pay Calculator",
    description: pageDescription,
    path: "/take-home-pay-calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Finance", path: "/finance" },
    { name: "Take Home Pay Calculator", path: "/take-home-pay-calculator" }
  ]);

  return (
    <CalculatorPageShell
      hero={<CalculatorHero eyebrow="Finance Calculator" title="Take Home Pay Calculator" />}
      calculator={
        <>
          <Script id="take-home-webapplication-schema" type="application/ld+json">
            {JSON.stringify(webApplicationJsonLd)}
          </Script>
          <Script id="take-home-faq-schema" type="application/ld+json">
            {JSON.stringify(createFaqJsonLd(faqItems))}
          </Script>
          <Script id="take-home-breadcrumb-schema" type="application/ld+json">
            {JSON.stringify(breadcrumbJsonLd)}
          </Script>
          <TakeHomePayCalculator />
        </>
      }
      quickInfo={
        <div className="space-y-3">
          <p className="text-sm leading-7 text-slate-700 sm:text-base">
            Estimate your net pay (take-home) after taxes, retirement, and monthly insurance costs.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Fast</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Free</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Accurate</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Mobile Friendly</span>
          </div>
        </div>
      }
      quickActions={
        <ShareButtons
          title="Take Home Pay Calculator"
          urlPath="/take-home-pay-calculator"
          shareText="Try this take-home pay calculator:"
        />
      }
      seoContent={
        <>
          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">How this calculator works</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
              Take-home pay is your net income after payroll taxes and deductions. This calculator estimates yearly, monthly, and per-paycheck take-home.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
              <li>Enter your annual salary (or convert from hourly wages).</li>
              <li>Select your state and filing status for estimated tax rates.</li>
              <li>Add deductions like retirement % and monthly health insurance.</li>
            </ol>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">Formula</h2>
            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                <strong>Yearly Take-Home</strong> = Gross Salary - (Federal Taxes + State Taxes + FICA + Retirement + Insurance)
              </p>
              <p className="mt-3 text-sm text-slate-700">
                <strong>Monthly Take-Home</strong> = Yearly Take-Home / 12
              </p>
              <div className="mt-4 space-y-1 text-sm text-slate-700">
                <p>
                  <strong>Gross Salary:</strong> your annual pay before taxes and deductions
                </p>
                <p>
                  <strong>FICA:</strong> Social Security + Medicare payroll taxes
                </p>
                <p>
                  <strong>Retirement:</strong> estimated yearly contribution based on your %
                </p>
                <p>
                  <strong>Insurance:</strong> monthly insurance cost x 12
                </p>
              </div>
            </div>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">Example calculation</h2>
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
              <p>
                <strong>Example:</strong> $80,000 salary, 6% retirement, $220/month insurance
              </p>
              <p className="mt-3">
                <strong>Retirement:</strong> 80,000 x 0.06 = $4,800
              </p>
              <p className="mt-3">
                <strong>Insurance:</strong> 220 x 12 = $2,640
              </p>
              <p className="mt-3">
                <strong>Net (estimate):</strong> Salary - taxes - deductions = yearly take-home (then divide by 12 for monthly)
              </p>
            </div>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">What is take-home pay</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
              Take-home pay is your net income after required taxes and elected deductions. It helps you budget based on real cash flow—not just gross salary.
            </p>
          </article>

          <article>
            <h2 className="mb-5 section-title">FAQ</h2>
            <FAQAccordion items={faqItems} />
          </article>

          <article>
            <h2 className="mb-5 section-title">Related Calculators</h2>
            <RelatedCalculators slug="take-home-pay-calculator" />
          </article>

          <article>
            <p className="text-sm text-slate-500">
              Educational estimates only. Results may vary depending on tax rules, deductions, and payroll settings.
            </p>
          </article>
        </>
      }
    />
  );
}
