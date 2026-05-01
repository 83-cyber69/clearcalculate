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
  },
  {
    question: "Is a bigger deficit always better?",
    answer:
      "Not necessarily. Larger deficits can increase hunger and reduce training performance. A smaller deficit you can stick to often works better long term."
  },
  {
    question: "What’s a good weekly weight-loss rate?",
    answer:
      "Many people aim for about 0.5–1.0% of body weight per week, but the right pace depends on starting weight, goals, and recovery."
  },
  {
    question: "Do I need to track macros to lose weight?",
    answer:
      "You can lose weight without tracking macros, but prioritizing protein and fiber often helps manage hunger and preserve muscle."
  },
  {
    question: "What if I’m losing weight slower than the estimate?",
    answer:
      "Estimates assume consistent intake and activity. Check portion accuracy, daily movement, and weekly averages. Adjust deficit gradually rather than making huge changes overnight."
  },
  {
    question: "Can I combine a deficit with strength training?",
    answer:
      "Yes. Strength training helps preserve muscle while dieting. Many people use a moderate deficit to support performance and recovery."
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
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                A calorie deficit is the gap between what you burn (your maintenance calories, often called TDEE) and what you eat. This calculator turns
                that idea into a daily target by subtracting your chosen deficit from your maintenance estimate.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your maintenance calories (TDEE).</li>
                <li>Enter your desired daily deficit.</li>
                <li>The calculator gives a target calorie goal.</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                The weekly loss estimate uses the common 3,500 calories per pound model as a rough planning tool. Real progress depends on adherence,
                water weight changes, and how your activity adapts over time.
              </p>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Target Calories = TDEE − Deficit
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  A second useful estimate is weekly change:
                </p>
                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                  Estimated weekly loss (lb) ≈ (Deficit × 7) ÷ 3500
                </div>
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                TDEE 2,500 and deficit 500 → target 2,000 kcal/day
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Treat the target calories as a starting point. The best “correct” number is the one that produces steady progress without making
                  training, sleep, and hunger unmanageable.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>If your weekly loss estimate is very high, consider dialing the deficit back.</li>
                  <li>If nothing changes after 2–3 weeks, adjust calories or activity slightly.</li>
                </ul>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Using an unrealistic TDEE estimate (activity level too high or too low).</li>
                <li>Choosing a deficit you can’t maintain consistently.</li>
                <li>Judging progress by day-to-day scale weight instead of weekly averages.</li>
                <li>Ignoring protein, fiber, and sleep—key factors for adherence.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Comparison table</h2>
              <div className="mt-4 w-full max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Deficit size</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Typical outcome</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Tradeoff</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Small (200–300)</td>
                      <td className="py-3 pr-4">Slower loss</td>
                      <td className="py-3 pr-4">Often easiest to sustain</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Moderate (300–600)</td>
                      <td className="py-3 pr-4">Steady loss</td>
                      <td className="py-3 pr-4">Good balance for many people</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Large (700+)</td>
                      <td className="py-3 pr-4">Faster loss</td>
                      <td className="py-3 pr-4">Higher hunger / lower performance risk</td>
                    </tr>
                  </tbody>
                </table>
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
