import { motion } from 'motion/react'
import { Download } from 'lucide-react'
import { stats, site } from '../data/projects'
import Counter from './Counter'
import { rise } from '../motion'

export default function About() {
  return (
    <section id="about" className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
      <motion.div {...rise()}
        className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-lime/40 to-pink/40">
        <div role="img" aria-label={`${site.name} profile photo placeholder`} className="grid h-full place-items-center text-white/60">Your photo goes here</div>
      </motion.div>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-lime">About me</p>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">About {site.name}</h2>
        <div className="mt-6 space-y-3 text-base text-white/70">
          <p>Placeholder: a paragraph about {site.name}’s background and what he enjoys building.</p>
          <p>Placeholder: your development philosophy, such as accessibility, performance, or readable code.</p>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <Counter to={s.value} />
              <p className="mt-1 text-xs text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
        <motion.a href={site.resume} download whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-medium">
          <Download size={18} /> Download resume (placeholder)
        </motion.a>
      </div>
    </section>
  )
}
