import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Search, ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalculatorCard } from "@/components/shared/calculator-card";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { SmartSearch } from "@/components/search/smart-search";
import { getCalculatorsByCategory, categoryRegistry } from "@/lib/calculators";
import { siteConfig } from "@/lib/utils";
import { createFaqJsonLd } from "@/lib/seo";
import { AdBlock } from "@/components/ads/AdBlock";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export const metadata: Metadata = {
  title: {
    default: "Education Calculators | ClearCalculate",
    template: "%s | ClearCalculate"
  },
  description: "Free education calculators for GPA, grades, and academic planning. Calculate your GPA instantly and plan your academic goals with our student tools.",
  alternates: {
    canonical: "/education"
  },
  openGraph: {
    title: "Education Calculators | ClearCalculate",
    description: "Free education calculators for GPA, grades, and academic planning. Calculate your GPA instantly and plan your academic goals.",
    url: `${siteUrl}/education`,
    type: "website"
  }
};

const educationCategory = categoryRegistry.find(cat => cat.title === "Education");
const educationCalculators = getCalculatorsByCategory("Education");

const faqItems = [
  {
    question: "How accurate is the GPA calculator?",
    answer: "Our GPA calculator uses standard 4.0 scale formulas and supports both weighted and unweighted calculations. Results are accurate for most US high school and college systems."
  },
  {
    question: "Can I calculate my cumulative GPA?",
    answer: "Yes, you can input multiple courses and their credit hours to calculate both semester and cumulative GPA. The calculator automatically handles weighted courses."
  },
  {
    question: "What grading scales are supported?",
    answer: "The calculator supports the standard 4.0 scale (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0) and can handle weighted grades for AP, honors, and IB courses."
  },
  {
    question: "Is this calculator free for students?",
    answer: "Yes, all education calculators on ClearCalculate are completely free with no sign-up required. Perfect for students, parents, and educators."
  },
  {
    question: "What’s the difference between weighted and unweighted GPA?",
    answer:
      "Unweighted GPA uses a fixed 0.0–4.0 scale regardless of course difficulty. Weighted GPA adds extra points for honors/AP/IB courses (the exact boost varies by school)."
  },
  {
    question: "How do credit hours affect GPA?",
    answer:
      "GPA is credit-weighted: a 4-credit class counts more than a 1-credit class. The calculator uses credits to weight grade points correctly."
  },
  {
    question: "How do I calculate what grade I need on a final?",
    answer:
      "Use the Final Grade Calculator with your current grade, the final exam weight, and your target course grade. It will tell you the score you need on the final."
  },
  {
    question: "Can I use these calculators for percent-based grading?",
    answer:
      "Yes. Use the Test Score Percentage Calculator to convert raw points to a percentage, then map that percent to your syllabus letter-grade scale if needed."
  },
  {
    question: "Why does my GPA differ from my school portal?",
    answer:
      "Differences usually come from a different grade scale, weighting rules, rounding policy, or whether pass/fail, labs, and repeated courses are included. Use your school’s policy as the source of truth."
  },
  {
    question: "How often should I update my GPA or grade tracking?",
    answer:
      "Updating weekly (or after major assignments) is usually enough. Focus on trends and what you can still influence—upcoming exams, projects, and homework weights."
  }
];

