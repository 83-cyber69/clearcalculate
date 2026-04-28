import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { IdealBodyWeightCalculator } from "@/components/calculators/health/ideal-body-weight-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Estimate ideal body weight using a common height-based formula. Free ideal body weight calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Ideal Body Weight Calculator",
  description: pageDescription,
  path: "/ideal-body-weight-calculator",
  titleOverride: "Ideal Body Weight Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "What is ideal body weight (IBW)?",
    answer:
      "IBW is an estimate based on height and sex. It’s often used as a reference point, not a strict target."
  },
  {
    question: "Which formula does this use?",
    answer: "It uses a common clinical-style formula (Devine-style) for a quick estimate."
  },
  {
    question: "Is IBW the same as a healthy weight range?",
    answer:
      "Not exactly. Healthy weight can vary based on muscle mass, age, and body composition. Use IBW as a simple reference."
  },
  {
    question: "Can athletes use this?",
    answer: "Athletes often have higher lean mass, so IBW may underestimate a healthy weight for them."
  },
  {
    question: "Should I use kg or lbs?",
    answer: "This calculator outputs kilograms. You can convert to pounds by multiplying kg by 2.2046."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Ideal Body Weight Calculator",
    description: pageDescription,
    path: "/ideal-body-weight-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Health", path: "/health" },
    { name: "Ideal Body Weight Calculator", path: "/ideal-body-weight-calculator" }
  ]);

  return (
    <>
      <Script id="ibw-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="ibw-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="ibw-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Health Calculator"
        title="Ideal Body Weight Calculator"
        calculator={<IdealBodyWeightCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Ideal Body Weight Calculator" urlPath="/ideal-body-weight-calculator" shareText="Try this ideal body weight calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your height and sex.</li>
                <li>The calculator estimates an ideal weight point and a small range.</li>
                <li>Use it as a quick reference for planning.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                175 cm may produce an IBW estimate around the mid-60s to low-70s kg depending on sex.
              </div>
            </article>
            <FAQSection items={faqItems} />
            <RelatedCalculators slug="ideal-body-weight-calculator" />
          </>
        }
      />
    </>
  );
}
