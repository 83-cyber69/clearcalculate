type CalculatorHeroProps = {
  eyebrow: string;
  title: string;
};

export function CalculatorHero({ eyebrow, title }: CalculatorHeroProps) {
  return (
    <section className="mb-8">
      <p className="mb-4 inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
    </section>
  );
}
