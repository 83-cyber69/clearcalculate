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
    question: "What if my course uses multiple weighted categories?",
    answer:
      "This tool is best for a single final exam weight. If your course uses categories, convert your current standing into a single current grade first."
  },
  {
    question: "Can I use this for midterms or projects?",
    answer:
      "Yes. Any remaining assessment with a known weight works the same way as a final exam in the formula."
  },
  {
    question: "Is this exact for my class?",
    answer:
      "It matches the standard weighted-grade method, but some teachers round differently. Use it as a helpful estimate."
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
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your current grade in the class.</li>
                <li>Enter your expected final exam score.</li>
                <li>Enter how much the final exam is worth.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Final Grade = Current Grade × (1 − Weight) + Final Exam Grade × Weight
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Current 88%, final exam 84%, weight 30% → 88×0.70 + 84×0.30 = 86.8%
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
