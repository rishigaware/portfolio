import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, Github } from 'lucide-react'
import { projects } from '../data/projects'
import useMediaQuery from '../hooks/useMediaQuery'
import ProjectImage from './ProjectImage'
import Reveal from './Reveal'

const pad = (n) => String(n).padStart(2, '0')
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

// Project slide: the screenshot sits in a browser-window frame, with the write-up beside it
// on large screens and below it on phones and tablets.
function Card({ p }) {
  return (
    <article className="group flex w-[84vw] max-w-[440px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] sm:w-[68vw] sm:max-w-[560px] lg:h-[min(60vh,520px)] lg:w-[min(76vw,1040px)] lg:max-w-none lg:flex-row-reverse">
      <div className="p-3 lg:w-[58%] lg:p-4">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black">
          <div aria-hidden className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="ml-2 truncate rounded-full bg-white/[0.06] px-3 py-0.5 text-[11px] text-white/50">{slug(p.title)}</span>
          </div>
          <Reveal className="aspect-[16/10] min-h-0 lg:aspect-auto lg:flex-1">
            <div className="h-full w-full scale-105 transition-transform duration-700 ease-out group-hover:scale-100">
              <ProjectImage p={p} className="h-full w-full" />
            </div>
          </Reveal>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-6 p-5 pt-3 lg:p-8 lg:pr-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight lg:text-4xl">{p.title}</h3>
          <p className="mt-3 max-w-sm text-sm text-white/70 lg:text-base">{p.description}</p>
          <ul aria-label="Built with" className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((t) => <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80">{t}</li>)}
          </ul>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={p.link} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lime px-5 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5">
            Live demo <ArrowUpRight size={16} aria-hidden />
          </a>
          <a href={p.repo} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold transition-colors duration-300 hover:border-white/50">
            <Github size={16} aria-hidden /> Source
          </a>
        </div>
      </div>
    </article>
  )
}

function Head({ current, n, hint }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 px-6 lg:mb-8 lg:px-16">
      <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold leading-[1.1] tracking-tight">Selected work</h2>
      <p aria-hidden className="shrink-0 pb-1 text-sm tabular-nums text-white/50">
        <span className="mr-3 hidden sm:inline">{hint}</span>
        <span className="text-white">{pad(current)}</span> / {pad(n)}
      </p>
    </div>
  )
}

function Bar({ progress }) {
  return (
    <div aria-hidden className="mx-6 mt-6 h-px bg-white/15 lg:mx-16 lg:mt-8">
      <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-lime" />
    </div>
  )
}

const indexAt = (v, n) => Math.min(n, Math.max(1, Math.round(v * (n - 1)) + 1))

// Large screens: the section pins and vertical scrolling moves the slides sideways, one pixel per pixel.
function Pinned() {
  const ref = useRef(null)
  const track = useRef(null)
  const [travel, setTravel] = useState(0)
  const [current, setCurrent] = useState(1)
  const n = projects.length
  const { scrollYProgress } = useScroll({ target: ref })
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel])
  useMotionValueEvent(scrollYProgress, 'change', (v) => setCurrent(indexAt(v, n)))

  useEffect(() => {
    const measure = () => setTravel(Math.max(0, track.current.scrollWidth - document.documentElement.clientWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  return (
    <section id="work" ref={ref} aria-label="Selected projects" className="relative" style={{ height: `calc(100vh + ${travel}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
        <Head current={current} n={n} hint="Keep scrolling" />
        <motion.div ref={track} style={{ x }} className="flex w-max gap-6 px-16 will-change-transform">
          {projects.map((p) => <Card key={p.id} p={p} />)}
        </motion.div>
        <Bar progress={scrollYProgress} />
      </div>
    </section>
  )
}

// Phones, tablets and reduced-motion: a normal swipeable row that snaps to each slide. No pinning.
function Swipe() {
  const scroller = useRef(null)
  const [current, setCurrent] = useState(1)
  const n = projects.length
  const { scrollXProgress } = useScroll({ container: scroller })
  useMotionValueEvent(scrollXProgress, 'change', (v) => setCurrent(indexAt(v, n)))

  return (
    <section id="work" aria-label="Selected projects" className="py-16 md:py-24">
      <Head current={current} n={n} hint="Swipe" />
      <div ref={scroller} tabIndex={0} role="group" aria-label="Projects, scroll sideways"
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto overscroll-x-contain px-6">
        {projects.map((p) => <Card key={p.id} p={p} />)}
      </div>
      <Bar progress={scrollXProgress} />
    </section>
  )
}

export default function HorizontalProjects() {
  const pinned = useMediaQuery('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
  return pinned ? <Pinned /> : <Swipe />
}
