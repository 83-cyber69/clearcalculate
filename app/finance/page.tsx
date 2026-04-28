import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Landmark } from "lucide-react";
import { CalculatorCard } from "@/components/shared/calculator-card";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { SmartSearch } from "@/components/search/smart-search";
import { getCalculatorsByCategory, categoryRegistry } from "@/lib/calculators";
import { siteConfig } from "@/lib/utils";
import { createFaqJsonLd } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export const metadata: Metadata = {
  title: {
    default: "Finance Calculators | ClearCalculate",
    template: "%s | ClearCalculate"
  },
  description: "Free finance calculators for budgeting, taxes, salary, and financial planning. Calculate take-home pay, estimate taxes, and make informed financial decisions.",
  alternates: {
    canonical: "/finance"
  },
  openGraph: {
    title: "Finance Calculators | ClearCalculate",
    description: "Free finance calculators for budgeting, taxes, salary, and financial planning. Calculate take-home pay and make informed financial decisions.",
    url: `${siteUrl}/finance`,
    type: "website"
  }
};

const financeCategory = categoryRegistry.find(cat => cat.title === "Finance");
const financeCalculators = getCalculatorsByCategory("Finance");

const faqItems = [
  {
    question: "How accurate is the take-home pay calculator?",
    answer: "Our calculator uses current federal tax tables and standard deduction amounts. Results are estimates and may vary based on your specific situation, state taxes, and other deductions."
  },
  {
    question: "Does the calculator include state taxes?",
    answer: "The take-home pay calculator provides federal tax estimates. State taxes vary significantly by location, so we recommend checking your state's tax website for precise calculations."
  },
  {
    question: "What deductions are included?",
    answer: "The calculator accounts for federal income tax, Social Security, and Medicare taxes. You can also input additional pre-tax deductions like 401(k) contributions and health insurance premiums."
  },
  {
    question: "Is my financial data secure?",
    answer: "Yes, all calculations happen in your browser. We don't store or transmit any of your financial information. Your privacy and security are our priority."
  }
];

export default function FinancePage() {
  return (
    <div className="pb-4">
      <Script id="finance-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <section className="container-max hero-first-screen py-4 sm:py-6 md:py-8">
        <div className="w-full space-y-5 sm:space-y-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 px-3 py-1 text-xs font-semibold text-green-700">
              <Landmark className="h-3 w-3" />
              Finance Tools
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Financial Planning & Budget Calculators
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Make informed financial decisions with our free calculators. Estimate take-home pay, 
              plan budgets, and understand your finances better.
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
          <h2 className="section-title">Finance Calculators</h2>
          <p className="section-lead">Tools to help you make smarter financial decisions and plan your budget.</p>
        </div>
        
        {financeCalculators.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {financeCalculators.map((calculator) => (
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
            <Landmark className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Coming Soon</h3>
            <p className="text-slate-600">We're working on more finance calculators. Check back soon!</p>
          </div>
        )}
      </section>

      <section className="container-max py-14">
        <div className="glass-card accent-warm p-8 sm:p-10">
          <h2 className="section-title">Why Choose Our Finance Tools</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Up-to-Date Calculations</h3>
              <p className="text-sm text-slate-600">Our calculators use current tax tables and financial formulas for accurate estimates.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Privacy First</h3>
              <p className="text-sm text-slate-600">All calculations happen in your browser. We never store or transmit your financial data.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Easy to Use</h3>
              <p className="text-sm text-slate-600">No complex forms or financial jargon. Just simple, clear calculations when you need them.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-max py-14">
        <h2 className="mb-7 section-title">Related Categories</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {categoryRegistry
            .filter(cat => cat.title !== "Finance")
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
