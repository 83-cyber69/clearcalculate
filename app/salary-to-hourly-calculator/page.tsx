import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { SalaryToHourlyCalculator } from "@/components/calculators/finance/salary-to-hourly-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Convert annual salary into an hourly rate based on your work schedule. Free salary to hourly calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Salary To Hourly Calculator",
  description: pageDescription,
  path: "/salary-to-hourly-calculator",
  titleOverride: "Salary To Hourly Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "How do I convert salary to hourly?",
    answer: "Hourly = Salary / (Hours per Week × Weeks per Year)."
  },
  {
    question: "What weeks per year should I use?",
    answer: "Use 52 for a simple estimate. If you take unpaid time off, reduce the weeks."
  },
  {
    question: "Does this include holidays?",
    answer: "It depends on whether you count paid time off as worked time. For salary planning, 52 is common."
  },
  {
    question: "Why is my hourly rate lower than expected?",
    answer: "If you work more than 40 hours/week, the effective hourly rate is lower when spread over more hours."
  },
  {
    question: "Can I use this for part-time work?",
    answer: "Yes. Enter your actual hours/week and weeks/year."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Salary To Hourly Calculator",
    description: pageDescription,
    path: "/salary-to-hourly-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Finance", path: "/finance" },
    { name: "Salary To Hourly Calculator", path: "/salary-to-hourly-calculator" }
  ]);

  return (
    <>
      <Script id="salary-hourly-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="salary-hourly-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="salary-hourly-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Finance Calculator"
        title="Salary To Hourly Calculator"
        calculator={<SalaryToHourlyCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Salary To Hourly Calculator" urlPath="/salary-to-hourly-calculator" shareText="Try this salary to hourly calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your annual salary.</li>
                <li>Enter your typical hours/week and weeks/year.</li>
                <li>The calculator estimates an hourly rate.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Hourly = Salary / (Hours/Week × Weeks/Year)
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                $85,000 / (40×52) ≈ $40.87/hr
              </div>
            </article>
            <FAQSection items={faqItems} />
            <RelatedCalculators slug="salary-to-hourly-calculator" />
          </>
        }
      />
    </>
  );
}
