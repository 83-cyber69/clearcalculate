import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ClearCalculate for feedback, corrections, or partnership inquiries."
};

export default function ContactPage() {
  return (
    <div className="container-max py-14 sm:py-16">
      <div className="glass-card p-8 sm:p-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Contact</h1>
        <p className="mt-6 text-sm leading-7 text-slate-700 sm:text-base">
          For feedback, corrections, or questions, email:
          <span className="ml-1 font-semibold text-slate-900">support@clearcalculate.com</span>
        </p>
        <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
          If you’re interested in partnerships or integrations, include the page URL and a short description of your request.
        </p>
      </div>
    </div>
  );
}
