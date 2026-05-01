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
  },
  {
    question: "Does rounding ever change my composite?",
    answer:
      "Yes. ACT composites are rounded to the nearest whole number. For example, an average of 24.50 rounds to 25, while 24.49 rounds to 24."
  },
  {
    question: "Can I improve my composite by improving one section?",
    answer:
      "Often, yes. Because the composite is the average of four sections, a small increase in one section can push the average over a rounding boundary."
  },
  {
    question: "Do section scores have to be between 1 and 36?",
    answer: "Yes. Official section scores are reported on a 1–36 scale."
  },
  {
    question: "Is the composite the same as my percentile?",
    answer:
      "No. Percentiles depend on national distributions. The composite is just the rounded average of your four section scores."
  },
  {
    question: "Is this calculator useful before I have an official score report?",
    answer:
      "Yes. If you have practice-test section scores, you can estimate your composite and track improvement over time."
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
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                The ACT composite score is designed to summarize your performance across four sections: English, Math, Reading, and Science. Each section is
                scored on a 1–36 scale. Your <strong>composite</strong> is the arithmetic average of those four section scores, rounded to the nearest
                whole number.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your four section scores (1–36).</li>
                <li>The calculator averages them.</li>
                <li>It rounds to the nearest whole number for the composite.</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                This is most useful for planning because it shows how close you are to a rounding boundary. If your average is 24.49, you’re a fraction
                away from rounding to a 24, but if you can push the average to 24.50, it rounds to 25.
              </p>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Composite = round((English + Math + Reading + Science) / 4)
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  The only “trick” is rounding. ACT rounds to the nearest whole number.
                </p>
                <p>
                  Example rule of thumb: if the average ends in <strong>.50</strong> or higher, the composite rounds up.
                </p>
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                24, 26, 23, 25 → average 24.5 → composite 25
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Your composite is a summary score, but your section scores still matter. Many colleges look at the overall composite while also checking
                  section strengths (for example, a strong Math score for STEM programs).
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    If your <strong>average is close to a rounding boundary</strong>, small improvements can change the composite.
                  </li>
                  <li>
                    If one section is much lower than the others, improving that section can increase the average efficiently.
                  </li>
                </ul>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Including the writing score in the composite (it’s separate).</li>
                <li>Using raw scores instead of scaled section scores (practice tests may convert differently).</li>
                <li>Forgetting that rounding can change the composite even when section scores are the same.</li>
                <li>Focusing only on the composite and ignoring a weak section that’s pulling the average down.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Comparison table</h2>
              <div className="mt-4 w-full max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Score type</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">What it is</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Included in composite?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Section scores</td>
                      <td className="py-3 pr-4">English, Math, Reading, Science (1–36)</td>
                      <td className="py-3 pr-4">Yes</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Composite score</td>
                      <td className="py-3 pr-4">Rounded average of the four sections</td>
                      <td className="py-3 pr-4">N/A (it’s the result)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Writing score</td>
                      <td className="py-3 pr-4">Separate optional writing test score</td>
                      <td className="py-3 pr-4">No</td>
                    </tr>
                  </tbody>
                </table>
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
