import { getCalculatorBySlug, type CalculatorFaqItem, type CalculatorCategory } from "@/lib/calculators";

export type ProgrammaticPageCluster =
  | "education-grade-needed"
  | "education-gpa-college"
  | "education-weighted-vs-unweighted"
  | "finance-loan-payment"
  | "finance-salary-after-tax"
  | "finance-salary-after-tax-state"
  | "finance-compound-interest-scenario"
  | "health-calorie-deficit"
  | "health-calories-to-lose-weight"
  | "health-bmr-vs-tdee";

export type ProgrammaticPageDefinition = {
  kind?: "guide" | "hub";
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

const normalizeSearchText = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

const scoreMatch = (haystack: string, needle: string) => {
  if (!needle) return 0;
  if (!haystack) return 0;
  if (haystack === needle) return 100;
  if (haystack.startsWith(needle)) return 70;
  if (haystack.includes(needle)) return 45;
  return 0;
};

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

const STATES = [
  {
    name: "Tennessee",
    slug: "tennessee",
    note: "Tennessee does not tax wage income, so your state withholding may be lower than in many states."
  },
  {
    name: "Texas",
    slug: "texas",
    note: "Texas does not have a state income tax on wages, but your take-home pay still depends on federal and payroll taxes plus benefits and deductions."
  },
  {
    name: "Florida",
    slug: "florida",
    note: "Florida does not tax wage income, so after-tax pay is driven mostly by federal taxes, payroll taxes, and pre-tax deductions."
  },
  {
    name: "California",
    slug: "california",
    note: "California has state income tax, so your net pay can differ meaningfully from no-income-tax states at the same salary."
  },
  {
    name: "New York",
    slug: "new-york",
    note: "New York has state income tax and some locations have local taxes as well. Your take-home pay can vary by city and deductions."
  },
  {
    name: "Illinois",
    slug: "illinois",
    note: "Illinois has a flat state income tax rate, so your net pay changes more predictably as salary changes compared to progressive systems."
  },
  {
    name: "Pennsylvania",
    slug: "pennsylvania",
    note: "Pennsylvania uses a flat income tax rate, but local taxes can apply depending on where you live."
  },
  {
    name: "Colorado",
    slug: "colorado",
    note: "Colorado uses a flat income tax rate and your take-home pay will also depend on payroll taxes and benefit deductions."
  }
] as const;

const COMPOUND_SCENARIOS = [
  { years: 10, monthly: 200, start: 1000, rate: 7 },
  { years: 15, monthly: 300, start: 5000, rate: 7 },
  { years: 20, monthly: 500, start: 10000, rate: 6 },
  { years: 25, monthly: 400, start: 2500, rate: 8 }
] as const;

const WEIGHT_LOSS_PERSONAS = [
  { weightLb: 160, activity: "moderately active", deficit: 400 },
  { weightLb: 180, activity: "lightly active", deficit: 350 },
  { weightLb: 200, activity: "sedentary", deficit: 300 },
  { weightLb: 220, activity: "moderately active", deficit: 500 },
  { weightLb: 140, activity: "active", deficit: 300 },
  { weightLb: 260, activity: "lightly active", deficit: 500 }
] as const;

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
      kind: "guide",
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

function buildProgrammaticHubPages(): ProgrammaticPageDefinition[] {
  const pages = getProgrammaticPagesRaw().filter((p) => p.kind !== "hub");

  const byCluster = pages.reduce((acc, p) => {
    const list = acc.get(p.cluster) ?? [];
    list.push(p);
    acc.set(p.cluster, list);
    return acc;
  }, new Map<ProgrammaticPageCluster, ProgrammaticPageDefinition[]>());

  const hubs: ProgrammaticPageDefinition[] = [];

  for (const [cluster, clusterPages] of byCluster.entries()) {
    if (clusterPages.length < 4) continue;

    const seed = `${cluster}-${clusterPages.length}`;
    const category = clusterPages[0]?.category ?? "Education";

    const { slug, h1, title, description, calculatorSlug } = getHubMeta(cluster);

    const intro = [
      pick(seed, [
        "This hub collects related long-tail guides in one place so you can compare scenarios without hopping between unrelated pages.",
        "Use this hub to find the exact guide you need, then run numbers with the embedded calculator for your own inputs.",
        "Think of this page as a table of contents for one specific intent: the guides below answer closely related questions with slightly different assumptions."
      ]),
      "Each guide is intentionally focused on a single question. If you’re not sure which one applies, start with the base calculator on this page and then open 2–3 guides that match your situation.",
      "If you’re doing planning (grades, taxes, or calories), the goal is usually to estimate the direction and magnitude of change before you commit to a specific plan."
    ];

    const explanation = [
      pick(seed, [
        "A good workflow is: (1) define your target, (2) list what’s fixed, (3) choose the variables you can change, and (4) test a small set of realistic scenarios.",
        "Most planning questions are sensitive to one or two inputs. If you identify those inputs early, your estimates become more accurate with less effort.",
        "If you get confusing results, it’s usually because one assumption is hidden (weights, deductions, activity level, compounding frequency). Write assumptions down and test them one at a time."
      ]),
      "Use the guide list as a shortcut to the right assumptions. For example, some pages treat a variable as fixed while others treat it as adjustable.",
      "When you open a guide, scan the explanation section first to confirm the model matches your situation. Then run the calculator to get exact numbers.",
      "If you’re comparing multiple outcomes, keep everything constant except the variable you’re testing. That’s the fastest way to build intuition and avoid misleading comparisons.",
      "Finally, remember that many real-world systems have rounding rules (grades) or thresholds (tax brackets). Two scenarios that look similar can produce different outcomes near a cutoff."
    ];

    const example = [
      "Example approach: start with your current inputs in the calculator, record the baseline result, then open two guides that match your scenario and adjust only one variable at a time.",
      "If the result changes a lot, that variable is a lever. If it barely changes, you can stop optimizing it and focus your effort elsewhere.",
      "Once you have a short list of realistic scenarios, you can make a plan that’s robust even if your assumptions are slightly off."
    ];

    const faqItems: CalculatorFaqItem[] = [
      {
        question: "Should I read every guide in this hub?",
        answer:
          "No—pick the 2–3 guides that match your specific situation. The purpose of the hub is to help you quickly find the closest match, not to create busywork."
      },
      {
        question: "Why do similar guides sometimes give different results?",
        answer:
          "They often assume different inputs are fixed (or use different defaults). That’s intentional: it helps you model realistic variations without forcing one set of assumptions on everyone."
      },
      {
        question: "Is the calculator on this page the same as the one on the main calculator page?",
        answer:
          "Yes. The embedded tool is the same calculator—this page just adds targeted guidance and internal links to help you choose the right scenario."
      },
      {
        question: "Can I share a specific guide instead of the hub?",
        answer:
          "Yes. If you have a very specific question, sharing the exact guide is usually better. The hub is best for exploring multiple related scenarios."
      }
    ];

    hubs.push({
      kind: "hub",
      slug,
      title,
      description,
      calculatorSlug,
      category,
      cluster,
      h1,
      intro,
      explanation,
      example,
      faqItems,
      relatedCalculatorSlugs: clusterPages[0]?.relatedCalculatorSlugs
    });
  }

  return hubs;
}

function getHubMeta(cluster: ProgrammaticPageCluster): {
  slug: string;
  h1: string;
  title: string;
  description: string;
  calculatorSlug: string;
} {
  switch (cluster) {
    case "education-grade-needed":
      return {
        slug: "grade-needed-guides",
        h1: "Grade needed guides (pass, target grades, finals)",
        title: "Grade Needed Guides | ClearCalculate",
        description: "Browse focused guides for grade-needed scenarios and use the calculator to estimate the score you need to hit your target.",
        calculatorSlug: "grade-needed-to-pass-calculator"
      };
    case "education-weighted-vs-unweighted":
      return {
        slug: "weighted-vs-unweighted-gpa-guides",
        h1: "Weighted vs unweighted GPA guides",
        title: "Weighted vs Unweighted GPA Guides | ClearCalculate",
        description: "Guides for understanding weighted vs unweighted GPA and how changes in classes and grades affect your GPA estimate.",
        calculatorSlug: "gpa-calculator"
      };
    case "finance-loan-payment":
      return {
        slug: "loan-payment-guides",
        h1: "Loan payment guides (monthly payment scenarios)",
        title: "Loan Payment Guides | ClearCalculate",
        description: "Browse loan payment scenario guides and run the embedded loan payment calculator to estimate monthly payments.",
        calculatorSlug: "loan-payment-calculator"
      };
    case "finance-salary-after-tax":
      return {
        slug: "salary-after-taxes-guides",
        h1: "Salary after taxes guides",
        title: "Salary After Taxes Guides | ClearCalculate",
        description: "Guides for estimating salary after taxes and comparing scenarios using the embedded salary-after-taxes calculator.",
        calculatorSlug: "salary-after-taxes-calculator"
      };
    case "finance-salary-after-tax-state":
      return {
        slug: "salary-after-taxes-by-state-guides",
        h1: "Salary after taxes by state guides",
        title: "Salary After Taxes By State Guides | ClearCalculate",
        description: "State-focused salary after tax guides to compare take-home pay scenarios across different locations.",
        calculatorSlug: "salary-after-taxes-calculator"
      };
    case "finance-compound-interest-scenario":
      return {
        slug: "compound-interest-guides",
        h1: "Compound interest scenario guides",
        title: "Compound Interest Guides | ClearCalculate",
        description: "Scenario guides for compound interest planning—test monthly contributions, time horizons, and rate assumptions.",
        calculatorSlug: "compound-interest-calculator"
      };
    case "health-calorie-deficit":
      return {
        slug: "calorie-deficit-guides",
        h1: "Calorie deficit guides",
        title: "Calorie Deficit Guides | ClearCalculate",
        description: "Guides for choosing a calorie deficit and comparing weight-loss scenarios using the embedded calorie deficit calculator.",
        calculatorSlug: "calorie-deficit-calculator"
      };
    case "health-calories-to-lose-weight":
      return {
        slug: "calories-to-lose-weight-guides",
        h1: "Calories to lose weight guides",
        title: "Calories To Lose Weight Guides | ClearCalculate",
        description: "Guides to estimate calories to lose weight and compare scenarios using TDEE and calorie targets.",
        calculatorSlug: "tdee-calculator"
      };
    case "health-bmr-vs-tdee":
      return {
        slug: "bmr-vs-tdee-guides",
        h1: "BMR vs TDEE guides",
        title: "BMR vs TDEE Guides | ClearCalculate",
        description: "Guides explaining BMR vs TDEE and how activity level changes your daily calorie needs.",
        calculatorSlug: "tdee-calculator"
      };
    case "education-gpa-college":
    default:
      return {
        slug: "gpa-guides",
        h1: "GPA guides",
        title: "GPA Guides | ClearCalculate",
        description: "Browse GPA-related guides and use the embedded GPA calculator to test scenarios.",
        calculatorSlug: "gpa-calculator"
      };
  }
}

function buildFinanceSalaryAfterTaxStatePages(): ProgrammaticPageDefinition[] {
  const pages: ProgrammaticPageDefinition[] = [];

  for (const state of STATES) {
    for (const salary of [60000, 80000, 100000] as const) {
      const slug = toSlug(`salary after taxes ${state.slug} ${salary}`);

      const intro = [
        `If you’re searching for a salary-after-tax estimate in ${state.name}, remember that take-home pay depends on more than just your gross salary.`,
        state.note,
        `This guide gives you a practical way to think about net pay and then lets you run quick scenarios using our Salary After Taxes Calculator.`
      ];

      const explanation = [
        pick(slug, [
          "A useful planning approach is to start with an effective tax rate range and narrow it based on your deductions and benefits.",
          "Net pay is shaped by federal income tax, payroll tax, and any state/local tax—plus pre-tax deductions.",
          "To avoid misleading estimates, treat after-tax results as a range and refine it once you know your benefit deductions and filing status."
        ]),
        "Two people with the same salary can have very different take-home pay due to retirement contributions, health insurance premiums, and withholding choices.",
        "If you want a paycheck-style estimate (including common deductions), use the Take Home Pay Calculator after you get a rough net estimate."
      ];

      const example = [
        `Example: at ${formatMoney(salary)} in ${state.name}, start by testing an effective tax range like 20% to 30% and see how the yearly/monthly number changes.`,
        "Then adjust your assumption if you contribute to a 401(k), have pre-tax insurance, or expect state/local taxes to be meaningful."
      ];

      const faqItems: CalculatorFaqItem[] = [
        {
          question: `Does ${state.name} have state income tax?`,
          answer:
            "State tax rules vary and can change. This page provides planning guidance, but your exact net depends on your specific situation and location. Use the calculator as an estimate and confirm with official sources when needed."
        },
        {
          question: "Why is my net pay different from someone with the same salary?",
          answer:
            "Retirement contributions, health insurance, HSA/FSA, filing status, dependents, and withholding choices can all change take-home pay even at the same gross salary."
        },
        {
          question: "Should I use Salary After Taxes or Take Home Pay?",
          answer:
            "Use Salary After Taxes for quick scenario planning with an effective tax rate. Use Take Home Pay if you want a paycheck-style breakdown with deductions."
        },
        {
          question: "How should I use this for budgeting?",
          answer:
            "Convert your yearly net estimate to monthly, then build a baseline budget. Revisit the estimate after you see a real pay stub and adjust categories."
        }
      ];

      pages.push({
        slug,
        title: `Salary After Taxes in ${state.name} for ${formatMoney(salary)} | ClearCalculate`,
        description: `Estimate what ${formatMoney(salary)} looks like after taxes in ${state.name}. Use an effective tax rate approach and compare scenarios.`,
        calculatorSlug: "salary-after-taxes-calculator",
        category: "Finance",
        cluster: "finance-salary-after-tax-state",
        h1: `Salary after taxes in ${state.name} for ${formatMoney(salary)}`,
        intro,
        explanation,
        example,
        faqItems,
        relatedCalculatorSlugs: ["take-home-pay-calculator", "hourly-to-salary-calculator", "salary-to-hourly-calculator"]
      });
    }
  }

  return pages;
}

function buildFinanceCompoundInterestScenarioPages(): ProgrammaticPageDefinition[] {
  return COMPOUND_SCENARIOS.map((s) => {
    const slug = toSlug(`compound interest over ${s.years} years with ${s.monthly} monthly deposits`);

    const intro = [
      `Compound interest scenarios are most useful when you include both time and contributions. This guide models ${s.years} years with monthly deposits and a simple return assumption.`,
      "Use it to understand the moving parts (rate, time, contributions), then run your exact numbers in the Compound Interest Calculator."
    ];

    const explanation = [
      pick(slug, [
        "The biggest drivers are time invested and contribution consistency—rate matters, but time and behavior often matter more.",
        "Compounding accelerates later because returns earn returns. The longer the timeline, the more dramatic the curve.",
        "Monthly contributions smooth out investing over time and can materially increase ending value compared to a one-time deposit."
      ]),
      `In this scenario, you start with ${formatMoney(s.start)}, add ${formatMoney(s.monthly)} per month, and assume an annual return of about ${s.rate}%.`,
      "The calculator lets you change contribution frequency, compounding frequency, and rate assumptions to stress-test the plan."
    ];

    const example = [
      `Example: start with ${formatMoney(s.start)}, contribute ${formatMoney(s.monthly)} monthly for ${s.years} years, and assume ${s.rate}% annual growth.`,
      "Run the calculator twice: once with contributions and once without. The difference shows how much of the ending value comes from behavior (contributions) versus market growth."
    ];

    const faqItems: CalculatorFaqItem[] = [
      {
        question: "What rate of return should I assume?",
        answer:
          "Use a conservative assumption for planning. Many people test a range (e.g., 5%–8%) to see how sensitive outcomes are to the rate."
      },
      {
        question: "Does this account for inflation?",
        answer:
          "Not directly. For a real (inflation-adjusted) estimate, use a lower rate assumption that reflects expected inflation."
      },
      {
        question: "What’s more important: saving more or getting a higher rate?",
        answer:
          "Both help, but saving consistently is usually the most controllable factor. Use the calculator to compare scenarios like +$100/month versus +1% return."
      },
      {
        question: "How often should I update the estimate?",
        answer:
          "Revisit when your contribution level changes, your timeline changes, or once a year for planning."
      }
    ];

    return {
      slug,
      title: `Compound Interest Over ${s.years} Years With Monthly Deposits | ClearCalculate`,
      description: `See how compound interest can grow with monthly deposits over ${s.years} years. Learn the key drivers and run your exact numbers.`,
      calculatorSlug: "compound-interest-calculator",
      category: "Finance",
      cluster: "finance-compound-interest-scenario",
      h1: `Compound interest over ${s.years} years with monthly deposits`,
      intro,
      explanation,
      example,
      faqItems,
      relatedCalculatorSlugs: ["loan-payment-calculator", "retirement-calculator"]
    };
  });
}

function buildEducationWeightedVsUnweightedPages(): ProgrammaticPageDefinition[] {
  const slug = "weighted-vs-unweighted-gpa-explained";

  const intro = [
    "Weighted and unweighted GPA measure the same thing (academic performance), but they use different scales. Unweighted GPA is usually capped at 4.0, while weighted GPA adds extra points for honors/AP/IB courses.",
    "This guide explains the difference, shows how schools commonly calculate it, and links you to the GPA Calculator to estimate both versions."
  ];

  const explanation = [
    pick(slug, [
      "Unweighted GPA is a simpler average: it treats an A in any class as the same weight.",
      "Weighted GPA adds rigor points so advanced classes can raise your GPA above 4.0.",
      "The purpose of weighted GPA is to reflect course difficulty, not just letter grades."
    ]),
    "The exact weighting varies by school: some add +0.5 for honors and +1.0 for AP/IB, while others use different scales.",
    "When comparing GPAs across students or schools, always check which system is being used and whether the GPA is recalculated by the college."
  ];

  const example = [
    "Example: two students both have all A’s, but one took standard courses and the other took mostly AP courses. Their unweighted GPA may both be 4.0, but the weighted GPA can differ.",
    "Use the GPA Calculator to enter your classes and credits, then compare the weighted vs unweighted outputs under your school’s rules."
  ];

  const faqItems: CalculatorFaqItem[] = [
    {
      question: "Is weighted GPA better than unweighted GPA?",
      answer:
        "Neither is universally better. Unweighted is simpler; weighted adds context about rigor. Many colleges review both grades and course difficulty."
    },
    {
      question: "Can weighted GPA be above 4.0?",
      answer:
        "Yes. Many weighted systems allow GPAs above 4.0 depending on how honors/AP/IB points are applied."
    },
    {
      question: "Do colleges recalculate GPA?",
      answer:
        "Often, yes. Some colleges recalculate using their own rules (e.g., focusing on core courses). Use your school GPA for planning, but check each college’s policy."
    },
    {
      question: "How do I improve my GPA the fastest?",
      answer:
        "Focus on improving grades in higher-credit or higher-weight courses, and plan ahead for upcoming graded work. Use the Final Grade Calculator and Grade Needed To Pass Calculator for tactical planning."
    }
  ];

  return [
    {
      slug,
      title: "Weighted vs Unweighted GPA Explained | ClearCalculate",
      description:
        "Learn the difference between weighted and unweighted GPA, how each is calculated, and how to estimate both using your course list.",
      calculatorSlug: "gpa-calculator",
      category: "Education",
      cluster: "education-weighted-vs-unweighted",
      h1: "Weighted vs unweighted GPA explained",
      intro,
      explanation,
      example,
      faqItems,
      relatedCalculatorSlugs: ["final-grade-calculator", "grade-needed-to-pass-calculator"]
    }
  ];
}

function buildHealthCaloriesToLoseWeightPages(): ProgrammaticPageDefinition[] {
  return WEIGHT_LOSS_PERSONAS.map((p) => {
    const slug = toSlug(`how many calories should i eat to lose weight ${p.weightLb} lb`);

    const intro = [
      `If you’re asking “how many calories should I eat to lose weight?” the best starting point is to estimate maintenance calories (TDEE) and then choose a deficit you can sustain.`,
      `This guide uses a ${p.weightLb} lb example and assumes you’re ${p.activity} to demonstrate how to turn the estimate into a daily target.`
    ];

    const explanation = [
      pick(slug, [
        "The most reliable way to set calories is: estimate maintenance, apply a moderate deficit, then adjust based on weekly trends.",
        "Weight loss targets work best when you start with maintenance calories and subtract a sustainable deficit.",
        "The calculator gives a starting estimate; consistency and adjustments over 2–3 weeks determine real-world success."
      ]),
      `A common starting deficit is about ${p.deficit} calories per day for this kind of scenario, but the right number depends on hunger, sleep, training, and starting body composition.`,
      "Use the TDEE Calculator to estimate maintenance, then use the Calorie Deficit Calculator to pick a target for your goal."
    ];

    const example = [
      `Example workflow for ${p.weightLb} lb:`,
      "1) Estimate TDEE (maintenance).",
      `2) Subtract about ${p.deficit} calories/day as a starting target.`,
      "3) Track weekly average weight for 2–3 weeks.",
      "4) If progress is too slow or too fast, adjust calories by 100–200/day and repeat."
    ];

    const faqItems: CalculatorFaqItem[] = [
      {
        question: "How fast should I lose weight?",
        answer:
          "Many people aim for about 0.5% to 1% of body weight per week. Faster rates can be harder to sustain and may impact performance and recovery."
      },
      {
        question: "Should I eat the same calories every day?",
        answer:
          "Not necessarily. Some people prefer a consistent target; others cycle intake across training/rest days. What matters most is your weekly average and adherence."
      },
      {
        question: "What if the calculator estimate is wrong for me?",
        answer:
          "That’s normal—these are estimates. Use the output as a starting point, then adjust based on your 2–3 week trend and how you feel."
      },
      {
        question: "Do macros matter or only calories?",
        answer:
          "Calories drive weight change, but protein and fiber can improve satiety and muscle retention. Consider protein targets and strength training alongside calories."
      }
    ];

    return {
      slug,
      title: `How Many Calories Should I Eat to Lose Weight? (${p.weightLb} lb Example) | ClearCalculate`,
      description:
        `Use a maintenance (TDEE) estimate and a sustainable deficit to set a calorie target. Includes a ${p.weightLb} lb example and step-by-step workflow.`,
      calculatorSlug: "tdee-calculator",
      category: "Health",
      cluster: "health-calories-to-lose-weight",
      h1: "How many calories should I eat to lose weight?",
      intro,
      explanation,
      example,
      faqItems,
      relatedCalculatorSlugs: ["calorie-deficit-calculator", "bmr-calculator", "bmi-calculator", "body-fat-calculator"]
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

  const raw = getProgrammaticPagesRaw();
  const pages = [...raw, ...buildProgrammaticHubPages()];

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

function getProgrammaticPagesRaw(): ProgrammaticPageDefinition[] {
  return [
    ...buildEducationGradeNeededPages(),
    ...buildEducationWeightedVsUnweightedPages(),
    ...buildFinanceLoanPaymentPages(),
    ...buildFinanceSalaryAfterTaxPages(),
    ...buildFinanceSalaryAfterTaxStatePages(),
    ...buildFinanceCompoundInterestScenarioPages(),
    ...buildHealthBmrVsTdeePages(),
    ...buildHealthCalorieDeficitPages(),
    ...buildHealthCaloriesToLoseWeightPages()
  ];
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
    .filter((p) => p.slug !== slug && p.cluster === current.cluster && p.kind !== "hub")
    .slice(0, count)
    .map((p) => ({ href: `/p/${p.slug}`, label: p.h1 }));
}

export function getProgrammaticClusterHubLink(slug: string): ProgrammaticClusterLink | null {
  const current = getProgrammaticPageBySlug(slug);
  if (!current) return null;
  if (current.kind === "hub") return null;

  const hub = getProgrammaticPages().find((p) => p.kind === "hub" && p.cluster === current.cluster);
  if (!hub) return null;
  return { href: `/p/${hub.slug}`, label: hub.h1 };
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

export type ProgrammaticSearchItem = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: CalculatorCategory;
  kind: "guide" | "hub";
};

export function searchProgrammaticPagesRanked(query: string, limit = 6): ProgrammaticSearchItem[] {
  const q = normalizeSearchText(query);
  if (!q) return [];

  const tokens = q.split(" ").filter(Boolean);

  const scored = getProgrammaticPages()
    .map((p) => {
      const name = normalizeSearchText(p.h1);
      const desc = normalizeSearchText(p.description);
      const category = normalizeSearchText(p.category);
      const cluster = normalizeSearchText(p.cluster);
      const kind = p.kind === "hub" ? "hub" : "guide";

      let score = 0;
      score += scoreMatch(name, q) * 2;
      score += scoreMatch(desc, q);
      score += scoreMatch(category, q);
      score += scoreMatch(cluster, q) * 0.75;

      for (const t of tokens) {
        score += scoreMatch(name, t) * 3;
        score += scoreMatch(desc, t);
        score += scoreMatch(category, t);
        score += scoreMatch(cluster, t);
      }

      if (kind === "hub") score += 35;

      return {
        item: {
          id: `p-${p.slug}`,
          slug: p.slug,
          name: p.h1,
          description: p.description,
          category: p.category,
          kind
        } satisfies ProgrammaticSearchItem,
        score
      };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.item);

  return scored;
}
