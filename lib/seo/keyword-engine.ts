import { calculatorRegistry, type CalculatorCategory } from "@/lib/calculators";
import { seoKeywordRegistry } from "@/lib/seo-keywords";

export type KeywordIntent =
  | "calculator"
  | "question"
  | "comparison"
  | "state_variable"
  | "informational";

export type KeywordSourceKind =
  | "seed"
  | "google_autocomplete"
  | "people_also_ask"
  | "related_searches"
  | "internal_search"
  | "analytics";

export type RawKeyword = {
  keyword: string;
  source: KeywordSourceKind;
  meta?: Record<string, unknown>;
};

export type KeywordClusterStatus = "planned" | "building" | "published" | "indexed";

export type RecommendedPageType = "calculator" | "programmatic" | "informational" | "mixed";

export type KeywordClusterRecord = {
  parentKeyword: string;
  variants: string[];
  intent: KeywordIntent;
  score: number;
  recommendedPageType: RecommendedPageType;
  linkedCalculator: string | null;
  status: KeywordClusterStatus;
};

export type KeywordClusterOpportunity = KeywordClusterRecord & {
  category: CalculatorCategory | "Mixed";
  reasons: string[];
  warnings: string[];
  recommended: {
    calculatorPage: { slug: string; title: string } | null;
    programmaticPages: { slug: string; title: string }[];
    informationalPages: { slug: string; title: string }[];
  };
};

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "my",
  "of",
  "on",
  "or",
  "should",
  "the",
  "to",
  "what",
  "when",
  "where",
  "who",
  "why",
  "with",
  "you",
  "your"
]);

const US_STATES = new Set([
  "alabama",
  "alaska",
  "arizona",
  "arkansas",
  "california",
  "colorado",
  "connecticut",
  "delaware",
  "florida",
  "georgia",
  "hawaii",
  "idaho",
  "illinois",
  "indiana",
  "iowa",
  "kansas",
  "kentucky",
  "louisiana",
  "maine",
  "maryland",
  "massachusetts",
  "michigan",
  "minnesota",
  "mississippi",
  "missouri",
  "montana",
  "nebraska",
  "nevada",
  "new hampshire",
  "new jersey",
  "new mexico",
  "new york",
  "north carolina",
  "north dakota",
  "ohio",
  "oklahoma",
  "oregon",
  "pennsylvania",
  "rhode island",
  "south carolina",
  "south dakota",
  "tennessee",
  "texas",
  "utah",
  "vermont",
  "virginia",
  "washington",
  "west virginia",
  "wisconsin",
  "wyoming"
]);

const normalizeSpaces = (value: string) => value.replace(/\s+/g, " ").trim();

export function normalizeKeyword(value: string) {
  const lowered = value.toLowerCase();
  const cleaned = lowered
    .replace(/[^a-z0-9\s%\-]/g, " ")
    .replace(/\b(near me|reddit|pdf|worksheet|free printable|template)\b/g, " ")
    .replace(/\b(calc|calculation)\b/g, "calculator")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned;
}

export function keywordTokens(value: string) {
  const normalized = normalizeKeyword(value);
  return normalized
    .split(" ")
    .map((t) => t.trim())
    .filter(Boolean)
    .filter((t) => !STOP_WORDS.has(t));
}

export function classifySearchIntent(keyword: string): KeywordIntent {
  const k = normalizeKeyword(keyword);

  if (/(\bvs\b|\bversus\b|\bcompare\b)/.test(k)) return "comparison";
  if (/(\bcalculator\b|\bcalc\b|\bcompute\b)/.test(k)) return "calculator";
  if (/\b(what|why|how|when|where|who)\b/.test(k)) return "question";
  if (/\b(after taxes|after tax|salary after|loan payment|mortgage payment|calories to lose|calorie deficit)\b/.test(k)) {
    const tokens = keywordTokens(k).join(" ");
    if (US_STATES.has(tokens) || /\b(al|ak|az|ar|ca|co|ct|de|fl|ga|hi|id|il|in|ia|ks|ky|la|me|md|ma|mi|mn|ms|mo|mt|ne|nv|nh|nj|nm|ny|nc|nd|oh|ok|or|pa|ri|sc|sd|tn|tx|ut|vt|va|wa|wv|wi|wy)\b/.test(k)) {
      return "state_variable";
    }
    if (/\b\d{2,}\b/.test(k)) return "state_variable";
  }
  if (/\b(what is|definition|meaning)\b/.test(k)) return "informational";
  return "informational";
}

export function parentKeywordFrom(keyword: string) {
  const tokens = keywordTokens(keyword);
  const withoutNumbers = tokens.filter((t) => !/^\d/.test(t));
  const simplified = withoutNumbers
    .join(" ")
    .replace(/\bcalculator\b/g, "")
    .replace(/\bafter\b/g, "")
    .replace(/\btaxes\b/g, "tax")
    .replace(/\bpaycheck\b/g, "pay")
    .replace(/\bnet\b/g, "")
    .replace(/\bgross\b/g, "")
    .replace(/\bpercent\b/g, "%")
    .trim();

  return normalizeSpaces(simplified || normalizeKeyword(keyword));
}

