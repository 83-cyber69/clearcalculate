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
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                $400k home, $80k down, 6.5% for 30 years + $300 tax + $120 insurance → total monthly estimate
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
