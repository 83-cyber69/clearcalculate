import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalculatorHero } from "@/components/shared/calculator-hero";
import { CalculatorPageShell } from "@/components/shared/calculator-page-shell";
import { ShareButtons } from "@/components/shared/share-buttons";
import { CalculatorSidebar } from "@/components/shared/calculator-sidebar";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { BmiCalculator } from "@/components/health/bmi-calculator";
import {
  createBreadcrumbJsonLd,
  createCalculatorMetadata,
  createFaqJsonLd,
  createWebApplicationJsonLd
} from "@/lib/seo";

const pageDescription =
  "Calculate BMI (Body Mass Index) from height and weight. Get BMI category, normal range, and quick interpretation. Free BMI calculator with example and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "BMI Calculator",
  description: pageDescription,
  path: "/bmi-calculator",
  titleOverride: "BMI Calculator (Body Mass Index) | ClearCalculate"
});

const faqItems = [
  {
    question: "What is BMI?",
    answer:
      "BMI (Body Mass Index) is a screening metric that compares your weight to your height. It’s commonly used to categorize underweight, normal weight, overweight, and obesity."
  },
  {
    question: "Is BMI accurate?",
    answer:
      "BMI is a useful population-level screening tool, but it doesn’t directly measure body fat or health. Muscle mass, bone density, and body composition can affect how well BMI matches real-world outcomes."
  },
  {
    question: "What is a healthy BMI range?",
    answer:
      "A commonly used “normal” BMI range is 18.5 to 24.9 for adults. Individual context matters, so use this as a reference rather than a diagnosis."
  },
  {
    question: "How do I calculate BMI?",
    answer:
      "BMI = weight (kg) ÷ height (m)². This calculator does the math for you and shows category and reference ranges."
  },
  {
    question: "Should I use BMI for calorie planning?",
    answer:
      "For calorie planning, it’s usually better to estimate maintenance calories (TDEE) and adjust based on trends. BMI is a quick screening metric, not a calorie target."
  },
  {
    question: "What should I do after I calculate BMI?",
    answer:
      "Use BMI as a starting reference. If you’re planning nutrition, estimate maintenance with the TDEE Calculator and then choose a moderate deficit/surplus based on your goal."
  },
  {
    question: "Does BMI work for athletes?",
    answer:
      "BMI can over-classify muscular people as overweight. If you lift or train heavily, also consider body fat estimates, waist measurements, and performance/health markers."
  },
  {
    question: "Does BMI change quickly?",
    answer:
      "BMI changes when your body weight changes or if your height changes (usually only in youth). For adults, BMI shifts are mostly driven by weight changes."
  },
  {
    question: "What is the difference between BMI and body fat percentage?",
    answer:
      "BMI uses only height and weight. Body fat percentage estimates composition (fat vs lean mass). BMI is simpler; body fat percent can be more informative but depends on the method used."
  },
  {
    question: "Can BMI be used for children?",
    answer:
      "Child BMI is typically interpreted using age- and sex-specific percentiles. This calculator is intended for adult reference ranges." 
  }
];

export default function BmiCalculatorPage() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "BMI Calculator",
    description: pageDescription,
    path: "/bmi-calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Health", path: "/health" },
    { name: "BMI Calculator", path: "/bmi-calculator" }
  ]);

  return (
    <CalculatorPageShell
      hero={<CalculatorHero eyebrow="Health Calculator" title="BMI Calculator" />}
      calculator={
        <>
          <Script id="bmi-webapplication-schema" type="application/ld+json">
            {JSON.stringify(webApplicationJsonLd)}
          </Script>
          <Script id="bmi-faq-schema" type="application/ld+json">
            {JSON.stringify(createFaqJsonLd(faqItems))}
          </Script>
          <Script id="bmi-breadcrumb-schema" type="application/ld+json">
            {JSON.stringify(breadcrumbJsonLd)}
          </Script>
          <BmiCalculator />
        </>
      }
      quickInfo={
        <div className="space-y-3">
          <p className="text-sm leading-7 text-slate-700 sm:text-base">
            Calculate BMI from height and weight, then review category and reference ranges.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Fast</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Free</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Mobile Friendly</span>
          </div>
        </div>
      }
      quickActions={
        <ShareButtons title="BMI Calculator" urlPath="/bmi-calculator" shareText="Try this BMI calculator:" />
      }
      sidebar={
        <CalculatorSidebar
          trustBadges={[{ label: "Fast" }, { label: "Free" }, { label: "Private" }, { label: "Mobile Friendly" }]}
          quickLinks={[
            { label: "Calculator", href: "#calculator" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Formula", href: "#formula" },
            { label: "Example", href: "#example" },
            { label: "FAQ", href: "#faq" }
          ]}
          tip="BMI is a quick screening metric. For calorie planning, estimate maintenance (TDEE) and adjust based on 2–3 week trends."
        />
      }
      seoContent={
        <>
          <article id="how-it-works" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">How this BMI calculator works</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                BMI (Body Mass Index) compares your weight to your height. It’s widely used as a screening metric to categorize underweight, normal weight,
                overweight, and obesity.
              </p>
              <p>
                If your goal is nutrition planning, use BMI as context and estimate maintenance calories with the{" "}
                <Link href="/tdee-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  TDEE Calculator
                </Link>
                , then adjust gradually.
              </p>
            </div>
          </article>

          <article id="formula" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">Formula</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <div className="rounded-xl bg-slate-50 p-4">
                <p>BMI = weight (kg) ÷ height (m)²</p>
              </div>
              <p>
                BMI categories for adults are typically:
                under 18.5 (underweight), 18.5–24.9 (normal), 25–29.9 (overweight), 30+ (obesity).
              </p>
            </div>
          </article>

          <article id="example" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">Example</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                Example: 175 cm and 75 kg.
              </p>
              <div className="rounded-xl bg-slate-50 p-4">
                <p>Height = 1.75 m</p>
                <p className="mt-2">BMI = 75 ÷ (1.75 × 1.75) ≈ 24.5</p>
              </div>
              <p>
                For body composition context beyond BMI, you can also use the{" "}
                <Link href="/body-fat-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  Body Fat Calculator
                </Link>
                .
              </p>
            </div>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">FAQ</h2>
            <div id="faq" className="mt-6 scroll-mt-24">
              <FAQAccordion items={faqItems} />
            </div>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">Recommended next calculators</h2>
            <div className="mt-4 grid gap-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                If you’re using BMI for planning, these tools help you turn it into an actionable plan:
              </p>
              <div className="grid gap-2">
                <Link href="/tdee-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  TDEE Calculator
                </Link>
                <Link href="/calorie-deficit-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  Calorie Deficit Calculator
                </Link>
                <Link href="/body-fat-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  Body Fat Calculator
                </Link>
              </div>
            </div>
          </article>

          <RelatedCalculators slug="bmi-calculator" />
        </>
      }
    />
  );
}
