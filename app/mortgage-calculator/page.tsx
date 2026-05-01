import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { MortgageCalculator } from "@/components/calculators/finance/mortgage-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Estimate your monthly mortgage payment including principal, interest, taxes, and insurance. Free mortgage calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Mortgage Calculator",
  description: pageDescription,
  path: "/mortgage-calculator",
  titleOverride: "Mortgage Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "What does a mortgage payment include?",
    answer: "Many payments include principal and interest (P&I), plus property taxes and insurance (PITI)."
  },
  {
    question: "Is PMI included?",
    answer: "Not in this simple version. If you pay PMI, add it into your monthly insurance estimate."
  },
  {
    question: "What is a typical mortgage term?",
    answer: "Common terms are 15 and 30 years, but some lenders offer other options."
  },
  {
    question: "How does down payment affect payment?",
    answer: "A larger down payment reduces the loan amount, which usually lowers monthly payments."
  },
  {
    question: "Is this exact?",
    answer: "It’s a planning estimate. Final payments depend on lender fees, taxes, and insurance quotes."
  },
  {
    question: "What is PITI?",
    answer: "PITI stands for Principal, Interest, Taxes, and Insurance—the common parts of a total mortgage payment."
  },
  {
    question: "How much does interest rate change my payment?",
    answer:
      "Rate changes primarily affect principal + interest. On a large loan, even a small rate change can move the monthly payment noticeably."
  },
  {
    question: "Does the property tax estimate affect the loan?",
    answer:
      "No. Taxes don’t change the loan balance, but they do change your monthly cash flow and how expensive the home feels month-to-month."
  },
  {
    question: "What about HOA fees?",
    answer:
      "HOA fees aren’t included here. If you have an HOA, add it on top of the total monthly estimate when budgeting."
  },
  {
    question: "Should I compare 15-year vs 30-year mortgages?",
    answer:
      "Yes. A 15-year loan usually has a higher payment but far less total interest. A 30-year loan is often easier monthly but costs more overall."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Mortgage Calculator",
    description: pageDescription,
    path: "/mortgage-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Finance", path: "/finance" },
    { name: "Mortgage Calculator", path: "/mortgage-calculator" }
  ]);

  return (
    <>
      <Script id="mortgage-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="mortgage-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="mortgage-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Finance Calculator"
        title="Mortgage Calculator"
        calculator={<MortgageCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Mortgage Calculator" urlPath="/mortgage-calculator" shareText="Try this mortgage calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                A mortgage payment often has two layers:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li><strong>Principal + interest</strong> (the loan itself)</li>
                <li><strong>Taxes + insurance</strong> (monthly escrow-style costs in many cases)</li>
              </ul>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                This calculator estimates your monthly payment by computing principal & interest from the loan terms, then adding monthly property tax and
                insurance estimates.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter home price, down payment, rate, and term.</li>
                <li>Add monthly property tax and insurance estimates.</li>
                <li>The calculator estimates total monthly payment.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Total = Principal & Interest + Taxes + Insurance
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Principal & interest uses the same amortization math as other fixed-rate loans. Taxes and insurance are treated as monthly add-ons to
                  estimate cash flow.
                </p>
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                $400k home, $80k down, 6.5% for 30 years + $300 tax + $120 insurance → total monthly estimate
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Use the total monthly payment as a budgeting number. Then look at principal & interest separately to understand what rate/term changes
                  will actually affect.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    If taxes + insurance are a large share of the total, shopping the rate won’t move the total as much as you’d expect.
                  </li>
                  <li>
                    If principal & interest is the majority, rate and term changes can materially change monthly cost.
                  </li>
                </ul>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Forgetting HOA fees, PMI, or maintenance when budgeting monthly cost.</li>
                <li>Underestimating property taxes (they vary dramatically by location).</li>
                <li>Assuming the lowest monthly payment is the cheapest option (total interest matters).</li>
                <li>Using a down payment larger than home price (which would imply no loan).</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Comparison table</h2>
              <div className="mt-4 w-full max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Option</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Monthly payment</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Total interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">30-year term</td>
                      <td className="py-3 pr-4">Lower</td>
                      <td className="py-3 pr-4">Higher</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">15-year term</td>
                      <td className="py-3 pr-4">Higher</td>
                      <td className="py-3 pr-4">Lower</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            <FAQSection items={faqItems} />
            <RelatedCalculators slug="mortgage-calculator" />
          </>
        }
      />
    </>
  );
}
