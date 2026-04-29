import * as React from "react";
import { cn } from "@/lib/utils";

type Option = {
  value: string;
  label: string;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
};

export function Select({ className, options, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "flex h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-base leading-6 text-slate-900 shadow-sm transition-colors focus-visible:border-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200",
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
