"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { UnitSystem } from "@/lib/unit-system";
import { cmToFeetIn, feetInToCm, kgToLbs, lbsToKg } from "@/lib/unit-system";

type UnitInputKind = "height" | "weight";

type HeightImperialValue = {
  ft: number;
  in: number;
};

type WeightImperialValue = {
  lbs: number;
};

type UnitInputProps = {
  id?: string;
  label: string;
  kind: UnitInputKind;
  valueMetric: number;
  onChangeMetric: (valueMetric: number) => void;
  className?: string;
  minMetric?: number;
  storageKey?: string;
  unitSystem?: UnitSystem;
  onUnitSystemChange?: (next: UnitSystem) => void;
};

function readStoredUnitSystem(key: string): UnitSystem | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(key);
  if (raw === "metric" || raw === "imperial") return raw;
  return null;
}

function storeUnitSystem(key: string, system: UnitSystem) {
  try {
    window.localStorage.setItem(key, system);
  } catch {
    // ignore
  }
}

export function UnitInput({
  id,
  label,
  kind,
  valueMetric,
  onChangeMetric,
  className,
  minMetric,
  storageKey,
  unitSystem: controlledUnitSystem,
  onUnitSystemChange
}: UnitInputProps) {
  const key = storageKey ?? `cc:unit:${kind}`;

  const [uncontrolledUnitSystem, setUncontrolledUnitSystem] = useState<UnitSystem>("metric");
  const unitSystem = controlledUnitSystem ?? uncontrolledUnitSystem;

  useEffect(() => {
    if (controlledUnitSystem) return;
    const stored = readStoredUnitSystem(key);
    if (stored) setUncontrolledUnitSystem(stored);
  }, [controlledUnitSystem, key]);

  const setSystem = useCallback(
    (next: UnitSystem) => {
      onUnitSystemChange?.(next);
      if (!controlledUnitSystem) {
        setUncontrolledUnitSystem(next);
        if (typeof window !== "undefined") storeUnitSystem(key, next);
      }
    },
    [controlledUnitSystem, key, onUnitSystemChange]
  );

  const metricLabel = kind === "height" ? "cm" : "kg";
  const imperialLabel = kind === "height" ? "ft/in" : "lb";

  const heightImperialValue: HeightImperialValue = useMemo(() => {
    const { ft, in: inches } = cmToFeetIn(valueMetric);
    return { ft, in: inches };
  }, [valueMetric]);

  const weightImperialValue: WeightImperialValue = useMemo(() => {
    return { lbs: kgToLbs(valueMetric) };
  }, [valueMetric]);

  const handleMetricChange = useCallback(
    (value: string) => {
      const n = Number(value);
      if (!Number.isFinite(n)) return;
      const next = minMetric !== undefined ? Math.max(n, minMetric) : n;
      onChangeMetric(next);
    },
    [minMetric, onChangeMetric]
  );

  const handleImperialChange = useCallback(
    (part: "ft" | "in" | "lbs", value: string) => {
      const n = Number(value);
      if (!Number.isFinite(n)) return;

      if (kind === "weight") {
        const lbsFloor = minMetric !== undefined ? kgToLbs(minMetric) : 0;
        const lbs = Math.max(n, lbsFloor);
        onChangeMetric(lbsToKg(lbs));
        return;
      }

      const currentFt = part === "ft" ? n : heightImperialValue.ft;
      const currentIn = part === "in" ? n : heightImperialValue.in;
      const cm = feetInToCm(currentFt, currentIn);
      const next = minMetric !== undefined ? Math.max(cm, minMetric) : cm;
      onChangeMetric(next);
    },
    [heightImperialValue.ft, heightImperialValue.in, kind, minMetric, onChangeMetric]
  );

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}{" "}
          <span className="text-slate-500">({unitSystem === "metric" ? metricLabel : imperialLabel})</span>
        </label>
        <div className="inline-flex overflow-hidden rounded-lg border border-slate-200 bg-white">
          <button
            type="button"
            onClick={() => setSystem("metric")}
            className={cn(
              "px-2 py-1 text-xs font-semibold",
              unitSystem === "metric" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"
            )}
          >
            Metric
          </button>
          <button
            type="button"
            onClick={() => setSystem("imperial")}
            className={cn(
              "px-2 py-1 text-xs font-semibold",
              unitSystem === "imperial" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"
            )}
          >
            Imperial
          </button>
        </div>
      </div>

      {unitSystem === "metric" ? (
        <div className="relative">
          <Input
            id={id}
            type="number"
            min={minMetric}
            value={Number.isFinite(valueMetric) ? String(Math.round(valueMetric * 10) / 10) : ""}
            onChange={(e) => handleMetricChange(e.target.value)}
            placeholder={kind === "height" ? "e.g. 175" : "e.g. 75"}
            className="pr-14"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
            {metricLabel}
          </span>
        </div>
      ) : kind === "height" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="relative">
            <Input
              id={id ? `${id}-ft` : undefined}
              type="number"
              min={0}
              value={String(heightImperialValue.ft)}
              onChange={(e) => handleImperialChange("ft", e.target.value)}
              placeholder="ft"
              className="pr-14"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">ft</span>
          </div>
          <div className="relative">
            <Input
              id={id ? `${id}-in` : undefined}
              type="number"
              min={0}
              step={0.5}
              value={String(Math.round(heightImperialValue.in * 10) / 10)}
              onChange={(e) => handleImperialChange("in", e.target.value)}
              placeholder="in"
              className="pr-14"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">in</span>
          </div>
        </div>
      ) : (
        <div className="relative">
          <Input
            id={id}
            type="number"
            min={0}
            value={String(Math.round(weightImperialValue.lbs * 10) / 10)}
            onChange={(e) => handleImperialChange("lbs", e.target.value)}
            placeholder="e.g. 165"
            className="pr-14"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">lb</span>
        </div>
      )}
    </div>
  );
}
