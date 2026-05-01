import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { LoanPaymentCalculator } from "@/components/calculators/finance/loan-payment-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Calculate monthly loan payments for a fixed-rate loan. Free loan payment calculator with interest and total paid estimates.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Loan Payment Calculator",
  description: pageDescription,
  path: "/loan-payment-calculator",
  titleOverride: "Loan Payment Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "How is a loan payment calculated?",
    answer:
      "Fixed-rate loans use an amortization formula based on principal, interest rate, and term. Payments stay the same each month."
  },
  {
    question: "What is APR?",
    answer: "APR is the annual percentage rate. This calculator converts APR to a monthly interest rate."
  },
  {
    question: "What if my interest rate is 0%?",
    answer: "Then monthly payment is simply loan amount divided by number of months."
  },
  {
    question: "Does this include fees?",
    answer: "No. For simplicity, this estimates payments without origination fees or insurance."
  },
  {
    question: "Can I use this for car loans?",
    answer: "Yes. Any fixed-rate installment loan uses the same math."
  },
  {
    question: "How much interest will I pay over the life of the loan?",
    answer:
      "This calculator estimates total interest as (monthly payment × number of months) minus principal. Interest depends heavily on rate and term."
  },
  {
    question: "Does a shorter term always save money?",
    answer:
      "Usually yes on total interest, but the monthly payment is higher. It’s a tradeoff between monthly affordability and total cost."
  },
  {
    question: "What if I make extra payments?",
    answer:
      "Extra principal payments (if allowed) typically reduce total interest and can shorten the payoff time. This simple calculator doesn’t model extra payments month-by-month."
  },
  {
    question: "Is APR the same as interest rate?",
    answer:
      "APR can include certain fees, while the interest rate is the base rate. For many simple loans they’re close, but they can differ."
  },
  {
    question: "Why is my first payment mostly interest?",
    answer:
      "Early in an amortized loan, the balance is highest, so interest charges are larger. Over time, more of each payment goes toward principal."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Loan Payment Calculator",
    description: pageDescription,
    path: "/loan-payment-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Finance", path: "/finance" },
    { name: "Loan Payment Calculator", path: "/loan-payment-calculator" }
  ]);

  return (
    <>
      <Script id="loan-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="loan-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="loan-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Finance Calculator"
        title="Loan Payment Calculator"
        calculator={<LoanPaymentCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Loan Payment Calculator" urlPath="/loan-payment-calculator" shareText="Try this loan payment calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Most fixed-rate loans (car loans, personal loans, many student loans) use amortization: you make the same payment each month, but the split
                between interest and principal changes over time. Early payments tend to be interest-heavy; later payments pay down principal faster.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter loan amount, APR, and term.</li>
                <li>The calculator converts APR to a monthly rate.</li>
                <li>It estimates a fixed monthly payment plus interest.</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Use this to compare options: different terms, different rates, or different loan amounts. The total interest output is often what surprises
                people, especially on longer terms.
              </p>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Payment = P·r / (1 − (1+r)^(-n))
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Where <strong>P</strong> is principal, <strong>r</strong> is the monthly interest rate (APR ÷ 12), and <strong>n</strong> is the number
                  of monthly payments.
                </p>
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                $20,000 at 7.5% for 5 years → monthly payment ≈ $401
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Focus on two outputs:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong>Monthly payment</strong> determines affordability.
                  </li>
                  <li>
                    <strong>Total interest</strong> tells you how expensive the loan is over time.
                  </li>
                </ul>
                <p>
                  If total interest is a large share of total paid, compare a shorter term or a lower rate. Even small rate reductions can materially
                  reduce total interest on longer terms.
                </p>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Using the loan amount after fees (or before down payment) incorrectly.</li>
                <li>Forgetting that taxes/registration/insurance can add to real monthly cost (especially for car loans).</li>
                <li>Assuming a longer term is “cheaper” because the payment is lower (it can cost more in total interest).</li>
                <li>Ignoring that APR vs interest rate can differ if fees are included.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Comparison table</h2>
              <div className="mt-4 w-full max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Choice</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Monthly payment</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Total interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Longer term</td>
                      <td className="py-3 pr-4">Lower</td>
                      <td className="py-3 pr-4">Higher (more months of interest)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Shorter term</td>
                      <td className="py-3 pr-4">Higher</td>
                      <td className="py-3 pr-4">Lower (fewer months of interest)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            <FAQSection items={faqItems} />
            <RelatedCalculators slug="loan-payment-calculator" />
          </>
        }
      />
    </>
  );
}
