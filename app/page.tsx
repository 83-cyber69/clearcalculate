import Link from "next/link";
import Script from "next/script";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryCard } from "@/components/shared/category-card";
import { CalculatorCard } from "@/components/shared/calculator-card";
import { FAQAccordion } from "@/components/shared/faq-accordion";

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

      <section className="container-max py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex rounded-full border border-orange-200 bg-gradient-to-r from-orange-50 via-rose-50 to-blue-50 px-3 py-1 text-xs font-semibold text-orange-700">
            Fast, free, and accurate calculators
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
            Free Online Calculators That Make Complex Math Simple
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Get instant answers with clean calculators for personal finance, education, and
            health goals. Built for students, families, and professionals.
          </p>
          <div className="mx-auto mt-9 flex max-w-xl gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input placeholder="Search calculators..." className="h-11 pl-9" />
            </div>
            <Link href="/gpa-calculator">
              <Button size="lg">Explore Tools</Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="categories" className="container-max py-12">
        <div className="mb-7">
          <h2 className="section-title">Categories</h2>
          <p className="section-lead">Choose calculators by your goal and use case.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <CategoryCard
            title="Personal Finance"
            description="Budgeting, loan estimates, savings growth, and investment planning tools."
          />
          <CategoryCard
            title="Education"
            description="GPA, grade, and study planning calculators to help you stay on track."
          />
          <CategoryCard
            title="Health & Fitness"
            description="Track BMI, calorie needs, and other practical wellness metrics."
          />
        </div>
      </section>

      <section id="featured" className="container-max py-14">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Featured Calculators</h2>
            <p className="section-lead">Popular tools users love right now.</p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <CalculatorCard
            title="GPA Calculator"
            description="Calculate unweighted and weighted GPA with instant updates."
            href="/gpa-calculator"
          />
          <CalculatorCard
            title="Final Grade Calculator"
            description="Estimate what score you need on your final to hit your target."
            href="/"
          />
          <CalculatorCard
            title="College GPA Calculator"
            description="Project your cumulative GPA semester by semester."
            href="/"
          />
        </div>
      </section>

      <section className="container-max py-14">
        <div className="glass-card accent-warm p-8 sm:p-10">
          <h2 className="section-title">About ClearCalculate</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            ClearCalculate is a modern calculator platform focused on speed, clarity, and practical
            utility. We design each tool to be simple enough for quick decisions but accurate enough
            for real planning. Every page is optimized for mobile, SEO, and fast loading so people
            can get answers quickly from any device.
          </p>
        </div>
      </section>

      <section id="faq" className="container-max py-14">
        <h2 className="mb-7 section-title">Frequently Asked Questions</h2>
        <FAQAccordion items={faqItems} />
      </section>
    </div>
  );
}
