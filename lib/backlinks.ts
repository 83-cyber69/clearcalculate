export type BacklinkSource = "reddit" | "quora" | "forum" | "directory";

export type BacklinkStatus = "planned" | "posted" | "indexed";

export type ImpactScore = "low" | "medium" | "high";

export type BacklinkTargetPage =
  | "/gpa-calculator"
  | "/take-home-pay-calculator"
  | "/tdee-calculator"
  | "/compound-interest-calculator"
  | "/calorie-deficit-calculator";

export interface BacklinkEntry {
  id: string;
  source: BacklinkSource;
  url: string;
  targetPage: BacklinkTargetPage;
  status: BacklinkStatus;
  impact: ImpactScore;
  createdAtISO: string;
  postedAtISO?: string;
  indexedAtISO?: string;
  titleOrThread?: string;
  notes?: string;
}

export interface DirectorySubmission {
  id: string;
  category: "free_tool_directory" | "startup_directory" | "calculator_listing_site";
  name: string;
  url: string;
  status: BacklinkStatus;
  impact: ImpactScore;
  submittedAtISO?: string;
  indexedAtISO?: string;
  notes?: string;
}

export const PRIORITY_TARGET_PAGES: readonly BacklinkTargetPage[] = [
  "/gpa-calculator",
  "/take-home-pay-calculator",
  "/tdee-calculator",
  "/compound-interest-calculator",
  "/calorie-deficit-calculator"
] as const;

export const CONTENT_ANGLES = {
  education: {
    gpaCalculationHelp: {
      title: "GPA calculation help (weighted vs unweighted)",
      hook:
        "People usually get stuck on weighted vs unweighted GPAs, honors/AP boosts, and how credits affect the average.",
      suggestedTargets: ["/gpa-calculator"] as const
    },
    gradeNeededToPass: {
      title: "Grade needed to pass (what score do I need on the final?)",
      hook:
        "Many students know their current grade but can’t translate it into the score needed on the final to hit a target.",
      suggestedTargets: ["/gpa-calculator"] as const
    },
    studyPlanningTools: {
      title: "Study planning tools (time budgeting + realistic targets)",
      hook:
        "Study plans fail when they don’t connect time available to realistic score improvements and milestone checks.",
      suggestedTargets: ["/gpa-calculator"] as const
    }
  },
  finance: {
    salaryAfterTaxConfusion: {
      title: "Salary after tax confusion (gross vs net)",
      hook:
        "People often compare job offers by gross salary, then get surprised by withholding, benefits, and retirement deductions.",
      suggestedTargets: ["/take-home-pay-calculator"] as const
    },
    loanPaymentEstimates: {
      title: "Loan payment estimates (what will the monthly payment be?)",
      hook:
        "Monthly payment confusion usually comes from mixing principal, interest rate, and term — especially with extra payments.",
      suggestedTargets: ["/compound-interest-calculator"] as const
    },
    compoundInterestUnderstanding: {
      title: "Compound interest understanding (growth over time)",
      hook:
        "People underestimate how contributions and time can outweigh small differences in interest rate.",
      suggestedTargets: ["/compound-interest-calculator"] as const
    }
  },
  health: {
    calorieDeficitConfusion: {
      title: "Calorie deficit confusion (how many calories should I eat?)",
      hook:
        "Most confusion comes from not knowing maintenance calories first, then choosing an aggressive deficit that’s hard to sustain.",
      suggestedTargets: ["/calorie-deficit-calculator"] as const
    },
    tdeeCalculation: {
      title: "TDEE calculation (maintenance calories)",
      hook:
        "People often select the wrong activity multiplier (goal activity vs current activity), which throws off the estimate.",
      suggestedTargets: ["/tdee-calculator"] as const
    },
    weightLossPlanning: {
      title: "Weight loss planning (setting a sustainable pace)",
      hook:
        "A good plan balances a modest deficit, protein intake, and realistic weekly loss targets rather than extremes.",
      suggestedTargets: ["/tdee-calculator", "/calorie-deficit-calculator"] as const
    }
  }
} as const;

export const RESPONSE_TEMPLATES = {
  reddit: {
    concise: {
      name: "Reddit (concise, non-promotional)",
      template:
        "Here’s the quick way to think about it:\n\n1) Problem (in plain terms): {problem_summary}\n2) Simple breakdown: {breakdown_steps}\n3) What to try next: {next_steps}\n\nIf you want, I’ve been using this free calculator to sanity-check the numbers: {tool_url} (no signup).\n\nNotes/assumptions: {assumptions}"
    },
    detailed: {
      name: "Reddit (detailed, teaches first)",
      template:
        "I used to get stuck on this too. The core idea is: {core_idea}\n\nWhat usually causes confusion:\n- {confusion_point_1}\n- {confusion_point_2}\n\nStep-by-step:\n1) {step_1}\n2) {step_2}\n3) {step_3}\n\nIf you want to double-check your specific numbers, this free tool makes it faster: {tool_url}. Totally optional — the steps above are the important part.\n\nAssumptions: {assumptions}"
    }
  },
  quora: {
    structured: {
      name: "Quora (structured answer)",
      template:
        "### What’s happening\n{problem_explanation}\n\n### The simplest way to estimate it\n{simple_method}\n\n### Example\n{example}\n\n### Common mistakes\n- {mistake_1}\n- {mistake_2}\n\n### Optional: use a calculator to confirm\nIf you’d like to plug in your own numbers quickly, here’s a free calculator: {tool_url}. It’s just a convenience — the method above works either way."
    },
    short: {
      name: "Quora (short + friendly)",
      template:
        "Most of the time the confusion comes from {main_confusion}.\n\nA simple estimate is:\n{simple_formula_or_steps}\n\nIf you want to sanity-check quickly, you can use this free calculator: {tool_url} (optional)."
    }
  }
} as const;

