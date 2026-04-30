"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/shared/result-card";
import { InputField } from "@/components/calculators/input-field";

export function SatScoreCalculator() {
  const [math, setMath] = useState("650");
  const [readingWriting, setReadingWriting] = useState("610");

  const onMath = useCallback((v: string) => setMath(v), []);
  const onRW = useCallback((v: string) => setReadingWriting(v), []);

  const output = useMemo(() => {
    const m = Number(math);
    const rw = Number(readingWriting);
    const safeM = Number.isFinite(m) ? Math.min(Math.max(m, 200), 800) : 0;
    const safeRW = Number.isFinite(rw) ? Math.min(Math.max(rw, 200), 800) : 0;
    const total = safeM + safeRW;

    return { total, safeM, safeRW };
  }, [math, readingWriting]);

  const resultExplanation = useMemo(() => {
    const gap = Math.abs(output.safeM - output.safeRW);
    if (gap <= 20) {
      return "Your total is balanced across sections. Improving either section will raise the total by the same number of points.";
    }

    return "Your total is the sum of both sections. If you’re stronger in one section, focusing practice there can be the fastest way to lift the total.";
  }, [output.safeM, output.safeRW, output.total]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">SAT Score Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField label="Math section" type="number" min={200} max={800} value={math} onChange={onMath} />
          <InputField
            label="Reading & Writing section"
            type="number"
            min={200}
            max={800}
            value={readingWriting}
            onChange={onRW}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResultCard label="Estimated Total" value={`${output.total}`} accent />
        <ResultCard label="Sections" value={`Math ${output.safeM} + R&W ${output.safeRW}`} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
        {resultExplanation}
      </div>
    </div>
  );
}
