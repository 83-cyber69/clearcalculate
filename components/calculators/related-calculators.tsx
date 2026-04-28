import { CalculatorCard } from "@/components/shared/calculator-card";
import Link from "next/link";
import { getAdjacentCalculator, getCalculatorBySlug, getRelatedCalculators } from "@/lib/calculators";
import { getSeoKeywords } from "@/lib/seo-keywords";

type RelatedCalculatorsProps = {
  slug: string;
};

export function RelatedCalculators({ slug }: RelatedCalculatorsProps) {
  const current = getCalculatorBySlug(slug);
  const seo = getSeoKeywords(slug);
  const relatedByCategory = getRelatedCalculators(slug, 6);
  const related = seo
    ? relatedByCategory
        .sort((a, b) => {
          const score = (calcSlug: string) => {
            const candidate = getSeoKeywords(calcSlug);
            if (!candidate) return 0;
            const haystack = new Set([candidate.primaryKeyword, ...candidate.secondaryKeywords, ...candidate.relatedSearchTerms].map((s) => s.toLowerCase()));
            return seo.relatedSearchTerms.reduce((acc, term) => acc + (haystack.has(term.toLowerCase()) ? 1 : 0), 0);
          };

          return score(b.slug) - score(a.slug);
        })
        .slice(0, 2)
    : relatedByCategory.slice(0, 2);
  const adjacent = getAdjacentCalculator(slug);

  const categoryHref = current ? `/${current.category.toLowerCase()}` : "/calculators";

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-3">
        {related.map((calc) => (
          <CalculatorCard
            key={calc.id}
            title={calc.name}
            description={calc.description}
            href={`/${calc.slug}`}
            icon={calc.icon}
            ctaLabel="Calculate"
          />
        ))}
        {adjacent && adjacent.slug !== slug ? (
          <CalculatorCard
            title={adjacent.name}
            description={adjacent.description}
            href={`/${adjacent.slug}`}
            icon={adjacent.icon}
            ctaLabel="Calculate"
          />
        ) : null}
      </div>
      <div className="mt-6 text-sm text-slate-600">
        <p>
          Browse more tools in{" "}
          <Link
            href={categoryHref}
            className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600"
          >
            this category
          </Link>
          {" "}or return to the{" "}
          <Link href="/" className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
            ClearCalculate homepage
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
