import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CalculatorCardProps = {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  ctaLabel?: string;
};

export function CalculatorCard({
  title,
  description,
  href,
  icon: Icon,
  ctaLabel = "Open calculator"
}: CalculatorCardProps) {
  return (
    <Card className="group h-full transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-[0_20px_48px_rgba(15,23,42,0.15)]">
      <CardHeader>
        {Icon ? (
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-orange-600 transition-all group-hover:border-orange-300 group-hover:bg-orange-100">
            <Icon className="h-6 w-6" />
          </span>
        ) : null}
        <CardTitle className="text-slate-900 transition-colors group-hover:text-orange-600 break-words">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-sm leading-6 text-slate-600 break-words">{description}</p>
        <Link href={href}>
          <Button variant="outline" className="inline-flex items-center gap-2 transition-colors group-hover:bg-orange-50 group-hover:border-orange-200 group-hover:text-orange-600">
            {ctaLabel} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