export default function EducationPage() {
  return (
    <div className="pb-4">
      <Script id="education-faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqJsonLd(faqItems))}
      </Script>
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 hero-first-screen py-4 sm:py-6 md:py-7">
        <div className="w-full space-y-5 sm:space-y-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
              <GraduationCap className="h-3 w-3" />
              Education Tools
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Student Planning & Academic Calculators
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Track grades, calculate GPA, and plan what you need on upcoming tests.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
        {educationCalculators.length > 0 ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch auto-rows-fr">
              {educationCalculators.map((calculator) => (
                <CalculatorCard
                  key={calculator.id}
                  title={calculator.name}
                  description={calculator.description}
                  href={`/${calculator.slug}`}
                  icon={calculator.icon}
                  ctaLabel="Calculate"
                />
              ))}
            </div>
            <AdBlock slot="5496259471" className="mx-auto max-w-4xl" />
          </>
        ) : (
          <div className="text-center py-12">
            <GraduationCap className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Coming Soon</h3>
            <p className="text-slate-600">We're working on more education calculators. Check back soon!</p>
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1fr)_320px] md:items-center">
          <div className="text-sm text-slate-600">
            Browse all tools on the {" "}
            <Link href="/" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
              ClearCalculate homepage
            </Link>
            {" "}
            or explore the
            {" "}
            <Link href="/calculators" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
              full calculator directory
            </Link>
            .
          </div>
          <div className="md:justify-self-end w-full max-w-2xl">
            <SmartSearch />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div className="space-y-8">
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">How to use these education calculators</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                The fastest way to use this section is to start with the calculator that matches the decision you’re trying to make, then work backward
                into inputs. Most students don’t need more complexity—they need clarity on what the next test, final, or set of assignments means for the
                outcome they care about.
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Common workflows:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong>Track GPA:</strong> start with the{" "}
                    <Link href="/gpa-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      GPA Calculator
                    </Link>
                    , then add credits and grades to model semester and cumulative scenarios.
                  </li>
                  <li>
                    <strong>Plan finals:</strong> use the{" "}
                    <Link href="/final-grade-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Final Grade Calculator
                    </Link>
                    to see what score you need on the final to hit a target course grade.
                  </li>
                  <li>
                    <strong>Check a pass threshold:</strong> use{" "}
                    <Link href="/grade-needed-to-pass-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Grade Needed to Pass
                    </Link>
                    when you’re trying to understand “what’s the minimum score I need?”
                  </li>
                  <li>
                    <strong>Convert test points:</strong> use{" "}
                    <Link href="/test-score-percentage-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                      Test Score Percentage
                    </Link>
                    to translate raw points into a percent you can compare to your syllabus.
                  </li>
                </ul>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">GPA formula (the idea behind most GPA systems)</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                GPA is a credit-weighted average of grade points. If your school uses A=4.0, B=3.0, etc., the general model looks like this:
              </p>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                <p>
                  <strong>GPA</strong> = (sum of (grade points × credits)) ÷ (sum of credits)
                </p>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Weighted GPA systems add a boost for advanced courses. Since every school’s rules differ, treat weighted results as a planning estimate and
                confirm boosts and caps with your handbook.
              </p>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Worked example: planning a final</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Suppose you have an 88% in a class and the final exam is worth 30% of your grade. You want to finish with at least a 90%.
              </p>
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base">
                <p>
                  <strong>Target course grade</strong> = (current grade × 70%) + (final score × 30%)
                </p>
                <p className="mt-2">
                  90 = (88 × 0.70) + (final × 0.30)
                </p>
                <p className="mt-2">
                  final = (90 − (88 × 0.70)) ÷ 0.30 ≈ 94.7
                </p>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                If you don’t want to do the algebra, the{" "}
                <Link href="/final-grade-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  Final Grade Calculator
                </Link>
                will compute the needed final score instantly.
              </p>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Common mistakes (and how to avoid them)</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>Using the wrong grade scale (especially for +/- grading or non-4.0 systems).</li>
                <li>Ignoring credits and treating every class as equal weight.</li>
                <li>Mixing “current grade” with “points earned so far” when a calculator expects one or the other.</li>
                <li>Over-optimizing a single assignment instead of planning the remaining weighted categories (tests, homework, projects).</li>
              </ul>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Which calculator should you use?</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-900">Goal</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Best tool</th>
                      <th className="py-2 pr-4 font-semibold text-slate-900">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Calculate semester/cumulative GPA</td>
                      <td className="py-3 pr-4">
                        <Link href="/gpa-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                          GPA Calculator
                        </Link>
                      </td>
                      <td className="py-3 pr-4">Models credits, weighted courses, and averages</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Needed score on the final exam</td>
                      <td className="py-3 pr-4">
                        <Link href="/final-grade-calculator" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                          Final Grade Calculator
                        </Link>
                      </td>
                      <td className="py-3 pr-4">Converts weights into a target final score</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-3 pr-4">Minimum grade to pass</td>
                      <td className="py-3 pr-4">
                        <Link
                          href="/grade-needed-to-pass-calculator"
                          className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600"
                        >
                          Grade Needed to Pass
                        </Link>
                      </td>
                      <td className="py-3 pr-4">Turns thresholds into clear “you need X%” guidance</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Convert points to a percentage</td>
                      <td className="py-3 pr-4">
                        <Link
                          href="/test-score-percentage-calculator"
                          className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600"
                        >
                          Test Score Percentage
                        </Link>
                      </td>
                      <td className="py-3 pr-4">Useful when assignments are graded by points</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>

          <aside className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-base font-semibold text-slate-900">Start here</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                If you’re not sure which tool to use, start with GPA for long-term planning and final-grade for near-term decisions.
              </p>
              <div className="mt-4 space-y-2">
                <Link href="/gpa-calculator" className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 hover:border-orange-200 hover:text-orange-700">
                  Open GPA Calculator
                </Link>
                <Link href="/final-grade-calculator" className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 hover:border-orange-200 hover:text-orange-700">
                  Open Final Grade Calculator
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-card accent-warm p-8 sm:p-10">
          <h2 className="section-title">Why Students Choose ClearCalculate</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Instant Results</h3>
              <p className="text-sm text-slate-600">Get your GPA calculations immediately without complex spreadsheets or manual math.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Mobile Friendly</h3>
              <p className="text-sm text-slate-600">Calculate on any device. Perfect for checking grades between classes or on the go.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Always Free</h3>
              <p className="text-sm text-slate-600">No subscriptions, no ads, no sign-ups. Just free tools for student success.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="mb-7 section-title">Related Categories</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {categoryRegistry
            .filter(cat => cat.title !== "Education")
            .map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-orange-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border border-slate-200 bg-white p-2">
                      <Icon className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-orange-600">
                        {category.title} Calculators
                      </h3>
                      <p className="text-sm text-slate-600">{category.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 transition-colors group-hover:text-orange-600" />
                </Link>
              );
            })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="mb-7 section-title">Frequently Asked Questions</h2>
        <FAQAccordion items={faqItems} />
      </section>
    </div>
  );
}
