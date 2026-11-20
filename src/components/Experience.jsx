import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { experience } from '../data/projects'
import Counter from './Counter'
import { EASE, rise } from '../motion'

// Straight line so the role dots sit exactly on it.
const PATH = 'M20 0 L20 1000'

// Marker that fills in when the drawn line reaches it (and empties again when scrolling back up).
function Dot({ top, at, progress }) {
  const [on, setOn] = useState(() => progress.get() >= at)
  useMotionValueEvent(progress, 'change', (v) => setOn(v >= at))
  return (
    <span aria-hidden style={{ top }}
      className={`absolute left-4 z-10 grid h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-[#0a0a0a] transition-colors duration-300 md:left-7 ${on ? 'border-lime' : 'border-white/30'}`}>
      <motion.span initial={false} animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.3, ease: EASE }} className="h-1.5 w-1.5 rounded-full bg-lime" />
    </span>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const items = useRef([])
  const [marks, setMarks] = useState([])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 75%'] })

  // Where each role starts along the line, as pixels (for placement) and as a 0–1 fraction (for timing).
  useEffect(() => {
    const el = ref.current
    const measure = () => {
      const h = el.offsetHeight || 1
      setMarks(items.current.filter(Boolean).map((a) => ({ top: a.offsetTop + 8, at: (a.offsetTop + 8) / h })))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <h2 className="mb-12 text-[clamp(1.75rem,5vw,3rem)] font-bold leading-[1.1] tracking-tight">Experience</h2>
      <div ref={ref} className="relative pl-10 md:pl-20">
        <svg aria-hidden className="absolute left-0 top-0 h-full w-8 md:w-14" viewBox="0 0 40 1000" preserveAspectRatio="none">
          <path d={PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <motion.path d={PATH} fill="none" stroke="#d4ff3a" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ pathLength: scrollYProgress }} />
        </svg>
        {marks.map((m, i) => <Dot key={i} top={m.top} at={m.at} progress={scrollYProgress} />)}
        {experience.map((e, i) => (
          <motion.article key={e.role + e.org} ref={(el) => { items.current[i] = el }} {...rise()}
            className="mb-14 grid gap-4 last:mb-0 md:grid-cols-[1fr_auto]">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-lime">{e.dates}</p>
              <h3 className="mt-2 text-xl font-bold md:text-2xl">{e.role} <span className="text-white/40">/ {e.org}</span></h3>
              <ul className="mt-5 space-y-2 text-white/70">{e.points.map((p) => <li key={p}>— {p}</li>)}</ul>
              <ul className="mt-5 flex flex-wrap gap-2">{e.tags.map((t) => <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs">{t}</li>)}</ul>
            </div>
            <div className="md:text-right">
              <p className="text-4xl font-bold text-lime md:text-5xl"><Counter to={e.metric.value} className="tabular-nums" />{e.metric.suffix}</p>
              <p className="text-sm text-white/50">{e.metric.label}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
