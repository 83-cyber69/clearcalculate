import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { GradeNeededToPassCalculator } from "@/components/calculators/education/grade-needed-to-pass-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Find the grade you need on remaining work to reach a target grade. Free grade-needed-to-pass calculator with formula and examples.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Grade Needed To Pass Calculator",
  description: pageDescription,
  path: "/grade-needed-to-pass-calculator",
  titleOverride: "Grade Needed To Pass Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "How do I calculate what I need to pass?",
    answer:
      "Use the weighted grade formula: Target = Current×(1−Weight) + Needed×Weight. Solve for Needed."
  },
  {
    question: "What is remaining weight?",
    answer:
      "It’s the percent of your grade that is still not finalized (final exam, projects, remaining assignments)."
  },
  {
    question: "What if the needed score is above 100%?",
    answer:
      "That means it may be impossible to reach the target with the remaining weight unless extra credit is offered."
  },
  {
    question: "What if I already passed?",
    answer:
      "If your current grade is high enough, the calculator may show you need a low score on remaining work to stay above the target."
  },
  {
    question: "What if the needed score is negative?",
    answer:
      "A negative result means you’re already above the target even if you score very low on the remaining work. In practice, your lowest possible needed score is 0%."
  },
  {
    question: "Does this work for a final exam?",
    answer:
      "Yes. Set remaining weight to your final exam weight and the calculator will estimate the score you need on the final to hit your target course grade."
  },
  {
    question: "Does this work for multiple remaining assignments?",
    answer:
      "Yes, as long as you can express all remaining work as one combined remaining weight and you want a single average score across that remaining work."
  },
  {
    question: "What if my class uses weighted categories?",
    answer:
      "Use your overall current percentage from the gradebook as the current grade. Then set remaining weight based on what’s left that can still change your overall grade."
  },
  {
    question: "What if my teacher rounds or curves grades?",
    answer:
      "Rounding and curves can shift the true cutoff. Treat this as a planning estimate and check the syllabus for rounding rules or curve policies."
  },
  {
    question: "Is this exact for my teacher’s gradebook?",
    answer:
      "It follows standard weighting, but rounding and category rules vary. Use it as a planning estimate."
  },
  {
    question: "How should I use this result to plan my studying?",
    answer:
      "Use the needed score as a target, then translate it into practice-test goals. If the needed score is extremely high, focus on partial credit opportunities, retakes, or extra credit if available."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Grade Needed To Pass Calculator",
    description: pageDescription,
    path: "/grade-needed-to-pass-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Grade Needed To Pass Calculator", path: "/grade-needed-to-pass-calculator" }
  ]);

  return (
    <>
      <Script id="pass-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="pass-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="pass-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Education Calculator"
        title="Grade Needed To Pass Calculator"
        calculator={<GradeNeededToPassCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={
          <ShareButtons
            title="Grade Needed To Pass Calculator"
            urlPath="/grade-needed-to-pass-calculator"
            shareText="Try this grade-needed-to-pass calculator:"
          />
        }
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                This calculator solves the reverse of a final grade problem. Instead of asking “what will my grade be if I score X?”, it asks “what score
                do I need on the remaining work to finish with at least my target grade?” It’s especially useful when you have a high-weight final exam, a
                major project, or a last batch of assignments that can still move your overall grade.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your current grade.</li>
                <li>Enter how much of the grade is still remaining.</li>
                <li>Enter the target grade (example: 70% to pass).</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                The result updates as you change inputs. Try a few different remaining weights (or a few different targets) to understand how much
                leverage is left in the course.
              </p>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Needed = (Target − Current×(1−Weight)) / Weight
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  <strong>Current</strong> is your overall grade right now. <strong>Weight</strong> is the fraction of the total grade that is still not
                  finalized (for example 40% remaining = 0.40). <strong>Target</strong> is the final grade you want to end with.
                </p>
                <p>
                  If your needed score comes out above 100%, the target may be unrealistic without extra credit, a curve, or a grading policy change.
                </p>
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Current 82%, remaining weight 40%, target 70% → Needed ≈ 52%
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Interpretation: because your current grade (82%) is comfortably above the target (70%), you can score lower than 70% on the remaining
                  work and still finish above 70% overall.
                </p>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  The “needed” score is the <strong>average score</strong> you must earn across the remaining work to finish with your target overall
                  grade.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    If the needed score is <strong>0% to 60%</strong>, you likely have a cushion (but still avoid missing major assignments).
                  </li>
                  <li>
                    If the needed score is <strong>60% to 90%</strong>, you’re in a realistic “must perform” zone—plan study time and prioritize points.
                  </li>
                  <li>
                    If the needed score is <strong>90% to 100%+</strong>, the goal is tight. Look for partial credit, retakes, extra credit, or a lower
                    target threshold if your teacher allows it.
                  </li>
                </ul>
                <p>
                  If you have multiple remaining items (final exam + project + homework), the calculation assumes one average score across all remaining
                  items. Your real life plan can be more detailed: aim higher on your strength areas to offset weaker areas.
                </p>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Using a category grade (like homework average) instead of your overall current grade.</li>
                <li>Entering remaining weight incorrectly (typing 0.4 when the field expects 40%).</li>
                <li>Ignoring that extra credit, dropped scores, and curves can change the effective cutoffs.</li>
                <li>Assuming the needed score must be exactly achieved—often you can trade off performance across remaining tasks.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Quick comparison: remaining weight changes the difficulty</h2>
              <div className="mt-4 w-full max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Remaining weight</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">How much can still change</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Typical planning impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">10–20%</td>
                      <td className="py-3 pr-4">Low leverage</td>
                      <td className="py-3 pr-4">Harder to raise a low grade; easier to maintain a strong grade.</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">40–50%</td>
                      <td className="py-3 pr-4">High leverage</td>
                      <td className="py-3 pr-4">One exam/project can swing the final outcome significantly.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            <FAQSection items={faqItems} />
            <RelatedCalculators slug="grade-needed-to-pass-calculator" />
          </>
        }
      />
    </>
  );
}
