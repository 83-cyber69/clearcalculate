import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CalculatorCardProps = {
  title: string;
  description: string;
  href: string;
};

export function CalculatorCard({ title, description, href }: CalculatorCardProps) {
  return (
    <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_38px_rgba(15,23,42,0.1)]">
      <CardHeader>
        <CardTitle className="text-slate-900 transition-colors group-hover:text-blue-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm leading-6 text-slate-600">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
        >
          Open calculator <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
