"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/shared/result-card";
import { InputField } from "@/components/calculators/input-field";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function HourlyToSalaryCalculator() {
  const [hourlyRate, setHourlyRate] = useState("25");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");

  const onRate = useCallback((v: string) => setHourlyRate(v), []);
  const onHours = useCallback((v: string) => setHoursPerWeek(v), []);
  const onWeeks = useCallback((v: string) => setWeeksPerYear(v), []);

  const output = useMemo(() => {
    const rate = Number(hourlyRate);
    const hours = Number(hoursPerWeek);
    const weeks = Number(weeksPerYear);

    const r = Number.isFinite(rate) ? Math.max(rate, 0) : 0;
    const h = Number.isFinite(hours) ? Math.max(hours, 0) : 0;
    const w = Number.isFinite(weeks) ? Math.min(Math.max(weeks, 0), 52) : 0;

    const yearly = r * h * w;
    const monthly = yearly / 12;

    return { yearly, monthly };
  }, [hourlyRate, hoursPerWeek, weeksPerYear]);

  const resultExplanation = useMemo(() => {
    const h = Number(hoursPerWeek);
    const w = Number(weeksPerYear);
    const safeHours = Number.isFinite(h) ? Math.max(h, 0) : 0;
    const safeWeeks = Number.isFinite(w) ? Math.min(Math.max(w, 0), 52) : 0;

    if (safeHours <= 0 || safeWeeks <= 0) {
      return "Enter hours per week and weeks per year to estimate an annual salary.";
    }

    if (safeWeeks < 48) {
      return "Using fewer than 52 weeks can reflect unpaid time off or seasonal work. That lowers the annual estimate even if the hourly rate stays the same.";
    }

    if (safeHours > 40) {
      return "If your hours/week include overtime, the annual number reflects total hours worked—not necessarily an overtime premium rate.";
    }

    return "This converts hourly pay into a yearly and monthly estimate using your schedule. For take-home pay after taxes, use the Take Home Pay Calculator.";
  }, [hoursPerWeek, weeksPerYear]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Hourly To Salary Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <InputField label="Hourly rate" type="number" min={0} value={hourlyRate} onChange={onRate} placeholder="e.g. 25" />
          <InputField label="Hours per week" type="number" min={0} value={hoursPerWeek} onChange={onHours} placeholder="e.g. 40" />
          <InputField label="Weeks per year" type="number" min={0} max={52} value={weeksPerYear} onChange={onWeeks} placeholder="e.g. 52" />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label="Estimated Yearly Salary" value={formatCurrency(output.yearly)} accent />
        <ResultCard label="Estimated Monthly Salary" value={formatCurrency(output.monthly)} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
        {resultExplanation}
      </div>
    </div>
  );
}
