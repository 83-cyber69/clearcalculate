"use client";

import { useCallback, useMemo, useState } from "react";
import { DollarSign, Shield, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ResultCard } from "@/components/shared/result-card";

const federalTaxRates: Record<string, number> = {
  single: 0.22,
  married: 0.18,
  head_of_household: 0.2
};

const stateTaxRates: Record<string, number> = {
  AL: 0.05,
  AK: 0.0,
  AZ: 0.045,
  AR: 0.055,
  CA: 0.082,
  CO: 0.044,
  CT: 0.055,
  DE: 0.055,
  FL: 0.0,
  GA: 0.0575,
  HI: 0.0825,
  ID: 0.058,
  IL: 0.0495,
  IN: 0.0323,
  IA: 0.047,
  KS: 0.057,
  KY: 0.04,
  LA: 0.0425,
  ME: 0.0675,
  MD: 0.0475,
  MA: 0.05,
  MI: 0.0425,
  MN: 0.068,
  MS: 0.05,
  MO: 0.0495,
  MT: 0.059,
  NE: 0.055,
  NV: 0.0,
  NH: 0.0,
  NJ: 0.0637,
  NM: 0.049,
  NY: 0.064,
  NC: 0.0475,
  ND: 0.025,
  OH: 0.0399,
  OK: 0.0475,
  OR: 0.079,
  PA: 0.0307,
  RI: 0.0599,
  SC: 0.064,
  SD: 0.0,
  TN: 0.0,
  TX: 0.0,
  UT: 0.0485,
  VT: 0.066,
  VA: 0.0575,
  WA: 0.0,
  WV: 0.055,
  WI: 0.053,
  WY: 0.0
};

const stateOptions = [
  { value: "", label: "Select state" },
  { value: "AL", label: "Alabama (AL)" },
  { value: "AK", label: "Alaska (AK)" },
  { value: "AZ", label: "Arizona (AZ)" },
  { value: "AR", label: "Arkansas (AR)" },
  { value: "CA", label: "California (CA)" },
  { value: "CO", label: "Colorado (CO)" },
  { value: "CT", label: "Connecticut (CT)" },
  { value: "DE", label: "Delaware (DE)" },
  { value: "FL", label: "Florida (FL)" },
  { value: "GA", label: "Georgia (GA)" },
  { value: "HI", label: "Hawaii (HI)" },
  { value: "ID", label: "Idaho (ID)" },
  { value: "IL", label: "Illinois (IL)" },
  { value: "IN", label: "Indiana (IN)" },
  { value: "IA", label: "Iowa (IA)" },
  { value: "KS", label: "Kansas (KS)" },
  { value: "KY", label: "Kentucky (KY)" },
  { value: "LA", label: "Louisiana (LA)" },
  { value: "ME", label: "Maine (ME)" },
  { value: "MD", label: "Maryland (MD)" },
  { value: "MA", label: "Massachusetts (MA)" },
  { value: "MI", label: "Michigan (MI)" },
  { value: "MN", label: "Minnesota (MN)" },
  { value: "MS", label: "Mississippi (MS)" },
  { value: "MO", label: "Missouri (MO)" },
  { value: "MT", label: "Montana (MT)" },
  { value: "NE", label: "Nebraska (NE)" },
  { value: "NV", label: "Nevada (NV)" },
  { value: "NH", label: "New Hampshire (NH)" },
  { value: "NJ", label: "New Jersey (NJ)" },
  { value: "NM", label: "New Mexico (NM)" },
  { value: "NY", label: "New York (NY)" },
  { value: "NC", label: "North Carolina (NC)" },
  { value: "ND", label: "North Dakota (ND)" },
  { value: "OH", label: "Ohio (OH)" },
  { value: "OK", label: "Oklahoma (OK)" },
  { value: "OR", label: "Oregon (OR)" },
  { value: "PA", label: "Pennsylvania (PA)" },
  { value: "RI", label: "Rhode Island (RI)" },
  { value: "SC", label: "South Carolina (SC)" },
  { value: "SD", label: "South Dakota (SD)" },
  { value: "TN", label: "Tennessee (TN)" },
  { value: "TX", label: "Texas (TX)" },
  { value: "UT", label: "Utah (UT)" },
  { value: "VT", label: "Vermont (VT)" },
  { value: "VA", label: "Virginia (VA)" },
  { value: "WA", label: "Washington (WA)" },
  { value: "WV", label: "West Virginia (WV)" },
  { value: "WI", label: "Wisconsin (WI)" },
  { value: "WY", label: "Wyoming (WY)" }
];

const filingStatusOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married Filing Jointly" },
  { value: "head_of_household", label: "Head of Household" }
];

