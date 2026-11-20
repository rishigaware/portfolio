export default function ProjectImage({ p, className = '' }) {
  if (p.image) return <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" className={`object-cover ${className}`} />
  return (
    <div role="img" aria-label={`${p.title} placeholder image`} className={`grid place-items-center ${className}`} style={{ background: p.gradient }}>
      <span className="text-6xl font-bold opacity-30">{p.title[0]}</span>
    </div>
  )
}
