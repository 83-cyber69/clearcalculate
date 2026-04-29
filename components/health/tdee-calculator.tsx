"use client";

import { useCallback, useMemo, useState } from "react";
import { Flame, Salad, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ResultCard } from "@/components/shared/result-card";
import { UnitInput } from "@/components/ui/UnitInput";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" }
];

const activityOptions = [
  { value: "1.2", label: "Sedentary (little exercise)" },
  { value: "1.375", label: "Lightly active (1-3 days/week)" },
  { value: "1.55", label: "Moderately active (3-5 days/week)" },
  { value: "1.725", label: "Very active (6-7 days/week)" },
  { value: "1.9", label: "Athlete level (twice daily training)" }
];

const goalOptions = [
  { value: "maintain", label: "Maintain" },
  { value: "lose", label: "Lose fat" },
  { value: "gain", label: "Gain muscle" }
];

function calories(value: number) {
  return `${Math.round(value)} kcal/day`;
}

export function TdeeCalculator() {
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState("male");
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(75);
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState("maintain");

  const handleAgeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value));
  }, []);

  const handleGenderChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  }, []);

  const handleHeightMetricChange = useCallback((value: number) => {
    setHeightCm(value);
  }, []);

  const handleWeightMetricChange = useCallback((value: number) => {
    setWeightKg(value);
  }, []);

  const handleActivityChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setActivity(e.target.value);
  }, []);

  const handleGoalChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setGoal(e.target.value);
  }, []);

  const output = useMemo(() => {
    const bmr =
      gender === "male"
        ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    const maintenance = bmr * Number(activity);
    const cutting = maintenance - 450;
    const bulking = maintenance + 320;
    const targetCalories = goal === "lose" ? cutting : goal === "gain" ? bulking : maintenance;
    const protein = Math.round((targetCalories * 0.3) / 4);
    const carbs = Math.round((targetCalories * 0.4) / 4);
    const fats = Math.round((targetCalories * 0.3) / 9);

    return {
      bmr,
      maintenance,
      cutting,
      bulking,
      targetCalories,
      macros: { protein, carbs, fats }
    };
  }, [activity, age, gender, goal, heightCm, weightKg]);

  const resultExplanation = useMemo(() => {
    const a = Number(activity);
    if (!Number.isFinite(a) || a <= 0) {
      return "Select an activity level to estimate maintenance calories.";
    }

    if (goal === "lose") {
      if (output.targetCalories <= 1200) {
        return "Your target calories are very low. Consider a smaller deficit, verifying your activity level, or consulting a professional before using aggressive targets.";
      }
      return "Use the goal calories as a starting cut target. Track weekly averages for 2–3 weeks and adjust up/down if weight change is faster or slower than expected.";
    }

    if (goal === "gain") {
      return "Use the goal calories as a lean-bulk starting point. If weight gain is too fast, reduce slightly; if nothing changes after a few weeks, increase calories modestly.";
    }

    return "Maintenance calories are an estimate. If your weight trends up or down over 2–3 weeks at this intake, adjust calories until your trend is stable.";
  }, [activity, goal, output.targetCalories]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">TDEE Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="tdee-age" className="text-sm font-medium text-slate-700">
              Age <span className="text-slate-500">(years)</span>
            </label>
            <div className="relative">
              <Input
                id="tdee-age"
                type="number"
                min={10}
                value={age}
                onChange={handleAgeChange}
                placeholder="e.g. 18"
                className="pr-14"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                yrs
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="tdee-gender" className="text-sm font-medium text-slate-700">
              Sex
            </label>
            <Select id="tdee-gender" options={genderOptions} value={gender} onChange={handleGenderChange} />
          </div>

          <UnitInput
            id="tdee-height"
            label="Height"
            kind="height"
            valueMetric={heightCm}
            onChangeMetric={handleHeightMetricChange}
            minMetric={120}
            storageKey="cc:tdee:unit:height"
          />

          <UnitInput
            id="tdee-weight"
            label="Weight"
            kind="weight"
            valueMetric={weightKg}
            onChangeMetric={handleWeightMetricChange}
            minMetric={35}
            storageKey="cc:tdee:unit:weight"
          />

          <div className="space-y-1">
            <label htmlFor="tdee-activity" className="text-sm font-medium text-slate-700">
              Activity Level
            </label>
            <Select id="tdee-activity" options={activityOptions} value={activity} onChange={handleActivityChange} />
          </div>

          <div className="space-y-1">
            <label htmlFor="tdee-goal" className="text-sm font-medium text-slate-700">
              Goal
            </label>
            <Select id="tdee-goal" options={goalOptions} value={goal} onChange={handleGoalChange} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ResultCard label="BMR" value={calories(output.bmr)} />
        <ResultCard label="Maintenance Calories" value={calories(output.maintenance)} accent />
        <ResultCard label="Cutting Calories" value={calories(output.cutting)} />
        <ResultCard label="Bulking Calories" value={calories(output.bulking)} />
      </div>

      <Card className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50">
        <CardContent className="grid gap-4 py-6 md:grid-cols-3">
          <div className="rounded-xl border border-orange-200 bg-white p-4">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-orange-700">
              <Target className="h-4 w-4" />
              Goal Calories
            </p>
            <p className="text-xl font-semibold text-slate-900">{calories(output.targetCalories)}</p>
          </div>
          <div className="rounded-xl border border-orange-200 bg-white p-4">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-orange-700">
              <Salad className="h-4 w-4" />
              Macro Recommendation
            </p>
            <p className="text-sm leading-6 text-slate-700">
              Protein {output.macros.protein}g, Carbs {output.macros.carbs}g, Fats {output.macros.fats}g
            </p>
          </div>
          <div className="rounded-xl border border-orange-200 bg-white p-4">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-orange-700">
              <Flame className="h-4 w-4" />
              Expenditure Insight
            </p>
            <p className="text-sm leading-6 text-slate-700">
              Your estimated burn already includes daily movement and training activity multiplier.
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
