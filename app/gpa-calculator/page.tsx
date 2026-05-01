import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorHero } from "@/components/shared/calculator-hero";
import { CalculatorPageShell } from "@/components/shared/calculator-page-shell";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { SeoIntelligence } from "@/components/seo/seo-intelligence";
import { GpaCalculator } from "@/components/gpa/gpa-calculator";
import { ShareButtons } from "@/components/shared/share-buttons";
import { CalculatorSidebar } from "@/components/shared/calculator-sidebar";
import { createBreadcrumbJsonLd, createFaqJsonLd, generateSEOData } from "@/lib/seo";

const seoData = generateSEOData("gpa-calculator");

const extraFaqItems = [
  {
    question: "What’s the difference between semester GPA and cumulative GPA?",
    answer:
      "Semester GPA uses only the classes from one term. Cumulative GPA averages across multiple terms by combining all credits and grade points."
  },
  {
    question: "Do higher-credit classes affect GPA more?",
    answer:
      "Yes. GPA is credit-weighted, so a 4-credit class impacts your GPA more than a 1-credit class with the same grade."
  },
  {
    question: "What if my school uses a 5.0 or 4.5 weighted scale?",
    answer:
      "Weighted GPA scales vary. This calculator uses a common +0.5 honors/AP boost model. If your school uses different boosts, treat the weighted result as an estimate or compare with unweighted."
  },
  {
    question: "Can I calculate GPA with pass/fail classes?",
    answer:
      "Usually, pass/fail classes do not affect GPA (they count for credit only). If your school assigns grade points for pass/fail, include them using the closest grade point rule from your syllabus."
  },
  {
    question: "How do I convert percent grades to letter grades for GPA?",
    answer:
      "Use your course syllabus or school grading scale to map percent ranges to letter grades. Then enter the letter grade to compute grade points."
  }
];

const faqItems = [...seoData.faqItems, ...extraFaqItems].slice(0, 12);

export const metadata: Metadata = seoData.metadata;

