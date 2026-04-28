"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type EmailCaptureCardProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function EmailCaptureCard({
  title = "Get useful tools (optional)",
  description = "Save calculators you use most and get occasional tips. No spam.",
  className
}: EmailCaptureCardProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    },
    []
  );

  return (
    <div className={cn("rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]", className)}>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>

      {submitted ? (
        <p className="mt-4 text-sm font-medium text-slate-800">Thanks—check your inbox soon.</p>
      ) : (
        <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
            required
          />
          <button
            type="submit"
            className="h-11 whitespace-nowrap rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Subscribe
          </button>
        </form>
      )}

      <p className="mt-3 text-xs text-slate-500">This is a placeholder. Hook it up to your email provider later.</p>
    </div>
  );
}
