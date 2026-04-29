import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { StudyTimeCalculator } from "@/components/calculators/education/study-time-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Estimate how many hours to study each week based on your course load. Free study time calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Study Time Calculator",
  description: pageDescription,
  path: "/study-time-calculator",
  titleOverride: "Study Time Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "How many hours should I study per week?",
    answer:
      "A common rule is 2–3 hours per credit per week, but it depends on difficulty and how fast you learn."
  },
  {
    question: "What if I work a part-time job?",
    answer: "Use the weekly study estimate to plan your schedule and adjust credits if needed."
  },
  {
    question: "Do all credits require the same study time?",
    answer: "No. Lab classes and math-heavy courses often take more time than others."
  },
  {
    question: "Is studying 1 hour per credit enough?",
    answer: "It might be for some easy courses, but most students need more time to stay ahead."
  },
  {
    question: "Should I study every day?",
    answer: "Many students prefer daily study blocks to avoid cramming. This calculator also shows an average per day."
  },
  {
    question: "What’s a realistic study schedule for 15 credits?",
    answer:
      "At 2 hours per credit, 15 credits is about 30 hours/week. Many students split that into 5–6 days with a mix of shorter review sessions and longer deep-work blocks."
  },
  {
    question: "How do I pick hours per credit?",
    answer:
      "Start with 2 hours/credit for typical classes, then increase for difficult subjects, writing-heavy courses, labs, or if you’re aiming for top grades."
  },
  {
    question: "Should I study more before exams?",
    answer:
      "Yes. Use the weekly estimate as a baseline, then temporarily add extra hours during exam weeks or big project deadlines."
  },
  {
    question: "Does attendance count as study time?",
    answer:
      "Usually no. Credits often already reflect class time. This calculator estimates study time outside of lectures."
  },
  {
    question: "How can I reduce study time without hurting grades?",
    answer:
      "Focus on high-yield methods: active recall, spaced repetition, practice problems, and eliminating distractions during study blocks."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Study Time Calculator",
    description: pageDescription,
    path: "/study-time-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Study Time Calculator", path: "/study-time-calculator" }
  ]);

  return (
    <>
      <Script id="study-time-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="study-time-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="study-time-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Education Calculator"
        title="Study Time Calculator"
        calculator={<StudyTimeCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Study Time Calculator" urlPath="/study-time-calculator" shareText="Try this study time calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Study time calculators turn a vague goal (“I should study more”) into a weekly plan. A common planning rule is that for every credit hour,
                you should spend additional time outside class reviewing, doing assignments, and preparing for exams.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your course load in credits.</li>
                <li>Choose an estimated weekly study hours per credit.</li>
                <li>The calculator estimates weekly and daily study time.</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                The output is a planning baseline. Some weeks will be lighter; exam weeks and project deadlines will be heavier.
              </p>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Weekly Study Hours = Credits × Hours per Credit
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  The daily estimate is a simple average (weekly hours ÷ 7). In real schedules, most students spread study time across 5–6 days.
                </p>
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                15 credits × 2 hrs/credit = 30 hrs/week (~4.3 hrs/day)
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Use the weekly total to build a schedule you can actually follow:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Split the weekly hours across 5–6 days to reduce cramming.</li>
                  <li>Reserve longer blocks for problem sets and writing; shorter blocks for review and flashcards.</li>
                  <li>If your weekly number is very high, consider fewer credits or more efficient study methods.</li>
                </ul>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Counting class time as study time (credits already include class hours in most systems).</li>
                <li>Choosing an hours-per-credit number that doesn’t match course difficulty.</li>
                <li>Planning the average per day but not creating calendar blocks.</li>
                <li>Ignoring exam weeks and trying to keep the same schedule every week.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Comparison table</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Hours per credit</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Good for</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">What it feels like</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">1 hr/credit</td>
                      <td className="py-3 pr-4">Light load / review-heavy courses</td>
                      <td className="py-3 pr-4">Minimal outside work; risk of falling behind</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">2 hrs/credit</td>
                      <td className="py-3 pr-4">Typical baseline</td>
                      <td className="py-3 pr-4">Steady weekly workload</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">3+ hrs/credit</td>
                      <td className="py-3 pr-4">Hard STEM/labs/writing intensive</td>
                      <td className="py-3 pr-4">High commitment; plan calendar blocks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            <FAQSection items={faqItems} />
            <RelatedCalculators slug="study-time-calculator" />
          </>
        }
      />
    </>
  );
}