export default function GpaPage() {
  const webApplicationJsonLd = seoData.webApplicationJsonLd;

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Education", path: "/education" },
    { name: "GPA Calculator", path: "/gpa-calculator" }
  ]);

  return (
    <CalculatorPageShell
      hero={<CalculatorHero eyebrow="Education Calculator" title="GPA Calculator" />}
      calculator={
        <>
          <Script id="gpa-webapplication-schema" type="application/ld+json">
            {JSON.stringify(webApplicationJsonLd)}
          </Script>
          <Script id="gpa-faq-schema" type="application/ld+json">
            {JSON.stringify(createFaqJsonLd(faqItems))}
          </Script>
          <Script id="gpa-breadcrumb-schema" type="application/ld+json">
            {JSON.stringify(breadcrumbJsonLd)}
          </Script>
          <SeoIntelligence slug="gpa-calculator" />
          <GpaCalculator />
        </>
      }
      quickInfo={
        <div className="space-y-3">
          <p className="text-sm leading-7 text-slate-700 sm:text-base">
            Enter classes, grades, and credits to calculate your weighted and unweighted GPA in seconds.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Fast</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Free</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Accurate</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Mobile Friendly</span>
          </div>
        </div>
      }
      quickActions={
        <ShareButtons
          title="GPA Calculator"
          urlPath="/gpa-calculator"
          shareText="Try this GPA calculator:"
        />
      }
      sidebar={
        <CalculatorSidebar
          trustBadges={[
            { label: "Fast" },
            { label: "Free" },
            { label: "Accurate" },
            { label: "Mobile Friendly" }
          ]}
          quickLinks={[
            { label: "Calculator", href: "#calculator" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Formula", href: "#formula" },
            { label: "FAQ", href: "#faq" }
          ]}
          tip="Weighted GPA includes honors/AP boosts. If your school uses a different boost (ex: +1.0), switch to unweighted or adjust your interpretation accordingly."
        />
      }
      seoContent={
        <>
          <article id="how-it-works" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">How this calculator works</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
              GPA is a weighted average. Courses with more credits count more.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
              <li>Enter each class name (optional), grade, and credits.</li>
              <li>The calculator converts grades to grade points.</li>
              <li>It multiplies grade points by credits, then divides by total credits.</li>
            </ol>
          </article>

          <article id="formula" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">Formula</h2>
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
              <p>
                <strong>Unweighted GPA</strong> = Sum of (Grade Points x Credit Hours) / Sum of
                Credit Hours
              </p>
              <p className="mt-3">
                <strong>Weighted GPA</strong> = Sum of ((Grade Points + Weight Bonus) x Credit Hours)
                / Sum of Credit Hours
              </p>
              <div className="mt-4 space-y-1 text-sm text-slate-700">
                <p>
                  <strong>Grade Points:</strong> number value for a letter grade (often A=4.0, B=3.0, etc.)
                </p>
                <p>
                  <strong>Credit Hours:</strong> how much the class counts (ex: 4-credit class weighs more than 1-credit)
                </p>
                <p>
                  <strong>Weight Bonus:</strong> extra points for Honors/AP/IB (varies by school)
                </p>
              </div>
            </div>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">Example calculation</h2>
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
              <p>
                <strong>Courses:</strong> 4-credit A (4.0) and 3-credit B (3.0)
              </p>
              <p className="mt-3">
                <strong>Quality points:</strong> (4 x 4.0) + (3 x 3.0) = 16 + 9 = 25
              </p>
              <p className="mt-3">
                <strong>Total credits:</strong> 4 + 3 = 7
              </p>
              <p className="mt-3">
                <strong>GPA:</strong> 25 / 7 = 3.57
              </p>
            </div>
          </article>

          <article id="faq" className="scroll-mt-24">
            <h2 className="mb-5 section-title">FAQ</h2>
            <FAQAccordion items={faqItems} />
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">How to interpret your GPA result</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                Your GPA is a credit-weighted average of grade points. That means two things matter most: your <strong>grades</strong> and your
                <strong>credit hours</strong>.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  If your GPA feels lower than expected, check whether a lower grade happened in a higher-credit class.
                </li>
                <li>
                  If weighted GPA is enabled, honors/AP classes can increase the result—but only if they’re marked as honors/AP and your school actually
                  applies a boost.
                </li>
              </ul>
              <p>
                Use the unweighted GPA for comparisons across schools, and use the weighted GPA for planning within your own school system.
              </p>
            </div>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">Common mistakes</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
              <li>Entering the wrong credits (semester credits vs quarter credits).</li>
              <li>Forgetting that an A in a 1-credit class doesn’t offset a low grade in a 4-credit class.</li>
              <li>Mixing percent grades with letter grades without using your syllabus mapping.</li>
              <li>Assuming weighted GPA boosts are the same across all schools.</li>
            </ul>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">Comparison table</h2>
            <div className="mt-4 w-full max-w-full overflow-x-auto">
              <table className="w-full table-auto border-collapse text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-2 pr-4 font-semibold text-slate-900">Type</th>
                    <th className="py-2 pr-4 font-semibold text-slate-900">How it’s calculated</th>
                    <th className="py-2 pr-4 font-semibold text-slate-900">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 pr-4">Unweighted GPA</td>
                    <td className="py-3 pr-4">Standard grade points (A=4.0, B=3.0, etc.), credit-weighted</td>
                    <td className="py-3 pr-4">Comparisons across schools and scholarships</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Weighted GPA</td>
                    <td className="py-3 pr-4">Adds an honors/AP boost (varies by school) before weighting by credits</td>
                    <td className="py-3 pr-4">Planning within your school’s grading policy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article>
            <h2 className="mb-5 section-title">Related Calculators</h2>
            <RelatedCalculators slug="gpa-calculator" />
          </article>

          <article>
            <p className="text-sm text-slate-500">
              Educational estimates only. Results may vary depending on your school grading scale and class weighting rules.
            </p>
          </article>
        </>
      }
    />
  );
}
