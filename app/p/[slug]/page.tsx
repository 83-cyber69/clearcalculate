import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { CalculatorPageShell } from "@/components/shared/calculator-page-shell";
import { CalculatorHero } from "@/components/shared/calculator-hero";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { ShareButtons } from "@/components/shared/share-buttons";
import { CalculatorSidebar } from "@/components/shared/calculator-sidebar";
import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { CalculatorEmbed } from "@/components/calculators/CalculatorEmbed";
import { getCalculatorBySlug, getCalculatorInternalLinks } from "@/lib/calculators";
import {
  getProgrammaticPageBySlug,
  getProgrammaticPages,
  estimateWordCount,
  isProgrammaticPageIndexable,
  getProgrammaticClusterLinks,
  getProgrammaticClusterHubLink
} from "@/lib/programmatic-pages";
import { createBreadcrumbJsonLd, createFaqJsonLd, createWebApplicationJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export const dynamicParams = false;

export function generateStaticParams() {
  return getProgrammaticPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getProgrammaticPageBySlug(slug);
  if (!page) return {};

  const indexable = isProgrammaticPageIndexable(page.slug);

  return {
    title: {
      absolute: page.title
    },
    description: page.description,
    alternates: {
      canonical: `/p/${page.slug}`
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteUrl}/p/${page.slug}`,
      type: "article"
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true, nocache: true }
  };
}

export default async function ProgrammaticLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getProgrammaticPageBySlug(slug);
  if (!page) notFound();

  const calc = getCalculatorBySlug(page.calculatorSlug);
  if (!calc) notFound();

  const indexable = isProgrammaticPageIndexable(page.slug);
  const wc = estimateWordCount(page);

  const kind = page.kind === "hub" ? "hub" : "guide";

  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: page.h1,
    description: page.description,
    path: `/p/${page.slug}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All"
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: page.category, path: `/${page.category.toLowerCase()}` },
    { name: page.h1, path: `/p/${page.slug}` }
  ]);

  const internalLinks = getCalculatorInternalLinks(page.calculatorSlug, 3);
  const clusterLinks = getProgrammaticClusterLinks(page.slug, 4);
  const hubLink = getProgrammaticClusterHubLink(page.slug);
  const hubChildren =
    kind === "hub"
      ? getProgrammaticPages().filter((p) => p.kind !== "hub" && p.cluster === page.cluster)
      : [];

  return (
    <CalculatorPageShell
      hero={<CalculatorHero eyebrow={kind === "hub" ? `${page.category} Guide Hub` : `${page.category} Guide`} title={page.h1} />}
      calculator={
        <>
          <Script id={`p-${page.slug}-webapplication-schema`} type="application/ld+json">
            {JSON.stringify(webApplicationJsonLd)}
          </Script>
          <Script id={`p-${page.slug}-faq-schema`} type="application/ld+json">
            {JSON.stringify(createFaqJsonLd(page.faqItems))}
          </Script>
          <Script id={`p-${page.slug}-breadcrumb-schema`} type="application/ld+json">
            {JSON.stringify(breadcrumbJsonLd)}
          </Script>

          <div className="glass-card p-6 sm:p-8">
            <p className="text-sm leading-7 text-slate-700 sm:text-base">
              This page is a long-tail guide. For the full tool, open the{" "}
              <Link href={`/${calc.slug}`} className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                {calc.name}
              </Link>
              .
            </p>
            {!indexable ? (
              <p className="mt-3 text-xs text-slate-500">
                Note: this page is currently set to noindex ({wc} words).
              </p>
            ) : null}
          </div>

          <CalculatorEmbed calculatorSlug={calc.slug} />
        </>
      }
      quickInfo={
        <div className="space-y-3">
          <p className="text-sm leading-7 text-slate-700 sm:text-base">{page.description}</p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Guide</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Calculator Included</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Updated</span>
          </div>
        </div>
      }
      quickActions={<ShareButtons title={page.h1} urlPath={`/p/${page.slug}`} shareText="Try this guide:" />}
      sidebar={
        <CalculatorSidebar
          trustBadges={[{ label: "Fast" }, { label: "Free" }, { label: "Private" }, { label: "Mobile Friendly" }]}
          quickLinks={[
            { label: "Calculator", href: "#calculator" },
            { label: "Explanation", href: "#explanation" },
            { label: "Example", href: "#example" },
            { label: "FAQ", href: "#faq" }
          ]}
          tip={`Use the base calculator for exact results, then compare 2–3 scenarios.`}
        />
      }
      seoContent={
        <>
          <article id="explanation" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">Explanation</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              {page.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {page.explanation.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </article>

          {kind === "hub" ? (
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Browse guides in this hub</h2>
              <div className="mt-4 grid gap-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Open a specific guide to match your scenario:
                </p>
                <div className="grid gap-2">
                  {hubChildren.map((child) => (
                    <Link
                      key={child.slug}
                      href={`/p/${child.slug}`}
                      className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600"
                    >
                      {child.h1}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ) : null}

          <article id="example" className="glass-card p-6 sm:p-8 scroll-mt-24">
            <h2 className="section-title">Example</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              {page.example.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">Recommended next calculators</h2>
            <div className="mt-4 grid gap-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                Continue with the base calculator and a few logically related tools:
              </p>
              <div className="grid gap-2">
                <Link href={`/${calc.slug}`} className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  {calc.name}
                </Link>
                <Link href={`/${page.category.toLowerCase()}`} className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600">
                  Browse {page.category} calculators
                </Link>
                {internalLinks.map((item) => (
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

          {clusterLinks.length > 0 ? (
            <article className="glass-card p-6 sm:p-8">
              <h2 className="section-title">Related guides</h2>
              <div className="mt-4 grid gap-3 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Explore more guides with the same intent:
                </p>
                <div className="grid gap-2">
                  {hubLink ? (
                    <Link
                      key={hubLink.href}
                      href={hubLink.href}
                      className="font-medium text-slate-900 underline underline-offset-4 hover:text-orange-600"
                    >
                      {hubLink.label}
                    </Link>
                  ) : null}
                  {clusterLinks.map((item) => (
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

          <article className="glass-card p-6 sm:p-8">
            <h2 className="section-title">FAQ</h2>
            <div id="faq" className="mt-6 scroll-mt-24">
              <FAQAccordion items={page.faqItems} />
            </div>
          </article>

          <RelatedCalculators slug={calc.slug} />
        </>
      }
    />
  );
}
