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
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your course load in credits.</li>
                <li>Choose an estimated weekly study hours per credit.</li>
                <li>The calculator estimates weekly and daily study time.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Weekly Study Hours = Credits × Hours per Credit
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                15 credits × 2 hrs/credit = 30 hrs/week (~4.3 hrs/day)
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