export const DIRECTORY_SUBMISSIONS: readonly DirectorySubmission[] = [
  {
    id: "dir_producthunt",
    category: "startup_directory",
    name: "Product Hunt",
    url: "https://www.producthunt.com/",
    status: "planned",
    impact: "high"
  },
  {
    id: "dir_betakit",
    category: "startup_directory",
    name: "BetaList",
    url: "https://betalist.com/",
    status: "planned",
    impact: "medium"
  },
  {
    id: "dir_alternativeto",
    category: "free_tool_directory",
    name: "AlternativeTo",
    url: "https://alternativeto.net/",
    status: "planned",
    impact: "medium"
  },
  {
    id: "dir_slashdot",
    category: "startup_directory",
    name: "Slashdot Submit",
    url: "https://slashdot.org/submit",
    status: "planned",
    impact: "low"
  },
  {
    id: "dir_toolify",
    category: "free_tool_directory",
    name: "Tool directories (curated) - candidate",
    url: "",
    status: "planned",
    impact: "medium",
    notes: "Fill with specific directory URL(s) after manual review for relevance and quality."
  },
  {
    id: "dir_calculatorlisting_candidate",
    category: "calculator_listing_site",
    name: "Calculator listing sites - candidate",
    url: "",
    status: "planned",
    impact: "medium",
    notes: "Fill with specific calculator listing URL(s) after manual review."
  }
] as const;

export interface BacklinkTrackerState {
  backlinks: BacklinkEntry[];
  directorySubmissions: DirectorySubmission[];
}

export function createEmptyBacklinkTrackerState(): BacklinkTrackerState {
  return { backlinks: [], directorySubmissions: [] };
}

export function createBacklinkEntry(input: Omit<BacklinkEntry, "id" | "createdAtISO"> & { id?: string; createdAtISO?: string }): BacklinkEntry {
  return {
    id: input.id ?? `bl_${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`,
    createdAtISO: input.createdAtISO ?? new Date().toISOString(),
    source: input.source,
    url: input.url,
    targetPage: input.targetPage,
    status: input.status,
    impact: input.impact,
    postedAtISO: input.postedAtISO,
    indexedAtISO: input.indexedAtISO,
    titleOrThread: input.titleOrThread,
    notes: input.notes
  };
}

export function upsertBacklink(state: BacklinkTrackerState, entry: BacklinkEntry): BacklinkTrackerState {
  const existingIndex = state.backlinks.findIndex((b) => b.id === entry.id);
  if (existingIndex === -1) {
    return { ...state, backlinks: [entry, ...state.backlinks] };
  }

  const next = [...state.backlinks];
  next[existingIndex] = entry;
  return { ...state, backlinks: next };
}

export function setBacklinkStatus(
  state: BacklinkTrackerState,
  backlinkId: string,
  status: BacklinkStatus,
  timestamps?: { postedAtISO?: string; indexedAtISO?: string }
): BacklinkTrackerState {
  const existing = state.backlinks.find((b) => b.id === backlinkId);
  if (!existing) return state;

  const updated: BacklinkEntry = {
    ...existing,
    status,
    postedAtISO:
      status === "posted" || status === "indexed"
        ? timestamps?.postedAtISO ?? existing.postedAtISO ?? new Date().toISOString()
        : existing.postedAtISO,
    indexedAtISO:
      status === "indexed"
        ? timestamps?.indexedAtISO ?? existing.indexedAtISO ?? new Date().toISOString()
        : existing.indexedAtISO
  };

  return upsertBacklink(state, updated);
}

export function getBacklinksByTarget(state: BacklinkTrackerState, targetPage: BacklinkTargetPage): BacklinkEntry[] {
  return state.backlinks.filter((b) => b.targetPage === targetPage);
}

export function getBacklinksBySource(state: BacklinkTrackerState, source: BacklinkSource): BacklinkEntry[] {
  return state.backlinks.filter((b) => b.source === source);
}

export function backlinkSummary(state: BacklinkTrackerState): {
  total: number;
  planned: number;
  posted: number;
  indexed: number;
  byImpact: Record<ImpactScore, number>;
  bySource: Record<BacklinkSource, number>;
} {
  const byImpact: Record<ImpactScore, number> = { low: 0, medium: 0, high: 0 };
  const bySource: Record<BacklinkSource, number> = { reddit: 0, quora: 0, forum: 0, directory: 0 };

  let planned = 0;
  let posted = 0;
  let indexed = 0;

  for (const b of state.backlinks) {
    byImpact[b.impact] += 1;
    bySource[b.source] += 1;
    if (b.status === "planned") planned += 1;
    if (b.status === "posted") posted += 1;
    if (b.status === "indexed") indexed += 1;
  }

  return {
    total: state.backlinks.length,
    planned,
    posted,
    indexed,
    byImpact,
    bySource
  };
}

export const INTERNAL_LINK_SUPPORT_CHECKLIST = {
  shareableUrl: "Each target page should have a clean, stable path (no querystring required).",
  fastLoad: "Prefer static rendering and avoid heavy client-only dependencies above the fold.",
  strongMetaDescription: "Each target page should have a unique, benefit-driven meta description.",
  faqSection: "Each target page should include FAQ content (helps CTR and long-tail coverage)."
} as const;
