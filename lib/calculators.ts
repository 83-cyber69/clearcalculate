import type { LucideIcon } from "lucide-react";
import { Activity, Calculator, CalendarDays, Dumbbell, Flame, GraduationCap, Landmark, Ruler } from "lucide-react";

export type CalculatorCategory = "Education" | "Finance" | "Health";

export type CalculatorItem = {
  id: string;
  name: string;
  slug: string;
  category: CalculatorCategory;
  description: string;
  icon: LucideIcon;
  keywords: string[];
  featured: boolean;
  componentPath?: string;
};

export type CalculatorInputField = {
  key: string;
  label: string;
  type: "number" | "text" | "select" | "date";
  unitLabel?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
};

export type CalculatorInputsSchema = {
  fields: CalculatorInputField[];
};

export type CalculatorFaqItem = { question: string; answer: string };

export type CalculatorDefinition = CalculatorItem & {
  inputsSchema?: CalculatorInputsSchema;
  relatedSlugs?: string[];
  faqItems?: CalculatorFaqItem[];
  explanation?: string;
  examples?: string;
  tip?: string;
};

export type CategoryItem = {
  title: CalculatorCategory;
  description: string;
  icon: LucideIcon;
  slug: string;
};

export const calculatorRegistry: CalculatorDefinition[] = [
  {
    id: "gpa-calculator",
    name: "GPA Calculator",
    slug: "gpa-calculator",
    category: "Education",
    description: "Instant weighted and unweighted GPA estimates.",
    icon: GraduationCap,
    keywords: ["grades", "school", "academic", "college", "university", "student", "grade point average", "cgpa", "sgpa"],
    featured: true,
    componentPath: "@/components/gpa/gpa-calculator"
  },
  {
    id: "final-grade-calculator",
    name: "Final Grade Calculator",
    slug: "final-grade-calculator",
    category: "Education",
    description: "Estimate your final grade based on exam weight.",
    icon: GraduationCap,
    keywords: ["final exam", "weighted grade", "final grade", "grade calculator"],
    featured: false,
    componentPath: "@/components/calculators/education/final-grade-calculator"
  },
  {
    id: "grade-needed-to-pass-calculator",
    name: "Grade Needed To Pass Calculator",
    slug: "grade-needed-to-pass-calculator",
    category: "Education",
    description: "Find the score you need on remaining work to pass.",
    icon: GraduationCap,
    keywords: ["pass", "required grade", "need to pass", "what do I need"],
    featured: false,
    componentPath: "@/components/calculators/education/grade-needed-to-pass-calculator"
  },
  {
    id: "class-average-calculator",
    name: "Class Average Calculator",
    slug: "class-average-calculator",
    category: "Education",
    description: "Average assignment and test scores quickly.",
    icon: GraduationCap,
    keywords: ["average", "class average", "grades", "mean"],
    featured: false,
    componentPath: "@/components/calculators/education/class-average-calculator"
  },
  {
    id: "test-score-percentage-calculator",
    name: "Test Score Percentage Calculator",
    slug: "test-score-percentage-calculator",
    category: "Education",
    description: "Convert correct answers into a percentage score.",
    icon: GraduationCap,
    keywords: ["percentage", "score", "correct answers", "test"],
    featured: false,
    componentPath: "@/components/calculators/education/test-score-percentage-calculator"
  },
  {
    id: "act-score-calculator",
    name: "ACT Score Calculator",
    slug: "act-score-calculator",
    category: "Education",
    description: "Estimate composite ACT score from section scores.",
    icon: GraduationCap,
    keywords: ["act", "composite", "english", "math", "reading", "science"],
    featured: false,
    componentPath: "@/components/calculators/education/act-score-calculator"
  },
  {
    id: "sat-score-calculator",
    name: "SAT Score Calculator",
    slug: "sat-score-calculator",
    category: "Education",
    description: "Estimate total SAT score from section scores.",
    icon: GraduationCap,
    keywords: ["sat", "math", "reading", "writing", "score"],
    featured: false,
    componentPath: "@/components/calculators/education/sat-score-calculator"
  },
  {
    id: "bmr-calculator",
    name: "BMR Calculator",
    slug: "bmr-calculator",
    category: "Health",
    description: "Estimate basal metabolic rate (resting calories) using Mifflin-St Jeor.",
    icon: Flame,
    keywords: [
      "bmr",
      "basal metabolic rate",
      "resting metabolic rate",
      "rmr",
      "metabolism",
      "calories at rest",
      "mifflin st jeor"
    ],
    featured: true,
    componentPath: "@/components/health/bmr-calculator"
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    slug: "bmi-calculator",
    category: "Health",
    description: "Calculate BMI (body mass index) and category from height and weight.",
    icon: Ruler,
    keywords: [
      "bmi",
      "body mass index",
      "bmi calculator",
      "healthy bmi",
      "bmi range",
      "height weight",
      "underweight",
      "overweight"
    ],
    featured: true,
    componentPath: "@/components/health/bmi-calculator"
  },
  {
    id: "one-rep-max-calculator",
    name: "One Rep Max Calculator",
    slug: "one-rep-max-calculator",
    category: "Health",
    description: "Estimate 1RM from weight and reps using common formulas.",
    icon: Dumbbell,
    keywords: [
      "one rep max",
      "1rm",
      "one rep max calculator",
      "strength",
      "epley",
      "brzycki",
      "training percentages"
    ],
    featured: false,
    componentPath: "@/components/health/one-rep-max-calculator"
  },
  {
    id: "period-calculator",
    name: "Period Calculator",
    slug: "period-calculator",
    category: "Health",
    description: "Estimate next period, ovulation, and fertile window from cycle length.",
    icon: CalendarDays,
    keywords: [
      "period calculator",
      "menstrual cycle",
      "next period",
      "ovulation",
      "fertile window",
      "cycle length"
    ],
    featured: false,
    componentPath: "@/components/health/period-calculator"
  },
  {
    id: "study-time-calculator",
    name: "Study Time Calculator",
    slug: "study-time-calculator",
    category: "Education",
    description: "Estimate weekly study hours based on course load.",
    icon: GraduationCap,
    keywords: ["study time", "hours", "weekly", "planning", "school"],
    featured: false,
    componentPath: "@/components/calculators/education/study-time-calculator"
  },
  {
    id: "take-home-pay-calculator",
    name: "Take Home Pay Calculator",
    slug: "take-home-pay-calculator",
    category: "Finance",
    description: "Estimate paycheck results after taxes and deductions.",
    icon: Landmark,
    keywords: ["salary", "income", "paycheck", "taxes", "deductions", "net pay", "after tax", "wages", "earnings", "payroll"],
    featured: true,
    componentPath: "@/components/finance/take-home-pay-calculator"
  },
  {
    id: "salary-after-taxes-calculator",
    name: "Salary After Taxes Calculator",
    slug: "salary-after-taxes-calculator",
    category: "Finance",
    description: "Estimate net salary using a simple effective tax rate.",
    icon: Landmark,
    keywords: ["salary after taxes", "net salary", "after tax", "tax rate"],
    featured: false,
    componentPath: "@/components/calculators/finance/salary-after-taxes-calculator"
  },
  {
    id: "hourly-to-salary-calculator",
    name: "Hourly To Salary Calculator",
    slug: "hourly-to-salary-calculator",
    category: "Finance",
    description: "Convert hourly wage to yearly salary.",
    icon: Landmark,
    keywords: ["hourly to salary", "annual salary", "wage", "conversion"],
    featured: false,
    componentPath: "@/components/calculators/finance/hourly-to-salary-calculator"
  },
  {
    id: "salary-to-hourly-calculator",
    name: "Salary To Hourly Calculator",
    slug: "salary-to-hourly-calculator",
    category: "Finance",
    description: "Convert yearly salary to hourly wage.",
    icon: Landmark,
    keywords: ["salary to hourly", "hourly rate", "annual salary", "conversion"],
    featured: false,
    componentPath: "@/components/calculators/finance/salary-to-hourly-calculator"
  },
  {
    id: "loan-payment-calculator",
    name: "Loan Payment Calculator",
    slug: "loan-payment-calculator",
    category: "Finance",
    description: "Calculate monthly payments for a fixed-rate loan.",
    icon: Landmark,
    keywords: ["loan", "payment", "monthly", "interest rate", "amortization"],
    featured: false,
    componentPath: "@/components/calculators/finance/loan-payment-calculator"
  },
  {
    id: "mortgage-calculator",
    name: "Mortgage Calculator",
    slug: "mortgage-calculator",
    category: "Finance",
    description: "Estimate mortgage payment with taxes and insurance.",
    icon: Landmark,
    keywords: ["mortgage", "home loan", "monthly payment", "piti"],
    featured: false,
    componentPath: "@/components/calculators/finance/mortgage-calculator"
  },
  {
    id: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    category: "Finance",
    description: "Estimate investment growth with compounding.",
    icon: Landmark,
    keywords: ["compound interest", "investment", "growth", "future value"],
    featured: false,
    componentPath: "@/components/calculators/finance/compound-interest-calculator"
  },
  {
    id: "retirement-calculator",
    name: "Retirement Calculator",
    slug: "retirement-calculator",
    category: "Finance",
    description: "Project retirement savings with contributions and returns.",
    icon: Landmark,
    keywords: ["retirement", "401k", "ira", "savings", "future value"],
    featured: false,
    componentPath: "@/components/calculators/finance/retirement-calculator"
  },
  {
    id: "tdee-calculator",
    name: "TDEE Calculator",
    slug: "tdee-calculator",
    category: "Health",
    description: "Calculate maintenance, cut, and bulk calories fast.",
    icon: Activity,
    keywords: ["calories", "weight loss", "metabolism", "daily energy expenditure", "fitness", "diet", "nutrition", "bulk", "cut", "maintenance calories"],
    featured: true,
    componentPath: "@/components/health/tdee-calculator"
  },
  {
    id: "calorie-deficit-calculator",
    name: "Calorie Deficit Calculator",
    slug: "calorie-deficit-calculator",
    category: "Health",
    description: "Calculate daily calories for a deficit based on TDEE.",
    icon: Activity,
    keywords: ["calorie deficit", "cutting calories", "weight loss calories", "deficit"],
    featured: false,
    componentPath: "@/components/calculators/health/calorie-deficit-calculator"
  },
  {
    id: "body-fat-calculator",
    name: "Body Fat Calculator",
    slug: "body-fat-calculator",
    category: "Health",
    description: "Estimate body fat percentage using measurements.",
    icon: Activity,
    keywords: ["body fat", "body fat percentage", "navy method", "measurements"],
    featured: false,
    componentPath: "@/components/calculators/health/body-fat-calculator"
  },
  {
    id: "ideal-body-weight-calculator",
    name: "Ideal Body Weight Calculator",
    slug: "ideal-body-weight-calculator",
    category: "Health",
    description: "Estimate ideal weight range based on height.",
    icon: Activity,
    keywords: ["ideal weight", "healthy weight", "devine", "ibw"],
    featured: false,
    componentPath: "@/components/calculators/health/ideal-body-weight-calculator"
  }
];

