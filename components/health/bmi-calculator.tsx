"use client";

import { useCallback, useMemo, useState } from "react";
import { Ruler, Weight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/shared/result-card";
import { UnitInput } from "@/components/ui/UnitInput";

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

function bmiCategory(bmi: number) {
  if (!Number.isFinite(bmi) || bmi <= 0) return "";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obesity";
}

export function BmiCalculator() {
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(75);

  const handleHeightMetricChange = useCallback((value: number) => {
    setHeightCm(value);
  }, []);

  const handleWeightMetricChange = useCallback((value: number) => {
    setWeightKg(value);
  }, []);

  const output = useMemo(() => {
    const hM = heightCm / 100;
    const bmiRaw = hM > 0 ? weightKg / (hM * hM) : 0;
    const bmi = Number.isFinite(bmiRaw) ? bmiRaw : 0;

    const minNormal = 18.5 * hM * hM;
    const maxNormal = 24.9 * hM * hM;

    return {
      bmi,
      category: bmiCategory(bmi),
      normalRangeKg: {
        min: Number.isFinite(minNormal) ? minNormal : 0,
        max: Number.isFinite(maxNormal) ? maxNormal : 0
      }
    };
  }, [heightCm, weightKg]);

  const resultExplanation = useMemo(() => {
    if (!Number.isFinite(output.bmi) || output.bmi <= 0) {
      return "Enter height and weight to calculate BMI.";
    }

    const category = output.category || "";
    return `BMI is a height-adjusted weight screening metric. Your BMI is ${round1(output.bmi)} (${category}). For goal calories and nutrition planning, estimate maintenance with the TDEE Calculator.`;
  }, [output.bmi, output.category]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">BMI Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <UnitInput
            id="bmi-height"
            label="Height"
            kind="height"
            valueMetric={heightCm}
            onChangeMetric={handleHeightMetricChange}
            minMetric={120}
            storageKey="cc:bmi:unit:height"
          />

          <UnitInput
            id="bmi-weight"
            label="Weight"
            kind="weight"
            valueMetric={weightKg}
            onChangeMetric={handleWeightMetricChange}
            minMetric={35}
            storageKey="cc:bmi:unit:weight"
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ResultCard label="BMI" value={output.bmi ? round1(output.bmi).toFixed(1) : "—"} accent />
        <ResultCard label="Category" value={output.category || "—"} />
        <ResultCard label="Normal BMI range" value="18.5–24.9" />
        <ResultCard
          label="Normal weight range"
          value={
            output.normalRangeKg.min > 0 && output.normalRangeKg.max > 0
              ? `${Math.round(output.normalRangeKg.min)}–${Math.round(output.normalRangeKg.max)} kg`
              : "—"
          }
        />
      </div>

      <Card className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50">
        <CardContent className="grid gap-4 py-6 md:grid-cols-2">
          <div className="rounded-xl border border-orange-200 bg-white p-4">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-orange-700">
              <Ruler className="h-4 w-4" />
              What BMI measures
            </p>
            <p className="text-sm leading-6 text-slate-700">
              BMI is weight relative to height. It’s a screening metric, not a direct measure of body fat or health.
            </p>
          </div>
          <div className="rounded-xl border border-orange-200 bg-white p-4">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-orange-700">
              <Weight className="h-4 w-4" />
              Best next step
            </p>
            <p className="text-sm leading-6 text-slate-700">
              If you’re planning nutrition, use TDEE for maintenance calories, then choose a moderate deficit/surplus and adjust based on trends.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">{resultExplanation}</div>
    </div>
  );
}
