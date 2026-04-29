import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalculatorHero } from "@/components/shared/calculator-hero";
import { CalculatorPageShell } from "@/components/shared/calculator-page-shell";
import { ShareButtons } from "@/components/shared/share-buttons";
import { CalculatorSidebar } from "@/components/shared/calculator-sidebar";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { BmrCalculator } from "@/components/health/bmr-calculator";
import {
  createBreadcrumbJsonLd,
  createCalculatorMetadata,
  createFaqJsonLd,
  createWebApplicationJsonLd
} from "@/lib/seo";

const pageDescription =
  "Calculate BMR (Basal Metabolic Rate) using the Mifflin-St Jeor formula. Get your resting calorie burn plus quick activity-based estimates. Free BMR calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "BMR Calculator",
  description: pageDescription,
  path: "/bmr-calculator",
  titleOverride: "BMR Calculator (Basal Metabolic Rate) | ClearCalculate"
});

const faqItems = [
  {
    question: "What is BMR?",
    answer:
      "BMR (Basal Metabolic Rate) is an estimate of how many calories your body burns per day at rest. It’s the baseline for understanding daily calorie needs."
  },
  {
    question: "What’s the difference between BMR and TDEE?",
    answer:
      "BMR is calories burned at rest. TDEE (Total Daily Energy Expenditure) includes activity and movement on top of BMR, so it’s usually the better number for maintenance planning."
  },
  {
    question: "Which formula does this BMR calculator use?",
    answer:
      "This calculator uses the Mifflin-St Jeor equation, a widely used method for estimating resting metabolic rate from age, sex, height, and weight."
  },
  {
    question: "How accurate is a BMR estimate?",
    answer:
      "BMR is an estimate. Real calorie burn can vary based on muscle mass, sleep, stress, and genetics. Use it as a starting point and adjust based on real results over time."
  },
  {
    question: "Can I use BMR to set fat loss calories?",
    answer:
      "It’s better to use TDEE for fat loss targets. Start with maintenance (TDEE) and then apply a moderate deficit. You can use our TDEE Calculator and Calorie Deficit Calculator for that workflow."
  },
  {
    question: "Does BMR change with weight loss or muscle gain?",
    answer:
      "Yes. As body weight and composition change, your resting calorie needs often change too. Recalculate after major changes or every few months."
  },
  {
    question: "Should I eat below my BMR?",
    answer:
      "Many people avoid aggressive targets below BMR for extended periods. Sustainable deficits are usually set from TDEE and adjusted gradually."
  },
  {
    question: "What activity multiplier should I use?",
    answer:
      "Choose the multiplier that matches your average week, not your best week. If you’re unsure, use a lower multiplier and adjust based on 2–3 weeks of weight trend data."
  },
  {
    question: "Why are there different BMR formulas?",
    answer:
      "Different formulas were derived from different populations and measurement methods. Mifflin-St Jeor is commonly used because it performs well for many adults in typical planning scenarios."
  },
  {
    question: "What should I do after I get my BMR?",
    answer:
      "Use BMR as a baseline, then estimate maintenance calories with the TDEE Calculator. If your goal is fat loss, use the Calorie Deficit Calculator to pick a sustainable target."
  }
];

export default function BmrCalculatorPage() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "BMR Calculator",
    description: pageDescription,
    path: "/bmr-calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Health", path: "/health" },
    { name: "BMR Calculator", path: "/bmr-calculator" }
  ]);

  return (
    <CalculatorPageShell
      hero={<CalculatorHero eyebrow="Health Calculator" title="BMR Calculator" />}
      calculator={
        <>
          <Script id="bmr-webapplication-schema" type="application/ld+json">
            {JSON.stringify(webApplicationJsonLd)}
          </Script>
          <Script id="bmr-faq-schema" type="application/ld+json">
            {JSON.stringify(createFaqJsonLd(faqItems))}
          </Script>
          <Script id="bmr-breadcrumb-schema" type="application/ld+json">
            {JSON.stringify(breadcrumbJsonLd)}
          </Script>
          <BmrCalculator />
        </>
      }
      quickInfo={
        <div className="space-y-3">
          <p className="text-sm leading-7 text-slate-700 sm:text-base">
            Estimate your resting calorie burn (BMR) and get quick maintenance ranges using common activity multipliers.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Fast</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Free</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Mobile Friendly</span>
          </div>
        </div>
      }
      quickActions={
        <ShareButtons
          title="BMR Calculator"
          urlPath="/bmr-calculator"
          shareText="Try this BMR calculator:"
        />
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
          tip="If your goal is planning calories, move from BMR → TDEE (maintenance) → deficit/surplus. Track 2–3 week trends before making big changes."
        />
      }
      seoContent={
        <>
          <article id="how-it-works" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">How this BMR calculator works</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                This calculator estimates BMR (Basal Metabolic Rate) using your age, sex, height, and weight. BMR is your resting calorie burn—what your body
                uses for basic functions like breathing, circulation, and temperature regulation.
              </p>
              <p>
                For most real-world planning, you’ll use BMR as a baseline and then move to maintenance calories (TDEE). If you want that full maintenance
                estimate, use our{" "}
                <Link href="/tdee-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  TDEE Calculator
                </Link>
                .
              </p>
            </div>
          </article>

          <article id="formula" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">Formula (Mifflin-St Jeor)</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Men</p>
                <p>BMR = (10 × weight_kg) + (6.25 × height_cm) − (5 × age) + 5</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Women</p>
                <p>BMR = (10 × weight_kg) + (6.25 × height_cm) − (5 × age) − 161</p>
              </div>
              <p>
                To estimate maintenance calories, people often multiply BMR by an activity factor. For a more explicit maintenance + goal workflow, use the{" "}
                <Link href="/tdee-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  TDEE Calculator
                </Link>
                {" "}
                and then the{" "}
                <Link href="/calorie-deficit-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  Calorie Deficit Calculator
                </Link>
                .
              </p>
            </div>
          </article>

          <article id="example" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">Example</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                Example inputs: 28-year-old, 175 cm, 75 kg.
              </p>
              <div className="rounded-xl bg-slate-50 p-4">
                <p>
                  BMR ≈ (10×75) + (6.25×175) − (5×28) + 5
                </p>
                <p className="mt-2">BMR ≈ 1,709 kcal/day</p>
                <p className="mt-2">Sedentary maintenance estimate (×1.2) ≈ 2,051 kcal/day</p>
              </div>
              <p>
                Treat this as a starting point. If your weight trends up/down for 2–3 weeks at a given intake, adjust calories in small steps.
              </p>
            </div>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">Common mistakes</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
              <li>Using BMR directly for daily eating targets instead of estimating TDEE.</li>
              <li>Choosing an activity multiplier based on an “ideal week” rather than your real average.</li>
              <li>Expecting perfect precision—use weekly averages and iterate.</li>
              <li>Ignoring protein/sleep/training consistency when adjusting calories.</li>
            </ul>
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
                Most people use BMR as a baseline, then plan around maintenance and targets:
              </p>
              <div className="grid gap-2">
                <Link href="/tdee-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  TDEE Calculator
                </Link>
                <Link href="/calorie-deficit-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  Calorie Deficit Calculator
                </Link>
                <Link href="/bmi-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  BMI Calculator
                </Link>
              </div>
            </div>
          </article>

          <RelatedCalculators slug="bmr-calculator" />
        </>
      }
    />
  );
}
