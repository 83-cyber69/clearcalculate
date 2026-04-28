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

export function CompoundInterestCalculator() {
  const [starting, setStarting] = useState("5000");
  const [monthlyContribution, setMonthlyContribution] = useState("200");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [years, setYears] = useState("20");

  const onS = useCallback((v: string) => setStarting(v), []);
  const onC = useCallback((v: string) => setMonthlyContribution(v), []);
  const onR = useCallback((v: string) => setAnnualReturn(v), []);
  const onY = useCallback((v: string) => setYears(v), []);

  const output = useMemo(() => {
    const pv = Math.max(Number(starting) || 0, 0);
    const pmt = Math.max(Number(monthlyContribution) || 0, 0);
    const r = Math.max(Number(annualReturn) || 0, 0) / 100 / 12;
    const n = Math.max(Number(years) || 0, 0) * 12;

    let fv = pv;
    for (let i = 0; i < n; i += 1) {
      fv = fv * (1 + r) + pmt;
    }

    const contributions = pv + pmt * n;
    const growth = fv - contributions;

    return { fv, contributions, growth };
  }, [annualReturn, monthlyContribution, starting, years]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Compound Interest Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <InputField label="Starting amount" type="number" min={0} value={starting} onChange={onS} />
          <InputField label="Monthly contribution" type="number" min={0} value={monthlyContribution} onChange={onC} />
          <InputField label="Annual return" type="number" min={0} step={0.1} value={annualReturn} onChange={onR} unitRight="%" />
          <InputField label="Time" type="number" min={0} value={years} onChange={onY} unitRight="years" />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ResultCard label="Future Value" value={formatCurrency(output.fv)} accent />
        <ResultCard label="Total Contributions" value={formatCurrency(output.contributions)} />
        <ResultCard label="Estimated Growth" value={formatCurrency(output.growth)} />
      </div>
    </div>
  );
}
