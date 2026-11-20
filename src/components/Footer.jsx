import { motion } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { Letters } from './SplitText'
import { site } from '../data/projects'

export default function Footer() {
  return (
    <footer className="group relative overflow-hidden border-t border-white/10 px-6 pb-8 pt-16">
      <a href="#home" data-cursor="Top" aria-label={`${site.name} – back to top`} className="block text-center text-[clamp(2.5rem,11vw,7rem)] font-extrabold leading-none tracking-tighter">
        <Letters text="rishi.gaware" />
      </a>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-6">
        <nav aria-label="Footer" className="flex gap-6 text-sm text-white/70">
          <a href="#work" className="link-draw hover:text-white">Projects</a>
          <a href="#experience" className="link-draw hover:text-white">Experience</a>
          <a href="#contact" className="link-draw hover:text-white">Contact</a>
        </nav>
        <p className="text-sm text-white/50">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <motion.a href="#home" aria-label="Back to top" whileHover={{ y: -4 }} whileTap={{ scale: 0.9 }} className="rounded-full border border-white/20 p-3"><ArrowUp size={18} /></motion.a>
      </div>
    </footer>
  )
}
