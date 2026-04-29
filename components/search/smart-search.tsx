"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ChevronRight, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchCalculators } from "@/lib/calculators";
import type { CalculatorItem } from "@/lib/calculators";
import { searchProgrammaticPagesRanked, type ProgrammaticSearchItem } from "@/lib/programmatic-pages";

interface SmartSearchProps {
  className?: string;
}

export function SmartSearch({ className }: SmartSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CalculatorItem[]>([]);
  const [guideResults, setGuideResults] = useState<ProgrammaticSearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const lastLoggedRef = useRef<string>("");

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchCalculators(query);
      setResults(searchResults);
      const guideSearchResults = searchProgrammaticPagesRanked(query, 4);
      setGuideResults(guideSearchResults);
      setIsOpen(searchResults.length > 0 || guideSearchResults.length > 0);
      setSelectedIndex(-1);

      const normalized = query.toLowerCase().trim();
      if (normalized && normalized !== lastLoggedRef.current) {
        lastLoggedRef.current = normalized;
        fetch("/api/search-intent", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ query: normalized })
        }).catch(() => {
          // ignore
        });
      }
    } else {
      setResults([]);
      setGuideResults([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mergedResults = [...results.slice(0, 8), ...guideResults.slice(0, 4)];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || mergedResults.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < mergedResults.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          const selected = mergedResults[selectedIndex];
          if ("kind" in selected) {
            window.location.href = `/p/${selected.slug}`;
          } else {
            window.location.href = `/${selected.slug}`;
          }
        } else if (mergedResults.length > 0) {
          const first = mergedResults[0];
          if ("kind" in first) {
            window.location.href = `/p/${first.slug}`;
          } else {
            window.location.href = `/${first.slug}`;
          }
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="font-semibold text-orange-600">{part}</span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search calculators (GPA, taxes, calories...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (mergedResults.length > 0) setIsOpen(true);
          }}
          className="h-12 rounded-xl border-slate-200 bg-white pl-12 pr-4 text-base shadow-sm transition-all focus:border-orange-300 focus:shadow-md focus:ring-2 focus:ring-orange-100 sm:h-14 sm:text-lg"
        />
      </div>

      <div
        className={cn(
          "absolute top-full z-50 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.12)] transition-all",
          isOpen && mergedResults.length > 0
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        )}
      >
        <div className="max-h-80 overflow-y-auto">
          {results.slice(0, 8).map((result, index) => {
            const Icon = result.icon;
            return (
              <div
                key={result.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer",
                  index === selectedIndex ? "bg-orange-50" : "hover:bg-orange-50",
                  "border-b border-slate-100"
                )}
                onClick={() => {
                  window.location.href = `/${result.slug}`;
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex-shrink-0 rounded-lg border border-slate-200 bg-white p-2">
                  <Icon className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900">{highlightMatch(result.name, query)}</div>
                  <div className="text-xs text-slate-600 truncate">
                    {highlightMatch(result.description, query)}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">
                    {result.category}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            );
          })}

          {guideResults.slice(0, 4).map((result, rawIndex) => {
            const index = results.slice(0, 8).length + rawIndex;
            return (
              <div
                key={result.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer",
                  index === selectedIndex ? "bg-orange-50" : "hover:bg-orange-50",
                  index !== mergedResults.length - 1 && "border-b border-slate-100"
                )}
                onClick={() => {
                  window.location.href = `/p/${result.slug}`;
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex-shrink-0 rounded-lg border border-slate-200 bg-white p-2">
                  <BookOpen className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900">{highlightMatch(result.name, query)}</div>
                  <div className="text-xs text-slate-600 truncate">
                    {highlightMatch(result.description, query)}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">
                    Guide
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            );
          })}
        </div>

        <div
          className={cn(
            "border-t border-slate-100 px-4 py-2",
            mergedResults.length > 0 ? "block" : "hidden"
          )}
        >
          <div className="text-xs text-slate-500">
            Press{" "}
            <kbd className="px-1 py-0.5 text-xs bg-slate-100 border border-slate-200 rounded">↑↓</kbd>
            {" "}to navigate,{" "}
            <kbd className="px-1 py-0.5 text-xs bg-slate-100 border border-slate-200 rounded">Enter</kbd>
            {" "}to select
          </div>
        </div>
      </div>
    </div>
  );
}