const payFrequencyOptions = [
  { value: "yearly", label: "Yearly" },
  { value: "monthly", label: "Monthly" },
  { value: "biweekly", label: "Biweekly" }
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function TakeHomePayCalculator() {
  const [annualSalary, setAnnualSalary] = useState(75000);
  const [payFrequency, setPayFrequency] = useState("monthly");
  const [state, setState] = useState("");
  const [filingStatus, setFilingStatus] = useState("single");
  const [retirementPercent, setRetirementPercent] = useState(6);
  const [healthInsuranceMonthly, setHealthInsuranceMonthly] = useState(220);

  const handleAnnualSalaryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualSalary(Number(e.target.value));
  }, []);

  const handlePayFrequencyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPayFrequency(e.target.value);
  }, []);

  const handleStateChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  }, []);

  const handleFilingStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilingStatus(e.target.value);
  }, []);

  const handleRetirementPercentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRetirementPercent(Number(e.target.value));
  }, []);

  const handleHealthInsuranceMonthlyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHealthInsuranceMonthly(Number(e.target.value));
  }, []);

  const results = useMemo(() => {
    const retirementContribution = annualSalary * (retirementPercent / 100);
    const taxableIncome = Math.max(annualSalary - retirementContribution, 0);
    const federalTaxes = taxableIncome * (federalTaxRates[filingStatus] ?? 0.22);
    const stateTaxes = taxableIncome * (stateTaxRates[state] ?? 0);
    const ficaTaxes = annualSalary * 0.0765;
    const healthInsuranceYearly = Math.max(healthInsuranceMonthly, 0) * 12;
    const estimatedTaxes = federalTaxes + stateTaxes + ficaTaxes;
    const totalDeductions = estimatedTaxes + retirementContribution + healthInsuranceYearly;
    const yearlyTakeHome = Math.max(annualSalary - totalDeductions, 0);
    const monthlyTakeHome = yearlyTakeHome / 12;
    const paycheckTakeHome =
      payFrequency === "yearly" ? yearlyTakeHome : payFrequency === "biweekly" ? yearlyTakeHome / 26 : monthlyTakeHome;

    return {
      estimatedTaxes,
      retirementContribution,
      healthInsuranceYearly,
      totalDeductions,
      yearlyTakeHome,
      monthlyTakeHome,
      paycheckTakeHome
    };
  }, [annualSalary, filingStatus, healthInsuranceMonthly, payFrequency, retirementPercent, state]);

  const resultExplanation = useMemo(() => {
    const salary = Number.isFinite(annualSalary) ? Math.max(annualSalary, 0) : 0;
    if (salary <= 0) {
      return "Enter a salary to estimate take-home pay.";
    }

    const takeHomeRate = results.yearlyTakeHome / salary;
    if (takeHomeRate <= 0.5) {
      return "Your take-home rate is relatively low. Check state, filing status, and deductions—taxes, retirement, and insurance can add up quickly.";
    }

    if (results.retirementContribution > results.estimatedTaxes) {
      return "Retirement contributions are larger than taxes in this estimate. That can be normal if you’re saving aggressively (and it may reduce taxable income).";
    }

    return "This estimate combines federal, state, and FICA taxes with retirement and insurance deductions. Real paychecks vary by benefits and withholding.";
  }, [annualSalary, results.estimatedTaxes, results.retirementContribution, results.yearlyTakeHome]);

  return (
    <div className="space-y-8">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Take Home Pay Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="thp-salary" className="text-sm font-medium text-slate-700">
              Salary <span className="text-slate-500">(USD)</span>
            </label>
            <Input
              id="thp-salary"
              type="number"
              min={0}
              value={annualSalary}
              onChange={handleAnnualSalaryChange}
              placeholder="e.g. 80000"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="thp-frequency" className="text-sm font-medium text-slate-700">
              Pay frequency
            </label>
            <Select
              id="thp-frequency"
              aria-label="Pay frequency"
              options={payFrequencyOptions}
              value={payFrequency}
              onChange={handlePayFrequencyChange}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="thp-state" className="text-sm font-medium text-slate-700">
              State
            </label>
            <Select id="thp-state" aria-label="State" options={stateOptions} value={state} onChange={handleStateChange} />
          </div>

          <div className="space-y-1">
            <label htmlFor="thp-filing" className="text-sm font-medium text-slate-700">
              Filing status
            </label>
            <Select
              id="thp-filing"
              aria-label="Filing status"
              options={filingStatusOptions}
              value={filingStatus}
              onChange={handleFilingStatusChange}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="thp-retirement" className="text-sm font-medium text-slate-700">
              Retirement contribution <span className="text-slate-500">(%)</span>
            </label>
            <div className="relative">
              <Input
                id="thp-retirement"
                type="number"
                min={0}
                max={50}
                value={retirementPercent}
                onChange={handleRetirementPercentChange}
                placeholder="e.g. 6"
                className="pr-10"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                %
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="thp-health" className="text-sm font-medium text-slate-700">
              Health insurance <span className="text-slate-500">(monthly)</span>
            </label>
            <Input
              id="thp-health"
              type="number"
              min={0}
              value={healthInsuranceMonthly}
              onChange={handleHealthInsuranceMonthlyChange}
              placeholder="e.g. 220"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ResultCard label="Estimated Take-Home Pay" value={formatCurrency(results.paycheckTakeHome)} accent />
        <ResultCard label="Monthly Take-Home" value={formatCurrency(results.monthlyTakeHome)} />
        <ResultCard label="Yearly Take-Home" value={formatCurrency(results.yearlyTakeHome)} />
        <ResultCard label="Estimated Taxes" value={formatCurrency(results.estimatedTaxes)} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
        {resultExplanation}
      </div>

      <Card className="bg-gradient-to-br from-white via-orange-50/60 to-amber-50/50">
        <CardContent className="grid gap-6 py-8 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Shield className="h-5 w-5 text-orange-600" />
              Taxes
            </p>
            <p className="text-2xl font-semibold text-slate-900">{formatCurrency(results.estimatedTaxes)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Wallet className="h-5 w-5 text-orange-600" />
              Retirement
            </p>
            <p className="text-2xl font-semibold text-slate-900">{formatCurrency(results.retirementContribution)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
              <DollarSign className="h-5 w-5 text-orange-600" />
              Health Insurance
            </p>
            <p className="text-2xl font-semibold text-slate-900">{formatCurrency(results.healthInsuranceYearly)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
