import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ClearCalculate privacy policy."
};

export default function PrivacyPage() {
  return (
    <div className="container-max py-14 sm:py-16">
      <div className="glass-card p-8 sm:p-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Privacy Policy</h1>
        <p className="mt-6 text-sm leading-7 text-slate-700 sm:text-base">
          ClearCalculate provides free tools and educational content. We may use analytics to understand usage and improve the
          site.
        </p>
        <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
          If Google Analytics is enabled, it may set cookies or collect usage data such as page views, device/browser
          information, and approximate location. You can control cookies in your browser settings.
        </p>
        <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
          We do not sell personal information.
        </p>
      </div>
    </div>
  );
}
