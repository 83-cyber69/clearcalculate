import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalculatorHero } from "@/components/shared/calculator-hero";
import { CalculatorPageShell } from "@/components/shared/calculator-page-shell";
import { ShareButtons } from "@/components/shared/share-buttons";
import { CalculatorSidebar } from "@/components/shared/calculator-sidebar";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { PeriodCalculator } from "@/components/health/period-calculator";
import {
  createBreadcrumbJsonLd,
  createCalculatorMetadata,
  createFaqJsonLd,
  createWebApplicationJsonLd
} from "@/lib/seo";

const pageDescription =
  "Estimate your next period date, ovulation, and fertile window from your last period start and average cycle length. Free period calculator with example and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Period Calculator",
  description: pageDescription,
  path: "/period-calculator",
  titleOverride: "Period Calculator (Next Period, Ovulation, Fertile Window) | ClearCalculate"
});

const faqItems = [
  {
    question: "How does a period calculator work?",
    answer:
      "It uses your last period start date and your average cycle length to estimate your next period. Ovulation is commonly estimated as about 14 days before the next period." 
  },
  {
    question: "How accurate is a period prediction?",
    answer:
      "It’s an estimate. Cycles vary due to stress, sleep, travel, illness, training, and many other factors. Use it as a planning tool, not medical advice." 
  },
  {
    question: "What is a normal cycle length?",
    answer:
      "Many cycles fall roughly between 21 and 35 days, but normal varies by person. If your cycle is consistently very short, very long, or irregular, consider talking to a clinician." 
  },
  {
    question: "What is the fertile window?",
    answer:
      "A common estimate is the 5 days before ovulation and the day of ovulation. This calculator shows an estimated window based on typical timing assumptions." 
  },
  {
    question: "Can I use this to avoid pregnancy?",
    answer:
      "Calendar estimates are not reliable contraception. If you’re trying to avoid pregnancy, use clinically recommended methods and consult a healthcare professional." 
  },
  {
    question: "Can I use this to get pregnant?",
    answer:
      "It can help with planning, but it’s still an estimate. For more precision, some people track ovulation signs or use ovulation tests." 
  },
  {
    question: "What if my cycle is irregular?",
    answer:
      "If your cycle varies a lot, predictions will be less accurate. You can use an average cycle length, but consider tracking for a few months to understand your range." 
  },
  {
    question: "What should I enter if I don’t remember the exact start date?",
    answer:
      "Use your best estimate, then update it when you know the actual start. Predictions depend heavily on the start date." 
  },
  {
    question: "Does the calculator store my data?",
    answer:
      "No. The calculation happens in your browser. Nothing is sent or stored by ClearCalculate." 
  },
  {
    question: "What should I do after using this calculator?",
    answer:
      "Use the dates as a planning estimate. For general health metrics, you can also check BMI or calorie estimates with our other calculators." 
  }
];

export default function PeriodCalculatorPage() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Period Calculator",
    description: pageDescription,
    path: "/period-calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Health", path: "/health" },
    { name: "Period Calculator", path: "/period-calculator" }
  ]);

  return (
    <CalculatorPageShell
      hero={<CalculatorHero eyebrow="Health Calculator" title="Period Calculator" />}
      calculator={
        <>
          <Script id="period-webapplication-schema" type="application/ld+json">
            {JSON.stringify(webApplicationJsonLd)}
          </Script>
          <Script id="period-faq-schema" type="application/ld+json">
            {JSON.stringify(createFaqJsonLd(faqItems))}
          </Script>
          <Script id="period-breadcrumb-schema" type="application/ld+json">
            {JSON.stringify(breadcrumbJsonLd)}
          </Script>
          <PeriodCalculator />
        </>
      }
      quickInfo={
        <div className="space-y-3">
          <p className="text-sm leading-7 text-slate-700 sm:text-base">
            Estimate your next period date, ovulation timing, and fertile window using your average cycle length.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Fast</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Free</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Private</span>
          </div>
        </div>
      }
      quickActions={
        <ShareButtons title="Period Calculator" urlPath="/period-calculator" shareText="Try this period calculator:" />
      }
      sidebar={
        <CalculatorSidebar
          trustBadges={[{ label: "Fast" }, { label: "Free" }, { label: "Private" }, { label: "Mobile Friendly" }]}
          quickLinks={[
            { label: "Calculator", href: "#calculator" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Example", href: "#example" },
            { label: "FAQ", href: "#faq" }
          ]}
          tip="Use averages as a planning tool. If your cycle is irregular or you have concerning symptoms, consult a clinician."
        />
      }
      seoContent={
        <>
          <article id="how-it-works" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">How this period calculator works</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                This calculator estimates your next period date by adding your average cycle length to your last period start date.
                It also estimates ovulation as about 14 days before the next period.
              </p>
              <p>
                The fertile window is commonly estimated as the 5 days before ovulation and the day of ovulation.
              </p>
              <p>
                For general health context, you can also check body metrics using the{" "}
                <Link href="/bmi-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  BMI Calculator
                </Link>
                {" "}
                or nutrition planning numbers using the{" "}
                <Link href="/tdee-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  TDEE Calculator
                </Link>
                .
              </p>
            </div>
          </article>

          <article id="example" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">Example</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                Example: last period started on March 1 with a 28-day average cycle.
              </p>
              <div className="rounded-xl bg-slate-50 p-4">
                <p>Next period estimate: March 29</p>
                <p className="mt-2">Ovulation estimate: about 14 days before (around March 15)</p>
              </div>
              <p>
                Real timing can vary month to month. Use the dates as a planning estimate.
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
                If you’re tracking trends or planning nutrition around training and daily routine, these tools pair well:
              </p>
              <div className="grid gap-2">
                <Link href="/bmi-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  BMI Calculator
                </Link>
                <Link href="/tdee-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  TDEE Calculator
                </Link>
                <Link href="/bmr-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  BMR Calculator
                </Link>
              </div>
            </div>
          </article>

          <RelatedCalculators slug="period-calculator" />
        </>
      }
    />
  );
}
