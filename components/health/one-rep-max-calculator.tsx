"use client";

import { useCallback, useMemo, useState } from "react";
import { Dumbbell, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ResultCard } from "@/components/shared/result-card";
import { UnitInput } from "@/components/ui/UnitInput";

const formulaOptions = [
  { value: "epley", label: "Epley" },
  { value: "brzycki", label: "Brzycki" }
];

function formatWeight(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "—";
  return `${Math.round(value)} kg`;
}

function calcOneRepMax(weightKg: number, reps: number, formula: string) {
  const w = Number.isFinite(weightKg) ? weightKg : 0;
  const r = Number.isFinite(reps) ? reps : 0;
  if (w <= 0 || r <= 0) return 0;

  if (formula === "brzycki") {
    if (r >= 37) return 0;
    return w * (36 / (37 - r));
  }

  return w * (1 + r / 30);
}

export function OneRepMaxCalculator() {
  const [weightKg, setWeightKg] = useState(80);
  const [reps, setReps] = useState(5);
  const [formula, setFormula] = useState("epley");

  const handleRepsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setReps(Number(e.target.value));
  }, []);

  const handleFormulaChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormula(e.target.value);
  }, []);

  const handleWeightMetricChange = useCallback((value: number) => {
    setWeightKg(value);
  }, []);

  const output = useMemo(() => {
    const oneRm = calcOneRepMax(weightKg, reps, formula);

    const pct = (p: number) => oneRm * p;

    return {
      oneRm,
      p85: pct(0.85),
      p75: pct(0.75),
      p65: pct(0.65)
    };
  }, [formula, reps, weightKg]);

  const resultExplanation = useMemo(() => {
    if (!Number.isFinite(output.oneRm) || output.oneRm <= 0) {
      return "Enter a working set weight and reps (usually 1–10) to estimate 1RM.";
    }

    return "A 1RM estimate helps you pick training loads and compare strength over time. It’s an estimate—treat it as a planning number, not a guarantee.";
  }, [output.oneRm]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">One Rep Max Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <UnitInput
            id="orm-weight"
            label="Weight"
            kind="weight"
            valueMetric={weightKg}
            onChangeMetric={handleWeightMetricChange}
            minMetric={1}
            storageKey="cc:one-rep-max:unit:weight"
          />

          <div className="space-y-1">
            <label htmlFor="orm-reps" className="text-sm font-medium text-slate-700">
              Reps <span className="text-slate-500">(1–12 recommended)</span>
            </label>
            <Input
              id="orm-reps"
              type="number"
              min={1}
              max={20}
              value={reps}
              onChange={handleRepsChange}
              placeholder="e.g. 5"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label htmlFor="orm-formula" className="text-sm font-medium text-slate-700">
              Formula
            </label>
            <Select id="orm-formula" options={formulaOptions} value={formula} onChange={handleFormulaChange} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ResultCard label="Estimated 1RM" value={formatWeight(output.oneRm)} accent />
        <ResultCard label="85% (strength)" value={formatWeight(output.p85)} />
        <ResultCard label="75% (hypertrophy)" value={formatWeight(output.p75)} />
        <ResultCard label="65% (volume)" value={formatWeight(output.p65)} />
      </div>

      <Card className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50">
        <CardContent className="grid gap-4 py-6 md:grid-cols-2">
          <div className="rounded-xl border border-orange-200 bg-white p-4">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-orange-700">
              <Dumbbell className="h-4 w-4" />
              How to use it
            </p>
            <p className="text-sm leading-6 text-slate-700">
              Use your estimated 1RM to choose working weights. Many programs prescribe training as a percentage of 1RM.
            </p>
          </div>
          <div className="rounded-xl border border-orange-200 bg-white p-4">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-orange-700">
              <Percent className="h-4 w-4" />
              Best practice
            </p>
            <p className="text-sm leading-6 text-slate-700">
              Use a set of 3–8 reps for the most stable estimate. Avoid going to failure and prioritize good technique.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">{resultExplanation}</div>
    </div>
  );
}
