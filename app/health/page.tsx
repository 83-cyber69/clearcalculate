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
import { AdSlot } from "@/components/ads/AdSlot";

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
  }
];

export default function HealthPage() {
  return (
    <div className="pb-4">
      <Script id="health-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <section className="container-max hero-first-screen py-4 sm:py-6 md:py-8">
        <div className="w-full space-y-5 sm:space-y-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 px-3 py-1 text-xs font-semibold text-red-700">
              <Activity className="h-3 w-3" />
              Health Tools
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Health & Fitness Calculators
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Calculate your TDEE, plan nutrition, and reach your fitness goals with our 
              science-based health calculators. Free and instant results.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
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
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <SmartSearch />
          </div>
        </div>
      </section>

      <section className="container-max py-12">
        <div className="mb-7">
          <h2 className="section-title">Health & Fitness Calculators</h2>
          <p className="section-lead">Science-based tools to help you achieve your wellness and fitness goals.</p>
        </div>
        
        {healthCalculators.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {healthCalculators.slice(0, 3).map((calculator) => (
              <CalculatorCard
                key={calculator.id}
                title={calculator.name}
                description={calculator.description}
                href={`/${calculator.slug}`}
                icon={calculator.icon}
                ctaLabel="Calculate"
              />
            ))}
            <AdSlot variant="in-content" />
            {healthCalculators.slice(3).map((calculator) => (
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
        ) : (
          <div className="text-center py-12">
            <Activity className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Coming Soon</h3>
            <p className="text-slate-600">We're working on more health calculators. Check back soon!</p>
          </div>
        )}
      </section>

      <section className="container-max py-14">
        <div className="glass-card accent-warm p-8 sm:p-10">
          <h2 className="section-title">Why Trust Our Health Tools</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
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

      <section className="container-max py-14">
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
                  className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-orange-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border border-slate-200 bg-white p-2">
                      <Icon className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-orange-600">
                        {category.title} Calculators
                      </h3>
                      <p className="text-sm text-slate-600">{category.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 transition-colors group-hover:text-orange-600" />
                </Link>
              );
            })}
        </div>
      </section>

      <section className="container-max py-14">
        <h2 className="mb-7 section-title">Frequently Asked Questions</h2>
        <FAQAccordion items={faqItems} />
      </section>
    </div>
  );
}
