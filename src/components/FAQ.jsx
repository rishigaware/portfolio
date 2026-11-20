import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus } from 'lucide-react'
import { faqs } from '../data/projects'
import SectionHead from './SectionHead'
import { EASE } from '../motion'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <SectionHead n="11" label="FAQ" title="Questions, answered" />
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} className="border-t border-white/15 last:border-b">
            <h3>
              <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-semibold md:text-lg">
                {f.q}
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0 rounded-full border border-white/25 p-2"><Plus size={20} /></motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
                  <p className="max-w-2xl pb-6 text-white/70">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </section>
  )
}
