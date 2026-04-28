"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { calculatorItems, categoryRegistry, getFeaturedCalculators } from "@/lib/calculators";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const featuredCalculators = getFeaturedCalculators();
  const groupedItems = {
    Education: calculatorItems.filter((item) => item.category === "Education"),
    Finance: calculatorItems.filter((item) => item.category === "Finance"),
    Health: calculatorItems.filter((item) => item.category === "Health")
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="container-max flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          <span className="mr-0.5">Clear</span>
          <span className="text-brand-orange">Calculate</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <Link href="/" className="transition-colors hover:text-blue-700">
            Home
          </Link>
          <div className="relative">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-blue-700"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Calculators
              <ChevronDown className={cn("h-4 w-4 transition-transform", dropdownOpen && "rotate-180")} />
            </button>
            <div
              className={cn(
                "absolute left-0 top-10 w-[400px] rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_20px_45px_rgba(15,23,42,0.12)] transition-all duration-200",
                dropdownOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0 pointer-events-none"
              )}
            >
              <div className="mb-3 space-y-1">
                {featuredCalculators.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={`/${item.slug}`}
                      className="flex items-start gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-orange-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span className="mt-0.5 rounded-lg border border-slate-200 bg-white p-1.5">
                        <Icon className="h-4 w-4 text-orange-600" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-slate-900">{item.name}</span>
                        <span className="block text-xs text-slate-600">{item.description}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
              
              <div className="border-t border-slate-100 pt-3">
                <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                  Browse by Category
                </p>
                <div className="space-y-1">
                  {categoryRegistry.map((category) => {
                    const Icon = category.icon;
                    const count = calculatorItems.filter(item => item.category === category.title).length;
                    return (
                      <Link
                        key={category.slug}
                        href={`/${category.slug}`}
                        className="flex items-center justify-between rounded-xl px-2 py-2 transition-colors hover:bg-orange-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="mt-0.5 rounded-lg border border-slate-200 bg-white p-1.5">
                            <Icon className="h-4 w-4 text-orange-600" />
                          </span>
                          <span>
                            <span className="block text-sm font-medium text-slate-900">{category.title}</span>
                            <span className="block text-xs text-slate-600">{count} calculators</span>
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Link href="/#about" className="transition-colors hover:text-blue-700">
            About
          </Link>
        </nav>
        <div className="hidden sm:block">
          <Link href="/gpa-calculator" className={`inline-flex ${buttonVariants({ variant: "outline" })}`}>
            Try Calculator
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {mobileOpen ? (
        <div className="container-max border-t border-slate-200 py-4 md:hidden">
          <div className="space-y-2 text-sm text-slate-700">
            <Link href="/" className="block rounded-lg px-3 py-2 hover:bg-orange-50" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link
              href="/#about"
              className="block rounded-lg px-3 py-2 hover:bg-orange-50"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Calculators</p>
            {calculatorItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-orange-50"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="mt-0.5 h-4 w-4 text-orange-600" />
                  <span>
                    <span className="block font-medium text-slate-900">{item.title}</span>
                    <span className="block text-xs text-slate-600">{item.description}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
