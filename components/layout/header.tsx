import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="container-max flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          ClearCalculate
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <Link href="/#categories" className="transition-colors hover:text-blue-700">
            Categories
          </Link>
          <Link href="/#featured" className="transition-colors hover:text-blue-700">
            Featured
          </Link>
          <Link href="/#faq" className="transition-colors hover:text-blue-700">
            FAQ
          </Link>
        </nav>
        <Link
          href="/gpa-calculator"
          className={`hidden sm:inline-flex ${buttonVariants({ variant: "outline" })}`}
        >
          Try GPA Calculator
        </Link>
      </div>
    </header>
  );
}
