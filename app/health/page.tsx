import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Activity } from "lucide-react";
import { CalculatorCard } from "@/components/shared/calculator-card";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { SmartSearch } from "@/components/search/smart-search";
import { getCalculatorsByCategory, categoryRegistry } from "@/lib/calculators";
import { siteConfig } from "@/lib/utils";
import { createFaqJsonLd } from "@/lib/seo";
import { AdBlock } from "@/components/ads/AdBlock";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export const metadata: Metadata = {
  title: {
    default: "Health & Fitness Calculators | ClearCalculate",
    template: "%s | ClearCalculate"
  },
  description: "Free health calculators for TDEE, calories, nutrition, and fitness goals. Calculate your daily energy expenditure and plan your diet effectively.",
  alternates: {
    canonical: "/health"
  },
  openGraph: {
    title: "Health & Fitness Calculators | ClearCalculate",
    description: "Free health calculators for TDEE, calories, nutrition, and fitness goals. Calculate your daily energy expenditure and plan your diet.",
    url: `${siteUrl}/health`,
    type: "website"
  }
};

const healthCategory = categoryRegistry.find(cat => cat.title === "Health");
const healthCalculators = getCalculatorsByCategory("Health");

const faqItems = [
  {
    question: "What is TDEE and why is it important?",
    answer: "TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day. It's crucial for weight management, muscle building, and achieving your fitness goals."
  },
  {
    question: "How accurate is the TDEE calculator?",
    answer: "Our TDEE calculator uses proven formulas like Mifflin-St Jeor and Harris-Benedict, which are accurate for most people. Individual metabolism can vary, so use results as a starting point and adjust based on your progress."
  },
  {
    question: "Should I use maintenance, cut, or bulk calories?",
    answer: "Use maintenance calories to maintain your current weight, cut calories (15-20% below TDEE) for weight loss, and bulk calories (10-20% above TDEE) for muscle gain. Always consult a healthcare provider for major dietary changes."
  },
  {
    question: "What factors affect my TDEE?",
    answer: "TDEE is affected by your basal metabolic rate (BMR), activity level, age, gender, height, and weight. The calculator accounts for all these factors to provide a personalized estimate."
  },
  {
    question: "What’s the difference between BMR and TDEE?",
    answer:
      "BMR is your resting calorie burn at complete rest. TDEE adds activity and movement on top of BMR to estimate your total daily calorie needs."
  },
  {
    question: "How do I pick the right activity level?",
    answer:
      "Choose the option that matches your average week, not your best week. If you’re unsure, pick a lower activity level and adjust based on 2–3 weeks of real weight trends."
  },
  {
    question: "How big should my calorie deficit be?",
    answer:
      "Many people start with a 300–500 calorie deficit per day. Bigger deficits can cause more hunger and reduce performance. Sustainable progress usually beats aggressive targets."
  },
  {
    question: "Why isn’t my weight changing even if I’m in a deficit?",
    answer:
      "Common causes include underestimating intake, overestimating activity, water retention, or reduced daily movement (NEAT). Use weekly averages and adjust gradually."
  },
  {
    question: "Can I lose fat and build muscle at the same time?",
    answer:
      "Body recomposition is possible, especially for beginners or people returning to training. Strength training, adequate protein, and a moderate deficit usually work better than extreme cuts."
  },
  {
    question: "How should I use body fat and IBW estimates?",
    answer:
      "Use them as context and trend tools. Tape-based body fat estimates are sensitive to measurement technique, and IBW is a height-based reference point rather than a strict target."
  }
];

