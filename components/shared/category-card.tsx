import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CategoryCardProps = {
  title: string;
  description: string;
};

export function CategoryCard({ title, description }: CategoryCardProps) {
  return (
    <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_38px_rgba(15,23,42,0.1)]">
      <CardHeader>
        <CardTitle className="text-slate-900 transition-colors group-hover:text-blue-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}
