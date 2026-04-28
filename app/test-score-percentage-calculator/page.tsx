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
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter correct answers.</li>
                <li>Enter total questions.</li>
                <li>The calculator converts it to a percentage.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Percentage = (Correct / Total) × 100
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                42 correct out of 50 total → 42/50 = 84%
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
