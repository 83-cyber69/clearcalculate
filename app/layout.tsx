import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-STXKJDYSBG";
// NOTE: NEXT_PUBLIC_ADSENSE_CLIENT must be set in the deployment environment (Vercel).
// Do not rely only on .env.local - add it to your Vercel project settings.
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ClearCalculate | Free Online Calculators",
    template: "%s | ClearCalculate"
  },
  description: siteConfig.description,
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
        {adsenseClient ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
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
