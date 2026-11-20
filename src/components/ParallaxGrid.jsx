import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { projects } from '../data/projects'
import ProjectImage from './ProjectImage'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

// Columns drift gently at different speeds while scrolling; each tile wipes in once.
export default function ParallaxGrid() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y0 = useTransform(scrollYProgress, [0, 1], [30, -30])
  const y1 = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30])
  const cols = [[0, 3, y0, ''], [1, 4, y1, ''], [2, 5, y2, 'hidden md:flex']]
  return (
    <section ref={ref} id="gallery" className="mx-auto max-w-6xl overflow-hidden px-6 py-16 md:py-24">
      <SectionHead n="08" label="Gallery" title="Work in motion" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {cols.map(([a, b, y, cls], ci) => (
          <motion.div key={ci} style={{ y }} className={`flex flex-col gap-4 md:gap-6 ${cls}`}>
            {[a, b].map((idx) => {
              const p = projects[idx % projects.length]
              return (
                <figure key={idx} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Reveal className="h-full w-full" delay={ci * 0.08}>
                    <ProjectImage p={p} className="h-full w-full" />
                  </Reveal>
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-sm font-semibold">{p.title}</figcaption>
                </figure>
              )
            })}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
