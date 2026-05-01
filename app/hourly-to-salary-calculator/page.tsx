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
  },
  {
    question: "What if I work part-time?",
    answer: "Enter your actual hours/week and the weeks you expect to work in the year."
  },
  {
    question: "What if I only work 48 weeks per year?",
    answer:
      "Use 48 to reflect unpaid time off, seasonal schedules, or gaps between contracts. It reduces the annual salary estimate accordingly."
  },
  {
    question: "Does this include benefits?",
    answer:
      "No. This converts pay rate into gross salary only. Benefits like insurance and retirement match can add meaningful total compensation."
  },
  {
    question: "Can I use this to compare contract vs salary jobs?",
    answer:
      "Yes. Convert the hourly contract rate into an annual estimate, then separately account for unpaid time off, taxes, and benefits differences."
  },
  {
    question: "Why might my annualized number feel too high?",
    answer:
      "If your hourly rate includes overtime weeks or irregular schedules, using 40 hours and 52 weeks can overstate a realistic annual total."
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
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Hourly-to-salary conversions are simple in math but easy to get wrong in assumptions. The key is using realistic hours per week and the
                number of weeks you actually work in a year.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your hourly rate.</li>
                <li>Enter hours per week and weeks per year.</li>
                <li>The calculator estimates annual and monthly salary.</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Use this for planning and comparisons. If you want after-tax pay, convert the annual number into take-home using a paycheck calculator.
              </p>
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

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  The yearly estimate is your gross pay before taxes and benefits. The monthly estimate is a simple yearly ÷ 12 planning number.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>If you take unpaid time off, reduce weeks/year.</li>
                  <li>If your hours vary, use an average across a typical month.</li>
                </ul>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Assuming 52 paid weeks when you have unpaid gaps or seasonal work.</li>
                <li>Forgetting that overtime may have a different rate than your base hourly wage.</li>
                <li>Using monthly salary for budgeting without accounting for taxes/benefits.</li>
                <li>Comparing hourly vs salary without including benefits and paid time off.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Comparison table</h2>
              <div className="mt-4 w-full max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Schedule</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Weeks/year assumption</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">When to use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Full-time employee</td>
                      <td className="py-3 pr-4">52</td>
                      <td className="py-3 pr-4">Salaried-style annualization</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Seasonal / contract</td>
                      <td className="py-3 pr-4">46–50</td>
                      <td className="py-3 pr-4">Unpaid gaps or time off</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Part-time</td>
                      <td className="py-3 pr-4">Your actual</td>
                      <td className="py-3 pr-4">Realistic annual pay</td>
                    </tr>
                  </tbody>
                </table>
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
