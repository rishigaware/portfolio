import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { articles } from '../data/projects'
import SectionHead from './SectionHead'
import { rise } from '../motion'

export default function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <SectionHead n="10" label="Blog" title="Latest writing" />
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((a, i) => (
          <motion.a key={a.title} href="#" data-cursor="Read" {...rise(i * 0.08)} className="group block">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl">
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-110" style={{ background: a.gradient }} role="img" aria-label="Article image placeholder" />
            </div>
            <p className="mt-5 font-mono text-xs uppercase tracking-widest text-lime">{a.tag} · {a.date} · {a.read}</p>
            <h3 className="mt-2 flex items-start justify-between gap-4 text-base font-bold">{a.title}
              <ArrowUpRight className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </h3>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
