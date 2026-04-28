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
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter loan amount, APR, and term.</li>
                <li>The calculator converts APR to a monthly rate.</li>
                <li>It estimates a fixed monthly payment plus interest.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Payment = P·r / (1 − (1+r)^(-n))
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                $20,000 at 7.5% for 5 years → monthly payment ≈ $401
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
