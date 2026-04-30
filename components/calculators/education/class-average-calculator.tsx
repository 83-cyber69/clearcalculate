"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/shared/result-card";
import { Input } from "@/components/ui/input";

function parseScores(raw: string) {
  return raw
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((n) => Number(n))
    .filter((n) => Number.isFinite(n));
}

export function ClassAverageCalculator() {
  const [scoresRaw, setScoresRaw] = useState("90, 84, 77, 95");

  const onScores = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setScoresRaw(e.target.value);
  }, []);

  const output = useMemo(() => {
    const scores = parseScores(scoresRaw);
    const count = scores.length;
    const sum = scores.reduce((a, b) => a + b, 0);
    const average = count > 0 ? sum / count : 0;

    return { count, average };
  }, [scoresRaw]);

  const resultExplanation = useMemo(() => {
    if (output.count === 0) {
      return "Add at least one numeric score to calculate an average.";
    }

    if (output.count === 1) {
      return "With only one score, the average equals that score. Add more scores for a meaningful class average.";
    }

    return "This is a simple (unweighted) mean. If assignments have different point values or weights, use a weighted grade method instead.";
  }, [output.average, output.count]);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Class Average Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <label htmlFor="class-average-scores" className="text-sm font-medium text-slate-700">
            Scores (comma-separated)
          </label>
          <Input
            id="class-average-scores"
            value={scoresRaw}
            onChange={onScores}
            placeholder="e.g. 90, 84, 77, 95"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResultCard label="Average" value={`${output.average.toFixed(1)}%`} accent />
        <ResultCard label="Scores Count" value={`${output.count}`} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
        {resultExplanation}
      </div>
    </div>
  );
}
