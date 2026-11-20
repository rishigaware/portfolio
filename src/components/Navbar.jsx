import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { EASE } from '../motion'

const links = [['about', 'About'], ['work', 'Work'], ['process', 'Process'], ['experience', 'Experience'], ['blog', 'Blog'], ['contact', 'Contact']]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('about')
  const [hidden, setHidden] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  // Slide the bar away while scrolling down, bring it back on any scroll up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    if (y > prev && y > 200) setHidden(true)
    else if (y < prev) setHidden(false)
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  return (
    <motion.header animate={{ y: hidden && !open ? '-100%' : '0%' }} transition={{ duration: 0.35, ease: EASE }} onFocusCapture={() => setHidden(false)}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled ? 'border-white/10 bg-black/60 backdrop-blur-md' : 'border-transparent'}`}>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="text-lg font-bold tracking-tight" aria-label="Rishi Gaware – home">rishi<span className="text-lime">.gaware</span></a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="relative block px-4 py-2 text-sm text-white/70 transition-colors hover:text-white">
                {active === id && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10" />}
                <span className="relative">{label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden rounded-full bg-lime px-5 py-2 text-sm font-medium text-black md:block">Let’s talk</motion.a>
          <button className="rounded-full p-2 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-black/90 px-6 backdrop-blur-md md:hidden">
            {links.map(([id, label], i) => (
              <motion.li key={id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: i * 0.05 } }}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className="block py-4 text-2xl font-medium">{label}</a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <motion.div style={{ scaleX }} className="h-0.5 origin-left bg-gradient-to-r from-lime to-pink" />
    </motion.header>
  )
}
