import { motion } from 'motion/react'
import { Layers, Server, Palette, Gauge, Rocket, Globe } from 'lucide-react'
import { services } from '../data/projects'
import { rise } from '../motion'

const icons = [Globe, Layers, Server, Palette, Gauge, Rocket]
const spans = ['md:col-span-4 md:row-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-3', 'md:col-span-3', 'md:col-span-2']

// Bento tile with a pointer-following spotlight border and glow.
function Tile({ s, Icon, span }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <motion.div onPointerMove={onMove} {...rise()}
      className={`group relative overflow-hidden rounded-2xl bg-[#111] p-6 ${span}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(260px circle at var(--x,50%) var(--y,50%), #d4ff3a, transparent 70%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
        }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(400px circle at var(--x,50%) var(--y,50%), rgba(212,255,58,0.08), transparent 70%)' }} />
      <div className="relative inline-flex rounded-2xl bg-white/10 p-3 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"><Icon /></div>
      <h3 className="relative mt-5 text-lg font-bold">{s.title}</h3>
      <div className="relative grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
        <p className="min-h-0 overflow-hidden text-sm text-white/70">{s.text}</p>
      </div>
    </motion.div>
  )
}

// Optional section: delete the <Services /> line in App.jsx to remove it.
export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <h2 className="mb-12 text-[clamp(1.75rem,5vw,3rem)] font-bold leading-[1.1] tracking-tight">What I do</h2>
      <div className="grid auto-rows-auto gap-4 md:auto-rows-[170px] md:grid-cols-6">
        {services.map((s, i) => <Tile key={s.title} s={s} Icon={icons[i]} span={spans[i]} />)}
      </div>
    </section>
  )
}
