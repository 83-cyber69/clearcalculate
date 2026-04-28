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

export function SalaryAfterTaxesCalculator() {
  const [grossSalary, setGrossSalary] = useState("85000");
  const [effectiveTaxRate, setEffectiveTaxRate] = useState("25");

  const onSalary = useCallback((v: string) => setGrossSalary(v), []);
  const onTax = useCallback((v: string) => setEffectiveTaxRate(v), []);

  const output = useMemo(() => {
    const salary = Number(grossSalary);
    const rate = Number(effectiveTaxRate) / 100;

    const s = Number.isFinite(salary) ? Math.max(salary, 0) : 0;
    const r = Number.isFinite(rate) ? Math.min(Math.max(rate, 0), 1) : 0;

    const taxes = s * r;
    const net = s - taxes;

    return { taxes, net };
  }, [grossSalary, effectiveTaxRate]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Salary After Taxes Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <InputField
            label="Gross salary"
            type="number"
            min={0}
            value={grossSalary}
            onChange={onSalary}
            placeholder="e.g. 85000"
          />
          <InputField
            label="Effective tax rate"
            type="number"
            min={0}
            max={60}
            value={effectiveTaxRate}
            onChange={onTax}
            unitRight="%"
            placeholder="e.g. 25"
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label="Estimated Net Salary" value={formatCurrency(output.net)} accent />
        <ResultCard label="Estimated Taxes" value={formatCurrency(output.taxes)} />
      </div>
    </div>
  );
}
