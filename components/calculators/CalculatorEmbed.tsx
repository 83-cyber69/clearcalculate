"use client";

import dynamic from "next/dynamic";
import { getCalculatorBySlug } from "@/lib/calculators";

const EmbeddedTdee = dynamic(() => import("@/components/health/tdee-calculator").then((m) => m.TdeeCalculator), {
  ssr: false,
  loading: () => <div className="glass-card p-6 sm:p-8">Loading calculator…</div>
});

const EmbeddedBmr = dynamic(() => import("@/components/health/bmr-calculator").then((m) => m.BmrCalculator), {
  ssr: false,
  loading: () => <div className="glass-card p-6 sm:p-8">Loading calculator…</div>
});

const EmbeddedBmi = dynamic(() => import("@/components/health/bmi-calculator").then((m) => m.BmiCalculator), {
  ssr: false,
  loading: () => <div className="glass-card p-6 sm:p-8">Loading calculator…</div>
});

const EmbeddedPeriod = dynamic(() => import("@/components/health/period-calculator").then((m) => m.PeriodCalculator), {
  ssr: false,
  loading: () => <div className="glass-card p-6 sm:p-8">Loading calculator…</div>
});

const EmbeddedOneRepMax = dynamic(
  () => import("@/components/health/one-rep-max-calculator").then((m) => m.OneRepMaxCalculator),
  {
    ssr: false,
    loading: () => <div className="glass-card p-6 sm:p-8">Loading calculator…</div>
  }
);

const EmbeddedTakeHomePay = dynamic(() => import("@/components/finance/take-home-pay-calculator").then((m) => m.TakeHomePayCalculator), {
  ssr: false,
  loading: () => <div className="glass-card p-6 sm:p-8">Loading calculator…</div>
});

const EmbeddedLoanPayment = dynamic(
  () => import("@/components/calculators/finance/loan-payment-calculator").then((m) => m.LoanPaymentCalculator),
  {
    ssr: false,
    loading: () => <div className="glass-card p-6 sm:p-8">Loading calculator…</div>
  }
);

const EmbeddedSalaryAfterTaxes = dynamic(
  () => import("@/components/calculators/finance/salary-after-taxes-calculator").then((m) => m.SalaryAfterTaxesCalculator),
  {
    ssr: false,
    loading: () => <div className="glass-card p-6 sm:p-8">Loading calculator…</div>
  }
);

const EmbeddedCompoundInterest = dynamic(
  () => import("@/components/calculators/finance/compound-interest-calculator").then((m) => m.CompoundInterestCalculator),
  {
    ssr: false,
    loading: () => <div className="glass-card p-6 sm:p-8">Loading calculator…</div>
  }
);

const EmbeddedFinalGrade = dynamic(
  () => import("@/components/calculators/education/final-grade-calculator").then((m) => m.FinalGradeCalculator),
  {
    ssr: false,
    loading: () => <div className="glass-card p-6 sm:p-8">Loading calculator…</div>
  }
);

const EmbeddedGradeNeededToPass = dynamic(
  () => import("@/components/calculators/education/grade-needed-to-pass-calculator").then((m) => m.GradeNeededToPassCalculator),
  {
    ssr: false,
    loading: () => <div className="glass-card p-6 sm:p-8">Loading calculator…</div>
  }
);

const EmbeddedGpa = dynamic(() => import("@/components/gpa/gpa-calculator").then((m) => m.GpaCalculator), {
  ssr: false,
  loading: () => <div className="glass-card p-6 sm:p-8">Loading calculator…</div>
});

const EmbeddedCalorieDeficit = dynamic(
  () => import("@/components/calculators/health/calorie-deficit-calculator").then((m) => m.CalorieDeficitCalculator),
  {
    ssr: false,
    loading: () => <div className="glass-card p-6 sm:p-8">Loading calculator…</div>
  }
);

const EmbeddedBodyFat = dynamic(
  () => import("@/components/calculators/health/body-fat-calculator").then((m) => m.BodyFatCalculator),
  {
    ssr: false,
    loading: () => <div className="glass-card p-6 sm:p-8">Loading calculator…</div>
  }
);

type Props = {
  calculatorSlug: string;
};

export function CalculatorEmbed({ calculatorSlug }: Props) {
  const calc = getCalculatorBySlug(calculatorSlug);

  if (!calc) {
    return <div className="glass-card p-6 sm:p-8">Calculator unavailable.</div>;
  }

  switch (calculatorSlug) {
    case "tdee-calculator":
      return <EmbeddedTdee />;
    case "bmr-calculator":
      return <EmbeddedBmr />;
    case "bmi-calculator":
      return <EmbeddedBmi />;
    case "period-calculator":
      return <EmbeddedPeriod />;
    case "one-rep-max-calculator":
      return <EmbeddedOneRepMax />;
    case "take-home-pay-calculator":
      return <EmbeddedTakeHomePay />;
    case "salary-after-taxes-calculator":
      return <EmbeddedSalaryAfterTaxes />;
    case "loan-payment-calculator":
      return <EmbeddedLoanPayment />;
    case "compound-interest-calculator":
      return <EmbeddedCompoundInterest />;
    case "final-grade-calculator":
      return <EmbeddedFinalGrade />;
    case "grade-needed-to-pass-calculator":
      return <EmbeddedGradeNeededToPass />;
    case "gpa-calculator":
      return <EmbeddedGpa />;
    case "calorie-deficit-calculator":
      return <EmbeddedCalorieDeficit />;
    case "body-fat-calculator":
      return <EmbeddedBodyFat />;
    default:
      return (
        <div className="glass-card p-6 sm:p-8">
          <p className="text-sm leading-7 text-slate-700 sm:text-base">
            This landing page links to the full calculator experience:
          </p>
          <a href={`/${calculatorSlug}`} className="mt-3 inline-block font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
            Open {calc.name}
          </a>
        </div>
      );
  }
}
