import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { ClassAverageCalculator } from "@/components/calculators/education/class-average-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Calculate the average of your class scores fast. Paste scores and instantly get the mean. Free class average calculator with examples.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Class Average Calculator",
  description: pageDescription,
  path: "/class-average-calculator",
  titleOverride: "Class Average Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "How do I calculate class average?",
    answer:
      "Add all scores together and divide by the number of scores. This calculator does it instantly from your list."
  },
  {
    question: "Can I paste scores from a spreadsheet?",
    answer: "Yes. Use commas or new lines between scores."
  },
  {
    question: "Does it ignore invalid values?",
    answer: "Yes. Non-numeric items are ignored so your average stays clean."
  },
  {
    question: "Is average the same as weighted average?",
    answer:
      "No. This calculator computes a simple mean. If different assignments have different weights, use a weighted-grade tool instead."
  },
  {
    question: "How many scores can I enter?",
    answer: "As many as you want. Keep it readable and comma-separated for best results."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Class Average Calculator",
    description: pageDescription,
    path: "/class-average-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Class Average Calculator", path: "/class-average-calculator" }
  ]);

  return (
    <>
      <Script id="class-average-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="class-average-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="class-average-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Education Calculator"
        title="Class Average Calculator"
        calculator={<ClassAverageCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Class Average Calculator" urlPath="/class-average-calculator" shareText="Try this class average calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Paste your scores (comma-separated or one per line).</li>
                <li>The calculator sums them and divides by the count.</li>
                <li>You get the class average instantly.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Average = (Score1 + Score2 + … + ScoreN) / N
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Scores 90, 84, 77, 95 → (90+84+77+95)/4 = 86.5%
              </div>
            </article>
            <FAQSection items={faqItems} />
            <RelatedCalculators slug="class-average-calculator" />
          </>
        }
      />
    </>
  );
}
