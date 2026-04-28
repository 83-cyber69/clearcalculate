import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { BodyFatCalculator } from "@/components/calculators/health/body-fat-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Estimate body fat percentage using simple body measurements. Free body fat calculator using the US Navy method with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Body Fat Calculator",
  description: pageDescription,
  path: "/body-fat-calculator",
  titleOverride: "Body Fat Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "What is body fat percentage?",
    answer:
      "It’s the percent of your total body weight that comes from fat mass. The rest is lean mass like muscle and bone."
  },
  {
    question: "Which method does this use?",
    answer: "It uses the US Navy circumference method based on measurements."
  },
  {
    question: "How accurate is it?",
    answer:
      "It’s a useful estimate, but accuracy depends on measurement technique and individual body shape."
  },
  {
    question: "Do I need hips measurement?",
    answer: "For women, hips are used in the Navy formula. For men, it’s not required."
  },
  {
    question: "Should I measure in inches or cm?",
    answer: "Enter centimeters here. The calculator converts internally."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Body Fat Calculator",
    description: pageDescription,
    path: "/body-fat-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Health", path: "/health" },
    { name: "Body Fat Calculator", path: "/body-fat-calculator" }
  ]);

  return (
    <>
      <Script id="bf-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="bf-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="bf-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Health Calculator"
        title="Body Fat Calculator"
        calculator={<BodyFatCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Body Fat Calculator" urlPath="/body-fat-calculator" shareText="Try this body fat calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Select sex and enter measurements.</li>
                <li>The calculator applies the Navy method.</li>
                <li>You get an estimated body fat percentage.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Measurements vary—take multiple readings and use the average for best results.
              </div>
            </article>
            <FAQSection items={faqItems} />
            <RelatedCalculators slug="body-fat-calculator" />
          </>
        }
      />
    </>
  );
}
