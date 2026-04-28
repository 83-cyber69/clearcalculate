import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { CompoundInterestCalculator } from "@/components/calculators/finance/compound-interest-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Estimate future value with compound interest and monthly contributions. Free compound interest calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Compound Interest Calculator",
  description: pageDescription,
  path: "/compound-interest-calculator",
  titleOverride: "Compound Interest Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "What is compound interest?",
    answer: "It’s when you earn interest on both your original money and previous interest." 
  },
  {
    question: "Does monthly contribution matter?",
    answer: "Yes. Regular contributions can drive growth as much as the interest rate over time."
  },
  {
    question: "What annual return should I use?",
    answer: "For a long-term stock index estimate, some people use 6–8%, but returns vary." 
  },
  {
    question: "Is this guaranteed?",
    answer: "No. This is a planning projection. Real returns fluctuate."
  },
  {
    question: "Does compounding happen daily?",
    answer: "It depends on the account. This calculator uses a monthly compounding approximation." 
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Compound Interest Calculator",
    description: pageDescription,
    path: "/compound-interest-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Finance", path: "/finance" },
    { name: "Compound Interest Calculator", path: "/compound-interest-calculator" }
  ]);

  return (
    <>
      <Script id="compound-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="compound-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="compound-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Finance Calculator"
        title="Compound Interest Calculator"
        calculator={<CompoundInterestCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Compound Interest Calculator" urlPath="/compound-interest-calculator" shareText="Try this compound interest calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter starting amount and monthly contribution.</li>
                <li>Enter an estimated annual return and time horizon.</li>
                <li>The calculator estimates future value with compounding.</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Growth depends on periodic compounding and contributions over time.
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                $5,000 start + $200/month at 7% for 20 years → future value estimate
              </div>
            </article>
            <FAQSection items={faqItems} />
            <RelatedCalculators slug="compound-interest-calculator" />
          </>
        }
      />
    </>
  );
}
