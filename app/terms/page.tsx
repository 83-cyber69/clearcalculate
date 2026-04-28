import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "ClearCalculate terms of use.",
  alternates: {
    canonical: "/terms"
  }
};

export default function TermsPage() {
  return (
    <div className="container-max py-14 sm:py-16">
      <div className="glass-card p-8 sm:p-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Terms of Use</h1>
        <p className="mt-6 text-sm leading-7 text-slate-700 sm:text-base">
          ClearCalculate is provided for informational and educational purposes only. While we aim for accuracy, results are
          estimates and may vary based on assumptions and local rules.
        </p>
        <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
          By using the site, you agree not to rely on results as a substitute for professional advice.
        </p>
      </div>
    </div>
  );
}
