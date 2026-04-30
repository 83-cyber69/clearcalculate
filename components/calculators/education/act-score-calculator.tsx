"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/shared/result-card";
import { InputField } from "@/components/calculators/input-field";

export function ActScoreCalculator() {
  const [english, setEnglish] = useState("24");
  const [math, setMath] = useState("26");
  const [reading, setReading] = useState("23");
  const [science, setScience] = useState("25");

  const onEnglish = useCallback((v: string) => setEnglish(v), []);
  const onMath = useCallback((v: string) => setMath(v), []);
  const onReading = useCallback((v: string) => setReading(v), []);
  const onScience = useCallback((v: string) => setScience(v), []);

  const output = useMemo(() => {
    const e = Number(english);
    const m = Number(math);
    const r = Number(reading);
    const s = Number(science);

    const scores = [e, m, r, s].map((n) => (Number.isFinite(n) ? Math.min(Math.max(n, 1), 36) : 0));
    const avg = scores.reduce((a, b) => a + b, 0) / 4;
    const composite = Math.round(avg);

    return { composite, avg };
  }, [english, math, reading, science]);

  const resultExplanation = useMemo(() => {
    const roundedUp = output.composite > output.avg;
    const diff = Math.abs(output.avg - output.composite);

    if (diff < 0.001) {
      return "Your composite is the average of the four section scores.";
    }

    return roundedUp
      ? "Your composite rounds up from the section average. Small section improvements can sometimes change the rounded composite."
      : "Your composite rounds down from the section average. A small bump in one section may be enough to round up.";
  }, [output.avg, output.composite]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">ACT Score Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField label="English" type="number" min={1} max={36} value={english} onChange={onEnglish} />
          <InputField label="Math" type="number" min={1} max={36} value={math} onChange={onMath} />
          <InputField label="Reading" type="number" min={1} max={36} value={reading} onChange={onReading} />
          <InputField label="Science" type="number" min={1} max={36} value={science} onChange={onScience} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResultCard label="Estimated Composite" value={`${output.composite}`} accent />
        <ResultCard label="Average (before rounding)" value={output.avg.toFixed(2)} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
        {resultExplanation}
      </div>
    </div>
  );
}