export function clusterKeywords(keywords: string[]) {
  const clusters = new Map<string, Set<string>>();

  for (const raw of keywords) {
    const normalized = normalizeKeyword(raw);
    if (!normalized) continue;
    const parent = parentKeywordFrom(normalized);
    const set = clusters.get(parent) ?? new Set<string>();
    set.add(normalized);
    clusters.set(parent, set);
  }

  return [...clusters.entries()].map(([parent, variants]) => ({
    parentKeyword: parent,
    variants: [...variants].sort((a, b) => a.localeCompare(b))
  }));
}

function guessCategory(parentKeyword: string): CalculatorCategory | "Mixed" {
  const tokens = keywordTokens(parentKeyword);
  let edu = 0;
  let fin = 0;
  let health = 0;

  const t = tokens.join(" ");
  if (/(gpa|grade|final|act|sat|study)/.test(t)) edu += 2;
  if (/(tax|salary|pay|loan|mortgage|interest|retirement|debt)/.test(t)) fin += 2;
  if (/(tdee|bmr|bmi|body fat|calorie|protein|weight)/.test(t)) health += 2;

  if (edu === fin && fin === health) return "Mixed";
  const max = Math.max(edu, fin, health);
  const winners = [
    edu === max ? "Education" : null,
    fin === max ? "Finance" : null,
    health === max ? "Health" : null
  ].filter(Boolean) as CalculatorCategory[];
  return winners.length === 1 ? winners[0] : "Mixed";
}

function findLinkedCalculator(parentKeyword: string): string | null {
  const q = normalizeKeyword(parentKeyword);

  const direct = calculatorRegistry.find((c) => {
    if (normalizeKeyword(c.name).includes(q)) return true;
    if (normalizeKeyword(c.description).includes(q)) return true;
    if (normalizeKeyword(c.slug).includes(q.replace(/\s/g, "-"))) return true;
    if (c.keywords.some((k) => normalizeKeyword(k).includes(q))) return true;
    const seo = seoKeywordRegistry[c.slug];
    if (!seo) return false;
    if (normalizeKeyword(seo.primaryKeyword).includes(q)) return true;
    if (seo.secondaryKeywords.some((k) => normalizeKeyword(k).includes(q))) return true;
    return false;
  });

  return direct?.slug ?? null;
}

function clampScore(value: number) {
  return Math.max(1, Math.min(100, Math.round(value)));
}

export function scoreCluster(input: {
  parentKeyword: string;
  variants: string[];
  intent: KeywordIntent;
  linkedCalculator: string | null;
}) {
  const { parentKeyword, variants, intent, linkedCalculator } = input;

  let score = 15;

  score += Math.min(variants.length, 18) * 2.2;

  if (intent === "calculator") score += 18;
  if (intent === "question") score += 10;
  if (intent === "comparison") score += 14;
  if (intent === "state_variable") score += 16;
  if (intent === "informational") score += 6;

  if (/\b(tax|salary|mortgage|loan|paycheck|debt)\b/.test(parentKeyword)) score += 12;
  if (/\b(bmr|tdee|bmi|body fat|calorie|protein)\b/.test(parentKeyword)) score += 10;
  if (/\b(gpa|grade|final)\b/.test(parentKeyword)) score += 8;

  if (linkedCalculator) score -= 12;

  if (intent === "state_variable") score += 10;
  if (intent === "comparison") score += 8;

  if (/\bfree\b/.test(parentKeyword)) score -= 10;
  if (/(worksheet|answers|key)/.test(parentKeyword)) score -= 15;

  return clampScore(score);
}

export function recommendPages(input: {
  parentKeyword: string;
  variants: string[];
  intent: KeywordIntent;
  linkedCalculator: string | null;
}) {
  const { parentKeyword, variants, intent, linkedCalculator } = input;

  const normalizedParent = normalizeKeyword(parentKeyword);
  const slugBase = normalizedParent.replace(/\s+/g, "-");

  const calculatorPage = linkedCalculator
    ? null
    : intent === "calculator" || intent === "state_variable"
      ? { slug: `${slugBase}-calculator`, title: `${titleCase(parentKeyword)} Calculator` }
      : null;

  const programmaticPages: { slug: string; title: string }[] = [];
  const informationalPages: { slug: string; title: string }[] = [];

  if (intent === "state_variable") {
    programmaticPages.push({ slug: `p/${slugBase}-guides`, title: `${titleCase(parentKeyword)} Guides` });
  }

  if (intent === "comparison") {
    informationalPages.push({ slug: `${slugBase}`, title: `${titleCase(parentKeyword)} (comparison)` });
  }

  if (intent === "question" || intent === "informational") {
    informationalPages.push({ slug: `${slugBase}`, title: `${titleCase(parentKeyword)}` });
  }

  if (linkedCalculator) {
    const calc = calculatorRegistry.find((c) => c.slug === linkedCalculator);
    if (calc) {
      programmaticPages.push({ slug: `p/${slugBase}`, title: `${calc.name}: ${titleCase(parentKeyword)}` });
    }
  }

  const uniqueProgrammatic = uniqueBy(programmaticPages, (x) => x.slug).slice(0, 8);
  const uniqueInfo = uniqueBy(informationalPages, (x) => x.slug).slice(0, 8);

  return {
    calculatorPage,
    programmaticPages: uniqueProgrammatic,
    informationalPages: uniqueInfo
  };
}