export const categoryRegistry: CategoryItem[] = [
  {
    title: "Education",
    description: "Student planning tools for grades, GPA, and academic goals.",
    icon: GraduationCap,
    slug: "education"
  },
  {
    title: "Finance",
    description: "Budget, salary, and tax-focused calculators for real decisions.",
    icon: Landmark,
    slug: "finance"
  },
  {
    title: "Health",
    description: "Wellness calculators to support nutrition and body goals.",
    icon: Calculator,
    slug: "health"
  }
];

export type CalculatorNavItem = {
  title: string;
  description: string;
  href: string;
  category: CalculatorCategory;
  icon: LucideIcon;
};

export const calculatorItems: CalculatorNavItem[] = calculatorRegistry.map(({ name, slug, category, description, icon }) => ({
  title: name,
  description,
  href: `/${slug}`,
  category,
  icon
}));

export const categoryItems = categoryRegistry.map(({ title, description, icon }) => ({
  title,
  description,
  icon
}));

export const getCalculatorsByCategory = (category: CalculatorCategory) => {
  return calculatorRegistry
    .filter((calc) => calc.category === category)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
};

export const getFeaturedCalculators = () => {
  return calculatorRegistry.filter(calc => calc.featured);
};

export const searchCalculators = (query: string) => {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  
  return calculatorRegistry.filter(calc => {
    const nameMatch = calc.name.toLowerCase().includes(lowercaseQuery);
    const descMatch = calc.description.toLowerCase().includes(lowercaseQuery);
    const categoryMatch = calc.category.toLowerCase().includes(lowercaseQuery);
    const keywordMatch = calc.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery));
    
    return nameMatch || descMatch || categoryMatch || keywordMatch;
  });
};

