"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/shared/result-card";
import { InputField } from "@/components/calculators/input-field";

export function GradeNeededToPassCalculator() {
  const [currentGrade, setCurrentGrade] = useState("82");
  const [remainingWeight, setRemainingWeight] = useState("40");
  const [targetGrade, setTargetGrade] = useState("70");

  const onCurrent = useCallback((v: string) => setCurrentGrade(v), []);
  const onRemaining = useCallback((v: string) => setRemainingWeight(v), []);
  const onTarget = useCallback((v: string) => setTargetGrade(v), []);

  const output = useMemo(() => {
    const current = Number(currentGrade);
    const remaining = Number(remainingWeight) / 100;
    const target = Number(targetGrade);

    const w = Number.isFinite(remaining) ? Math.min(Math.max(remaining, 0.01), 1) : 0.01;
    const c = Number.isFinite(current) ? current : 0;
    const t = Number.isFinite(target) ? target : 0;

    const needed = (t - c * (1 - w)) / w;

    return {
      needed: Number.isFinite(needed) ? needed : 0,
      remainingWeightPct: w * 100
    };
  }, [currentGrade, remainingWeight, targetGrade]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Grade Needed To Pass Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <InputField label="Current grade" type="number" min={0} max={100} value={currentGrade} onChange={onCurrent} unitRight="%" />
          <InputField label="Remaining weight" type="number" min={1} max={100} value={remainingWeight} onChange={onRemaining} unitRight="%" />
          <InputField label="Target grade" type="number" min={0} max={100} value={targetGrade} onChange={onTarget} unitRight="%" />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label="Needed on Remaining Work" value={`${output.needed.toFixed(1)}%`} accent />
        <ResultCard label="Remaining Weight" value={`${output.remainingWeightPct.toFixed(0)}%`} />
      </div>
    </div>
  );
}
