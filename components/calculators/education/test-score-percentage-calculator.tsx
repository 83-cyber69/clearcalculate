"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/shared/result-card";
import { InputField } from "@/components/calculators/input-field";

export function TestScorePercentageCalculator() {
  const [correct, setCorrect] = useState("42");
  const [total, setTotal] = useState("50");

  const onCorrect = useCallback((v: string) => setCorrect(v), []);
  const onTotal = useCallback((v: string) => setTotal(v), []);

  const output = useMemo(() => {
    const c = Number(correct);
    const t = Number(total);
    const safeT = Number.isFinite(t) && t > 0 ? t : 1;
    const safeC = Number.isFinite(c) ? c : 0;
    const pct = (safeC / safeT) * 100;

    return {
      pct: Number.isFinite(pct) ? pct : 0
    };
  }, [correct, total]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Test Score Percentage Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <InputField label="Correct answers" type="number" min={0} value={correct} onChange={onCorrect} placeholder="e.g. 42" />
          <InputField label="Total questions" type="number" min={1} value={total} onChange={onTotal} placeholder="e.g. 50" />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label="Score" value={`${output.pct.toFixed(1)}%`} accent />
        <ResultCard label="Incorrect" value={`${Math.max(Number(total) - Number(correct), 0)}`} />
      </div>
    </div>
  );
}
