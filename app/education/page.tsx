import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Search, ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalculatorCard } from "@/components/shared/calculator-card";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { SmartSearch } from "@/components/search/smart-search";
import { getCalculatorsByCategory, categoryRegistry } from "@/lib/calculators";
import { siteConfig } from "@/lib/utils";
import { createFaqJsonLd } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export const metadata: Metadata = {
  title: {
    default: "Education Calculators | ClearCalculate",
    template: "%s | ClearCalculate"
  },
  description: "Free education calculators for GPA, grades, and academic planning. Calculate your GPA instantly and plan your academic goals with our student tools.",
  alternates: {
    canonical: "/education"
  },
  openGraph: {
    title: "Education Calculators | ClearCalculate",
    description: "Free education calculators for GPA, grades, and academic planning. Calculate your GPA instantly and plan your academic goals.",
    url: `${siteUrl}/education`,
    type: "website"
  }
};

const educationCategory = categoryRegistry.find(cat => cat.title === "Education");
const educationCalculators = getCalculatorsByCategory("Education");

const faqItems = [
  {
    question: "How accurate is the GPA calculator?",
    answer: "Our GPA calculator uses standard 4.0 scale formulas and supports both weighted and unweighted calculations. Results are accurate for most US high school and college systems."
  },
  {
    question: "Can I calculate my cumulative GPA?",
    answer: "Yes, you can input multiple courses and their credit hours to calculate both semester and cumulative GPA. The calculator automatically handles weighted courses."
  },
  {
    question: "What grading scales are supported?",
    answer: "The calculator supports the standard 4.0 scale (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0) and can handle weighted grades for AP, honors, and IB courses."
  },
  {
    question: "Is this calculator free for students?",
    answer: "Yes, all education calculators on ClearCalculate are completely free with no sign-up required. Perfect for students, parents, and educators."
  }
];

export default function EducationPage() {
  return (
    <div className="pb-4">
      <Script id="education-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <section className="container-max hero-first-screen py-4 sm:py-6 md:py-8">
        <div className="w-full space-y-5 sm:space-y-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <GraduationCap className="h-3 w-3" />
              Education Tools
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Student Planning & Academic Calculators
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Free tools designed for students to track grades, calculate GPA, and plan academic success. 
              No signup required, instant results.
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
          <h2 className="section-title">Education Calculators</h2>
          <p className="section-lead">Tools designed specifically for students and academic planning.</p>
        </div>
        
        {educationCalculators.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {educationCalculators.map((calculator) => (
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
            <GraduationCap className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Coming Soon</h3>
            <p className="text-slate-600">We're working on more education calculators. Check back soon!</p>
          </div>
        )}
      </section>

      <section className="container-max py-14">
        <div className="glass-card accent-warm p-8 sm:p-10">
          <h2 className="section-title">Why Students Choose ClearCalculate</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Instant Results</h3>
              <p className="text-sm text-slate-600">Get your GPA calculations immediately without complex spreadsheets or manual math.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Mobile Friendly</h3>
              <p className="text-sm text-slate-600">Calculate on any device. Perfect for checking grades between classes or on the go.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Always Free</h3>
              <p className="text-sm text-slate-600">No subscriptions, no ads, no sign-ups. Just free tools for student success.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-max py-14">
        <h2 className="mb-7 section-title">Related Categories</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {categoryRegistry
            .filter(cat => cat.title !== "Education")
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
