import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { RetirementCalculator } from "@/components/calculators/finance/retirement-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Project retirement savings based on contributions and returns. Free retirement calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Retirement Calculator",
  description: pageDescription,
  path: "/retirement-calculator",
  titleOverride: "Retirement Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "How does retirement growth work?",
    answer:
      "Savings can grow from contributions and investment returns over time. Compounding is powerful over decades."
  },
  {
    question: "What return rate should I use?",
    answer:
      "Many people use 5–8% as a long-term estimate, but returns vary and are not guaranteed."
  },
  {
    question: "What is the 4% rule?",
    answer:
      "A common guideline that suggests withdrawing about 4% of your portfolio per year in retirement."
  },
  {
    question: "Does this include Social Security?",
    answer: "No. This focuses on your savings and contributions."
  },
  {
    question: "Is this financial advice?",
    answer: "No. It’s a simple estimate to help planning."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Retirement Calculator",
    description: pageDescription,
    path: "/retirement-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Finance", path: "/finance" },
    { name: "Retirement Calculator", path: "/retirement-calculator" }
  ]);

  return (
    <>
      <Script id="retirement-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="retirement-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="retirement-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Finance Calculator"
        title="Retirement Calculator"
        calculator={<RetirementCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Retirement Calculator" urlPath="/retirement-calculator" shareText="Try this retirement calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter current savings and monthly contribution.</li>
                <li>Enter an estimated annual return and time horizon.</li>
                <li>The calculator projects a future balance.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                $25,000 + $500/month at 7% for 25 years → projected balance estimate
              </div>
            </article>
            <FAQSection items={faqItems} />
            <RelatedCalculators slug="retirement-calculator" />
          </>
        }
      />
    </>
  );
}
