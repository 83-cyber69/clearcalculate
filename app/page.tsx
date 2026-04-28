import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { SmartSearch } from "@/components/search/smart-search";
import { HeroGpaFocus } from "@/components/home/hero-gpa-focus";
import { CategoryCard } from "@/components/shared/category-card";
import { CalculatorCard } from "@/components/shared/calculator-card";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { AdSlot } from "@/components/ads/AdSlot";
import { calculatorItems, categoryItems, categoryRegistry } from "@/lib/calculators";
import { siteConfig } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export const metadata: Metadata = {
  title: {
    absolute: "ClearCalculate - Free Online Calculators | ClearCalculate"
  },
  description:
    "Free online calculators for finance, education, and health. Fast, accurate, and mobile-friendly tools that help you solve everyday calculations quickly.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "ClearCalculate - Free Online Calculators | ClearCalculate",
    description:
      "Use ClearCalculate for fast, accurate online calculators in education, finance, and health.",
    url: siteUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ClearCalculate online calculator tools"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearCalculate - Free Online Calculators | ClearCalculate",
    description:
      "Fast, free calculators for GPA, grades, finance, and more on ClearCalculate.",
    images: [`${siteUrl}/og-image.png`]
  }
};

const faqItems = [
  {
    question: "Are ClearCalculate calculators free?",
    answer:
      "Yes. Every calculator on ClearCalculate is free and available without sign up."
  },
  {
    question: "Are the calculator results accurate?",
    answer:
      "Our formulas follow standard academic and industry methods. Always verify critical decisions with official advisors."
  },
  {
    question: "Can I use this on mobile?",
    answer:
      "Absolutely. The entire site is designed mobile-first, including forms and calculator results."
  }
];

export default function HomePage() {
  return (
    <div className="pb-4">
      <Script id="home-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ClearCalculate",
          url: "https://clearcalculate.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://clearcalculate.com/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </Script>

      <section className="container-max hero-first-screen py-16 sm:py-20 md:py-24">
        <div className="w-full space-y-10 sm:space-y-14 md:space-y-16">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="mb-4">
              <p className="inline-flex rounded-full border border-orange-200 bg-gradient-to-r from-orange-50 via-rose-50 to-blue-50 px-3 py-1 text-xs font-medium text-orange-600">
                Fast, free, and accurate calculators
              </p>
            </div>
            
            <div className="mb-6">
              <h1 className="text-xl font-medium tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
                Free Online Calculators That Make Complex Math Simple
              </h1>
            </div>
            
            <div className="mb-8">
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Trusted calculator tools for finance, education, and health.
              </p>
            </div>
          </div>
          
          <div className="mx-auto max-w-2xl">
            <SmartSearch />
          </div>

          <div className="mx-auto w-full max-w-4xl pt-2">
            <AdSlot variant="top-banner" />
          </div>
        </div>
      </section>

      <section id="categories" className="container-max py-14 sm:py-16">
        <div className="mb-10 text-center">
          <h2 className="section-title">Browse by Category</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {categoryItems.map((item) => {
            const category = categoryRegistry.find((cat: any) => cat.title === item.title);
            return (
              <CategoryCard 
                key={item.title} 
                title={item.title} 
                description={item.description} 
                icon={item.icon}
                slug={category?.slug}
              />
            );
          })}
        </div>
      </section>

      <section id="featured-calculator" className="container-max py-14 sm:py-16">
        <HeroGpaFocus />
      </section>

      <section id="featured" className="container-max py-14 sm:py-16">
        <div className="mb-10 text-center">
          <h2 className="section-title">Featured Calculators</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {calculatorItems.map((item) => (
            <CalculatorCard
              key={item.href}
              title={item.title}
              description={item.description}
              href={item.href}
              icon={item.icon}
              ctaLabel="Launch"
            />
          ))}
        </div>
      </section>

      <section className="container-max py-8 sm:py-10">
        <AdSlot variant="in-content" />
      </section>

      <section id="about" className="container-max py-14 sm:py-16">
        <div className="glass-card accent-warm p-8 sm:p-10">
          <h2 className="section-title">
            About <span className="mr-0.5">Clear</span>
            <span className="text-brand-orange">Calculate</span>
          </h2>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            ClearCalculate is a modern calculator platform focused on speed, clarity, and practical utility.
            Each tool is designed for quick decisions but accurate enough for real planning.
          </p>
        </div>
      </section>

      <section id="faq" className="container-max py-14 sm:py-16">
        <h2 className="mb-10 section-title">Frequently Asked Questions</h2>
        <FAQAccordion items={faqItems} />
      </section>
    </div>
  );
}
