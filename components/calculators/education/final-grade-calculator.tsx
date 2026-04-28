"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/shared/result-card";
import { InputField } from "@/components/calculators/input-field";

export function FinalGradeCalculator() {
  const [currentGrade, setCurrentGrade] = useState("88");
  const [finalExamGrade, setFinalExamGrade] = useState("84");
  const [finalExamWeight, setFinalExamWeight] = useState("30");

  const handleCurrentGrade = useCallback((v: string) => setCurrentGrade(v), []);
  const handleFinalExamGrade = useCallback((v: string) => setFinalExamGrade(v), []);
  const handleFinalExamWeight = useCallback((v: string) => setFinalExamWeight(v), []);

  const output = useMemo(() => {
    const current = Number(currentGrade);
    const finalExam = Number(finalExamGrade);
    const weight = Number(finalExamWeight) / 100;

    const safeWeight = Number.isFinite(weight) ? Math.min(Math.max(weight, 0), 1) : 0;
    const safeCurrent = Number.isFinite(current) ? current : 0;
    const safeFinal = Number.isFinite(finalExam) ? finalExam : 0;

    const finalGrade = safeCurrent * (1 - safeWeight) + safeFinal * safeWeight;

    return {
      finalGrade
    };
  }, [currentGrade, finalExamGrade, finalExamWeight]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Final Grade Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <InputField
            label="Current grade"
            type="number"
            min={0}
            max={100}
            value={currentGrade}
            onChange={handleCurrentGrade}
            unitRight="%"
            placeholder="e.g. 88"
          />
          <InputField
            label="Final exam grade"
            type="number"
            min={0}
            max={100}
            value={finalExamGrade}
            onChange={handleFinalExamGrade}
            unitRight="%"
            placeholder="e.g. 84"
          />
          <InputField
            label="Final exam weight"
            type="number"
            min={0}
            max={100}
            value={finalExamWeight}
            onChange={handleFinalExamWeight}
            unitRight="%"
            placeholder="e.g. 30"
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label="Estimated Final Grade" value={`${output.finalGrade.toFixed(1)}%`} accent />
        <ResultCard label="Exam Weight Used" value={`${Number(finalExamWeight || 0).toFixed(0)}%`} />
      </div>
    </div>
  );
}
