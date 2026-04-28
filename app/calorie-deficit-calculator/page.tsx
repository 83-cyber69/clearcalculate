import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { CalorieDeficitCalculator } from "@/components/calculators/health/calorie-deficit-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Calculate a calorie target for fat loss using your maintenance calories (TDEE) and desired deficit. Free calorie deficit calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Calorie Deficit Calculator",
  description: pageDescription,
  path: "/calorie-deficit-calculator",
  titleOverride: "Calorie Deficit Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "What is a calorie deficit?",
    answer: "A calorie deficit means you eat fewer calories than you burn, which can lead to weight loss."
  },
  {
    question: "How big should my deficit be?",
    answer:
      "Many people start with 300–500 calories per day and adjust based on progress and energy levels."
  },
  {
    question: "How fast will I lose weight?",
    answer:
      "A rough estimate is 3,500 calories per pound of fat, but real results vary by body and activity."
  },
  {
    question: "Is it safe to eat too little?",
    answer:
      "Very low calories can be unsafe. Consider professional guidance if you plan a large deficit."
  },
  {
    question: "Should I recalculate my deficit?",
    answer: "Yes. As weight and activity change, your maintenance calories can change too."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Calorie Deficit Calculator",
    description: pageDescription,
    path: "/calorie-deficit-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Health", path: "/health" },
    { name: "Calorie Deficit Calculator", path: "/calorie-deficit-calculator" }
  ]);

  return (
    <>
      <Script id="deficit-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="deficit-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="deficit-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Health Calculator"
        title="Calorie Deficit Calculator"
        calculator={<CalorieDeficitCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Calorie Deficit Calculator" urlPath="/calorie-deficit-calculator" shareText="Try this calorie deficit calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your maintenance calories (TDEE).</li>
                <li>Enter your desired daily deficit.</li>
                <li>The calculator gives a target calorie goal.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Target Calories = TDEE − Deficit
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                TDEE 2,500 and deficit 500 → target 2,000 kcal/day
              </div>
            </article>
            <FAQSection items={faqItems} />
            <RelatedCalculators slug="calorie-deficit-calculator" />
          </>
        }
      />
    </>
  );
}