const normalizeSearchText = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

const scoreMatch = (haystack: string, needle: string) => {
  if (!needle) return 0;
  if (!haystack) return 0;
  if (haystack === needle) return 100;
  if (haystack.startsWith(needle)) return 70;
  if (haystack.includes(needle)) return 45;
  return 0;
};

export const searchCalculatorsRanked = (query: string, limit = 10) => {
  const q = normalizeSearchText(query);
  if (!q) return [];

  const tokens = q.split(" ").filter(Boolean);

  const scored = calculatorRegistry
    .map((calc) => {
      const name = normalizeSearchText(calc.name);
      const desc = normalizeSearchText(calc.description);
      const category = normalizeSearchText(calc.category);
      const keywords = calc.keywords.map(normalizeSearchText);

      let score = 0;

      score += scoreMatch(name, q) * 2;
      score += scoreMatch(desc, q);
      score += scoreMatch(category, q);
      score += keywords.some((k) => k === q) ? 60 : 0;
      score += keywords.some((k) => k.includes(q)) ? 35 : 0;

      for (const t of tokens) {
        score += scoreMatch(name, t) * 3;
        score += scoreMatch(desc, t);
        score += scoreMatch(category, t);
        score += keywords.some((k) => k.includes(t)) ? 18 : 0;
      }

      return { calc, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.calc);

  return scored;
};

export function getCalculatorBySlug(slug: string) {
  return calculatorRegistry.find((calc) => calc.slug === slug);
}

export type CalculatorInternalLink = {
  href: string;
  label: string;
};

export function getCalculatorInternalLinks(slug: string, count = 3): CalculatorInternalLink[] {
  const current = getCalculatorBySlug(slug);
  if (!current) return [];

  const relatedSlugs = (current.relatedSlugs ?? []).filter((s) => s && s !== slug);
  const fromRelated = relatedSlugs
    .map((s) => getCalculatorBySlug(s))
    .filter((x): x is CalculatorDefinition => Boolean(x))
    .slice(0, count)
    .map((calc) => ({ href: `/${calc.slug}`, label: calc.name }));

  if (fromRelated.length >= count) return fromRelated;

  const fallback = calculatorRegistry
    .filter((calc) => calc.slug !== slug && calc.category === current.category)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.name.localeCompare(b.name);
    })
    .slice(0, Math.max(count - fromRelated.length, 0))
    .map((calc) => ({ href: `/${calc.slug}`, label: calc.name }));

  return [...fromRelated, ...fallback].slice(0, count);
}

export function getRelatedCalculators(slug: string, count = 2) {
  const current = getCalculatorBySlug(slug);
  if (!current) return [];
  return calculatorRegistry
    .filter((calc) => calc.slug !== slug && calc.category === current.category)
    .slice(0, count);
}

export function getAdjacentCalculator(slug: string) {
  const index = calculatorRegistry.findIndex((calc) => calc.slug === slug);
  if (index === -1) return undefined;

  const next = calculatorRegistry[index + 1];
  if (next && next.slug !== slug) return next;

  const prev = calculatorRegistry[index - 1];
  if (prev && prev.slug !== slug) return prev;

  return undefined;
}
