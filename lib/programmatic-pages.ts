import { getCalculatorBySlug, type CalculatorFaqItem, type CalculatorCategory } from "@/lib/calculators";

export type ProgrammaticPageCluster =
  | "education-grade-needed"
  | "education-gpa-college"
  | "finance-loan-payment"
  | "finance-salary-after-tax"
  | "health-calorie-deficit"
  | "health-bmr-vs-tdee";

export type ProgrammaticPageDefinition = {
  slug: string;
  title: string;
  description: string;
  calculatorSlug: string;
  category: CalculatorCategory;
  cluster: ProgrammaticPageCluster;
  h1: string;
  intro: string[];
  explanation: string[];
  example: string[];
  faqItems: CalculatorFaqItem[];
  relatedCalculatorSlugs?: string[];
};

const clampWords = (value: string) => value.trim().split(/\s+/).filter(Boolean);

export function estimateWordCount(page: ProgrammaticPageDefinition) {
  const pieces = [
    page.title,
    page.description,
    page.h1,
    ...page.intro,
    ...page.explanation,
    ...page.example,
    ...page.faqItems.flatMap((x) => [x.question, x.answer])
  ];
  return pieces.flatMap(clampWords).length;
}

function pick<T>(seed: string, options: T[]): T {
  const s = seed.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return options[Math.abs(s) % options.length];
}

function formatMoney(value: number) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function toSlug(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s/g, "-");
}

const COMMON_COURSES = ["algebra", "biology", "chemistry", "geometry", "history", "english", "calculus"] as const;
const COMMON_SALARIES = [45000, 60000, 80000, 100000, 120000] as const;
const COMMON_LOANS = [150000, 250000, 300000, 400000] as const;
const COMMON_RATES = [4.5, 5.5, 6.0, 6.5] as const;

function buildEducationGradeNeededPages(): ProgrammaticPageDefinition[] {
  return COMMON_COURSES.map((course) => {
    const slug = toSlug(`what grade do i need to pass ${course}`);
    const h1 = `What grade do I need to pass ${course}?`;

    const intro = [
      `If you’re trying to figure out what score you need to pass ${course}, the fastest approach is to look at your current grade, what work is left, and what “passing” means in your class (often a C or 70%).`,
      `This page walks through the logic and then lets you plug in your numbers using our Grade Needed To Pass Calculator.`
    ];

    const explanation = [
      pick(slug, [
        `The key idea is weighted averages: your final grade is the combination of what you’ve already earned and what’s still remaining.`,
        `Most “what do I need to pass?” questions reduce to a weighted average problem.`,
        `Passing calculations are easiest when you treat the remaining work as a single “bucket” with a known weight.`
      ]),
      `Start by identifying three inputs: (1) your current grade, (2) the weight of remaining work (or final exam), and (3) the minimum overall grade required to pass.`,
      `Then solve for the required score on the remaining work. If your course uses categories (homework, tests, final), you can use the Final Grade Calculator to model the final exam piece directly.`
    ];

    const example = [
      `Example scenario: you have a 72% current grade in ${course}, the final exam is worth 25% of the grade, and you need a 70% overall to pass.`,
      `Your required final exam score will depend on the exact weights and rounding rules, but you can estimate it quickly by plugging the numbers into the calculator and adjusting the target until it meets the pass threshold.`
    ];

    const faqItems: CalculatorFaqItem[] = [
      {
        question: `What counts as a passing grade in ${course}?`,
        answer:
          "It depends on your school and teacher. Many classes treat 60% or 70% as passing, but some require higher. Use the calculator with your course’s official policy."
      },
      {
        question: "Do I need to include homework or just the final exam?",
        answer:
          "Include whatever grade components are still outstanding. If only the final exam remains, use the remaining weight as the final’s weight. If multiple assignments remain, treat them as a combined remaining-weight bucket."
      },
      {
        question: "What if the number I need is over 100%?",
        answer:
          "That usually means it’s mathematically impossible to reach the target with the weight remaining (unless extra credit is available). You can still use the calculator to understand how close you can get."
      },
      {
        question: "What if I don’t know my current weighted grade?",
        answer:
          "Use your grade portal’s current overall percentage if available. Otherwise, compute a weighted grade using the Class Average Calculator (simple average) or your syllabus weights."
      }
    ];

    return {
      slug,
      title: `What Grade Do I Need To Pass ${course[0].toUpperCase()}${course.slice(1)}? | ClearCalculate`,
      description: `Find the score you need to pass ${course}. Use your current grade, remaining weight, and passing threshold to estimate the required score.`,
      calculatorSlug: "grade-needed-to-pass-calculator",
      category: "Education",
      cluster: "education-grade-needed",
      h1,
      intro,
      explanation,
      example,
      faqItems,
      relatedCalculatorSlugs: ["final-grade-calculator", "class-average-calculator"]
    };
  });
}

