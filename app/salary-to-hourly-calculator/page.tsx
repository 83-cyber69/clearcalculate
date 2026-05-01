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
  },
  {
    question: "Is this the same as my overtime rate?",
    answer:
      "No. This is an effective hourly rate (salary divided by total hours). Overtime rates are typically defined by labor rules and may not apply to exempt salaried roles."
  },
  {
    question: "What if I work 50–60 hours per week?",
    answer:
      "Increase hours/week to match reality. The effective hourly rate can drop a lot when a fixed salary is spread over more hours."
  },
  {
    question: "Should I subtract vacation weeks?",
    answer:
      "If you’re comparing pay for time actually worked, you can reduce weeks/year. If you have paid vacation, many people keep 52 for a salary comparison."
  },
  {
    question: "Does this include bonuses or benefits?",
    answer:
      "No. Add expected bonuses to salary if you want an average-year estimate, and consider benefits separately as part of total compensation."
  },
  {
    question: "How do I compare two salary offers with different hours expectations?",
    answer:
      "Convert both to an effective hourly rate using the expected hours/week. This often reveals that a higher salary can be less attractive if the workload is much higher."
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
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Salary-to-hourly conversion is useful when you want to compare offers or understand your “effective” hourly rate. The math is simply dividing
                annual salary by total hours worked in a year, which depends on your weekly schedule.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your annual salary.</li>
                <li>Enter your typical hours/week and weeks/year.</li>
                <li>The calculator estimates an hourly rate.</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                The most common reason the hourly number looks “too low” is simply that the real hours/week are higher than 40.
              </p>
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

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  This is an effective hourly rate for comparison—not a payroll hourly rate.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    If expected hours/week are higher, the effective hourly rate drops.
                  </li>
                  <li>
                    If you have paid time off, keeping 52 weeks can be reasonable for offer comparison.
                  </li>
                </ul>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Assuming salaried employees receive overtime pay.</li>
                <li>Using 40 hours/week when the role realistically expects 45–60.</li>
                <li>Ignoring bonuses and benefits when comparing total compensation.</li>
                <li>Mixing “weeks worked” with “weeks paid” depending on the purpose of the comparison.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Comparison table</h2>
              <div className="mt-4 w-full max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Scenario</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Hours/week</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Effect on hourly</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Standard workload</td>
                      <td className="py-3 pr-4">40</td>
                      <td className="py-3 pr-4">Baseline</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Busy role</td>
                      <td className="py-3 pr-4">50</td>
                      <td className="py-3 pr-4">~20% lower hourly vs 40</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">High intensity</td>
                      <td className="py-3 pr-4">60</td>
                      <td className="py-3 pr-4">~33% lower hourly vs 40</td>
                    </tr>
                  </tbody>
                </table>
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
