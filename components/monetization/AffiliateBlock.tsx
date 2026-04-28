import Link from "next/link";
import { cn } from "@/lib/utils";

export type AffiliateRecommendation = {
  title: string;
  description: string;
  href: string;
  provider?: string;
};

type AffiliateBlockProps = {
  title: string;
  items: AffiliateRecommendation[];
  className?: string;
};

export function AffiliateBlock({ title, items, className }: AffiliateBlockProps) {
  if (items.length === 0) return null;

  return (
    <section className={cn("glass-card p-6 sm:p-8", className)}>
      <h2 className="section-title">{title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.slice(0, 4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group block rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-orange-200 hover:shadow-md"
            rel="sponsored"
            target="_blank"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 group-hover:text-orange-600">{item.title}</p>
                {item.provider ? <p className="mt-1 text-xs font-medium text-slate-500">{item.provider}</p> : null}
              </div>
              <span className="text-xs font-semibold text-slate-500 group-hover:text-orange-600">Learn more</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">Some links may be affiliate links. Recommendations are selected for usefulness.</p>
    </section>
  );
}
