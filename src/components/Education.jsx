import { motion } from 'motion/react'
import { GraduationCap, Award } from 'lucide-react'
import { education, certifications } from '../data/projects'
import SectionHead from './SectionHead'
import { rise } from '../motion'

function Col({ title, Icon, items, delay }) {
  return (
    <div>
      <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold"><Icon className="text-lime" /> {title}</h3>
      {items.map((it, i) => (
        <motion.div key={it.title} {...rise(delay + i * 0.08)}
          className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="font-mono text-xs text-lime">{it.dates}</p>
          <p className="mt-1 text-xl font-semibold">{it.title}</p>
          <p className="text-white/60">{it.org}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <SectionHead n="06" label="Education" title="Learning & credentials" />
      <div className="grid gap-12 md:grid-cols-2">
        <Col title="Education" Icon={GraduationCap} items={education} delay={0} />
        <Col title="Certifications" Icon={Award} items={certifications} delay={0.15} />
      </div>
    </section>
  )
}