function buildFinanceLoanPaymentPages(): ProgrammaticPageDefinition[] {
  const pages: ProgrammaticPageDefinition[] = [];

  for (const principal of COMMON_LOANS) {
    for (const rate of COMMON_RATES) {
      const rateLabel = `${rate}`.replace(/\./g, "-");
      const slug = toSlug(`loan payment ${principal} at ${rateLabel} percent`);

      const h1 = `Loan payment for ${formatMoney(principal)} at ${rate}% interest`;

      const intro = [
        `If you’re estimating a loan payment for ${formatMoney(principal)} at ${rate}% interest, your monthly payment depends on the term (years) and whether the rate is fixed.`,
        `Use this page for a quick explanation, then calculate your exact monthly payment with our Loan Payment Calculator.`
      ];

      const explanation = [
        pick(slug, [
          "Loan payments are typically calculated using an amortization formula that spreads principal + interest over a fixed number of months.",
          "A standard fixed-rate loan uses an amortization schedule: early payments are mostly interest, later payments are mostly principal.",
          "Even small changes in interest rate can change the payment meaningfully, especially on large principals and long terms."
        ]),
        "To avoid thin, misleading estimates, always include the loan term. A 15-year payment can be dramatically higher than a 30-year payment at the same rate.",
        "If you’re comparing options, try multiple terms (e.g., 15 vs 30 years) and see how total interest changes."
      ];

      const example = [
        `Example: a ${formatMoney(principal)} loan at ${rate}% on a 30-year term will have a different payment than the same loan on a 15-year term.`,
        "Use the calculator to plug in (principal, rate, term). Then compare the monthly payment and total interest paid."
      ];

      const faqItems: CalculatorFaqItem[] = [
        {
          question: "What term should I use for a loan payment estimate?",
          answer:
            "Common terms are 10, 15, 20, or 30 years for mortgages and 3–7 years for auto loans. Use the term that matches your lender’s offer."
        },
        {
          question: "Does this include taxes and insurance?",
          answer:
            "A basic loan payment is principal + interest. For mortgages, your real monthly cost may also include property taxes, insurance, and HOA. Use the Mortgage Calculator if you need a PITI-style estimate."
        },
        {
          question: "What if my rate is APR or variable?",
          answer:
            "APR includes fees, and variable rates can change over time. Use the fixed-rate estimate as a baseline, then plan for rate changes or fees separately."
        },
        {
          question: "How can I reduce total interest?",
          answer:
            "Lowering the rate, shortening the term, or making extra principal payments can reduce total interest paid. Compare scenarios in the calculator."
        }
      ];

      pages.push({
        slug,
        title: `Loan Payment for ${formatMoney(principal)} at ${rate}% | ClearCalculate`,
        description: `Estimate monthly loan payments for ${formatMoney(principal)} at ${rate}% interest. Compare terms and understand amortization.`,
        calculatorSlug: "loan-payment-calculator",
        category: "Finance",
        cluster: "finance-loan-payment",
        h1,
        intro,
        explanation,
        example,
        faqItems,
        relatedCalculatorSlugs: ["mortgage-calculator", "compound-interest-calculator"]
      });
    }
  }

  return pages;
}

