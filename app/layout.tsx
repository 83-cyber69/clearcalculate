import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/utils";
import { CanonicalAdSense } from "@/components/ads/CanonicalAdSense";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-STXKJDYSBG";
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ClearCalculate | Free Online Calculators",
    template: "%s | ClearCalculate"
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" }
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" }
    ]
  },
  openGraph: {
    title: "ClearCalculate | Free Online Calculators",
    description: siteConfig.description,
    url: siteUrl,
    siteName: "ClearCalculate",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearCalculate | Free Online Calculators",
    description: siteConfig.description
  },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <CanonicalAdSense />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}');
          `}
        </Script>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
