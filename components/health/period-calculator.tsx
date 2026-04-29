"use client";

import { useCallback, useMemo, useState } from "react";
import { CalendarDays, HeartPulse } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResultCard } from "@/components/shared/result-card";

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function parseIsoDate(value: string) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map((x) => Number(x));
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  return Number.isFinite(dt.getTime()) ? dt : null;
}

export function PeriodCalculator() {
  const [lastPeriodStart, setLastPeriodStart] = useState(() => {
    const today = new Date();
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    return iso;
  });
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);

  const handleLastPeriodChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLastPeriodStart(e.target.value);
  }, []);

  const handleCycleLengthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCycleLength(Number(e.target.value));
  }, []);

  const handlePeriodLengthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPeriodLength(Number(e.target.value));
  }, []);

  const output = useMemo(() => {
    const start = parseIsoDate(lastPeriodStart);
    const cl = Number.isFinite(cycleLength) ? cycleLength : 0;
    const pl = Number.isFinite(periodLength) ? periodLength : 0;

    if (!start || cl < 20 || cl > 45 || pl < 1 || pl > 14) {
      return null;
    }

    const nextStart = addDays(start, cl);
    const predictedEnd = addDays(nextStart, Math.max(pl - 1, 0));

    const ovulation = addDays(nextStart, -14);
    const fertileStart = addDays(ovulation, -5);
    const fertileEnd = addDays(ovulation, 1);

    return {
      nextStart,
      predictedEnd,
      ovulation,
      fertileStart,
      fertileEnd
    };
  }, [cycleLength, lastPeriodStart, periodLength]);

  const resultExplanation = useMemo(() => {
    return "This period calculator gives a calendar estimate based on your last period and average cycle length. Cycles vary—use it as a planning tool, not medical advice.";
  }, []);

  return (
    <div className="space-y-7">
      <Card className="shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">Period Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="period-last-start" className="text-sm font-medium text-slate-700">
              Last period start date
            </label>
            <Input id="period-last-start" type="date" value={lastPeriodStart} onChange={handleLastPeriodChange} />
          </div>

          <div className="space-y-1">
            <label htmlFor="period-cycle" className="text-sm font-medium text-slate-700">
              Average cycle length <span className="text-slate-500">(days)</span>
            </label>
            <Input id="period-cycle" type="number" min={20} max={45} value={cycleLength} onChange={handleCycleLengthChange} />
          </div>

          <div className="space-y-1">
            <label htmlFor="period-length" className="text-sm font-medium text-slate-700">
              Average period length <span className="text-slate-500">(days)</span>
            </label>
            <Input id="period-length" type="number" min={1} max={14} value={periodLength} onChange={handlePeriodLengthChange} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ResultCard label="Next period (est.)" value={output ? formatDate(output.nextStart) : "—"} accent />
        <ResultCard label="Ends around" value={output ? formatDate(output.predictedEnd) : "—"} />
        <ResultCard label="Ovulation (est.)" value={output ? formatDate(output.ovulation) : "—"} />
        <ResultCard
          label="Fertile window"
          value={output ? `${formatDate(output.fertileStart)}–${formatDate(output.fertileEnd)}` : "—"}
        />
      </div>

      <Card className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50">
        <CardContent className="grid gap-4 py-6 md:grid-cols-2">
          <div className="rounded-xl border border-orange-200 bg-white p-4">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-orange-700">
              <CalendarDays className="h-4 w-4" />
              How the estimate works
            </p>
            <p className="text-sm leading-6 text-slate-700">
              The next period is estimated by adding your average cycle length to your last start date. Ovulation is commonly estimated as ~14 days before the next period.
            </p>
          </div>
          <div className="rounded-xl border border-orange-200 bg-white p-4">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-orange-700">
              <HeartPulse className="h-4 w-4" />
              Important note
            </p>
            <p className="text-sm leading-6 text-slate-700">
              Cycles vary due to stress, sleep, travel, training, and health changes. If you have irregular cycles or concerning symptoms, consult a clinician.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">{resultExplanation}</div>
    </div>
  );
}
