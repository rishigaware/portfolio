import { techRows } from '../data/projects'

const COPIES = 4 // enough repeats to fill very wide screens; the CSS loop shifts by one copy (25%)

// One ticker line. The first copy is the real list; the repeats are hidden from screen readers.
function Row({ items, reverse = false, dim = false }) {
  return (
    <div className={`marquee-track flex w-max ${reverse ? 'marquee-reverse' : ''}`}>
      {Array.from({ length: COPIES }, (_, k) => (
        <ul key={k} aria-hidden={k > 0} className="flex shrink-0 items-center">
          {items.map((t) => (
            <li key={t} className="flex items-center">
              <span className={`px-5 text-[clamp(1.5rem,4.5vw,2.75rem)] font-semibold leading-tight tracking-tight transition-colors duration-300 hover:text-lime md:px-8 ${dim ? 'text-white/30' : 'text-white'}`}>{t}</span>
              <span aria-hidden className={`h-1.5 w-1.5 shrink-0 rotate-45 md:h-2 md:w-2 ${dim ? 'bg-white/25' : 'bg-lime'}`} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

// Tech stack ticker: two lines drifting in opposite directions behind soft edge fades,
// with a fixed caption so the moving names have context. Pauses on hover; still for reduced motion.
export default function Marquee() {
  return (
    <section aria-label="Technologies" className="marquee border-y border-white/10 py-6 md:py-9">
      <div className="md:flex md:items-center">
        <p className="px-6 pb-4 text-sm leading-snug text-white/60 md:w-52 md:text-base md:shrink-0 md:border-r md:border-white/10 md:py-3 md:pb-3 md:pl-16 md:pr-8">
          Tools I<br className="hidden md:block" /> build with
        </p>
        <div className="min-w-0 flex-1 space-y-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] md:space-y-2">
          <Row items={techRows[0]} />
          <Row items={techRows[1]} reverse dim />
        </div>
      </div>
    </section>
  )
}
