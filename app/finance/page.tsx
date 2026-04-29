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
import { AdSlot } from "@/components/ads/AdSlot";

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
  },
  {
    question: "What’s the difference between gross salary and take-home pay?",
    answer:
      "Gross salary is your pay before taxes and deductions. Take-home pay is what actually lands in your bank account after federal/state/payroll taxes and benefits or retirement contributions."
  },
  {
    question: "What’s the difference between effective tax rate and marginal tax rate?",
    answer:
      "Marginal rate is the tax rate on your last dollar of income. Effective rate is total tax divided by total income, and is usually lower."
  },
  {
    question: "When should I use the Salary After Taxes calculator vs the Take Home Pay calculator?",
    answer:
      "Use Salary After Taxes for a fast estimate using a single effective tax rate. Use Take Home Pay when you want a more paycheck-style estimate including FICA and common deductions."
  },
  {
    question: "How do I compare a 15-year vs 30-year mortgage?",
    answer:
      "Compare both monthly payment and total interest. A 15-year usually costs less overall but requires a higher monthly payment."
  },
  {
    question: "How do I estimate the impact of a higher interest rate on a loan?",
    answer:
      "Run the Loan Payment Calculator with the new APR and the same term and principal. Even small rate changes can meaningfully change total interest over long terms."
  },
  {
    question: "How should I use compound interest results for planning?",
    answer:
      "Treat projections as scenarios, not promises. The best use is comparing levers: starting earlier, contributing more, and giving returns more time to compound."
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

      <section className="container-max py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div className="space-y-8">
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to use these finance calculators</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Finance decisions usually boil down to two questions: what does this cost me each month, and what does it cost me over time? The tools in
                this category help you answer both quickly so you can compare options without a spreadsheet.
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Common workflows:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong>Paycheck planning:</strong> start with{" "}
                    <Link href="/take-home-pay-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Take Home Pay
                    </Link>
                    , then sanity-check with{" "}
                    <Link href="/salary-after-taxes-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Salary After Taxes
                    </Link>
                    for a fast effective-rate estimate.
                  </li>
                  <li>
                    <strong>Debt affordability:</strong> use the{" "}
                    <Link href="/loan-payment-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Loan Payment Calculator
                    </Link>
                    to compare terms and rates, then use the total interest output to understand the long-run cost.
                  </li>
                  <li>
                    <strong>Housing budget:</strong> use the{" "}
                    <Link href="/mortgage-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Mortgage Calculator
                    </Link>
                    to estimate total monthly payment (including taxes/insurance inputs).
                  </li>
                  <li>
                    <strong>Long-term growth:</strong> model scenarios with the{" "}
                    <Link href="/compound-interest-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Compound Interest Calculator
                    </Link>
                    and connect it to retirement targets with the{" "}
                    <Link href="/retirement-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Retirement Calculator
                    </Link>
                    .
                  </li>
                </ul>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Key formulas (simple versions)</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                You don’t need to memorize formulas to use the calculators, but it helps to know what the outputs represent:
              </p>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                  <p>
                    <strong>Net salary estimate</strong> = gross × (1 − effective tax rate)
                  </p>
                  <p className="mt-2">Use Salary After Taxes for a single-rate estimate and Take Home Pay for a paycheck-style estimate.</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                  <p>
                    <strong>Compound growth (concept)</strong> = starting balance + contributions + growth over time
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                  <p>
                    <strong>Loan cost (concept)</strong> = monthly payment × number of months
                  </p>
                </div>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes (and what to do instead)</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Comparing options by monthly payment only (also compare total interest / total paid).</li>
                <li>Assuming every dollar of salary is equally taxed (marginal vs effective rate confusion).</li>
                <li>Using an optimistic return rate in long-term projections without stress-testing a lower rate.</li>
                <li>Forgetting non-loan housing costs like taxes, insurance, and HOA fees when budgeting.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Which calculator should you use?</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Question</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Best tool</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Output to focus on</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">How much will I take home?</td>
                      <td className="py-3 pr-4">
                        <Link href="/take-home-pay-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                          Take Home Pay
                        </Link>
                      </td>
                      <td className="py-3 pr-4">Yearly/monthly net pay</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">What’s my monthly loan payment?</td>
                      <td className="py-3 pr-4">
                        <Link href="/loan-payment-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                          Loan Payment
                        </Link>
                      </td>
                      <td className="py-3 pr-4">Payment + total interest</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">What’s the true monthly cost of a home?</td>
                      <td className="py-3 pr-4">
                        <Link href="/mortgage-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                          Mortgage
                        </Link>
                      </td>
                      <td className="py-3 pr-4">PITI-style total payment</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">How could savings grow over time?</td>
                      <td className="py-3 pr-4">
                        <Link href="/compound-interest-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                          Compound Interest
                        </Link>
                      </td>
                      <td className="py-3 pr-4">Contributions vs growth</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>

          <aside className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-base font-semibold text-slate-900">Quick start</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                For most people, the fastest win is understanding take-home pay and comparing total loan cost (not just the monthly payment).
              </p>
              <div className="mt-4 space-y-2">
                <Link href="/take-home-pay-calculator" className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 hover:border-orange-200 hover:text-orange-700">
                  Open Take Home Pay
                </Link>
                <Link href="/loan-payment-calculator" className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 hover:border-orange-200 hover:text-orange-700">
                  Open Loan Payment
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-max py-12">
        <div className="mb-7">
          <h2 className="section-title">Finance Calculators</h2>
          <p className="section-lead">Tools to help you make smarter financial decisions and plan your budget.</p>
        </div>
        
        {financeCalculators.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {financeCalculators.slice(0, 3).map((calculator) => (
              <CalculatorCard
                key={calculator.id}
                title={calculator.name}
                description={calculator.description}
                href={`/${calculator.slug}`}
                icon={calculator.icon}
                ctaLabel="Calculate"
              />
            ))}
            <AdSlot variant="in-content" />
            {financeCalculators.slice(3).map((calculator) => (
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
