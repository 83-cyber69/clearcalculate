import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { ActScoreCalculator } from "@/components/calculators/education/act-score-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Estimate ACT composite score from section scores. Free ACT score calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "ACT Score Calculator",
  description: pageDescription,
  path: "/act-score-calculator",
  titleOverride: "ACT Score Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "How is ACT composite score calculated?",
    answer: "It’s the average of your four section scores, rounded to the nearest whole number."
  },
  {
    question: "What are the ACT sections?",
    answer: "English, Math, Reading, and Science."
  },
  {
    question: "Is the writing score included?",
    answer: "No. ACT Writing is reported separately and does not affect the composite."
  },
  {
    question: "What’s a good ACT score?",
    answer: "It depends on your target schools. Many students aim for 24+ for competitive programs."
  },
  {
    question: "Does this match official scoring?",
    answer: "It matches the standard composite rule, but official scaling depends on raw-to-scale conversions."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "ACT Score Calculator",
    description: pageDescription,
    path: "/act-score-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "ACT Score Calculator", path: "/act-score-calculator" }
  ]);

  return (
    <>
      <Script id="act-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="act-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="act-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Education Calculator"
        title="ACT Score Calculator"
        calculator={<ActScoreCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="ACT Score Calculator" urlPath="/act-score-calculator" shareText="Try this ACT score calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your four section scores (1–36).</li>
                <li>The calculator averages them.</li>
                <li>It rounds to the nearest whole number for the composite.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Composite = round((English + Math + Reading + Science) / 4)
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                24, 26, 23, 25 → average 24.5 → composite 25
              </div>
            </article>
            <FAQSection items={faqItems} />
            <RelatedCalculators slug="act-score-calculator" />
          </>
        }
      />
    </>
  );
}
