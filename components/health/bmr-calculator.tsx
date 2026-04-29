"use client";

import { useCallback, useMemo, useState } from "react";
import { Flame, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ResultCard } from "@/components/shared/result-card";
import { UnitInput } from "@/components/ui/UnitInput";

const sexOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" }
];

function calories(value: number) {
  return `${Math.round(value)} kcal/day`;
}

export function BmrCalculator() {
  const [age, setAge] = useState(28);
  const [sex, setSex] = useState("male");
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(75);

  const handleAgeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value));
  }, []);

  const handleSexChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSex(e.target.value);
  }, []);

  const handleHeightMetricChange = useCallback((value: number) => {
    setHeightCm(value);
  }, []);

  const handleWeightMetricChange = useCallback((value: number) => {
    setWeightKg(value);
  }, []);

  const output = useMemo(() => {
    const safeAge = Number.isFinite(age) ? age : 0;
    const safeHeight = Number.isFinite(heightCm) ? heightCm : 0;
    const safeWeight = Number.isFinite(weightKg) ? weightKg : 0;

    const bmrRaw =
      sex === "male"
        ? 10 * safeWeight + 6.25 * safeHeight - 5 * safeAge + 5
        : 10 * safeWeight + 6.25 * safeHeight - 5 * safeAge - 161;

    const bmr = Number.isFinite(bmrRaw) ? Math.max(bmrRaw, 0) : 0;

    return {
      bmr,
      sedentary: bmr * 1.2,
      moderate: bmr * 1.55,
      veryActive: bmr * 1.725
    };
  }, [age, heightCm, sex, weightKg]);

  const resultExplanation = useMemo(() => {
    if (!Number.isFinite(output.bmr) || output.bmr <= 0) {
      return "Enter your age, sex, height, and weight to estimate BMR.";
    }

    return "BMR is your estimated calorie burn at rest. For day-to-day planning, use the activity scenarios as a quick TDEE range—or open the TDEE Calculator for a more explicit maintenance estimate.";
  }, [output.bmr]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">BMR Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="bmr-age" className="text-sm font-medium text-slate-700">
              Age <span className="text-slate-500">(years)</span>
            </label>
            <Input
              id="bmr-age"
              type="number"
              min={10}
              max={120}
              value={age}
              onChange={handleAgeChange}
              placeholder="e.g. 28"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="bmr-sex" className="text-sm font-medium text-slate-700">
              Sex
            </label>
            <Select id="bmr-sex" options={sexOptions} value={sex} onChange={handleSexChange} />
          </div>

          <UnitInput
            id="bmr-height"
            label="Height"
            kind="height"
            valueMetric={heightCm}
            onChangeMetric={handleHeightMetricChange}
            minMetric={120}
            storageKey="cc:bmr:unit:height"
          />

          <UnitInput
            id="bmr-weight"
            label="Weight"
            kind="weight"
            valueMetric={weightKg}
            onChangeMetric={handleWeightMetricChange}
            minMetric={35}
            storageKey="cc:bmr:unit:weight"
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ResultCard label="BMR" value={calories(output.bmr)} accent />
        <ResultCard label="Sedentary (x1.2)" value={calories(output.sedentary)} />
        <ResultCard label="Moderate (x1.55)" value={calories(output.moderate)} />
        <ResultCard label="Very active (x1.725)" value={calories(output.veryActive)} />
      </div>

      <Card className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50">
        <CardContent className="grid gap-4 py-6 md:grid-cols-2">
          <div className="rounded-xl border border-orange-200 bg-white p-4">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-orange-700">
              <Flame className="h-4 w-4" />
              What this number is
            </p>
            <p className="text-sm leading-6 text-slate-700">
              BMR is an estimate of your calorie burn at complete rest. Real-world maintenance calories are usually higher due to daily movement.
            </p>
          </div>
          <div className="rounded-xl border border-orange-200 bg-white p-4">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-orange-700">
              <Gauge className="h-4 w-4" />
              Best next step
            </p>
            <p className="text-sm leading-6 text-slate-700">
              If you want maintenance/cut/bulk targets, use the TDEE Calculator with an activity level that matches your average week.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
        {resultExplanation}
      </div>
    </div>
  );
}