function buildFinanceSalaryAfterTaxPages(): ProgrammaticPageDefinition[] {
  return COMMON_SALARIES.map((salary) => {
    const slug = toSlug(`salary after taxes ${salary}`);

    const intro = [
      `If you’re wondering what ${formatMoney(salary)} looks like after taxes, the exact answer depends on your filing status, deductions, and location.`,
      "This page gives a practical way to think about after-tax pay, then lets you run a quick estimate with our Salary After Taxes Calculator."
    ];

    const explanation = [
      pick(slug, [
        "A quick estimate is to apply an effective tax rate, but your real tax rate is progressive and depends on brackets.",
        "After-tax pay depends on federal tax, payroll tax, and often state/local tax—plus pre-tax deductions.",
        "The most common mistake is assuming a single flat tax rate. Real withholding and brackets create a blended effective rate."
      ]),
      "Start by estimating an effective tax rate range (for example, 20–30%) and then refine it with your actual situation.",
      "If you’re paid hourly or want to convert between hourly and salary, use the Hourly To Salary Calculator or Salary To Hourly Calculator."
    ];

    const example = [
      `Example: if ${formatMoney(salary)} has an effective tax rate of 25%, after-tax income is roughly ${formatMoney(Math.round(salary * 0.75))} per year.`,
      "Use the calculator to test different effective tax rates and see the yearly/monthly breakdown."
    ];

    const faqItems: CalculatorFaqItem[] = [
      {
        question: "Is this the same as take-home pay?",
        answer:
          "Not always. Take-home pay can also include benefits, retirement contributions, health insurance, and other deductions. Use the Take Home Pay Calculator if you want a paycheck-style breakdown."
      },
      {
        question: "What tax rate should I use for a quick estimate?",
        answer:
          "Many people start with an effective rate like 20–30% as a rough baseline. Your exact rate depends on income, filing status, and where you live."
      },
      {
        question: "Why is my effective tax rate lower than my top bracket?",
        answer:
          "Because tax brackets are progressive: only the income within each bracket is taxed at that bracket’s rate. The blended result is your effective rate."
      },
      {
        question: "Can I use this for budgeting?",
        answer:
          "Yes. It’s a great starting point for planning. Once you have a rough after-tax estimate, you can build a monthly budget from the monthly figure."
      }
    ];

    return {
      slug,
      title: `Salary After Taxes for ${formatMoney(salary)} | ClearCalculate`,
      description: `Estimate what ${formatMoney(salary)} looks like after taxes using an effective tax rate. Get a quick yearly and monthly take-home estimate.`,
      calculatorSlug: "salary-after-taxes-calculator",
      category: "Finance",
      cluster: "finance-salary-after-tax",
      h1: `Salary after taxes for ${formatMoney(salary)}`,
      intro,
      explanation,
      example,
      faqItems,
      relatedCalculatorSlugs: ["take-home-pay-calculator", "hourly-to-salary-calculator", "salary-to-hourly-calculator"]
    };
  });
}

function buildHealthBmrVsTdeePages(): ProgrammaticPageDefinition[] {
  const slug = "bmr-vs-tdee-difference";

  const intro = [
    "BMR and TDEE are related, but they answer different questions. BMR is your baseline calorie burn at rest, while TDEE estimates your total daily burn including activity.",
    "This page explains the difference and links you to the right calculator depending on what you’re trying to do (maintenance, cutting, bulking)."
  ];

  const explanation = [
    pick(slug, [
      "Think of BMR as your engine idle speed; TDEE is what you burn once you add movement and training.",
      "BMR is a baseline; TDEE is the baseline plus your real-world activity.",
      "BMR measures rest; TDEE is the planning number for day-to-day calories."
    ]),
    "If you’re trying to set a calorie target, TDEE is usually the better starting point because it reflects your full day.",
    "Use BMR when you want a baseline estimate, then choose an activity multiplier (or use the TDEE Calculator) to get maintenance."
  ];

  const example = [
    "Example: if your BMR is 1,700 kcal/day and your average activity multiplier is 1.55, your TDEE estimate is about 2,635 kcal/day.",
    "To lose weight, you’d typically set a deficit from TDEE (for example, 300–500 kcal/day) and track your weekly trend."
  ];

  const faqItems: CalculatorFaqItem[] = [
    {
      question: "Should I eat at my BMR?",
      answer:
        "Most people use TDEE to set daily intake targets. Eating at BMR can be too aggressive for many goals because it ignores activity and recovery needs."
    },
    {
      question: "Which is more accurate: BMR or TDEE?",
      answer:
        "Both are estimates. TDEE depends on how well your activity estimate matches your real week. Use the result as a starting point and adjust based on 2–3 weeks of trend data."
    },
    {
      question: "What’s the best next step after estimating TDEE?",
      answer:
        "Pick a realistic deficit or surplus based on your goal. For fat loss, many people start with 300–500 calories below TDEE and adjust slowly."
    }
  ];

  return [
    {
      slug,
      title: "BMR vs TDEE: What’s the Difference? | ClearCalculate",
      description:
        "Learn the difference between BMR and TDEE, when to use each number, and how to turn the estimate into a practical calorie target.",
      calculatorSlug: "tdee-calculator",
      category: "Health",
      cluster: "health-bmr-vs-tdee",
      h1: "BMR vs TDEE: what’s the difference?",
      intro,
      explanation,
      example,
      faqItems,
      relatedCalculatorSlugs: ["bmr-calculator", "calorie-deficit-calculator", "body-fat-calculator", "bmi-calculator"]
    }
  ];
}

