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
    </div>
  );
}
