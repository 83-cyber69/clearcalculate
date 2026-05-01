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
  },
  {
    question: "When should I measure for consistency?",
    answer:
      "For tracking trends, measure under similar conditions each time (same time of day, similar hydration, and before eating if possible)."
  },
  {
    question: "Why does tape placement matter?",
    answer:
      "Small changes in where you place the tape (especially waist) can change the result. Consistency is more important than perfection." 
  },
  {
    question: "Can I use this to track progress while strength training?",
    answer:
      "Yes. Body fat estimates can help show recomposition trends when scale weight is stable, but rely on multi-week trends rather than single readings." 
  },
  {
    question: "Is body fat % the same as BMI?",
    answer:
      "No. BMI uses height and weight only. Body fat % aims to estimate composition (fat vs lean mass)." 
  },
  {
    question: "What if my result seems unrealistic?",
    answer:
      "Double-check units and take 2–3 measurements for each site. Measurement errors and posture can significantly affect tape-based methods." 
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
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                The US Navy body fat method estimates body fat percentage from a small set of tape measurements. It’s popular because it’s fast and
                repeatable without specialized equipment.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Select sex and enter measurements.</li>
                <li>The calculator applies the Navy method.</li>
                <li>You get an estimated body fat percentage.</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Because this method is sensitive to tape placement, it’s best used to track trends over time using consistent measuring conditions.
              </p>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Body fat percentage is a composition metric: it estimates how much of your weight is fat mass versus lean mass.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Use the number for context, but prioritize multi-week trends.</li>
                  <li>If you strength train, you may see body fat change even when scale weight doesn’t.</li>
                </ul>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Measuring waist at different locations each time.</li>
                <li>Pulling the tape too tight (or leaving it too loose).</li>
                <li>Comparing a single reading day-to-day instead of tracking trends.</li>
                <li>Mixing units (cm vs inches) unintentionally.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Comparison table</h2>
              <div className="mt-4 w-full max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Method</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Pros</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Limitations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">US Navy (tape)</td>
                      <td className="py-3 pr-4">Fast, cheap, repeatable</td>
                      <td className="py-3 pr-4">Sensitive to tape placement</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">DEXA</td>
                      <td className="py-3 pr-4">Detailed composition snapshot</td>
                      <td className="py-3 pr-4">Cost and availability</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Bioimpedance scale</td>
                      <td className="py-3 pr-4">Convenient</td>
                      <td className="py-3 pr-4">Highly affected by hydration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
