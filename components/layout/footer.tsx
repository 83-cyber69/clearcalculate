import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200/70 bg-white/70 backdrop-blur-sm">
      <div className="container-max grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="text-base font-semibold text-slate-900">
            <span className="mr-0.5">Clear</span>
            <span className="text-brand-orange">Calculate</span>
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Free online calculators built for students, professionals, and families.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
            <Link href="/about" className="hover:text-orange-700">
              About
            </Link>
            <Link href="/contact" className="hover:text-orange-700">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-orange-700">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-orange-700">
              Terms
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Top Tools</p>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <Link href="/gpa-calculator" className="block hover:text-orange-700">
              GPA Calculator
            </Link>
            <Link href="/take-home-pay-calculator" className="block hover:text-orange-700">
              Take Home Pay Calculator
            </Link>
            <Link href="/tdee-calculator" className="block hover:text-orange-700">
              TDEE Calculator
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">SEO</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Optimized metadata, schema markup, and XML sitemap included for visibility.
          </p>
        </div>
      </div>
    </footer>
  );
}
