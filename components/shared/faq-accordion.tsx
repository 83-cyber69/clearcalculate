"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full max-w-full space-y-3 overflow-x-clip">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question} className="glass-card w-full min-w-0 max-w-full overflow-hidden hover:border-orange-200">
            <button
              type="button"
              className="flex w-full min-w-0 items-center justify-between gap-3 p-5 text-left transition-colors hover:bg-orange-50/40"
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span className="min-w-0 max-w-full break-words font-medium text-slate-900">{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200",
                  open && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "w-full max-w-full break-words border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-600 transition-all",
                open ? "block" : "hidden"
              )}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
