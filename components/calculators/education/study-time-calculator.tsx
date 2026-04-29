"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/shared/result-card";
import { InputField } from "@/components/calculators/input-field";

export function StudyTimeCalculator() {
  const [credits, setCredits] = useState("15");
  const [hoursPerCredit, setHoursPerCredit] = useState("2");

  const onCredits = useCallback((v: string) => setCredits(v), []);
  const onHrs = useCallback((v: string) => setHoursPerCredit(v), []);

  const output = useMemo(() => {
    const c = Number(credits);
    const h = Number(hoursPerCredit);

    const safeC = Number.isFinite(c) ? Math.max(c, 0) : 0;
    const safeH = Number.isFinite(h) ? Math.max(h, 0) : 0;

    const weeklyHours = safeC * safeH;
    const dailyHours = weeklyHours / 7;

    return { weeklyHours, dailyHours };
  }, [credits, hoursPerCredit]);

  const resultExplanation = useMemo(() => {
    if (output.weeklyHours <= 0) {
      return "Enter credits and hours per credit to estimate weekly study time.";
    }

    if (output.weeklyHours >= 40) {
      return "This is a very heavy weekly study load. Consider reducing credits, increasing efficiency, or planning longer blocks on fewer days.";
    }

    return "Use the weekly total to plan your schedule (for example, split it into 5–6 study days instead of cramming).";
  }, [output.weeklyHours, output.dailyHours]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Study Time Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <InputField label="Course load" type="number" min={0} value={credits} onChange={onCredits} unitRight="credits" />
          <InputField
            label="Study hours per credit (weekly)"
            type="number"
            min={0}
            step={0.5}
            value={hoursPerCredit}
            onChange={onHrs}
            unitRight="hrs"
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label="Estimated Study Time (weekly)" value={`${output.weeklyHours.toFixed(1)} hrs/week`} accent />
        <ResultCard label="Average Per Day" value={`${output.dailyHours.toFixed(1)} hrs/day`} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
        {resultExplanation}
      </div>
    </div>
  );
}
