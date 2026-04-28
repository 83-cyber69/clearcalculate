"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/shared/result-card";
import { Select } from "@/components/ui/select";
import { UnitInput } from "@/components/ui/UnitInput";

const sexOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" }
];

export function IdealBodyWeightCalculator() {
  const [sex, setSex] = useState("male");
  const [heightCm, setHeightCm] = useState("175");

  const output = useMemo(() => {
    const h = Number(heightCm);
    const cm = Number.isFinite(h) ? Math.max(h, 0) : 0;

    const inches = cm / 2.54;
    const over5ft = Math.max(inches - 60, 0);

    const base = sex === "male" ? 50 : 45.5;
    const ibwKg = base + 2.3 * over5ft;

    const lowKg = ibwKg * 0.9;
    const highKg = ibwKg * 1.1;

    return {
      ibwKg,
      lowKg,
      highKg
    };
  }, [heightCm, sex]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Ideal Body Weight Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="ibw-sex" className="text-sm font-medium text-slate-700">
              Sex
            </label>
            <Select id="ibw-sex" options={sexOptions} value={sex} onChange={(e) => setSex(e.target.value)} />
          </div>
          <UnitInput
            id="ibw-height"
            label="Height"
            kind="height"
            valueMetric={Number(heightCm) || 0}
            onChangeMetric={(v) => setHeightCm(String(v))}
            minMetric={0}
            storageKey="cc:ibw:unit:height"
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ResultCard label="Estimated IBW" value={`${output.ibwKg.toFixed(1)} kg`} accent />
        <ResultCard label="Low Range" value={`${output.lowKg.toFixed(1)} kg`} />
        <ResultCard label="High Range" value={`${output.highKg.toFixed(1)} kg`} />
      </div>
    </div>
  );
}
