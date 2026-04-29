"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/shared/result-card";
import { InputField } from "@/components/calculators/input-field";

export function SalaryToHourlyCalculator() {
  const [annualSalary, setAnnualSalary] = useState("85000");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");

  const onSalary = useCallback((v: string) => setAnnualSalary(v), []);
  const onHours = useCallback((v: string) => setHoursPerWeek(v), []);
  const onWeeks = useCallback((v: string) => setWeeksPerYear(v), []);

  const output = useMemo(() => {
    const salary = Number(annualSalary);
    const hours = Number(hoursPerWeek);
    const weeks = Number(weeksPerYear);

    const s = Number.isFinite(salary) ? Math.max(salary, 0) : 0;
    const h = Number.isFinite(hours) && hours > 0 ? hours : 40;
    const w = Number.isFinite(weeks) && weeks > 0 ? Math.min(weeks, 52) : 52;

    const hourly = s / (h * w);

    return { hourly };
  }, [annualSalary, hoursPerWeek, weeksPerYear]);

  const resultExplanation = useMemo(() => {
    const s = Math.max(Number(annualSalary) || 0, 0);
    const h = Math.max(Number(hoursPerWeek) || 0, 0);
    const w = Math.max(Number(weeksPerYear) || 0, 0);

    if (s <= 0) {
      return "Enter an annual salary to estimate an hourly rate.";
    }

    if (h <= 0 || w <= 0) {
      return "Enter realistic hours/week and weeks/year. More hours worked lowers the effective hourly rate when the salary is fixed.";
    }

    if (h > 40) {
      return "Because salary is fixed, working more than 40 hours/week lowers the effective hourly rate. This is useful for comparing offers with different expected workloads.";
    }

    return "This is an effective hourly rate based on your schedule. It’s not an overtime rate and doesn’t include benefits or taxes.";
  }, [annualSalary, hoursPerWeek, weeksPerYear]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Salary To Hourly Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <InputField label="Annual salary" type="number" min={0} value={annualSalary} onChange={onSalary} placeholder="e.g. 85000" />
          <InputField label="Hours per week" type="number" min={1} value={hoursPerWeek} onChange={onHours} placeholder="e.g. 40" />
          <InputField label="Weeks per year" type="number" min={1} max={52} value={weeksPerYear} onChange={onWeeks} placeholder="e.g. 52" />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label="Estimated Hourly Rate" value={`$${output.hourly.toFixed(2)}/hr`} accent />
        <ResultCard label="Assumes" value={`${Number(hoursPerWeek || 40).toFixed(0)} hrs/week x ${Number(weeksPerYear || 52).toFixed(0)} weeks`} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
        {resultExplanation}
      </div>
    </div>
  );
}