export default function HealthPage() {
  return (
    <div className="pb-4">
      <Script id="health-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 hero-first-screen py-4 sm:py-6 md:py-7">
        <div className="w-full space-y-5 sm:space-y-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
              <Activity className="h-3 w-3" />
              Health Tools
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Health & Fitness Calculators
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Estimate maintenance calories, set a realistic deficit, and track progress with clear numbers.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
        {healthCalculators.length > 0 ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch auto-rows-fr">
              {healthCalculators.map((calculator) => (
                <CalculatorCard
                  key={calculator.id}
                  title={calculator.name}
                  description={calculator.description}
                  href={`/${calculator.slug}`}
                  icon={calculator.icon}
                  ctaLabel="Calculate"
                />
              ))}
            </div>
            <AdBlock slot="5496259471" className="mx-auto max-w-4xl" />
          </>
        ) : (
          <div className="text-center py-12">
            <Activity className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Coming Soon</h3>
            <p className="text-slate-600">We're working on more health calculators. Check back soon!</p>
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1fr)_320px] md:items-center">
          <div className="text-sm text-slate-600">
            Browse all tools on the {" "}
            <Link href="/" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
              ClearCalculate homepage
            </Link>
            {" "}
            or explore the
            {" "}
            <Link href="/calculators" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
              full calculator directory
            </Link>
            .
          </div>
          <div className="md:justify-self-end w-full max-w-2xl">
            <SmartSearch />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl overflow-x-clip px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div className="min-w-0 max-w-full space-y-8">
            <article className="glass-card max-w-none p-6 text-safe sm:p-8">
              <h2 className="section-title">How to use these health calculators</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Most health and fitness planning is easier when you start with energy balance. Get a reasonable estimate of maintenance calories, then
                choose a goal (lose fat, maintain, gain muscle) and make small adjustments based on weekly trends.
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Recommended order:
                </p>
                <ol className="list-decimal space-y-2 pl-5">
                  <li>
                    Estimate maintenance with the{" "}
                    <Link href="/tdee-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      TDEE Calculator
                    </Link>
                    .
                  </li>
                  <li>
                    Convert maintenance into a target using the{" "}
                    <Link href="/calorie-deficit-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Calorie Deficit Calculator
                    </Link>
                    .
                  </li>
                  <li>
                    Track body composition context with the{" "}
                    <Link href="/body-fat-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Body Fat Calculator
                    </Link>
                    and use the{" "}
                    <Link href="/ideal-body-weight-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Ideal Body Weight Calculator
                    </Link>
                    as a simple height-based reference.
                  </li>
                </ol>
              </div>
            </article>

            <article className="glass-card max-w-none p-6 text-safe sm:p-8">
              <h2 className="section-title">The core idea: maintenance + adjustment</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Maintenance calories are the level where your weight tends to stay stable over time. A cut or bulk is simply an adjustment above or below
                that baseline.
              </p>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                <p>
                  <strong>Target calories</strong> = TDEE ± adjustment
                </p>
                <p className="mt-2">
                  Example: if TDEE is 2,400 and you cut 400 calories, target = 2,000 kcal/day
                </p>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                The “right” adjustment is the one you can stick to while sleeping well, training effectively, and maintaining reasonable hunger levels.
              </p>
            </article>

            <article className="glass-card max-w-none p-6 text-safe sm:p-8">
              <h2 className="section-title">Common mistakes (and how to avoid them)</h2>
              <ul className="mt-4 max-w-full list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 sm:text-base">
                <li>Choosing an activity level that overestimates your average movement.</li>
                <li>Going too aggressive on deficit and burning out after 1–2 weeks.</li>
                <li>Judging progress by day-to-day scale weight rather than weekly averages.</li>
                <li>Expecting perfect precision: calculators are estimates—use them to iterate.</li>
              </ul>
            </article>

            <article className="glass-card max-w-none p-6 text-safe sm:p-8">
              <h2 className="section-title">Which calculator should you use?</h2>
              <div className="mt-4 w-full max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Goal</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Best tool</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">What to focus on</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Find maintenance calories</td>
                      <td className="py-3 pr-4">
                        <Link href="/tdee-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                          TDEE Calculator
                        </Link>
                      </td>
                      <td className="py-3 pr-4">Maintenance target + goal calories</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Pick a cut target</td>
                      <td className="py-3 pr-4">
                        <Link href="/calorie-deficit-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                          Calorie Deficit
                        </Link>
                      </td>
                      <td className="py-3 pr-4">Daily target and implied weekly change</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Estimate body fat</td>
                      <td className="py-3 pr-4">
                        <Link href="/body-fat-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                          Body Fat
                        </Link>
                      </td>
                      <td className="py-3 pr-4">Trend over time with consistent measuring</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Reference a height-based weight estimate</td>
                      <td className="py-3 pr-4">
                        <Link href="/ideal-body-weight-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                          Ideal Body Weight
                        </Link>
                      </td>
                      <td className="py-3 pr-4">Context for planning, not a strict target</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>

          <aside className="min-w-0 max-w-full space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-base font-semibold text-slate-900">Quick start</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                If you do just two things, estimate maintenance and choose a realistic deficit. Then track your weekly averages and adjust.
              </p>
              <div className="mt-4 space-y-2">
                <Link href="/tdee-calculator" className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 hover:border-orange-200 hover:text-orange-700">
                  Open TDEE Calculator
                </Link>
                <Link href="/calorie-deficit-calculator" className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 hover:border-orange-200 hover:text-orange-700">
                  Open Calorie Deficit
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-card accent-warm p-6 sm:p-10">
          <h2 className="section-title">Why Trust Our Health Tools</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Science-Based</h3>
              <p className="text-sm text-slate-600">Our calculators use proven scientific formulas and methods trusted by health professionals.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Personalized Results</h3>
              <p className="text-sm text-slate-600">Get calculations tailored to your specific body metrics, activity level, and goals.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Goal Oriented</h3>
              <p className="text-sm text-slate-600">Whether you're cutting, bulking, or maintaining, get the exact numbers you need.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="mb-7 section-title">Related Categories</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {categoryRegistry
            .filter(cat => cat.title !== "Health")
            .map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="group flex w-full min-w-0 max-w-full flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-orange-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="shrink-0 rounded-lg border border-slate-200 bg-white p-2">
                      <Icon className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 group-hover:text-orange-600">
                        {category.title} Calculators
                      </h3>
                      <p className="break-words text-sm text-slate-600">{category.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-orange-600" />
                </Link>
              );
            })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="mb-7 section-title">Frequently Asked Questions</h2>
        <FAQAccordion items={faqItems} />
      </section>
    </div>
  );
}
