import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { FinalGradeCalculator } from "@/components/calculators/education/final-grade-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Estimate your final grade using your current grade, final exam score, and exam weight. Free final grade calculator with formula and examples.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Final Grade Calculator",
  description: pageDescription,
  path: "/final-grade-calculator",
  titleOverride: "Final Grade Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "How do I calculate my final grade?",
    answer:
      "Multiply your current grade by (1 - exam weight), multiply your final exam grade by the exam weight, then add the two results together."
  },
  {
    question: "What does final exam weight mean?",
    answer:
      "It’s the percent of your overall course grade that comes from the final exam (for example, 30%)."
  },
  {
    question: "Does this calculator work if my final is a project or presentation?",
    answer:
      "Yes. Any remaining assessment with a known weight works the same way as a final exam in the formula."
  },
  {
    question: "What if my course uses multiple weighted categories?",
    answer:
      "This tool is best for a single final exam weight. If your course uses categories, convert your current standing into a single current grade first."
  },
  {
    question: "What if my teacher drops the lowest quiz or has extra credit?",
    answer:
      "Dropped scores and extra credit can change your current grade and the effective weight. Use the grade shown in your gradebook as your current grade and treat extra credit as a bonus that may lower the score you need."
  },
  {
    question: "Why does a small final exam weight change my grade less?",
    answer:
      "Because most of your grade is already locked in. If the final is worth 10%, even a big swing on the final only affects 10% of the overall average."
  },
  {
    question: "Why does my grade change a lot when the final is worth 40–50%?",
    answer:
      "High-weight finals have more leverage. When the final is worth half the grade, your final exam score can move the overall grade dramatically."
  },
  {
    question: "What if the calculator shows a final grade with decimals?",
    answer:
      "Many gradebooks keep decimals internally and round at the end. Teachers can round differently, so use the result as an estimate and check your syllabus for rounding rules."
  },
  {
    question: "Can I calculate what score I need on the final to reach a target grade?",
    answer:
      "Yes. Use the Grade Needed To Pass calculator for the reverse problem (solve for the needed score)."
  },
  {
    question: "Is this exact for my class?",
    answer:
      "It matches the standard weighted-grade method, but some teachers round differently. Use it as a helpful estimate."
  },
  {
    question: "How should I use this for planning?",
    answer:
      "Try a few realistic final exam scores (for example 70%, 80%, 90%) to see the range of possible final grades. Then focus your study plan on the score band that hits your goal."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Final Grade Calculator",
    description: pageDescription,
    path: "/final-grade-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Final Grade Calculator", path: "/final-grade-calculator" }
  ]);

  return (
    <>
      <Script id="final-grade-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="final-grade-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="final-grade-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Education Calculator"
        title="Final Grade Calculator"
        calculator={<FinalGradeCalculator />}
        description={
          <div className="space-y-3">
            <p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>
          </div>
        }
        actions={<ShareButtons title="Final Grade Calculator" urlPath="/final-grade-calculator" shareText="Try this final grade calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                A final grade calculator answers a simple question: how does one remaining assessment change your overall course grade? The key idea is
                weighting. If your final exam is worth 30% of the class, then 30% of your final grade comes from that exam and 70% comes from everything
                you’ve already completed.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your current grade in the class.</li>
                <li>Enter your expected final exam score.</li>
                <li>Enter how much the final exam is worth.</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                As you adjust the inputs above, the result updates immediately. That makes it useful for "what-if" planning: you can test a conservative
                score, a realistic score, and a stretch goal to see how much each scenario changes your final outcome.
              </p>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Final Grade = Current Grade × (1 − Weight) + Final Exam Grade × Weight
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  <strong>Weight</strong> should be entered as a percent in your class rules (for example, 30% for a final worth 30%). The calculator
                  converts that to a decimal internally.
                </p>
                <p>
                  This formula assumes your <strong>current grade</strong> already represents everything completed so far. If your gradebook has multiple
                  categories, use your current overall percentage from the gradebook—not just one category.
                </p>
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Current 88%, final exam 84%, weight 30% → 88×0.70 + 84×0.30 = 86.8%
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Interpretation: even though the final exam score (84%) is lower than the current grade (88%), it only counts for 30% of the total. The
                  overall grade ends up closer to 88% than 84%.
                </p>
                <p>
                  If you change the weight to 50%, the same exam score would pull your final grade down more—because the final has more leverage.
                </p>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  The result shown above is your estimated <strong>overall course percentage</strong> after the final exam (or remaining assessment) is
                  applied. Use it to answer practical questions like:
                </p>
                <ol className="list-decimal space-y-2 pl-5">
                  <li>Will my final grade stay above the cutoff I need (passing, scholarship, sports eligibility)?</li>
                  <li>How much does improving my final exam score actually move the overall grade?</li>
                  <li>Is my best strategy to focus on the final exam or to raise the current grade before the final?</li>
                </ol>
                <p>
                  If you’re close to a letter-grade boundary, remember that different teachers and gradebooks round differently. Treat the result as a
                  planning estimate and confirm rounding policy in your syllabus.
                </p>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>
                  Entering the exam weight incorrectly (for example typing 0.3 when the field expects 30%).
                </li>
                <li>
                  Using a category grade instead of the overall current grade (example: homework average instead of your overall percentage).
                </li>
                <li>
                  Forgetting that extra credit and dropped scores can change the effective current grade and the result.
                </li>
                <li>
                  Assuming the number will match your teacher exactly even when the teacher rounds at different steps.
                </li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Quick comparison: low vs high final weight</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Final weight</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">What it means</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Planning takeaway</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">10–20%</td>
                      <td className="py-3 pr-4">Most of your grade is already locked in.</td>
                      <td className="py-3 pr-4">Small improvements on the final move the overall grade a little.</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">40–50%</td>
                      <td className="py-3 pr-4">The final has major leverage.</td>
                      <td className="py-3 pr-4">Your final exam score can dramatically change the course grade.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            <FAQSection items={faqItems} />
            <RelatedCalculators slug="final-grade-calculator" />
          </>
        }
      />
    </>
  );
}
