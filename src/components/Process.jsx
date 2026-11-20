import { motion } from 'motion/react'
import { processSteps } from '../data/projects'
import SectionHead from './SectionHead'
import { rise } from '../motion'

const colors = ['#d4ff3a', '#ff6b57', '#f4f4f0', '#a99bff']

// Cards stick and stack on top of each other while scrolling.
export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <SectionHead n="04" label="Process" title="How I work" />
      <div className="pb-10">
        {processSteps.map((s, i) => (
          <div key={s.title} className="sticky" style={{ top: `${96 + i * 26}px` }}>
            <motion.div {...rise()}
              style={{ background: colors[i] }} className="mb-8 grid gap-3 rounded-2xl p-6 text-black shadow-2xl md:grid-cols-[auto_1fr] md:gap-8 md:p-8">
              <span className="text-5xl font-extrabold leading-none md:text-5xl">0{i + 1}</span>
              <div className="self-center">
                <h3 className="text-2xl font-bold md:text-3xl">{s.title}</h3>
                <p className="mt-2 max-w-xl text-sm text-black/75 md:text-base">{s.text}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
