import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { FAQSection } from "@/components/calculators/faq-section";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { GradeNeededToPassCalculator } from "@/components/calculators/education/grade-needed-to-pass-calculator";
import { createBreadcrumbJsonLd, createCalculatorMetadata, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

const pageDescription =
  "Find the grade you need on remaining work to reach a target grade. Free grade-needed-to-pass calculator with formula and examples.";

export const metadata: Metadata = createCalculatorMetadata({
  calculatorName: "Grade Needed To Pass Calculator",
  description: pageDescription,
  path: "/grade-needed-to-pass-calculator",
  titleOverride: "Grade Needed To Pass Calculator | ClearCalculate"
});

const faqItems = [
  {
    question: "How do I calculate what I need to pass?",
    answer:
      "Use the weighted grade formula: Target = Current×(1−Weight) + Needed×Weight. Solve for Needed."
  },
  {
    question: "What is remaining weight?",
    answer:
      "It’s the percent of your grade that is still not finalized (final exam, projects, remaining assignments)."
  },
  {
    question: "What if the needed score is above 100%?",
    answer:
      "That means it may be impossible to reach the target with the remaining weight unless extra credit is offered."
  },
  {
    question: "What if I already passed?",
    answer:
      "If your current grade is high enough, the calculator may show you need a low score on remaining work to stay above the target."
  },
  {
    question: "Is this exact for my teacher’s gradebook?",
    answer:
      "It follows standard weighting, but rounding and category rules vary. Use it as a planning estimate."
  }
];

export default function Page() {
  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: "Grade Needed To Pass Calculator",
    description: pageDescription,
    path: "/grade-needed-to-pass-calculator"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "Grade Needed To Pass Calculator", path: "/grade-needed-to-pass-calculator" }
  ]);

  return (
    <>
      <Script id="pass-webapplication-schema" type="application/ld+json">
        {JSON.stringify(webApplicationJsonLd)}
      </Script>
      <Script id="pass-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <Script id="pass-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <CalculatorLayout
        eyebrow="Education Calculator"
        title="Grade Needed To Pass Calculator"
        calculator={<GradeNeededToPassCalculator />}
        description={<p className="text-sm leading-7 text-slate-700 sm:text-base">{pageDescription}</p>}
        actions={
          <ShareButtons
            title="Grade Needed To Pass Calculator"
            urlPath="/grade-needed-to-pass-calculator"
            shareText="Try this grade-needed-to-pass calculator:"
          />
        }
        seoContent={
          <>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How it works</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Enter your current grade.</li>
                <li>Enter how much of the grade is still remaining.</li>
                <li>Enter the target grade (example: 70% to pass).</li>
              </ol>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Needed = (Target − Current×(1−Weight)) / Weight
              </div>
            </article>
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Example</h2>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                Current 82%, remaining weight 40%, target 70% → Needed ≈ 52%
              </div>
            </article>
            <FAQSection items={faqItems} />
            <RelatedCalculators slug="grade-needed-to-pass-calculator" />
          </>
        }
      />
    </>
  );
}
