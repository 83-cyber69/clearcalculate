import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { SalaryAfterTaxesCalculator } from "@/components/calculators/finance/salary-after-taxes-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Estimate salary after taxes using an effective tax rate. Free salary after taxes calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Salary After Taxes Calculator",
  description: pageDescription,
  path: "/salary-after-taxes-calculator",
  titleOverride: "Salary After Taxes Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "What is an effective tax rate?",
    answer:
      "It’s the average percent of your income you pay in taxes after deductions and credits—not your top bracket."
  },
  {
    question: "How do I estimate my effective tax rate?",
    answer:
      "You can use last year’s total tax divided by total income as a starting estimate, then adjust if your income changes."
  },
  {
    question: "Does this include payroll taxes?",
    answer:
      "Only if you include them in the effective tax rate you enter. For a detailed breakdown, use the Take Home Pay Calculator."
  },
  {
    question: "Is this exact?",
    answer:
      "No. It’s a fast estimate for planning. Real taxes depend on filing status, deductions, and state rules."
  },
  {
    question: "What’s a typical effective tax rate?",
    answer:
      "It varies by income and location, but many people fall between 15% and 30% when combining federal, state, and payroll taxes."
  },
  {
    question: "What’s the difference between effective tax rate and marginal tax rate?",
    answer:
      "Marginal rate is the rate on your last dollar of income (your top bracket). Effective rate is total tax divided by total income—usually lower."
  },
  {
    question: "Should I use pre-tax or after-tax deductions in the rate?",
    answer:
      "Effective tax rate usually already reflects deductions. If you also subtract retirement/benefits separately, you may double-count the impact."
  },
  {
    question: "Why can two people with the same salary have different effective tax rates?",
    answer:
      "Filing status, deductions, credits, state taxes, and benefit choices can all change taxable income and the final effective rate."
  },
  {
    question: "Is net salary the same as take-home pay?",
    answer:
      "Not always. Net salary after taxes does not automatically include retirement contributions, health insurance, or other payroll deductions unless you account for them separately."
  },
  {
    question: "How do I convert yearly net salary to monthly take-home?",
    answer:
      "A quick estimate is yearly net salary ÷ 12. For per-paycheck estimates, use your pay frequency and a paycheck-style calculator."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Salary After Taxes Calculator",
    description: pageDescription,
    path: "/salary-after-taxes-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Finance", path: "/finance" },
    { name: "Salary After Taxes Calculator", path: "/salary-after-taxes-calculator" }
  ]);

  return (
    <>
      <Script id="salary-after-taxes-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="salary-after-taxes-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="salary-after-taxes-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Finance Calculator"
        title="Salary After Taxes Calculator"
        calculator={<SalaryAfterTaxesCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Salary After Taxes Calculator" urlPath="/salary-after-taxes-calculator" shareText="Try this salary after taxes calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                This calculator is a fast way to estimate how much of your salary you keep after taxes using one input: an <strong>effective tax rate</strong>.
                Effective tax rate is the share of your income that goes to taxes overall. It’s different from your marginal bracket because not all income is
                taxed at the top rate.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your gross salary.</li>
                <li>Enter an estimated effective tax rate.</li>
                <li>The calculator estimates taxes and net salary.</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Use this when you want a quick planning number. If you need a more paycheck-like breakdown (FICA, retirement %, benefits), the Take Home Pay
                Calculator will be more realistic.
              </p>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Net Salary = Gross Salary × (1 − Tax Rate)
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  This model assumes the tax rate you enter is an average across your whole income. It won’t capture bracket boundaries, credits, or itemized
                  deductions, but it’s often good enough for “ballpark” comparisons.
                </p>
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                $85,000 with 25% effective tax → net ≈ $63,750
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  The estimated net salary is what remains after taxes at the rate you chose. Treat it as a planning baseline.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    If you’re comparing job offers, test multiple effective rates (for example 18%, 25%, 30%) to see a range.
                  </li>
                  <li>
                    If you also plan to subtract benefits/retirement separately, make sure the tax rate you use matches your assumptions.
                  </li>
                </ul>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Using a marginal bracket (top rate) as the effective rate.</li>
                <li>Double-counting payroll deductions by both lowering the tax rate and subtracting deductions separately.</li>
                <li>Forgetting state and payroll taxes when estimating the rate.</li>
                <li>Assuming the output equals paycheck take-home without benefits/retirement included.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Comparison table</h2>
              <div className="mt-4 w-full max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Approach</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Best for</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Tradeoff</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Effective rate estimate (this page)</td>
                      <td className="py-3 pr-4">Fast net-salary planning</td>
                      <td className="py-3 pr-4">Less accurate for real paychecks</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Paycheck-style take-home</td>
                      <td className="py-3 pr-4">Budgeting and cash-flow estimates</td>
                      <td className="py-3 pr-4">More inputs and assumptions</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Tax software / CPA</td>
                      <td className="py-3 pr-4">Filing accuracy</td>
                      <td className="py-3 pr-4">Not designed for quick “what-if” comparisons</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            <FAQSection items={faqItems} />
            <RelatedCalculators slug="salary-after-taxes-calculator" />
          </>
        }
      />
    </>
  );
}
