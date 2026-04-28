"use client";

import { useId } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputFieldProps = {
  id?: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  unitRight?: string;
  className?: string;
};

export function InputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  min,
  max,
  step,
  placeholder,
  unitRight,
  className
}: InputFieldProps) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;

  return (
    <div className={cn("space-y-1", className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <Input
          id={inputId}
          type={type}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={unitRight ? "pr-14" : undefined}
        />
        {unitRight ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
            {unitRight}
          </span>
        ) : null}
      </div>
    </div>
  );
}
