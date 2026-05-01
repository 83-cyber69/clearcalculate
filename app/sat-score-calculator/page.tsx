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
  },
  {
    question: "What are the SAT section score ranges?",
    answer: "Each section is 200–800, so the total ranges from 400–1600."
  },
  {
    question: "Does one section matter more than the other?",
    answer:
      "Not for the total score—each section contributes up to 800 points. But some programs weigh Math vs Reading & Writing differently when reviewing applications."
  },
  {
    question: "Is this the same as my percentile?",
    answer:
      "No. Percentiles depend on how other test takers scored. This calculator only computes the total from your section scores."
  },
  {
    question: "Can I use practice test scores?",
    answer:
      "Yes. If your practice test provides section scores on the 200–800 scale, you can estimate your total and track progress."
  },
  {
    question: "What if my score report includes subscores?",
    answer:
      "Subscores can help you decide what to study, but they don’t add directly into the total. Use the main section scores for the total."
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
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                The SAT total score is straightforward once you already have your two section scores. SAT scoring is split into:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li><strong>Math</strong> (200–800)</li>
                <li><strong>Reading & Writing</strong> (200–800)</li>
              </ul>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Your total SAT score is simply the sum of those two numbers. This calculator is useful for quick checking, planning goals, and comparing
                “what-if” improvements between sections.
              </p>
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
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Because each section is capped at 800, the total ranges from <strong>400</strong> to <strong>1600</strong>.
                </p>
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                650 Math + 610 R&W → 1260 total
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  The total score is what most people quote, but your section split is often what drives study strategy.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>If one section is much lower, improvement there may be the fastest way to raise your total.</li>
                  <li>If both sections are similar, you can choose the section that feels easier to gain points in.</li>
                </ul>
                <p>
                  Colleges also care about fit. Some programs are more sensitive to Math strength; others prioritize Reading & Writing.
                </p>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Adding subscores instead of the main section scores.</li>
                <li>Mixing raw scores (# correct) with scaled scores (200–800).</li>
                <li>Assuming the total score automatically translates to a percentile (it depends on the year’s distribution).</li>
                <li>Ignoring section balance when picking what to study next.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Comparison table</h2>
              <div className="mt-4 w-full max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Metric</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">What it measures</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Use it for</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Section score (200–800)</td>
                      <td className="py-3 pr-4">Scaled performance in a single section</td>
                      <td className="py-3 pr-4">Study focus and strengths</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Total score (400–1600)</td>
                      <td className="py-3 pr-4">Sum of Math + Reading & Writing</td>
                      <td className="py-3 pr-4">Goal setting and comparisons</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Percentile</td>
                      <td className="py-3 pr-4">How you compare to other test takers</td>
                      <td className="py-3 pr-4">Context, not calculation</td>
                    </tr>
                  </tbody>
                </table>
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
