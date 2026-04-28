import { getSeoKeywords } from "@/lib/seo-keywords";

type SeoIntelligenceProps = {
  slug: string;
};

export function SeoIntelligence({ slug }: SeoIntelligenceProps) {
  const seo = getSeoKeywords(slug);
  if (!seo) return null;

  const phrases = [...seo.questionKeywords, ...seo.secondaryKeywords]
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);

  return (
    <section className="sr-only" aria-label="Related searches">
      <h2>Related searches people also use</h2>
      <ul>
        {phrases.map((phrase) => (
          <li key={phrase}>{phrase}</li>
        ))}
      </ul>
    </section>
  );
}
