import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../data/projects'

// Optional section. All entries are SAMPLE content until replaced with real, permitted quotes.
export default function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = testimonials.length
  const go = (d) => setI((c) => (c + d + n) % n)
  const t = testimonials[i]
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setI((c) => (c + 1) % n), 6000)
    return () => clearInterval(id)
  }, [paused, n])

  return (
    <section id="testimonials" className="mx-auto max-w-4xl px-6 py-16 md:py-24" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <p className="mb-2 text-center text-xs uppercase tracking-widest text-white/40">Sample content</p>
      <div className="relative min-h-[260px] rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center" aria-roledescription="carousel" aria-label="Testimonials">
        <Quote className="mx-auto mb-4 text-lime" />
        <AnimatePresence mode="wait">
          <motion.figure key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
            <blockquote className="text-lg sm:text-xl">“{t.quote}”</blockquote>
            <figcaption className="mt-6 text-white/60">{t.name}, {t.role}</figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className="mt-8 flex justify-center gap-4">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="rounded-full border border-white/20 p-2 hover:bg-white/10"><ChevronLeft /></button>
          <button onClick={() => setPaused((p) => !p)} className="rounded-full border border-white/20 px-4 text-sm hover:bg-white/10">{paused ? 'Resume' : 'Pause'}</button>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="rounded-full border border-white/20 p-2 hover:bg-white/10"><ChevronRight /></button>
        </div>
      </div>
    </section>
  )
}
