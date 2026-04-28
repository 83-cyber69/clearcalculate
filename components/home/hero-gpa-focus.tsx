"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const gradeOptions = [
  { value: "A", label: "A (4.0)" },
  { value: "A-", label: "A- (3.7)" },
  { value: "B+", label: "B+ (3.3)" },
  { value: "B", label: "B (3.0)" },
  { value: "B-", label: "B- (2.7)" },
  { value: "C+", label: "C+ (2.3)" },
  { value: "C", label: "C (2.0)" },
  { value: "D", label: "D (1.0)" },
  { value: "F", label: "F (0.0)" }
];

const gradeMap: Record<string, number> = {
  A: 4,
  "A-": 3.7,
  "B+": 3.3,
  B: 3,
  "B-": 2.7,
  "C+": 2.3,
  C: 2,
  D: 1,
  F: 0
};

export function HeroGpaFocus() {
  const [className, setClassName] = useState("Biology");
  const [grade, setGrade] = useState("A-");
  const [credits, setCredits] = useState(4);

  const result = useMemo(() => {
    const creditValue = Number.isFinite(credits) ? Math.max(credits, 0) : 0;
    const points = (gradeMap[grade] ?? 0) * creditValue;
    return {
      credits: creditValue,
      gpa: creditValue > 0 ? points / creditValue : 0
    };
  }, [credits, grade]);

  return (
    <div className="hero-calc-card relative mx-auto w-full max-w-4xl rounded-3xl p-[1px] shadow-[0_32px_72px_rgba(15,23,42,0.18)]">
      <div className="rounded-3xl border border-orange-100/80 bg-[#fffdfb] p-6 sm:p-8 lg:p-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">
              Featured Calculator
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
              Quick GPA Check
            </h2>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-[#ff4d4d]/10 to-[#ff8a3d]/20 px-4 py-3 text-right shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">Result</p>
            <p className="text-3xl font-semibold text-slate-900 sm:text-4xl">{result.gpa.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr_1fr] sm:gap-4 lg:gap-5">
          <Input
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="h-14 text-base sm:h-16 sm:text-lg"
            placeholder="Class name"
            aria-label="Class name"
          />
          <Select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            options={gradeOptions}
            className="h-14 text-base sm:h-16 sm:text-lg"
            aria-label="Grade"
          />
          <Input
            type="number"
            min={0}
            step={0.5}
            value={credits}
            onChange={(e) => setCredits(Number(e.target.value))}
            className="h-14 text-base sm:h-16 sm:text-lg"
            placeholder="Credits"
            aria-label="Credit hours"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 sm:mt-8">
          <p className="text-sm text-slate-600 sm:text-base">
            Previewing <span className="font-medium text-slate-900">{className || "your class"}</span> with{" "}
            {result.credits.toFixed(1)} credits.
          </p>
          <Link href="/gpa-calculator">
            <Button className="h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-lg">Open Full GPA Calculator</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
