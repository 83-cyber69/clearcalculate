import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { SalaryAfterTaxesCalculator } from "@/components/calculators/finance/salary-after-taxes-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Estimate salary after taxes using an effective tax rate. Free salary after taxes calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Salary After Taxes Calculator",
  description: pageDescription,
  path: "/salary-after-taxes-calculator",
  titleOverride: "Salary After Taxes Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "What is an effective tax rate?",
    answer:
      "It’s the average percent of your income you pay in taxes after deductions and credits—not your top bracket."
  },
  {
    question: "How do I estimate my effective tax rate?",
    answer:
      "You can use last year’s total tax divided by total income as a starting estimate, then adjust if your income changes."
  },
  {
    question: "Does this include payroll taxes?",
    answer:
      "Only if you include them in the effective tax rate you enter. For a detailed breakdown, use the Take Home Pay Calculator."
  },
  {
    question: "Is this exact?",
    answer:
      "No. It’s a fast estimate for planning. Real taxes depend on filing status, deductions, and state rules."
  },
  {
    question: "What’s a typical effective tax rate?",
    answer:
      "It varies by income and location, but many people fall between 15% and 30% when combining federal, state, and payroll taxes."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Salary After Taxes Calculator",
    description: pageDescription,
    path: "/salary-after-taxes-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Finance", path: "/finance" },
    { name: "Salary After Taxes Calculator", path: "/salary-after-taxes-calculator" }
  ]);

  return (
    <>
      <Script id="salary-after-taxes-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="salary-after-taxes-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="salary-after-taxes-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Finance Calculator"
        title="Salary After Taxes Calculator"
        calculator={<SalaryAfterTaxesCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Salary After Taxes Calculator" urlPath="/salary-after-taxes-calculator" shareText="Try this salary after taxes calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your gross salary.</li>
                <li>Enter an estimated effective tax rate.</li>
                <li>The calculator estimates taxes and net salary.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Net Salary = Gross Salary × (1 − Tax Rate)
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                $85,000 with 25% effective tax → net ≈ $63,750
              </div>
            </article>
            <FAQSection items={faqItems} />
            <RelatedCalculators slug="salary-after-taxes-calculator" />
          </>
        }
      />
    </>
  );
}
