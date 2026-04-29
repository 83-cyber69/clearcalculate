import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalculatorHero } from "@/components/shared/calculator-hero";
import { CalculatorPageShell } from "@/components/shared/calculator-page-shell";
import { ShareButtons } from "@/components/shared/share-buttons";
import { CalculatorSidebar } from "@/components/shared/calculator-sidebar";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { OneRepMaxCalculator } from "@/components/health/one-rep-max-calculator";
import {
  createBreadcrumbJsonLd,
  createCalculatorMetadata,
  createFaqJsonLd,
  createWebApplicationJsonLd
} from "@/lib/seo";

const pageDescription =
  "Estimate your one rep max (1RM) from a working set using Epley or Brzycki. Get training percentages for common intensity ranges. Free 1RM calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "One Rep Max Calculator",
  description: pageDescription,
  path: "/one-rep-max-calculator",
  titleOverride: "One Rep Max (1RM) Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "What is a 1RM?",
    answer:
      "1RM (one rep max) is the maximum weight you can lift for a single repetition with good technique. It’s often used to set training percentages."
  },
  {
    question: "How does this 1RM calculator work?",
    answer:
      "It estimates 1RM from a working set weight and reps using a standard equation (Epley or Brzycki). It then computes common training loads like 85%, 75%, and 65%."
  },
  {
    question: "Which formula is best: Epley or Brzycki?",
    answer:
      "Both are common. Epley is often used for moderate reps, and Brzycki can be conservative at higher reps. If you’re unsure, compare both and use the result as a planning estimate."
  },
  {
    question: "What reps should I use for the most accurate estimate?",
    answer:
      "Many people use a set of 3–8 reps for a stable estimate. Very high reps can increase variability."
  },
  {
    question: "Is a 1RM estimate safe to test?",
    answer:
      "Testing a true 1RM can be risky if you’re new to lifting. Many lifters use estimates from submaximal sets to reduce injury risk." 
  },
  {
    question: "What percent of 1RM should I train with?",
    answer:
      "It depends on your goal. Higher percentages (around 80–90%) are common for strength work, while 60–80% is common for volume/hypertrophy work."
  },
  {
    question: "Why does my 1RM change week to week?",
    answer:
      "Strength fluctuates with sleep, fatigue, nutrition, stress, and technique. Use the estimate as a trend metric rather than a single perfect number."
  },
  {
    question: "Can I use 1RM to plan body composition goals?",
    answer:
      "Indirectly. Strength training supports muscle retention/gain during fat loss. For calorie planning, estimate maintenance with the TDEE Calculator and then adjust gradually."
  },
  {
    question: "Does this calculator work for any lift?",
    answer:
      "Yes. You can use it for bench, squat, deadlift, overhead press, or any lift where weight and reps are meaningful."
  },
  {
    question: "What if I used dumbbells?",
    answer:
      "You can still estimate 1RM, but dumbbell stability and movement pattern can affect the estimate. Track within the same lift style for best comparisons." 
  }
];

export default function OneRepMaxCalculatorPage() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "One Rep Max Calculator",
    description: pageDescription,
    path: "/one-rep-max-calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Health", path: "/health" },
    { name: "One Rep Max Calculator", path: "/one-rep-max-calculator" }
  ]);

  return (
    <CalculatorPageShell
      hero={<CalculatorHero eyebrow="Health Calculator" title="One Rep Max Calculator" />}
      calculator={
        <>
          <Script id="one-rep-max-webapplication-schema" type="application/ld+json">
            {JSON.stringify(webApplicationJsonLd)}
          </Script>
          <Script id="one-rep-max-faq-schema" type="application/ld+json">
            {JSON.stringify(createFaqJsonLd(faqItems))}
          </Script>
          <Script id="one-rep-max-breadcrumb-schema" type="application/ld+json">
            {JSON.stringify(breadcrumbJsonLd)}
          </Script>
          <OneRepMaxCalculator />
        </>
      }
      quickInfo={
        <div className="space-y-3">
          <p className="text-sm leading-7 text-slate-700 sm:text-base">
            Estimate 1RM from a working set and get quick percentage-based training loads.
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
          title="One Rep Max Calculator"
          urlPath="/one-rep-max-calculator"
          shareText="Try this 1RM calculator:"
        />
      }
      sidebar={
        <CalculatorSidebar
          trustBadges={[{ label: "Fast" }, { label: "Free" }, { label: "Private" }, { label: "Mobile Friendly" }]}
          quickLinks={[
            { label: "Calculator", href: "#calculator" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Formulas", href: "#formulas" },
            { label: "Example", href: "#example" },
            { label: "FAQ", href: "#faq" }
          ]}
          tip="Use sets of 3–8 reps for the most stable estimate. Track your 1RM estimate over time (sleep/fatigue can change it week to week)."
        />
      }
      seoContent={
        <>
          <article id="how-it-works" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">How this 1RM calculator works</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                This calculator estimates one rep max (1RM) from a submaximal set. You enter a weight and reps, and the calculator estimates the single-rep
                equivalent.
              </p>
              <p>
                If you’re pairing strength training with a nutrition goal, estimate maintenance calories with the{" "}
                <Link href="/tdee-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  TDEE Calculator
                </Link>
                {" "}
                and set a sustainable target using the{" "}
                <Link href="/calorie-deficit-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  Calorie Deficit Calculator
                </Link>
                .
              </p>
            </div>
          </article>

          <article id="formulas" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">Formulas</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Epley</p>
                <p>1RM = weight × (1 + reps ÷ 30)</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Brzycki</p>
                <p>1RM = weight × (36 ÷ (37 − reps))</p>
              </div>
              <p>
                For higher reps, estimates can vary more. Use a consistent method over time to compare progress.
              </p>
            </div>
          </article>

          <article id="example" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">Example</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                Example: 80 kg for 5 reps.
              </p>
              <div className="rounded-xl bg-slate-50 p-4">
                <p>Epley: 1RM ≈ 80 × (1 + 5/30) ≈ 93 kg</p>
                <p className="mt-2">85% training load ≈ 79 kg</p>
              </div>
              <p>
                For general health context, you can also track body metrics using the{" "}
                <Link href="/bmi-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  BMI Calculator
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
                If you’re combining training with a body composition goal, these tools help with planning:
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

          <RelatedCalculators slug="one-rep-max-calculator" />
        </>
      }
    />
  );
}
