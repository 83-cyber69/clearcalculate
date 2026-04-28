import { FAQAccordion } from "@/components/shared/faq-accordion";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title?: string;
  items: FAQItem[];
};

export function FAQSection({ title = "FAQ", items }: FAQSectionProps) {
  return (
    <article>
      <h2 className="mb-5 section-title">{title}</h2>
      <FAQAccordion items={items} />
    </article>
  );
}
