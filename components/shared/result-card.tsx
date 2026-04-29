import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";

type ResultCardProps = {
  label: string;
  value: string;
  accent?: boolean;
};

export const ResultCard = memo(function ResultCard({ label, value, accent = false }: ResultCardProps) {
  return (
    <Card
      className={
        accent
          ? "bg-gradient-to-br from-white via-orange-50/80 to-amber-50/70 transition-all duration-300"
          : ""
      }
    >
      <CardContent className="py-5">
        <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{value}</p>
      </CardContent>
    </Card>
  );
});
