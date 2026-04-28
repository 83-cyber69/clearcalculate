import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalculatorCard } from "@/components/shared/calculator-card";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { SmartSearch } from "@/components/search/smart-search";
import { calculatorRegistry, categoryRegistry } from "@/lib/calculators";
import { createFaqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export const metadata: Metadata = {
  title: {
    default: "All Calculators | ClearCalculate",
    template: "%s | ClearCalculate"
  },
  description:
    "Browse all ClearCalculate tools in one place. Free calculators for GPA, take-home pay, calories, and more. Find the right tool fast.",
  alternates: {
    canonical: "/calculators"
  },
  openGraph: {
    title: "All Calculators | ClearCalculate",
    description:
      "Browse all ClearCalculate tools in one place. Free calculators for GPA, take-home pay, calories, and more.",
    url: `${siteUrl}/calculators`,
    type: "website"
  }
};

const faqItems = [
  {
    question: "Are ClearCalculate calculators free?",
    answer: "Yes. All calculators are free to use with no sign-up required."
  },
  {
    question: "Do you store my inputs?",
    answer: "No. Calculations run in your browser and we do not collect your calculator inputs."
  },
  {
    question: "How do I find the right calculator?",
    answer:
      "Use the search bar to type what you want to calculate (GPA, calories, take-home pay). You can also browse by category."
  },
  {
    question: "Can I share a calculator with someone?",
    answer:
      "Yes. Each calculator page has a copy link button so you can share the exact tool with a friend, coworker, or student."
  },
  {
    question: "How often do you add new calculators?",
    answer:
      "We add new calculators over time based on common real-world questions. Check back or use search to see what’s new."
  }
];

export default function CalculatorsHubPage() {
  return (
    <div className="pb-4">
      <Script id="calculators-hub-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>

      <section className="container-max hero-first-screen py-4 sm:py-6 md:py-8">
        <div className="w-full space-y-5 sm:space-y-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              Browse All Tools
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-3xl">All Calculators</h1>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Find a free calculator for school, money, or health. Start with search, or browse categories below.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              New here? Visit the{" "}
              <Link
                href="/"
                className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600"
              >
                ClearCalculate homepage
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
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-lead">Jump straight to the calculators you need.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {categoryRegistry.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-orange-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-2">
                  <cat.icon className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-orange-600">{cat.title}</h3>
                  <p className="text-sm text-slate-600">{cat.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-max py-12">
        <div className="mb-7">
          <h2 className="section-title">All Tools</h2>
          <p className="section-lead">High-intent calculators designed to answer common questions fast.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {calculatorRegistry.map((calculator) => (
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
      </section>

      <section className="container-max py-14">
        <h2 className="mb-7 section-title">Frequently Asked Questions</h2>
        <FAQAccordion items={faqItems} />
      </section>
    </div>
  );
}
