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
  },
  {
    question: "What’s the difference between mean and median?",
    answer:
      "The mean is the arithmetic average. The median is the middle score after sorting. Median is less affected by one very high or very low score."
  },
  {
    question: "Should I drop the lowest score before averaging?",
    answer:
      "Only if your class rules say the lowest score is dropped. Otherwise, include all scores to match the true average."
  },
  {
    question: "Can I use this for points instead of percentages?",
    answer:
      "Yes, but be careful: if items have different maximum points, averaging raw points can mislead. For mixed point totals, convert each item to a percentage first."
  },
  {
    question: "Why does my class average look higher/lower than the gradebook average?",
    answer:
      "Gradebooks may weight categories, drop scores, or round differently. This tool uses a simple mean of the values you enter."
  },
  {
    question: "Does this calculate a weighted average?",
    answer:
      "No. It calculates a simple mean. If weights matter, use a weighted grade calculator and enter both scores and weights."
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
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                A class average is the simplest way to summarize a set of scores. It answers: if you spread the total points evenly across everyone (or
                across all assignments), what would the typical score be? In math terms, the class average is the <strong>mean</strong>—the sum of all
                values divided by how many values there are.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Paste your scores (comma-separated or one per line).</li>
                <li>The calculator sums them and divides by the count.</li>
                <li>You get the class average instantly.</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                This is a great fit when every item is comparable (for example: a list of quiz percentages). If your assignments have different point
                totals, or your class uses weighted categories, you’ll want a weighted average instead.
              </p>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Average = (Score1 + Score2 + … + ScoreN) / N
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  <strong>N</strong> is the number of valid scores you entered. If you paste text or blanks, they’re ignored so they don’t distort the
                  average.
                </p>
                <p>
                  If you need a weighted average, the formula changes: you multiply each score by its weight, sum those results, then divide by the total
                  weight.
                </p>
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Scores 90, 84, 77, 95 → (90+84+77+95)/4 = 86.5%
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Interpretation: 86.5% is the mean of these four scores. One low score (77) pulls the average down, and one high score (95) pulls it up.
                </p>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Use the class average as a quick benchmark:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    If your score is <strong>above the average</strong>, you’re performing better than the typical score in the set you entered.
                  </li>
                  <li>
                    If your score is <strong>below the average</strong>, it may signal a topic to review—or it may simply reflect one difficult test.
                  </li>
                </ul>
                <p>
                  Remember: a mean can be distorted by outliers. If one student scored 0% because they were absent, the average may look lower than the
                  “typical” performance.
                </p>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Mixing points and percentages in the same list (example: 18/20 points alongside 90%).</li>
                <li>Forgetting to convert different point totals into percentages before averaging.</li>
                <li>Assuming the class average equals the curve (curving is a separate grading policy).</li>
                <li>Using a simple mean when assignments are weighted or categories matter.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Comparison table</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Method</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Best for</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Key limitation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Mean (average)</td>
                      <td className="py-3 pr-4">Quick benchmark for comparable scores (all quizzes as %)</td>
                      <td className="py-3 pr-4">Sensitive to outliers</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Median</td>
                      <td className="py-3 pr-4">“Typical” score when there are extreme highs/lows</td>
                      <td className="py-3 pr-4">Doesn’t reflect total points performance</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Weighted average</td>
                      <td className="py-3 pr-4">Assignments with different point totals or weights</td>
                      <td className="py-3 pr-4">Requires accurate weights/points</td>
                    </tr>
                  </tbody>
                </table>
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
