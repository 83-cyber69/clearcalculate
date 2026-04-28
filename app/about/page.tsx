import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about ClearCalculate and our mission to provide fast, accurate calculators."
};

export default function AboutPage() {
  return (
    <div className="container-max py-14 sm:py-16">
      <div className="glass-card p-8 sm:p-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">About ClearCalculate</h1>
        <p className="mt-6 text-sm leading-7 text-slate-700 sm:text-base">
          ClearCalculate is a free calculator platform focused on speed, clarity, and practical accuracy.
          Every tool is designed to be simple enough for quick decisions and detailed enough for real planning.
        </p>
        <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
          We prioritize user experience: readable inputs, mobile-friendly layouts, and pages that load fast.
          We also publish helpful explanations so you can understand the “why” behind the numbers.
        </p>
      </div>
    </div>
  );
}
