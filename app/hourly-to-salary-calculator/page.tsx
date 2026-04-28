import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { HourlyToSalaryCalculator } from "@/components/calculators/finance/hourly-to-salary-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Convert hourly pay into an annual salary (and monthly estimate). Free hourly to salary calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Hourly To Salary Calculator",
  description: pageDescription,
  path: "/hourly-to-salary-calculator",
  titleOverride: "Hourly To Salary Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "How do I convert hourly wage to salary?",
    answer: "Hourly Rate × Hours per Week × Weeks per Year."
  },
  {
    question: "What hours per week should I use?",
    answer: "Most full-time jobs use 40 hours/week, but you can enter your actual schedule."
  },
  {
    question: "Should I use 52 weeks?",
    answer:
      "Use 52 for a full-year estimate. If you take unpaid time off, reduce the weeks to match."
  },
  {
    question: "Does this include overtime?",
    answer: "Not automatically. If overtime is regular, increase your hours/week to match your typical week."
  },
  {
    question: "Is monthly salary just yearly / 12?",
    answer: "For planning, yes. Actual paychecks depend on pay frequency and payroll rules."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Hourly To Salary Calculator",
    description: pageDescription,
    path: "/hourly-to-salary-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Finance", path: "/finance" },
    { name: "Hourly To Salary Calculator", path: "/hourly-to-salary-calculator" }
  ]);

  return (
    <>
      <Script id="hourly-salary-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="hourly-salary-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="hourly-salary-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Finance Calculator"
        title="Hourly To Salary Calculator"
        calculator={<HourlyToSalaryCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Hourly To Salary Calculator" urlPath="/hourly-to-salary-calculator" shareText="Try this hourly to salary calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your hourly rate.</li>
                <li>Enter hours per week and weeks per year.</li>
                <li>The calculator estimates annual and monthly salary.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Salary = Hourly Rate × Hours/Week × Weeks/Year
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                $25/hr × 40 hrs/week × 52 weeks = $52,000/year
              </div>
            </article>
            <FAQSection items={faqItems} />
            <RelatedCalculators slug="hourly-to-salary-calculator" />
          </>
        }
      />
    </>
  );
}
