import type { ReactNode } from "react";
import Script from "next/script";
import Link from "next/link";
import { CalculatorHero } from "@/components/shared/calculator-hero";
import { CalculatorPageShell } from "@/components/shared/calculator-page-shell";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { ShareButtons } from "@/components/shared/share-buttons";
import { CalculatorSidebar } from "@/components/shared/calculator-sidebar";
import {
  getCalculatorBySlug,
  getCalculatorInternalLinks,
  type CalculatorDefinition,
  type CalculatorInternalLink
} from "@/lib/calculators";
import { createBreadcrumbJsonLd, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";

export type CalculatorPageTemplateProps = {
  slug: string;
  calculator: ReactNode;

  quickInfo?: ReactNode;
  quickActions?: ReactNode;
  sidebar?: ReactNode;

  explanation?: ReactNode;
  examples?: ReactNode;
  faqItems?: { question: string; answer: string }[];

  seoContent?: ReactNode;
};

export function CalculatorPageTemplate({
  slug,
  calculator,
  quickInfo,
  quickActions,
  sidebar,
  explanation,
  examples,
  faqItems,
  seoContent
}: CalculatorPageTemplateProps) {
  const calc = getCalculatorBySlug(slug) as CalculatorDefinition | undefined;

  const title = calc?.name ?? "Calculator";
  const category = calc?.category ?? "Health";

  const derivedFaqItems = faqItems ?? calc?.faqItems ?? [];
  const derivedExplanation = explanation ?? calc?.explanation;
  const derivedExamples = examples ?? calc?.examples;

  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: title,
    description: calc?.description ?? "",
    path: `/${slug}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: category, path: `/${category.toLowerCase()}` },
    { name: title, path: `/${slug}` }
  ]);

  const internalLinks: CalculatorInternalLink[] = getCalculatorInternalLinks(slug);

  return (
    <CalculatorPageShell
      hero={<CalculatorHero eyebrow={`${category} Calculator`} title={title} />}
      calculator={
        <>
          <Script id={`${slug}-webapplication-schema`} type="application/ld+json">
            {JSON.stringify(webApplicationJsonLd)}
          </Script>
          {derivedFaqItems.length > 0 ? (
            <Script id={`${slug}-faq-schema`} type="application/ld+json">
              {JSON.stringify(createFaqJsonLd(derivedFaqItems))}
            </Script>
          ) : null}
          <Script id={`${slug}-breadcrumb-schema`} type="application/ld+json">
            {JSON.stringify(breadcrumbJsonLd)}
          </Script>
          {calculator}
        </>
      }
      quickInfo={
        quickInfo ?? (
          <div className="space-y-3">
            <p className="text-sm leading-7 text-slate-700 sm:text-base">{calc?.description}</p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Fast</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Free</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Mobile Friendly</span>
            </div>
          </div>
        )
      }
      quickActions={
        quickActions ?? (
          <ShareButtons title={title} urlPath={`/${slug}`} shareText={`Try this ${title}:`} />
        )
      }
      sidebar={
        sidebar ?? (
          <CalculatorSidebar
            trustBadges={[{ label: "Fast" }, { label: "Free" }, { label: "Private" }, { label: "Mobile Friendly" }]}
            quickLinks={[
              { label: "Calculator", href: "#calculator" },
              { label: "Explanation", href: "#explanation" },
              { label: "Examples", href: "#examples" },
              { label: "FAQ", href: "#faq" }
            ]}
            tip={calc?.tip}
          />
        )
      }
      seoContent={
        seoContent ?? (
          <>
            {derivedExplanation ? (
              <article id="explanation" className="glass-card p-6 sm:p-8 scroll-mt-24">
                <h2 className="section-title">Explanation</h2>
                <div className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">{derivedExplanation}</div>
              </article>
            ) : null}

            {derivedExamples ? (
              <article id="examples" className="glass-card p-6 sm:p-8 scroll-mt-24">
                <h2 className="section-title">Examples</h2>
                <div className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">{derivedExamples}</div>
              </article>
            ) : null}

            {internalLinks.length > 0 ? (
              <article className="glass-card p-6 sm:p-8">
                <h2 className="section-title">Recommended next calculators</h2>
                <div className="mt-4 grid gap-3 text-sm leading-7 text-slate-700 sm:text-base">
                  <p>Use these related tools to compare scenarios or plan next steps.</p>
                  <div className="grid gap-2">
                    {internalLinks.map((item: CalculatorInternalLink) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ) : null}

            {derivedFaqItems.length > 0 ? (
              <article className="glass-card p-6 sm:p-8">
                <h2 className="section-title">FAQ</h2>
                <div id="faq" className="mt-6 scroll-mt-24">
                  <FAQAccordion items={derivedFaqItems} />
                </div>
              </article>
            ) : null}

            <RelatedCalculators slug={slug} />
          </>
        )
      }
    />
  );
}
