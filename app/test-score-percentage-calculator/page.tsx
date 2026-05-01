import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { TestScorePercentageCalculator } from "@/components/calculators/education/test-score-percentage-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Convert correct answers into a test score percentage. Free test score percentage calculator with examples and quick FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Test Score Percentage Calculator",
  description: pageDescription,
  path: "/test-score-percentage-calculator",
  titleOverride: "Test Score Percentage Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "How do I calculate my test percentage?",
    answer: "Divide correct answers by total questions, then multiply by 100."
  },
  {
    question: "What if I got partial credit?",
    answer:
      "If you have partial points, use total points earned and total points possible instead of questions."
  },
  {
    question: "How do I find how many I missed?",
    answer: "Missed = Total − Correct."
  },
  {
    question: "Is 42 out of 50 good?",
    answer: "42/50 is 84%. Whether that’s good depends on your grading scale."
  },
  {
    question: "Does this work for quizzes?",
    answer: "Yes. Any correct/total format works."
  },
  {
    question: "How do I calculate percentage from points instead of questions?",
    answer: "Use (Points Earned / Points Possible) × 100. This is the right method when questions have different point values."
  },
  {
    question: "Why is my percentage different from the gradebook?",
    answer:
      "Some gradebooks drop questions, apply weights, or include extra credit. This tool calculates a straightforward percentage from the numbers you enter."
  },
  {
    question: "What if total questions is 0?",
    answer: "A percentage isn’t defined when the total is 0. Enter at least 1 total question."
  },
  {
    question: "How many can I miss to still get a 90%?",
    answer:
      "Rearrange the formula: Correct Needed = 0.90 × Total. Then Missed Allowed = Total − Correct Needed (round based on your teacher’s rules)."
  },
  {
    question: "Is percentage the same as a letter grade?",
    answer:
      "Not always. Schools and teachers set different cutoffs (for example, an A might be 90%+ or 93%+)."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Test Score Percentage Calculator",
    description: pageDescription,
    path: "/test-score-percentage-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Test Score Percentage Calculator", path: "/test-score-percentage-calculator" }
  ]);

  return (
    <>
      <Script id="test-score-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="test-score-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="test-score-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Education Calculator"
        title="Test Score Percentage Calculator"
        calculator={<TestScorePercentageCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Test Score Percentage Calculator" urlPath="/test-score-percentage-calculator" shareText="Try this test score percentage calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                A test score percentage converts “how many you got right” into a standardized score out of 100. It’s useful because it lets you compare
                different tests fairly—regardless of whether the quiz had 10 questions or 50 questions.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter correct answers.</li>
                <li>Enter total questions.</li>
                <li>The calculator converts it to a percentage.</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                If your class uses <strong>points</strong> (where questions can be worth different values), use points earned / points possible instead of
                correct / total questions.
              </p>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Percentage = (Correct / Total) × 100
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  If you’re using points, the same structure applies:
                </p>
                <p className="rounded-xl bg-slate-50 p-4">
                  <strong>Percentage</strong> = (Points Earned / Points Possible) × 100
                </p>
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                42 correct out of 50 total → 42/50 = 84%
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Interpretation: an 84% is commonly a B-range score in many grading scales, but your exact letter grade depends on your teacher’s cutoffs
                  and any curve.
                </p>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Your percentage is a normalized score. To make it actionable, connect it to your course rules:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Compare it to your <strong>letter grade cutoffs</strong> (example: 90%+ = A).
                  </li>
                  <li>
                    If your class has a <strong>curve</strong>, your percentile rank or standard deviation may matter more than raw percentage.
                  </li>
                  <li>
                    If the test is points-based, make sure your inputs reflect points—not just question count.
                  </li>
                </ul>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Using correct/total questions when questions have different point values.</li>
                <li>Forgetting to include bonus points or extra credit (if your teacher counts them).</li>
                <li>Rounding too early (wait until the end unless your rubric says otherwise).</li>
                <li>Assuming percentage equals letter grade without checking your class cutoffs.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Comparison table</h2>
              <div className="mt-4 w-full max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Scoring system</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">What to enter</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">All questions equal</td>
                      <td className="py-3 pr-4">Correct / Total questions</td>
                      <td className="py-3 pr-4">Each question contributes the same amount</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Points-based test</td>
                      <td className="py-3 pr-4">Points earned / Points possible</td>
                      <td className="py-3 pr-4">Questions may be worth different points</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Weighted categories</td>
                      <td className="py-3 pr-4">Use a weighted grade tool</td>
                      <td className="py-3 pr-4">The test may be only part of your overall course grade</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            <FAQSection items={faqItems} />
            <RelatedCalculators slug="test-score-percentage-calculator" />
          </>
        }
      />
    </>
  );
}
