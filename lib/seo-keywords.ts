export type IntentCluster = "education" | "finance" | "health";

export type SeoKeywordEntry = {
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  questionKeywords: string[];
  relatedSearchTerms: string[];
  intentCluster: IntentCluster;
  metaDescription: string;
};

export const seoKeywordRegistry: Record<string, SeoKeywordEntry> = {
  "gpa-calculator": {
    slug: "gpa-calculator",
    primaryKeyword: "gpa calculator",
    secondaryKeywords: [
      "weighted gpa calculator",
      "unweighted gpa calculator",
      "college gpa calculator",
      "high school gpa calculator",
      "gpa calculator with credits",
      "semester gpa calculator",
      "cumulative gpa calculator"
    ],
    questionKeywords: [
      "How do I calculate my GPA?",
      "What is the difference between weighted and unweighted GPA?",
      "How do credits affect GPA?",
      "What is a good GPA for college?",
      "Can I calculate cumulative GPA from multiple semesters?"
    ],
    relatedSearchTerms: ["grade calculator", "final grade", "class average", "study time"],
    intentCluster: "education",
    metaDescription:
      "Use this GPA calculator to estimate weighted and unweighted GPA using grades and credits. Includes a clear formula, example, and quick answers for students."
  },
  "final-grade-calculator": {
    slug: "final-grade-calculator",
    primaryKeyword: "final grade calculator",
    secondaryKeywords: [
      "final exam grade calculator",
      "weighted final grade calculator",
      "calculate final grade with exam weight",
      "final grade prediction",
      "what will my final grade be"
    ],
    questionKeywords: [
      "How do I calculate my final grade?",
      "How much is my final exam worth?",
      "What score do I need on the final exam?",
      "How do weighted grades work?",
      "Do teachers round final grades?"
    ],
    relatedSearchTerms: ["grade needed", "pass class", "gpa", "test score percentage"],
    intentCluster: "education",
    metaDescription:
      "Estimate your final class grade using your current grade, final exam score, and exam weight. Fast results with a simple weighted-grade formula."
  },
  "grade-needed-to-pass-calculator": {
    slug: "grade-needed-to-pass-calculator",
    primaryKeyword: "grade needed to pass calculator",
    secondaryKeywords: [
      "what do i need to pass",
      "required grade calculator",
      "score needed on final",
      "minimum grade to pass",
      "needed grade with remaining weight"
    ],
    questionKeywords: [
      "What grade do I need to pass this class?",
      "How do I calculate the score I need on a final?",
      "What if the required score is over 100%?",
      "What does remaining weight mean?",
      "Can I still pass if my current grade is low?"
    ],
    relatedSearchTerms: ["final grade", "weighted grade", "class average", "gpa"],
    intentCluster: "education",
    metaDescription:
      "Find the grade you need on remaining work to reach a target score. Helpful for finals and weighted categories—no spreadsheets required."
  },
  "class-average-calculator": {
    slug: "class-average-calculator",
    primaryKeyword: "class average calculator",
    secondaryKeywords: [
      "average grade calculator",
      "mean score calculator",
      "calculate average of scores",
      "class grade average",
      "average test scores"
    ],
    questionKeywords: [
      "How do I calculate the average of my scores?",
      "Can I paste scores from a spreadsheet?",
      "What is the difference between average and weighted average?",
      "Does this calculator ignore invalid values?",
      "How many scores can I enter?"
    ],
    relatedSearchTerms: ["test score percentage", "gpa", "final grade"],
    intentCluster: "education",
    metaDescription:
      "Compute a class average from a list of scores in seconds. Paste comma-separated values and get the mean instantly."
  },
  "test-score-percentage-calculator": {
    slug: "test-score-percentage-calculator",
    primaryKeyword: "test score percentage calculator",
    secondaryKeywords: [
      "score percentage calculator",
      "percent correct calculator",
      "convert score to percentage",
      "what percent is x out of y",
      "test grade percentage"
    ],
    questionKeywords: [
      "How do I convert a test score to a percentage?",
      "How many questions did I miss?",
      "What is 42 out of 50 as a percent?",
      "Can I use points instead of questions?",
      "Does this work for quizzes and exams?"
    ],
    relatedSearchTerms: ["class average", "final grade", "grade needed"],
    intentCluster: "education",
    metaDescription:
      "Convert correct answers into a percentage score. Great for quizzes and exams—enter correct and total to get percent and missed questions."
  },
  "act-score-calculator": {
    slug: "act-score-calculator",
    primaryKeyword: "act score calculator",
    secondaryKeywords: [
      "act composite score calculator",
      "calculate act composite",
      "act score average",
      "act section score calculator",
      "how is act composite calculated"
    ],
    questionKeywords: [
      "How is ACT composite score calculated?",
      "What are the four ACT sections?",
      "Does ACT Writing affect composite score?",
      "What is a good ACT score?",
      "Why does ACT composite get rounded?"
    ],
    relatedSearchTerms: ["sat score", "study time", "gpa"],
    intentCluster: "education",
    metaDescription:
      "Estimate ACT composite score by averaging section scores and rounding. Quick way to sanity-check composite totals while prepping."
  },
  "sat-score-calculator": {
    slug: "sat-score-calculator",
    primaryKeyword: "sat score calculator",
    secondaryKeywords: [
      "calculate sat total score",
      "sat math and reading score",
      "sat score estimator",
      "sat score breakdown",
      "what is my sat score"
    ],
    questionKeywords: [
      "How do I calculate SAT total score?",
      "What is a good SAT score?",
      "Does SAT include an essay score?",
      "Is this an official SAT conversion?",
      "Can I compare SAT and ACT scores?"
    ],
    relatedSearchTerms: ["act score", "study time", "gpa"],
    intentCluster: "education",
    metaDescription:
      "Add Math and Reading & Writing section scores to estimate your SAT total. Useful for quick checks and goal setting."
  },
  "study-time-calculator": {
    slug: "study-time-calculator",
    primaryKeyword: "study time calculator",
    secondaryKeywords: [
      "how many hours should i study",
      "study hours per week",
      "study schedule calculator",
      "study time for college",
      "study planning tool"
    ],
    questionKeywords: [
      "How many hours should I study per week?",
      "How many study hours per credit is typical?",
      "Should I study every day?",
      "How do I plan study time with a job?",
      "Does class difficulty change study hours?"
    ],
    relatedSearchTerms: ["gpa", "class average", "act score", "sat score"],
    intentCluster: "education",
    metaDescription:
      "Estimate weekly study hours based on course load and your preferred hours-per-credit rule. Helps you plan realistic study blocks."
  },
  "take-home-pay-calculator": {
    slug: "take-home-pay-calculator",
    primaryKeyword: "take home pay calculator",
    secondaryKeywords: [
      "net pay calculator",
      "salary after taxes calculator",
      "paycheck calculator",
      "after tax income",
      "take home pay estimate",
      "paycheck take home"
    ],
    questionKeywords: [
      "What is take-home pay?",
      "Why is net pay different from gross pay?",
      "How do deductions affect take-home pay?",
      "Does retirement reduce taxable income?",
      "How do I estimate pay from hourly wages?"
    ],
    relatedSearchTerms: ["salary after taxes", "hourly to salary", "loan payment"],
    intentCluster: "finance",
    metaDescription:
      "Estimate net (take-home) pay after taxes and common deductions. Compare scenarios quickly with clear yearly and monthly results."
  },
  "salary-after-taxes-calculator": {
    slug: "salary-after-taxes-calculator",
    primaryKeyword: "salary after taxes calculator",
    secondaryKeywords: [
      "net salary calculator",
      "after tax salary",
      "effective tax rate calculator",
      "salary after federal tax",
      "salary after deductions"
    ],
    questionKeywords: [
      "What is an effective tax rate?",
      "How do I estimate net salary?",
      "Does this include payroll tax?",
      "Is net salary the same as take-home pay?",
      "Why is my net salary lower than expected?"
    ],
    relatedSearchTerms: ["take home pay", "hourly to salary", "salary to hourly"],
    intentCluster: "finance",
    metaDescription:
      "Estimate after-tax salary using a simple effective tax rate. Quick planning tool for comparing job offers and budgets."
  },
  "hourly-to-salary-calculator": {
    slug: "hourly-to-salary-calculator",
    primaryKeyword: "hourly to salary calculator",
    secondaryKeywords: [
      "convert hourly to yearly",
      "hourly wage to annual salary",
      "hourly to yearly pay",
      "annual pay calculator",
      "hourly rate conversion"
    ],
    questionKeywords: [
      "How do I convert hourly wage to salary?",
      "Should I use 52 weeks for salary conversion?",
      "How do I include overtime?",
      "What hours per week should I use?",
      "How do I estimate monthly pay from hourly wages?"
    ],
    relatedSearchTerms: ["salary to hourly", "take home pay", "salary after taxes"],
    intentCluster: "finance",
    metaDescription:
      "Convert hourly pay into annual and monthly salary estimates based on your schedule. Useful for job comparisons and budgeting."
  },
  "salary-to-hourly-calculator": {
    slug: "salary-to-hourly-calculator",
    primaryKeyword: "salary to hourly calculator",
    secondaryKeywords: [
      "convert salary to hourly",
      "hourly rate from salary",
      "annual salary to hourly wage",
      "effective hourly rate",
      "salary per hour"
    ],
    questionKeywords: [
      "How do I convert salary to hourly?",
      "What if I work more than 40 hours per week?",
      "How many work weeks are in a year?",
      "Is hourly rate different for contractors?",
      "How do I compare two job offers by hourly rate?"
    ],
    relatedSearchTerms: ["hourly to salary", "take home pay", "salary after taxes"],
    intentCluster: "finance",
    metaDescription:
      "Convert annual salary into an hourly rate using your actual work schedule. Helpful for comparing roles with different hours."
  },
  "loan-payment-calculator": {
    slug: "loan-payment-calculator",
    primaryKeyword: "loan payment calculator",
    secondaryKeywords: [
      "monthly loan payment",
      "amortization payment calculator",
      "fixed rate loan calculator",
      "car loan payment calculator",
      "personal loan payment"
    ],
    questionKeywords: [
      "How is a loan payment calculated?",
      "What does APR mean?",
      "What if my interest rate is 0%?",
      "How much interest will I pay over the loan term?",
      "Can I use this for car loans?"
    ],
    relatedSearchTerms: ["mortgage payment", "compound interest", "salary after taxes"],
    intentCluster: "finance",
    metaDescription:
      "Calculate monthly payment, total interest, and total paid for a fixed-rate loan. Useful for budgeting and comparing rates."
  },
  "mortgage-calculator": {
    slug: "mortgage-calculator",
    primaryKeyword: "mortgage calculator",
    secondaryKeywords: [
      "monthly mortgage payment",
      "piti calculator",
      "mortgage payment with taxes and insurance",
      "home loan calculator",
      "mortgage estimate"
    ],
    questionKeywords: [
      "What is included in a mortgage payment?",
      "What is PITI?",
      "How does down payment affect monthly payment?",
      "Does this include PMI?",
      "Is this mortgage payment exact?"
    ],
    relatedSearchTerms: ["loan payment", "compound interest", "retirement"],
    intentCluster: "finance",
    metaDescription:
      "Estimate mortgage payments including principal, interest, taxes, and insurance. Quick planning tool for home affordability."
  },
  "compound-interest-calculator": {
    slug: "compound-interest-calculator",
    primaryKeyword: "compound interest calculator",
    secondaryKeywords: [
      "investment growth calculator",
      "future value calculator",
      "compound interest with contributions",
      "interest calculator",
      "savings growth calculator"
    ],
    questionKeywords: [
      "What is compound interest?",
      "How does monthly contribution change growth?",
      "What annual return should I use?",
      "Is compound interest guaranteed?",
      "How often does compounding happen?"
    ],
    relatedSearchTerms: ["retirement calculator", "loan payment", "mortgage"],
    intentCluster: "finance",
    metaDescription:
      "Project investment growth using compound interest and regular contributions. Includes contribution totals and estimated growth."
  },
  "retirement-calculator": {
    slug: "retirement-calculator",
    primaryKeyword: "retirement calculator",
    secondaryKeywords: [
      "retirement savings calculator",
      "401k growth calculator",
      "ira calculator",
      "future retirement value",
      "4 percent rule calculator"
    ],
    questionKeywords: [
      "How much will I have for retirement?",
      "What return rate should I use for retirement?",
      "What is the 4% rule?",
      "How much should I contribute each month?",
      "Does this include Social Security?"
    ],
    relatedSearchTerms: ["compound interest", "salary after taxes", "take home pay"],
    intentCluster: "finance",
    metaDescription:
      "Project retirement savings based on your current balance, contributions, and estimated return. Includes a 4% rule income estimate."
  },
  "tdee-calculator": {
    slug: "tdee-calculator",
    primaryKeyword: "tdee calculator",
    secondaryKeywords: [
      "maintenance calories calculator",
      "bmr and tdee calculator",
      "calories to lose weight",
      "calories to gain muscle",
      "daily calorie needs"
    ],
    questionKeywords: [
      "What is TDEE?",
      "What is the difference between BMR and TDEE?",
      "How accurate is a TDEE estimate?",
      "How many calories should I eat to lose fat?",
      "How many calories should I eat to gain muscle?"
    ],
    relatedSearchTerms: ["calorie deficit", "body fat", "ideal weight"],
    intentCluster: "health",
    metaDescription:
      "Estimate maintenance calories (TDEE) using age, height, weight, and activity. Includes targets for cutting or bulking plus macro guidance."
  },
  "calorie-deficit-calculator": {
    slug: "calorie-deficit-calculator",
    primaryKeyword: "calorie deficit calculator",
    secondaryKeywords: [
      "calorie deficit to lose weight",
      "daily calorie goal",
      "calorie target calculator",
      "deficit per day",
      "weight loss calorie calculator"
    ],
    questionKeywords: [
      "What is a calorie deficit?",
      "How big should my calorie deficit be?",
      "How fast will I lose weight in a deficit?",
      "Is a 500 calorie deficit safe?",
      "Should I update my deficit as I lose weight?"
    ],
    relatedSearchTerms: ["tdee", "maintenance calories", "body fat"],
    intentCluster: "health",
    metaDescription:
      "Calculate a daily calorie target using your TDEE and desired deficit. Includes an estimated weekly weight loss pace for planning."
  },
  "body-fat-calculator": {
    slug: "body-fat-calculator",
    primaryKeyword: "body fat calculator",
    secondaryKeywords: [
      "body fat percentage calculator",
      "navy body fat calculator",
      "estimate body fat",
      "body fat from measurements",
      "calculate body fat percent"
    ],
    questionKeywords: [
      "How do I calculate body fat percentage?",
      "What is the US Navy body fat method?",
      "How accurate is a body fat estimate?",
      "Do I need hip measurement for body fat?",
      "Should measurements be in inches or cm?"
    ],
    relatedSearchTerms: ["tdee", "calorie deficit", "ideal body weight"],
    intentCluster: "health",
    metaDescription:
      "Estimate body fat percentage using circumference measurements. Includes a clear method reference and quick results for tracking progress."
  },
  "ideal-body-weight-calculator": {
    slug: "ideal-body-weight-calculator",
    primaryKeyword: "ideal body weight calculator",
    secondaryKeywords: [
      "ibw calculator",
      "healthy weight estimate",
      "devine ibw calculator",
      "ideal weight for height",
      "target weight calculator"
    ],
    questionKeywords: [
      "What is ideal body weight (IBW)?",
      "Which ideal weight formula does this use?",
      "Is IBW the same as a healthy weight range?",
      "Should athletes use IBW?",
      "How do I convert kg to pounds?"
    ],
    relatedSearchTerms: ["body fat", "tdee", "calorie deficit"],
    intentCluster: "health",
    metaDescription:
      "Estimate ideal body weight using a common height-based formula. Useful as a reference point for goals, not as a strict rule."
  }
};

export function getSeoKeywords(slug: string) {
  return seoKeywordRegistry[slug];
}
