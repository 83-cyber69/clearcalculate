"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  getFeaturedCalculators,
  searchCalculatorsRanked,
  type CalculatorItem
} from "@/lib/calculators";

const RECENT_SEARCHES_KEY = "cc_recent_calculator_searches_v1";
const MAX_RECENT = 5;

type NavSearchBarProps = {
  className?: string;
  inputClassName?: string;
  dropdownAlign?: "left" | "right";
  autoFocus?: boolean;
  placeholder?: string;
  onNavigate?: () => void;
};

type Suggestion =
  | { type: "calculator"; item: CalculatorItem }
  | { type: "recent"; query: string }
  | { type: "popular"; item: CalculatorItem };

function safeReadRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => typeof x === "string" && x.trim()).slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

function safeWriteRecentSearches(items: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(items.slice(0, MAX_RECENT)));
  } catch {
    // ignore
  }
}

function addRecentSearch(query: string) {
  const q = query.trim();
  if (!q) return;
  const prev = safeReadRecentSearches();
  const next = [q, ...prev.filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, MAX_RECENT);
  safeWriteRecentSearches(next);
}

function highlightMatch(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="font-semibold text-orange-600">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

export function NavSearchDropdown({
  isOpen,
  query,
  suggestions,
  selectedIndex,
  onSelect,
  align = "left"
}: {
  isOpen: boolean;
  query: string;
  suggestions: Suggestion[];
  selectedIndex: number;
  onSelect: (s: Suggestion) => void;
  align?: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "absolute top-full z-50 mt-2 w-[min(520px,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.12)] transition-all",
        align === "right" ? "right-0" : "left-0",
        isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      )}
    >
      <div className="max-h-[420px] overflow-y-auto p-2">
        {suggestions.length === 0 ? (
          <div className="px-3 py-6 text-sm text-slate-600">
            {query.trim() ? "No matches. Try a different term." : "Start typing to search calculators."}
          </div>
        ) : (
          <div className="space-y-1">
            {suggestions.map((s, index) => {
              if (s.type === "recent") {
                return (
                  <button
                    key={`recent-${s.query}-${index}`}
                    type="button"
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                      index === selectedIndex ? "bg-orange-50" : "hover:bg-orange-50"
                    )}
                    onClick={() => onSelect(s)}
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white">
                      <Clock className="h-4 w-4 text-slate-500" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-slate-900">{s.query}</span>
                      <span className="block text-xs text-slate-600">Recent search</span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                );
              }

              const item = s.item;
              const Icon = item.icon;

              return (
                <button
                  key={`${s.type}-${item.id}`}
                  type="button"
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                    index === selectedIndex ? "bg-orange-50" : "hover:bg-orange-50"
                  )}
                  onClick={() => onSelect(s)}
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white">
                    {s.type === "popular" ? (
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                    ) : (
                      <Icon className="h-4 w-4 text-orange-600" />
                    )}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-slate-900">
                      {highlightMatch(item.name, query)}
                    </span>
                    <span className="block text-xs text-slate-600 truncate">
                      {highlightMatch(item.description, query)}
                    </span>
                  </span>
                  <span className="mt-0.5 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-2 py-1 text-[11px] font-medium text-orange-700">
                    {item.category}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 px-4 py-2 text-xs text-slate-500">
        <span className="hidden sm:inline">
          <kbd className="rounded border border-slate-200 bg-slate-100 px-1 py-0.5">↑↓</kbd> navigate, {" "}
          <kbd className="rounded border border-slate-200 bg-slate-100 px-1 py-0.5">Enter</kbd> select, {" "}
          <kbd className="rounded border border-slate-200 bg-slate-100 px-1 py-0.5">Esc</kbd> close
        </span>
        <span className="sm:hidden">Tap a result to open</span>
      </div>
    </div>
  );
}

export function NavSearchBar({
  className,
  inputClassName,
  dropdownAlign = "left",
  autoFocus,
  placeholder = "Search calculators...",
  onNavigate
}: NavSearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recent, setRecent] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRecent(safeReadRecentSearches());
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setSelectedIndex(-1);
  }, [pathname]);

  const debouncedQuery = useDebouncedValue(query, 90);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return searchCalculatorsRanked(debouncedQuery, 10);
  }, [debouncedQuery]);

  const popular = useMemo(() => getFeaturedCalculators().slice(0, 4), []);

  const suggestions: Suggestion[] = useMemo(() => {
    const q = debouncedQuery.trim();
    if (q) {
      return results.map((item: CalculatorItem) => ({ type: "calculator", item }));
    }

    const recentSuggestions: Suggestion[] = recent.slice(0, MAX_RECENT).map((r) => ({ type: "recent", query: r }));
    const popularSuggestions: Suggestion[] = popular.map((item: CalculatorItem) => ({ type: "popular", item }));
    return [...recentSuggestions, ...popularSuggestions];
  }, [debouncedQuery, popular, recent, results]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const navigateTo = (href: string) => {
    close();
    onNavigate?.();
    router.push(href);
  };

  const handleSelect = (s: Suggestion) => {
    if (s.type === "recent") {
      setQuery(s.query);
      open();
      inputRef.current?.focus();
      return;
    }

    addRecentSearch(query || s.item.name);
    setRecent(safeReadRecentSearches());
    navigateTo(`/${s.item.slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      inputRef.current?.blur();
      return;
    }

    if (!isOpen) return;
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSelect(suggestions[selectedIndex]);
        return;
      }

      const first = suggestions[0];
      if (first) handleSelect(first);
    }
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onFocus={() => {
            open();
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            open();
            setSelectedIndex(-1);
          }}
          onKeyDown={onKeyDown}
          className={cn(
            "h-12 rounded-2xl border-slate-200 bg-white pl-12 pr-10 text-sm shadow-sm transition-all focus:border-orange-300 focus:ring-2 focus:ring-orange-100",
            inputClassName
          )}
        />
        {query.trim() ? (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-500 hover:bg-slate-100"
            onClick={() => {
              setQuery("");
              setSelectedIndex(-1);
              open();
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <NavSearchDropdown
        isOpen={isOpen}
        query={debouncedQuery}
        suggestions={suggestions}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
        align={dropdownAlign}
      />

      <Link
        href="/calculators"
        className={cn(
          "sr-only",
          isOpen ? "sr-only" : "sr-only"
        )}
      >
        All Calculators
      </Link>
    </div>
  );
}

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(t);
  }, [delayMs, value]);

  return debounced;
}
