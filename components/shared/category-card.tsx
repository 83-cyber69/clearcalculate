import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type CategoryCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  slug?: string;
};

export function CategoryCard({ title, description, icon: Icon, slug }: CategoryCardProps) {
  const cardContent = (
    <Card className="group h-full w-full min-w-0 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_16px_38px_rgba(15,23,42,0.15)] active:scale-[0.99]">
      <CardHeader>
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {Icon ? (
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-orange-600 transition-all group-hover:border-orange-300 group-hover:bg-orange-100">
                <Icon className="h-5 w-5" />
              </span>
            ) : null}
            <CardTitle className="text-slate-900 transition-colors group-hover:text-orange-600">{title}</CardTitle>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition-all group-hover:text-orange-600 group-hover:translate-x-1" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="max-w-full break-words text-sm leading-6 text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );

  if (slug) {
    return (
      <Link href={`/${slug}`} className="block h-full w-full min-w-0 max-w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:ring-offset-2">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
