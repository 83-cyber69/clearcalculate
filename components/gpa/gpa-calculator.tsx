"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { generateId } from "@/lib/utils/id";

type ClassRow = {
  id: string;
  name: string;
  grade: string;
  credits: number;
  honors: boolean;
};

const GRADE_POINTS: Record<string, number> = {
  "A+": 4,
  A: 4,
  "A-": 3.7,
  "B+": 3.3,
  B: 3,
  "B-": 2.7,
  "C+": 2.3,
  C: 2,
  "C-": 1.7,
  "D+": 1.3,
  D: 1,
  F: 0
};

const gradeOptions = Object.keys(GRADE_POINTS).map((grade) => ({
  value: grade,
  label: grade
}));

const exampleClasses: ClassRow[] = [
  { id: "1", name: "Algebra II", grade: "A", credits: 4, honors: false },
  { id: "2", name: "Chemistry Honors", grade: "A-", credits: 4, honors: true },
  { id: "3", name: "US History AP", grade: "B+", credits: 3, honors: true }
];

function newClass(): ClassRow {
  return {
    id: generateId(),
    name: "",
    grade: "A",
    credits: 3,
    honors: false
  };
}

export function GpaCalculator() {
  const [classes, setClasses] = useState<ClassRow[]>([
    {
      id: "initial",
      name: "",
      grade: "A",
      credits: 3,
      honors: false
    }
  ]);
  const [weightedEnabled, setWeightedEnabled] = useState(true);

  const totals = useMemo(() => {
    const totalCredits = classes.reduce(
      (sum, course) => sum + (Number.isFinite(course.credits) ? course.credits : 0),
      0
    );

    const totalPoints = classes.reduce((sum, course) => {
      const credits = Number.isFinite(course.credits) ? course.credits : 0;
      return sum + (GRADE_POINTS[course.grade] ?? 0) * credits;
    }, 0);

    const weightedPoints = classes.reduce((sum, course) => {
      const credits = Number.isFinite(course.credits) ? course.credits : 0;
      const honorsBoost = weightedEnabled && course.honors ? 0.5 : 0;
      return sum + ((GRADE_POINTS[course.grade] ?? 0) + honorsBoost) * credits;
    }, 0);

    return {
      totalCredits,
      gpa: totalCredits > 0 ? totalPoints / totalCredits : 0,
      weightedGpa: totalCredits > 0 ? weightedPoints / totalCredits : 0
    };
  }, [classes, weightedEnabled]);

  const updateClass = useCallback((id: string, patch: Partial<ClassRow>) => {
    setClasses((prev) => prev.map((course) => (course.id === id ? { ...course, ...patch } : course)));
  }, []);

  const handleAddClass = useCallback(() => {
    setClasses((prev) => [...prev, newClass()]);
  }, []);

  const handleReset = useCallback(() => {
    setClasses([
      {
        id: "initial",
        name: "",
        grade: "A",
        credits: 3,
        honors: false
      }
    ]);
  }, []);

  const handleLoadExample = useCallback(() => {
    setClasses(exampleClasses);
  }, []);

  return (
    <div className="space-y-7">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">GPA Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Switch checked={weightedEnabled} onCheckedChange={setWeightedEnabled} id="weighted-toggle" />
              <label htmlFor="weighted-toggle" className="text-sm text-slate-700">
                Enable weighted GPA
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="default" onClick={handleAddClass}>
                Add class
              </Button>
              <Button variant="outline" onClick={handleLoadExample}>
                Save example classes
              </Button>
              <Button variant="ghost" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {classes.map((course, index) => (
              <div
                key={course.id}
                className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(240px,1fr)_170px_140px_auto] md:items-start"
              >
                <Input
                  placeholder="Class name"
                  value={course.name}
                  onChange={(e) => updateClass(course.id, { name: e.target.value })}
                />
                <div className="space-y-2">
                  <Select
                    options={gradeOptions}
                    value={course.grade}
                    onChange={(e) => updateClass(course.id, { grade: e.target.value })}
                  />
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Switch
                      checked={course.honors}
                      onCheckedChange={(checked) => updateClass(course.id, { honors: checked })}
                    />
                    Honors/AP
                  </label>
                </div>
                <Input
                  type="number"
                  min={0}
                  step={0.5}
                  value={course.credits}
                  onChange={(e) => updateClass(course.id, { credits: Number(e.target.value) })}
                  placeholder="Credits"
                />
                <Button
                  variant="ghost"
                  onClick={() =>
                    setClasses((prev) => (prev.length > 1 ? prev.filter((item) => item.id !== course.id) : prev))
                  }
                  disabled={index === 0 && classes.length === 1}
                  className="h-14 self-start px-4 text-slate-700"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-white via-blue-50/60 to-orange-50/70 transition-all duration-300 hover:-translate-y-1">
        <CardContent className="grid gap-4 py-6 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">GPA Result</p>
            <p className="text-3xl font-semibold tracking-tight text-slate-900">{totals.gpa.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Total Credits</p>
            <p className="text-3xl font-semibold tracking-tight text-slate-900">{totals.totalCredits.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Weighted GPA</p>
            <p className="text-3xl font-semibold tracking-tight text-blue-700">{totals.weightedGpa.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
