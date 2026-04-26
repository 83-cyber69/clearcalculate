import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorCard } from "@/components/shared/calculator-card";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { GpaCalculator } from "@/components/gpa/gpa-calculator";

export const metadata: Metadata = {
  title: "GPA Calculator (Weighted & Unweighted)",
  description:
    "Use ClearCalculate's free GPA calculator to instantly calculate weighted and unweighted GPA, total credits, and honors/AP impact.",
  alternates: {
    canonical: "/gpa-calculator"
  },
  openGraph: {
    title: "GPA Calculator (Weighted & Unweighted) | ClearCalculate",
    description:
      "Instantly calculate GPA with class names, grades, credit hours, and honors/AP weighting.",
    url: "https://clearcalculate.com/gpa-calculator",
    type: "article"
  }
};

const faqItems = [
  {
    question: "What is a good GPA?",
    answer:
      "A good GPA depends on your goals and school standards. Many colleges view 3.0 as competitive, while selective programs often look for GPAs above 3.5."
  },
  {
    question: "What is weighted vs unweighted GPA?",
    answer:
      "Unweighted GPA uses a standard 4.0 scale. Weighted GPA adds bonus points for advanced classes like Honors or AP."
  },
  {
    question: "How do colleges calculate GPA?",
    answer:
      "Colleges may recalculate GPA using core classes, specific scales, or custom weighting. Always review each school's published admissions method."
  },
  {
    question: "How do AP classes affect GPA?",
    answer:
      "AP and honors classes may increase weighted GPA because they are considered more rigorous. The exact boost varies by school policy."
  }
];

export default function GpaPage() {
  return (
    <div className="container-max py-12 sm:py-16">
      <Script id="gpa-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer
            }
          }))
        })}
      </Script>

      <section className="mb-12">
        <p className="mb-4 inline-flex rounded-full border border-orange-200 bg-gradient-to-r from-orange-50 via-rose-50 to-blue-50 px-3 py-1 text-xs font-semibold text-orange-700">
          Education Calculator
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          GPA Calculator
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Add courses, select grades, and enter credit hours to get real-time unweighted and
          weighted GPA results.
        </p>
      </section>

      <GpaCalculator />

      <section className="mt-16 space-y-10">
        <article className="glass-card p-6 sm:p-8">
          <h2 className="section-title">What Is GPA?</h2>
          <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
            GPA stands for Grade Point Average, a numeric representation of your academic
            performance over time. Schools convert letter grades into numbers, usually on a 4.0
            scale, then average those values based on the credit weight of each course. Because GPA
            condenses many classes into one value, it is one of the most common academic metrics
            used by high schools, colleges, scholarship committees, and employers.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
            In most systems, an A is worth around 4.0 points, a B around 3.0, and so on. Courses
            with more credit hours contribute more heavily to your GPA than lower-credit courses.
            For example, earning an A in a 4-credit course affects your GPA more than earning an A
            in a 1-credit elective. This weighted-by-credit approach gives a clearer picture of your
            overall academic load and performance.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
            Some schools also report weighted GPA, which adds bonus points for advanced coursework
            such as Honors, AP, IB, or dual-enrollment classes. Weighted GPA can exceed 4.0 and is
            intended to reflect course difficulty alongside performance. Understanding both weighted
            and unweighted GPA helps students set realistic goals, evaluate progress, and prepare
            stronger applications.
          </p>
        </article>

        <article className="glass-card p-6 sm:p-8">
          <h2 className="section-title">How To Calculate GPA</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
            <li>List each class you took during the term.</li>
            <li>Convert each letter grade to grade points (A = 4.0, B = 3.0, etc.).</li>
            <li>Multiply each class's grade points by its credit hours.</li>
            <li>Add all quality points together.</li>
            <li>Add all credit hours together.</li>
            <li>Divide total quality points by total credit hours.</li>
            <li>For weighted GPA, include any honors/AP boost before multiplying by credits.</li>
          </ol>
        </article>

        <article className="glass-card p-6 sm:p-8">
          <h2 className="section-title">GPA Formula</h2>
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
            <p>
              <strong>Unweighted GPA</strong> = Sum of (Grade Points x Credit Hours) / Sum of Credit
              Hours
            </p>
            <p className="mt-3">
              <strong>Weighted GPA</strong> = Sum of ((Grade Points + Weight Bonus) x Credit Hours) /
              Sum of Credit Hours
            </p>
          </div>
        </article>

        <article>
          <h2 className="mb-5 section-title">GPA Calculator FAQ</h2>
          <FAQAccordion items={faqItems} />
        </article>

        <article>
          <h2 className="mb-5 section-title">Related Calculators</h2>
          <div className="grid gap-5 md:grid-cols-3">
            <CalculatorCard
              title="Final Grade Calculator"
              description="Find the final exam score you need to reach your target grade."
              href="/"
            />
            <CalculatorCard
              title="Weighted Grade Calculator"
              description="Compute weighted class scores based on assignment category percentages."
              href="/"
            />
            <CalculatorCard
              title="College GPA Calculator"
              description="Track cumulative GPA across semesters and forecast outcomes."
              href="/"
            />
          </div>
        </article>
      </section>
    </div>
  );
}
