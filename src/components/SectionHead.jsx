import { motion } from 'motion/react'
import { DUR, EASE } from '../motion'

// Numbered label with a line that draws in, plus a headline that rises from a mask.
export default function SectionHead({ n, label, title }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-lime">
        <span>{n}</span>
        <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: DUR, ease: EASE }} className="h-px w-24 origin-left bg-lime" />
        <span>{label}</span>
      </div>
      <h2 className="mt-5 overflow-hidden pb-2 text-[clamp(1.75rem,5vw,3rem)] font-bold leading-[1.1] tracking-tight">
        <motion.span initial={{ y: '105%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: DUR, ease: EASE }} className="block">{title}</motion.span>
      </h2>
    </div>
  )
}
