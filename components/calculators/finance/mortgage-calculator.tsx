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

function monthlyMortgagePayment(loanAmount: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (n <= 0) return 0;
  if (r === 0) return loanAmount / n;
  return (loanAmount * r) / (1 - Math.pow(1 + r, -n));
}

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("400000");
  const [downPayment, setDownPayment] = useState("80000");
  const [rate, setRate] = useState("6.5");
  const [termYears, setTermYears] = useState("30");
  const [propertyTaxMonthly, setPropertyTaxMonthly] = useState("300");
  const [insuranceMonthly, setInsuranceMonthly] = useState("120");

  const onHP = useCallback((v: string) => setHomePrice(v), []);
  const onDP = useCallback((v: string) => setDownPayment(v), []);
  const onR = useCallback((v: string) => setRate(v), []);
  const onT = useCallback((v: string) => setTermYears(v), []);
  const onTax = useCallback((v: string) => setPropertyTaxMonthly(v), []);
  const onIns = useCallback((v: string) => setInsuranceMonthly(v), []);

  const output = useMemo(() => {
    const price = Math.max(Number(homePrice) || 0, 0);
    const down = Math.max(Number(downPayment) || 0, 0);
    const loan = Math.max(price - down, 0);
    const apr = Math.max(Number(rate) || 0, 0);
    const years = Math.max(Number(termYears) || 0, 0);
    const tax = Math.max(Number(propertyTaxMonthly) || 0, 0);
    const ins = Math.max(Number(insuranceMonthly) || 0, 0);

    const pAndI = monthlyMortgagePayment(loan, apr, years);
    const total = pAndI + tax + ins;

    return { loan, pAndI, total, tax, ins };
  }, [downPayment, homePrice, insuranceMonthly, propertyTaxMonthly, rate, termYears]);

  const resultExplanation = useMemo(() => {
    const price = Math.max(Number(homePrice) || 0, 0);
    if (price <= 0) {
      return "Enter a home price to estimate a mortgage payment.";
    }

    const taxAndIns = output.tax + output.ins;
    if (taxAndIns > output.pAndI) {
      return "Taxes + insurance are a large part of the monthly cost. Double-check these estimates and consider local property tax rates.";
    }

    return "Total monthly payment includes principal + interest plus taxes and insurance. Changing rate/term mainly affects principal + interest.";
  }, [homePrice, output.ins, output.pAndI, output.tax]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Mortgage Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <InputField label="Home price" type="number" min={0} value={homePrice} onChange={onHP} />
          <InputField label="Down payment" type="number" min={0} value={downPayment} onChange={onDP} />
          <InputField label="Interest rate (APR)" type="number" min={0} step={0.01} value={rate} onChange={onR} unitRight="%" />
          <InputField label="Term" type="number" min={1} value={termYears} onChange={onT} unitRight="years" />
          <InputField label="Property tax (monthly)" type="number" min={0} value={propertyTaxMonthly} onChange={onTax} />
          <InputField label="Insurance (monthly)" type="number" min={0} value={insuranceMonthly} onChange={onIns} />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ResultCard label="Total Monthly Payment" value={formatCurrency(output.total)} accent />
        <ResultCard label="Principal & Interest" value={formatCurrency(output.pAndI)} />
        <ResultCard label="Loan Amount" value={formatCurrency(output.loan)} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
        {resultExplanation}
      </div>
    </div>
  );
}
