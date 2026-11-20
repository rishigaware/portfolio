import { motion } from 'motion/react'
import { skillGroups } from '../data/projects'
import SectionHead from './SectionHead'
import { DUR, EASE } from '../motion'

const list = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const chip = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: DUR, ease: EASE } } }

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <SectionHead n="02" label="Skills" title="Skills & expertise" />
      <ul>
        {skillGroups.map((g, i) => (
          <motion.li key={g.title} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="group border-t border-white/15 py-6 last:border-b">
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-sm text-lime">0{i + 1}</span>
              <h3 className="text-xl font-bold transition-transform duration-500 group-hover:translate-x-3 md:text-3xl">{g.title}</h3>
            </div>
            <motion.ul variants={list} className="mt-5 flex flex-wrap gap-2 md:pl-14">
              {g.items.map((t) => (
                <motion.li key={t} variants={chip} whileHover={{ y: -4 }} className="rounded-full border border-white/20 px-4 py-1.5 text-sm transition-colors hover:bg-lime hover:text-black">{t}</motion.li>
              ))}
            </motion.ul>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
