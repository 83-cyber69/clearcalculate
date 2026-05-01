import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { RetirementCalculator } from "@/components/calculators/finance/retirement-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Project retirement savings based on contributions and returns. Free retirement calculator with examples and FAQ.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Retirement Calculator",
  description: pageDescription,
  path: "/retirement-calculator",
  titleOverride: "Retirement Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "How does retirement growth work?",
    answer:
      "Savings can grow from contributions and investment returns over time. Compounding is powerful over decades."
  },
  {
    question: "What return rate should I use?",
    answer:
      "Many people use 5–8% as a long-term estimate, but returns vary and are not guaranteed."
  },
  {
    question: "What is the 4% rule?",
    answer:
      "A common guideline that suggests withdrawing about 4% of your portfolio per year in retirement."
  },
  {
    question: "Does this include Social Security?",
    answer: "No. This focuses on your savings and contributions."
  },
  {
    question: "Is this financial advice?",
    answer: "No. It’s a simple estimate to help planning."
  },
  {
    question: "What’s the difference between saving more and earning a higher return?",
    answer:
      "Saving more increases your balance directly and gives more money time to compound. Higher returns can increase growth, but they usually come with more uncertainty and risk."
  },
  {
    question: "Should I adjust for inflation?",
    answer:
      "For long-term planning, yes. A common approach is to use a “real” return (return minus inflation) to estimate purchasing power in today’s dollars."
  },
  {
    question: "What if my contributions increase over time?",
    answer:
      "This simple calculator assumes a constant monthly contribution. In real life, increasing contributions over time can materially change outcomes."
  },
  {
    question: "What does the 4% rule monthly number mean?",
    answer:
      "It’s a rough guideline for a first-year retirement withdrawal amount based on your projected balance. It doesn’t guarantee success and depends on market conditions and spending flexibility."
  },
  {
    question: "Why does starting early matter so much?",
    answer:
      "Time is a major input. Early contributions have more years to compound, which can outweigh higher contributions started later."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Retirement Calculator",
    description: pageDescription,
    path: "/retirement-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Finance", path: "/finance" },
    { name: "Retirement Calculator", path: "/retirement-calculator" }
  ]);

  return (
    <>
      <Script id="retirement-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="retirement-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="retirement-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Finance Calculator"
        title="Retirement Calculator"
        calculator={<RetirementCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={<ShareButtons title="Retirement Calculator" urlPath="/retirement-calculator" shareText="Try this retirement calculator:" />}
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Retirement projections are driven by three big levers: how much you already have, how much you add, and how long your money can compound.
                This calculator estimates a future balance by applying a monthly return rate and adding your monthly contribution over a set number of years.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter current savings and monthly contribution.</li>
                <li>Enter an estimated annual return and time horizon.</li>
                <li>The calculator projects a future balance.</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                It also shows a 4% rule monthly estimate as a planning reference for what a portfolio of that size might support.
              </p>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                $25,000 + $500/month at 7% for 25 years → projected balance estimate
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  The projected balance is not a promise—it’s what happens if your return assumption holds on average. Use it to compare scenarios, not to
                  predict an exact outcome.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    If your horizon is long, small changes in return rate can create large differences.
                  </li>
                  <li>
                    If your horizon is short, contributions often matter more than return assumptions.
                  </li>
                </ul>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Using an optimistic return rate without considering volatility and risk.</li>
                <li>Ignoring inflation (future dollars may buy less).</li>
                <li>Assuming contributions stay flat forever when income may grow.</li>
                <li>Treating the 4% rule as a guarantee instead of a guideline.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Comparison table</h2>
              <div className="mt-4 w-full max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Lever</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">What it changes</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Typical impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">More years</td>
                      <td className="py-3 pr-4">Time compounding</td>
                      <td className="py-3 pr-4">Very high (especially decades)</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Higher monthly contribution</td>
                      <td className="py-3 pr-4">Principal added</td>
                      <td className="py-3 pr-4">High and controllable</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Higher return assumption</td>
                      <td className="py-3 pr-4">Growth rate</td>
                      <td className="py-3 pr-4">High but uncertain</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            <FAQSection items={faqItems} />
            <RelatedCalculators slug="retirement-calculator" />
          </>
        }
      />
    </>
  );
}