export function recommendedPageType(intent: KeywordIntent, linkedCalculator: string | null): RecommendedPageType {
  if (!linkedCalculator && intent === "calculator") return "calculator";
  if (intent === "state_variable") return linkedCalculator ? "programmatic" : "mixed";
  if (intent === "comparison") return "informational";
  if (intent === "question") return linkedCalculator ? "mixed" : "informational";
  return linkedCalculator ? "informational" : "informational";
}

export function buildOpportunitiesFromKeywords(rawKeywords: RawKeyword[]) {
  const normalized = rawKeywords
    .map((k) => normalizeKeyword(k.keyword))
    .filter(Boolean);

  const unique = [...new Set(normalized)];
  const clustered = clusterKeywords(unique);

  const opportunities: KeywordClusterOpportunity[] = clustered
    .map((c) => {
      const combined = [c.parentKeyword, ...c.variants];
      const intentVotes = combined.map(classifySearchIntent);
      const intent = pickTop(intentVotes);
      const linkedCalculator = findLinkedCalculator(c.parentKeyword);
      const score = scoreCluster({
        parentKeyword: c.parentKeyword,
        variants: c.variants,
        intent,
        linkedCalculator
      });

      const status: KeywordClusterStatus = linkedCalculator ? "published" : "planned";

      const category = guessCategory(c.parentKeyword);

      const recommended = recommendPages({
        parentKeyword: c.parentKeyword,
        variants: c.variants,
        intent,
        linkedCalculator
      });

      const reasons: string[] = [];
      const warnings: string[] = [];

      if (!linkedCalculator) reasons.push("No matching calculator found");
      if (intent === "state_variable") reasons.push("High programmatic expansion potential");
      if (intent === "calculator") reasons.push("Direct calculator intent");
      if (intent === "comparison") reasons.push("High backlink potential for comparisons");

      if (linkedCalculator) warnings.push("Overlaps an existing calculator keyword set");
      if (c.variants.length < 2) warnings.push("Small cluster size; may be low demand");

      return {
        parentKeyword: c.parentKeyword,
        variants: c.variants,
        intent,
        score,
        recommendedPageType: recommendedPageType(intent, linkedCalculator),
        linkedCalculator,
        status,
        category,
        reasons,
        warnings,
        recommended
      };
    })
    .sort((a, b) => b.score - a.score);

  return opportunities;
}

export function seedKeywords(): RawKeyword[] {
  const education = [
    "gpa calculator",
    "weighted gpa",
    "unweighted gpa",
    "how to calculate gpa",
    "what is gpa",
    "grade needed to pass",
    "what grade do i need to pass",
    "final grade calculator",
    "final exam grade calculator",
    "study time calculator",
    "how many hours should i study"
  ];

  const finance = [
    "paycheck calculator",
    "take home pay",
    "net pay",
    "salary after taxes",
    "salary after tax california",
    "salary after tax texas",
    "loan payment calculator",
    "loan payment 300k",
    "mortgage calculator",
    "mortgage payment",
    "compound interest calculator",
    "compound interest with monthly contributions",
    "debt payoff calculator"
  ];

  const health = [
    "tdee calculator",
    "bmr calculator",
    "bmi calculator",
    "body fat calculator",
    "navy body fat calculator",
    "calorie deficit calculator",
    "calories to lose weight",
    "how many calories should i eat",
    "protein intake calculator",
    "bmr vs tdee",
    "bmi vs body fat"
  ];

  const all = [...education, ...finance, ...health];
  return all.map((keyword) => ({ keyword, source: "seed" as const }));
}

export function buildSeedOpportunities() {
  return buildOpportunitiesFromKeywords(seedKeywords());
}

function pickTop<T extends string>(values: T[]): T {
  const counts = new Map<T, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] ?? values[0];
}

function uniqueBy<T>(items: T[], key: (item: T) => string) {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of items) {
    const k = key(item);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}

function titleCase(value: string) {
  return normalizeSpaces(value)
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}
