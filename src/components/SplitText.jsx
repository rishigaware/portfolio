// Splits text into letters that lift on hover (use inside an element with the `group` class).
export function Letters({ text, className = '' }) {
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {[...text].map((c, i) => (
        <span key={i} aria-hidden className="inline-block whitespace-pre transition-transform duration-500 ease-out group-hover:-translate-y-[0.12em]" style={{ transitionDelay: `${i * 25}ms` }}>{c}</span>
      ))}
    </span>
  )
}
