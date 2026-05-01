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
  },
  {
    question: "What matters more: contribution or return rate?",
    answer:
      "Both matter, but contributions usually dominate early and compounding dominates later. Over long horizons, small rate differences can create large gaps."
  },
  {
    question: "Does starting earlier make a big difference?",
    answer:
      "Yes. Time is one of the biggest drivers of compounding. Starting a few years earlier can outperform a higher monthly contribution started later."
  },
  {
    question: "What is future value?",
    answer:
      "Future value is the projected balance after growth and contributions over time. It’s a model output, not a guaranteed result."
  },
  {
    question: "Does inflation affect compound interest projections?",
    answer:
      "Yes. Inflation reduces purchasing power. For long-term planning, many people compare results using a lower “real” return rate (return minus inflation)."
  },
  {
    question: "Can I use this for debt interest?",
    answer:
      "You can model compounding, but debt often compounds daily and may have different rules. For loans with fixed payments, use a loan calculator."
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
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Compound interest is the idea that your balance can grow on itself over time: you earn returns on your original deposit and on the returns
                you’ve already earned. When you add monthly contributions, you’re feeding the compounding engine continuously.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter starting amount and monthly contribution.</li>
                <li>Enter an estimated annual return and time horizon.</li>
                <li>The calculator estimates future value with compounding.</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Use this for planning and “what-if” scenarios: try changing time, contributions, or return rate to see which lever has the biggest effect.
              </p>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Growth depends on periodic compounding and contributions over time.
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  This calculator uses a month-by-month compounding approximation:
                </p>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-700">Balance_next = Balance_now × (1 + r_month) + Contribution</p>
                </div>
                <p>
                  Where <strong>r_month</strong> is annual return ÷ 12.
                </p>
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                $5,000 start + $200/month at 7% for 20 years → future value estimate
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to interpret your result</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Look at the split between <strong>total contributions</strong> and <strong>estimated growth</strong>.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    If growth is small, you may be early in the timeline—compounding tends to accelerate later.
                  </li>
                  <li>
                    If growth is large relative to contributions, the timeline and return rate are doing most of the work.
                  </li>
                </ul>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Assuming the projection is guaranteed (returns vary year to year).</li>
                <li>Ignoring inflation when planning decades ahead.</li>
                <li>Over-focusing on rate and under-focusing on consistency of contributions.</li>
                <li>Using a return assumption that includes high-risk outcomes without acknowledging uncertainty.</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Comparison table</h2>
              <div className="mt-4 w-full max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Change</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Usually affects</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">More years</td>
                      <td className="py-3 pr-4">Growth a lot</td>
                      <td className="py-3 pr-4">Compounding has more time to snowball</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Higher monthly contribution</td>
                      <td className="py-3 pr-4">Contributions + growth</td>
                      <td className="py-3 pr-4">More principal gets time to compound</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Higher return assumption</td>
                      <td className="py-3 pr-4">Growth</td>
                      <td className="py-3 pr-4">Small changes compound into large differences</td>
                    </tr>
                  </tbody>
                </table>
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
