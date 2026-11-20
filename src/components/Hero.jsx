import { lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Magnetic from './Magnetic'
import Scramble from './Scramble'
import Floaters from './Floaters'
import HudOverlay from './HudOverlay'
import { site } from '../data/projects'
import { DUR, EASE } from '../motion'

// Three.js is loaded after first paint so the heading and text appear immediately (better Core Web Vitals / SEO).
const HeroScene = lazy(() => import('./HeroScene'))

const words = ['Building', 'Digital', 'Experiences', 'That', 'Move.']

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-12 pt-28 sm:justify-center sm:pb-16">
      <Suspense fallback={null}><HeroScene /></Suspense>
      <HudOverlay />
      <Floaters />
      <motion.div aria-hidden animate={{ x: [0, 60, -20, 0], y: [0, 40, 10, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-40 top-20 h-[32rem] w-[32rem] rounded-full bg-lime/15 blur-3xl" />
      <p className="relative z-10 mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-lime sm:mb-8 sm:text-xs sm:tracking-[0.3em]"><Scramble text={`${site.name} · ${site.role}`} /></p>
      {/* The only <h1> on the page: contains the name and role for search engines and screen readers */}
      <h1 className="relative z-10 max-w-4xl text-[clamp(2.25rem,8vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
        <span className="sr-only">{site.name}, {site.role}. Building digital experiences that move.</span>
        {/* Word-by-word mask reveal; the whole headline is in place within about 0.8s */}
        {words.map((w, wi) => (
          <span key={w} aria-hidden className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-top">
            <motion.span initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: DUR, ease: EASE, delay: wi * 0.05 }}
              className="inline-block">{w}</motion.span>
          </span>
        ))}
      </h1>
      <div className="relative z-10 mt-6 flex flex-col gap-6 sm:mt-10 md:flex-row md:items-end md:justify-between">
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: DUR, ease: EASE }} className="max-w-md text-base text-white/70">
          I’m {site.name}, a full-stack developer who designs and builds fast, accessible web apps with React and Node. (Placeholder intro: replace with your own.)
        </motion.p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Magnetic>
            <a data-cursor="Go" href="#work" className="group inline-flex items-center gap-2 min-h-[44px] rounded-full bg-lime px-6 py-3 text-sm font-semibold text-black">
              Explore My Work <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic>
            <a data-cursor="Hi" href="#contact" className="group inline-flex items-center gap-2 min-h-[44px] rounded-full border border-white/25 px-6 py-3 text-sm font-semibold">
              Let’s Talk <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
