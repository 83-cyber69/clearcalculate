"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/shared/result-card";
import { Select } from "@/components/ui/select";
import { InputField } from "@/components/calculators/input-field";
import { UnitInput } from "@/components/ui/UnitInput";
import { usePersistentUnitSystem } from "@/lib/hooks/use-persistent-unit-system";
import type { UnitSystem } from "@/lib/unit-system";

const sexOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" }
];

export function BodyFatCalculator() {
  const [sex, setSex] = useState("male");
  const [heightCm, setHeightCm] = useState("175");
  const [neckCm, setNeckCm] = useState("38");
  const [waistCm, setWaistCm] = useState("85");
  const [hipCm, setHipCm] = useState("95");

  const { unitSystem, setUnitSystem } = usePersistentUnitSystem("cc:bodyfat:unitSystem", "metric");

  const onNeck = useCallback((v: string) => setNeckCm(v), []);
  const onWaist = useCallback((v: string) => setWaistCm(v), []);
  const onHip = useCallback((v: string) => setHipCm(v), []);

  const handleUnitSystemChange = useCallback(
    (next: UnitSystem) => {
      if (next === unitSystem) return;

      const factor = next === "imperial" ? 1 / 2.54 : 2.54;
      const convert = (raw: string) => {
        const n = Number(raw);
        if (!Number.isFinite(n)) return raw;
        return String(Math.round(n * factor * 10) / 10);
      };

      setNeckCm(convert(neckCm));
      setWaistCm(convert(waistCm));
      setHipCm(convert(hipCm));

      setUnitSystem(next);
    },
    [hipCm, neckCm, setUnitSystem, unitSystem, waistCm]
  );

  const output = useMemo(() => {
    const h = Number(heightCm);
    const neckRaw = Number(neckCm);
    const waistRaw = Number(waistCm);
    const hipRaw = Number(hipCm);

    const toCm = (n: number) => (unitSystem === "imperial" ? n * 2.54 : n);
    const neck = Number.isFinite(neckRaw) ? toCm(neckRaw) : 0;
    const waist = Number.isFinite(waistRaw) ? toCm(waistRaw) : 0;
    const hip = Number.isFinite(hipRaw) ? toCm(hipRaw) : 0;

    const heightIn = (Number.isFinite(h) ? Math.max(h, 0) : 0) / 2.54;
    const neckIn = (Number.isFinite(neck) ? Math.max(neck, 0) : 0) / 2.54;
    const waistIn = (Number.isFinite(waist) ? Math.max(waist, 0) : 0) / 2.54;
    const hipIn = (Number.isFinite(hip) ? Math.max(hip, 0) : 0) / 2.54;

    const safe = (n: number) => (n > 0 ? n : 1);

    let bf = 0;
    if (sex === "male") {
      // US Navy method (inches)
      bf = 86.010 * Math.log10(safe(waistIn - neckIn)) - 70.041 * Math.log10(safe(heightIn)) + 36.76;
    } else {
      bf = 163.205 * Math.log10(safe(waistIn + hipIn - neckIn)) - 97.684 * Math.log10(safe(heightIn)) - 78.387;
    }

    const clamped = Number.isFinite(bf) ? Math.min(Math.max(bf, 0), 60) : 0;

    return { bf: clamped };
  }, [heightCm, hipCm, neckCm, sex, unitSystem, waistCm]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Body Fat Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1">
            <label htmlFor="bf-sex" className="text-sm font-medium text-slate-700">
              Sex
            </label>
            <Select id="bf-sex" options={sexOptions} value={sex} onChange={(e) => setSex(e.target.value)} />
          </div>
          <UnitInput
            id="bf-height"
            label="Height"
            kind="height"
            valueMetric={Number(heightCm) || 0}
            onChangeMetric={(v) => setHeightCm(String(v))}
            minMetric={0}
            unitSystem={unitSystem}
            onUnitSystemChange={handleUnitSystemChange}
          />
          <InputField
            label={`Neck (${unitSystem === "metric" ? "cm" : "in"})`}
            type="number"
            min={0}
            value={neckCm}
            onChange={onNeck}
            unitRight={unitSystem === "metric" ? "cm" : "in"}
          />
          <InputField
            label={`Waist (${unitSystem === "metric" ? "cm" : "in"})`}
            type="number"
            min={0}
            value={waistCm}
            onChange={onWaist}
            unitRight={unitSystem === "metric" ? "cm" : "in"}
          />
          {sex === "female" ? (
            <InputField
              label={`Hips (${unitSystem === "metric" ? "cm" : "in"})`}
              type="number"
              min={0}
              value={hipCm}
              onChange={onHip}
              unitRight={unitSystem === "metric" ? "cm" : "in"}
            />
          ) : null}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label="Estimated Body Fat" value={`${output.bf.toFixed(1)}%`} accent />
        <ResultCard label="Method" value="US Navy (measurement-based)" />
      </div>
    </div>
  );
}
