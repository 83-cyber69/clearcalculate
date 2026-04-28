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

function monthlyPayment(principal: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (n <= 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export function LoanPaymentCalculator() {
  const [principal, setPrincipal] = useState("20000");
  const [rate, setRate] = useState("7.5");
  const [termYears, setTermYears] = useState("5");

  const onP = useCallback((v: string) => setPrincipal(v), []);
  const onR = useCallback((v: string) => setRate(v), []);
  const onT = useCallback((v: string) => setTermYears(v), []);

  const output = useMemo(() => {
    const p = Math.max(Number(principal) || 0, 0);
    const apr = Math.max(Number(rate) || 0, 0);
    const years = Math.max(Number(termYears) || 0, 0);

    const payment = monthlyPayment(p, apr, years);
    const totalPaid = payment * years * 12;
    const interest = totalPaid - p;

    return { payment, totalPaid, interest };
  }, [principal, rate, termYears]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Loan Payment Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <InputField label="Loan amount" type="number" min={0} value={principal} onChange={onP} placeholder="e.g. 20000" />
          <InputField label="Interest rate (APR)" type="number" min={0} step={0.01} value={rate} onChange={onR} unitRight="%" placeholder="e.g. 7.5" />
          <InputField label="Term" type="number" min={1} value={termYears} onChange={onT} unitRight="years" placeholder="e.g. 5" />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ResultCard label="Monthly Payment" value={formatCurrency(output.payment)} accent />
        <ResultCard label="Total Interest" value={formatCurrency(output.interest)} />
        <ResultCard label="Total Paid" value={formatCurrency(output.totalPaid)} />
      </div>
    </div>
  );
}
