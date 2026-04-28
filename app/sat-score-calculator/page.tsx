import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { SatScoreCalculator } from "@/components/calculators/education/sat-score-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Estimate your total SAT score from Math and Reading & Writing section scores. Free SAT score calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "SAT Score Calculator",
  description: pageDescription,
  path: "/sat-score-calculator",
  titleOverride: "SAT Score Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "How is the SAT total score calculated?",
    answer: "Total score is Math (200–800) + Reading & Writing (200–800)."
  },
  {
    question: "What is a good SAT score?",
    answer: "It depends on your target schools. Many competitive programs look for 1200+ or higher."
  },
  {
    question: "Does this include the essay?",
    answer: "No. The SAT essay is separate (and often not required)."
  },
  {
    question: "Is this an official score conversion?",
    answer: "No. This calculator adds section scores you already have. Official conversions depend on raw-to-scale tables."
  },
  {
    question: "Can I compare SAT and ACT scores?",
    answer: "You can compare using concordance tables, but they are estimates."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "SAT Score Calculator",
    description: pageDescription,
    path: "/sat-score-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "SAT Score Calculator", path: "/sat-score-calculator" }
  ]);

  return (
    <>
      <Script id="sat-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="sat-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="sat-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Education Calculator"
        title="SAT Score Calculator"
        calculator={<SatScoreCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="SAT Score Calculator" urlPath="/sat-score-calculator" shareText="Try this SAT score calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your Math section score.</li>
                <li>Enter your Reading & Writing section score.</li>
                <li>The calculator adds them to get your total.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Total SAT = Math + Reading & Writing
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                650 Math + 610 R&W → 1260 total
              </div>
            </article>
            <FAQSection items={faqItems} />
            <RelatedCalculators slug="sat-score-calculator" />
          </>
        }
      />
    </>
  );
}