function buildHealthCalorieDeficitPages(): ProgrammaticPageDefinition[] {
  const slug = "calorie-deficit-to-lose-1-pound-per-week";

  const intro = [
    "A common fat loss goal is about 1 lb per week. As a rough rule of thumb, that’s often associated with a weekly deficit of about 3,500 calories.",
    "This page explains how to translate that into a daily target and how to adjust based on real-world results."
  ];

  const explanation = [
    pick(slug, [
      "The 3,500-calorie rule is a starting point, not a law. Your real results depend on adherence, water weight changes, and how your body adapts.",
      "A deficit target should be sustainable. The best deficit is the one you can maintain while sleeping well and training effectively.",
      "Most people get better results from a consistent, moderate deficit than from aggressive cuts that break down after a few weeks."
    ]),
    "A 3,500 calorie weekly deficit is about 500 calories per day on average. Many people start in the 300–500/day range and adjust after 2–3 weeks.",
    "To set the number correctly, estimate your maintenance calories (TDEE) first, then subtract your deficit target."
  ];

  const example = [
    "Example: if your TDEE is 2,400 kcal/day and you want roughly 1 lb/week, you might start with a target around 1,900 kcal/day.",
    "Then track your weekly average weight for 2–3 weeks and adjust intake by small steps (like 100–200 kcal) based on the trend."
  ];

  const faqItems: CalculatorFaqItem[] = [
    {
      question: "Is 1 lb per week realistic?",
      answer:
        "For many people, yes—especially at higher starting weights. As you get leaner, the same deficit may produce a slower rate."
    },
    {
      question: "Should I always use a 500-calorie deficit?",
      answer:
        "Not necessarily. A smaller deficit can be easier to maintain and still works. Start with a reasonable target and adjust based on results and how you feel."
    },
    {
      question: "Why does my weight fluctuate even in a deficit?",
      answer:
        "Water retention, sodium, stress, sleep, and training can all shift scale weight. Use weekly averages instead of day-to-day numbers."
    }
  ];

  return [
    {
      slug,
      title: "Calorie Deficit to Lose 1 Pound Per Week | ClearCalculate",
      description:
        "Learn how big a calorie deficit you need to lose about 1 lb per week, how to translate it into a daily target, and how to adjust based on trends.",
      calculatorSlug: "calorie-deficit-calculator",
      category: "Health",
      cluster: "health-calorie-deficit",
      h1: "Calorie deficit to lose 1 pound per week",
      intro,
      explanation,
      example,
      faqItems,
      relatedCalculatorSlugs: ["tdee-calculator", "bmr-calculator", "bmi-calculator", "body-fat-calculator"]
    }
  ];
}

let cachedPages: ProgrammaticPageDefinition[] | null = null;

export function getProgrammaticPages(): ProgrammaticPageDefinition[] {
  if (cachedPages) return cachedPages;

  const pages = [
    ...buildEducationGradeNeededPages(),
    ...buildFinanceLoanPaymentPages(),
    ...buildFinanceSalaryAfterTaxPages(),
    ...buildHealthBmrVsTdeePages(),
    ...buildHealthCalorieDeficitPages()
  ];

  const unique: ProgrammaticPageDefinition[] = [];
  const seen = new Set<string>();
  for (const p of pages) {
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    unique.push(p);
  }

  cachedPages = unique;
  return unique;
}

export function getProgrammaticPageBySlug(slug: string) {
  return getProgrammaticPages().find((p) => p.slug === slug);
}

export type ProgrammaticClusterLink = {
  href: string;
  label: string;
};

export function getProgrammaticClusterLinks(slug: string, count = 4): ProgrammaticClusterLink[] {
  const current = getProgrammaticPageBySlug(slug);
  if (!current) return [];

  return getProgrammaticPages()
    .filter((p) => p.slug !== slug && p.cluster === current.cluster)
    .slice(0, count)
    .map((p) => ({ href: `/p/${p.slug}`, label: p.h1 }));
}

export function isProgrammaticPageIndexable(slug: string) {
  const page = getProgrammaticPageBySlug(slug);
  if (!page) return false;

  const calc = getCalculatorBySlug(page.calculatorSlug);
  if (!calc) return false;

  const wc = estimateWordCount(page);
  return wc >= 600;
}

export function getIndexableProgrammaticRoutes() {
  return getProgrammaticPages()
    .filter((p) => isProgrammaticPageIndexable(p.slug))
    .map((p) => `/p/${p.slug}`);
}
