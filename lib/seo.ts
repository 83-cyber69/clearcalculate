import type { Metadata } from "next";
import { siteConfig } from "@/lib/utils";
import { calculatorRegistry } from "@/lib/calculators";
import { getSeoKeywords } from "@/lib/seo-keywords";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
const defaultOgImage = `${siteUrl}/og-image.png`;

type CalculatorMetadataOptions = {
  calculatorName: string;
  description: string;
  path: string;
  titleOverride?: string;
};

export function createCalculatorMetadata({
  calculatorName,
  description,
  path,
  titleOverride
}: CalculatorMetadataOptions): Metadata {
  const title = titleOverride ?? `${calculatorName} - Free Online Calculator | ClearCalculate`;
  const canonicalUrl = new URL(path, siteUrl).toString();

  return {
    title: {
      absolute: title
    },
    description,
    alternates: {
      canonical: path
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${calculatorName} preview image`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage]
    }
  };
}

type SeoData = {
  metadata: Metadata;
  faqItems: { question: string; answer: string }[];
  relatedSearchPhrases: string[];
  webApplicationJsonLd: ReturnType<typeof createWebApplicationJsonLd>;
  keywords: string[];
  primaryKeyword?: string;
};

function uniqueAnswer(slug: string, question: string, primaryKeyword?: string) {
  const prefix = primaryKeyword ? `${primaryKeyword}` : "this calculator";

  if (/how do i calculate/i.test(question)) {
    return `Use ${prefix} on this page: enter your inputs, then review the result and the formula section to verify the steps.`;
  }

  if (/difference/i.test(question)) {
    return `The key difference depends on the inputs you choose. ${prefix} is designed to show the output clearly so you can compare scenarios.`;
  }

  if (/accurate/i.test(question)) {
    return `This provides a practical estimate using standard formulas. For edge cases, use it as a starting point and confirm with your official source when needed.`;
  }

  return `This page answers that question with a quick calculation above and a short explanation below so you can apply it immediately.`;
}

export function generateSEOData(calculatorSlug: string): SeoData {
  const seo = getSeoKeywords(calculatorSlug);
  const registryItem = calculatorRegistry.find((c) => c.slug === calculatorSlug);

  const calculatorName = registryItem?.name ?? calculatorSlug;
  const path = `/${calculatorSlug}`;

  const primaryKeyword = seo?.primaryKeyword;
  const keywords = seo ? [seo.primaryKeyword, ...seo.secondaryKeywords] : [];
  const description = seo?.metaDescription ?? registryItem?.description ?? "";

  const title = `${calculatorName} | ClearCalculate`;

  const metadata: Metadata = {
    title: {
      absolute: title
    },
    description,
    keywords,
    alternates: {
      canonical: path
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title,
      description,
      url: new URL(path, siteUrl).toString(),
      type: "website",
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${calculatorName} preview image`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage]
    }
  };

  const questions = seo?.questionKeywords ?? [];
  const faqItems = questions.slice(0, 8).map((question) => ({
    question,
    answer: uniqueAnswer(calculatorSlug, question, primaryKeyword)
  }));

  const relatedSearchPhrases = (
    seo
      ? [...seo.questionKeywords, ...seo.secondaryKeywords]
      : []
  )
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);

  const webApplicationJsonLd = createWebApplicationJsonLd({
    name: primaryKeyword ? `${calculatorName} (${primaryKeyword})` : calculatorName,
    description,
    path,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All"
  });

  return {
    metadata,
    faqItems,
    relatedSearchPhrases,
    webApplicationJsonLd,
    keywords,
    primaryKeyword
  };
}

type WebApplicationJsonLdOptions = {
  name: string;
  description: string;
  path: string;
  applicationCategory?: string;
  operatingSystem?: string;
};

export function createWebApplicationJsonLd({
  name,
  description,
  path,
  applicationCategory = "UtilityApplication",
  operatingSystem = "All"
}: WebApplicationJsonLdOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: new URL(path, siteUrl).toString(),
    applicationCategory,
    operatingSystem,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    }
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).toString()
    }))
  };
}

type FAQItem = {
  question: string;
  answer: string;
};

export function createFaqJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
