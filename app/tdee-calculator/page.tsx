import type { Metadata } from "next";
import Script from "next/script";
import { TdeeCalculator } from "@/components/health/tdee-calculator";
import { CalculatorHero } from "@/components/shared/calculator-hero";
import { CalculatorPageShell } from "@/components/shared/calculator-page-shell";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Calculate TDEE, BMR, and daily calories for maintenance, fat loss, or muscle gain. Free TDEE calculator with formula breakdown, FAQ, and macro guidance.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "TDEE Calculator",
  description: pageDescription,
  path: "/tdee-calculator",
  titleOverride: "TDEE Calculator (BMR + Calories) | ClearCalculate"
});

const faqItems = [
  {
    question: "What is TDEE?",
    answer:
      "TDEE is your Total Daily Energy Expenditure, the estimated calories you burn each day after combining BMR and activity."
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer:
      "BMR is calories burned at complete rest, while TDEE includes movement, workouts, and activity level."
  },
  {
    question: "Which formula does this TDEE calculator use?",
    answer:
      "It uses the Mifflin-St Jeor equation to estimate BMR, then multiplies by an activity factor to estimate TDEE."
  },
  {
    question: "How many calories should I cut to lose fat?",
    answer:
      "Many people start with a 300-500 calorie deficit from maintenance, then adjust based on real progress and recovery."
  },
  {
    question: "How many calories should I eat to gain muscle?",
    answer:
      "A small surplus (often 200-400 calories above maintenance) is a common starting point. Pair it with strength training and monitor weight gain over time."
  },
  {
    question: "Can I use this for muscle gain?",
    answer:
      "Yes. The bulking estimate applies a moderate surplus to support training performance and lean mass gain."
  },
  {
    question: "How accurate is a TDEE estimate?",
    answer:
      "It is a strong starting point, but real TDEE can vary based on genetics, sleep, and daily movement. Track your weight for 2-3 weeks and adjust calories if needed."
  }
];

export default function TdeePage() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "TDEE Calculator",
    description: pageDescription,
    path: "/tdee-calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Health", path: "/health" },
    { name: "TDEE Calculator", path: "/tdee-calculator" }
  ]);

  return (
    <CalculatorPageShell
      hero={<CalculatorHero eyebrow="Health Calculator" title="TDEE Calculator" />}
      calculator={
        <>
          <Script id="tdee-webapplication-schema" type="application/ld+json">
            {JSON.stringify(webApplicationJsonLd)}
          </Script>
          <Script id="tdee-faq-schema" type="application/ld+json">
            {JSON.stringify(createFaqJsonLd(faqItems))}
          </Script>
          <Script id="tdee-breadcrumb-schema" type="application/ld+json">
            {JSON.stringify(breadcrumbJsonLd)}
          </Script>
          <TdeeCalculator />
        </>
      }
      quickInfo={
        <div className="space-y-3">
          <p className="text-sm leading-7 text-slate-700 sm:text-base">
            Estimate your maintenance calories (TDEE) and daily targets for fat loss or muscle gain.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Fast</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Free</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Accurate</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Mobile Friendly</span>
          </div>
        </div>
      }
      quickActions={
        <ShareButtons
          title="TDEE Calculator"
          urlPath="/tdee-calculator"
          shareText="Try this TDEE calculator:"
        />
      }
      seoContent={
        <>
          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">How this calculator works</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
              This calculator estimates your BMR (resting calories) and multiplies it by an activity level to estimate TDEE.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
              <li>Enter your age, height, weight, and sex.</li>
              <li>Select an activity level that matches your weekly routine.</li>
              <li>Pick a goal to see a daily calorie target plus macro guidance.</li>
            </ol>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">Formula</h2>
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
              <p>
                <strong>BMR (Mifflin-St Jeor)</strong> = 10 x weight(kg) + 6.25 x height(cm) - 5 x age + s
              </p>
              <p className="mt-2">where <strong>s</strong> = +5 for men and -161 for women</p>
              <p className="mt-3">
                <strong>TDEE</strong> = BMR x Activity Multiplier
              </p>
              <div className="mt-4 space-y-1 text-sm text-slate-700">
                <p>
                  <strong>weight(kg):</strong> your body weight in kilograms
                </p>
                <p>
                  <strong>height(cm):</strong> your height in centimeters
                </p>
                <p>
                  <strong>Activity Multiplier:</strong> a factor based on movement and training frequency
                </p>
              </div>
            </div>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">Example calculation</h2>
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
              <p>
                <strong>Example:</strong> 28-year-old, 175 cm, 75 kg, moderately active
              </p>
              <p className="mt-3">
                <strong>Step 1 (BMR):</strong> 10 x 75 + 6.25 x 175 - 5 x 28 + 5 ≈ 1,709 kcal/day
              </p>
              <p className="mt-3">
                <strong>Step 2 (TDEE):</strong> 1,709 x 1.55 ≈ 2,649 kcal/day
              </p>
              <p className="mt-3">
                <strong>Typical targets:</strong> cut ≈ 2,200 kcal/day, lean bulk ≈ 2,950 kcal/day
              </p>
            </div>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">What is TDEE</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
              TDEE represents your total daily calorie burn. It combines resting metabolism and activity output to give a practical target for weight maintenance and nutrition planning.
            </p>
          </article>

          <article>
            <h2 className="mb-5 section-title">FAQ</h2>
            <FAQAccordion items={faqItems} />
          </article>

          <article>
            <h2 className="mb-5 section-title">Related Calculators</h2>
            <RelatedCalculators slug="tdee-calculator" />
          </article>

          <article>
            <p className="text-sm text-slate-500">
              Educational estimates only. Results may vary depending on activity assumptions and individual metabolism.
            </p>
          </article>
        </>
      }
    />
  );
}
