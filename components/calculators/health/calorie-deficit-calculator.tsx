"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/shared/result-card";
import { InputField } from "@/components/calculators/input-field";

export function CalorieDeficitCalculator() {
  const [tdee, setTdee] = useState("2500");
  const [deficit, setDeficit] = useState("500");

  const onTdee = useCallback((v: string) => setTdee(v), []);
  const onDeficit = useCallback((v: string) => setDeficit(v), []);

  const output = useMemo(() => {
    const maintenance = Math.max(Number(tdee) || 0, 0);
    const def = Math.max(Number(deficit) || 0, 0);
    const target = Math.max(maintenance - def, 0);

    const weeklyLossLbs = def > 0 ? (def * 7) / 3500 : 0;

    return { maintenance, def, target, weeklyLossLbs };
  }, [deficit, tdee]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Calorie Deficit Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <InputField label="Maintenance calories (TDEE)" type="number" min={0} value={tdee} onChange={onTdee} unitRight="kcal" />
          <InputField label="Daily deficit" type="number" min={0} value={deficit} onChange={onDeficit} unitRight="kcal" />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ResultCard label="Target Calories" value={`${Math.round(output.target)} kcal/day`} accent />
        <ResultCard label="Deficit" value={`${Math.round(output.def)} kcal/day`} />
        <ResultCard label="Estimated Weekly Loss" value={`${output.weeklyLossLbs.toFixed(2)} lb/week`} />
      </div>
    </div>
  );
}
