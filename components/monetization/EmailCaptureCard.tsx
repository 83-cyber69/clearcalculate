"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type EmailCaptureCardProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function EmailCaptureCard({
  title = "Get calculator tips",
  description = "Occasional updates. No spam.",
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
    <div className={cn("glass-card p-6", className)}>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>

      {submitted ? (
        <p className="mt-4 text-sm font-medium text-slate-800">Thanks—check your inbox soon.</p>
      ) : (
        <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full sm:flex-1"
            required
          />
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
}
