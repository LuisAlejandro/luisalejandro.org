type FaqListProps = {
  items: { question: string; answer: string }[];
};

/** Questions as collapsible rows: the question at h3 size, a plus that turns. */
export function FaqList({ items }: FaqListProps) {
  return (
    <div className="site-faq-list">
      {items.map((item) => (
        <details key={item.question} className="site-faq-list__item">
          <summary>
            <span className="site-h3">{item.question}</span>
            <span aria-hidden="true" className="site-faq-list__icon" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
