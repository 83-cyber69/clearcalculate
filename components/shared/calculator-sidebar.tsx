import Link from "next/link";
import { BadgeCheck, Lightbulb, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type TrustBadge = {
  label: string;
};

type QuickLink = {
  label: string;
  href: string;
};

type CalculatorSidebarProps = {
  trustBadges?: TrustBadge[];
  quickLinks?: QuickLink[];
  tip?: string;
  className?: string;
};

export function CalculatorSidebar({ trustBadges, quickLinks, tip, className }: CalculatorSidebarProps) {
  const hasTrustBadges = Boolean(trustBadges?.length);
  const hasQuickLinks = Boolean(quickLinks?.length);
  const hasTip = Boolean(tip);

  return (
    <div className={cn("space-y-6", className)}>
      {hasTrustBadges ? (
        <div className="glass-card p-5">
          <p className="text-sm font-semibold text-slate-900">Why people like this tool</p>
          <div className="mt-3 grid gap-2">
            {trustBadges!.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-slate-700">
                <BadgeCheck className="h-4 w-4 text-orange-600" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {hasQuickLinks ? (
        <div className="glass-card p-5">
          <p className="text-sm font-semibold text-slate-900">Quick links</p>
          <div className="mt-3 grid gap-2">
            {quickLinks!.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <LinkIcon className="h-4 w-4 text-slate-500" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {hasTip ? (
        <div className="glass-card p-5">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-orange-600" />
            <p className="text-sm font-semibold text-slate-900">Tip</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{tip}</p>
        </div>
      ) : null}
    </div>
  );
}
