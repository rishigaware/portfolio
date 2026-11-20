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
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:flex-wrap sm:justify-between sm:gap-6 sm:text-left">
        <nav aria-label="Footer" className="flex gap-6 text-sm text-white/70">
          {[['work', 'Projects'], ['experience', 'Experience'], ['contact', 'Contact']].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="inline-flex min-h-[44px] items-center hover:text-white"><span className="link-draw">{label}</span></a>
          ))}
        </nav>
        <p className="text-sm text-white/50">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <motion.a href="#home" aria-label="Back to top" whileHover={{ y: -4 }} whileTap={{ scale: 0.9 }} className="grid h-[44px] w-[44px] place-items-center rounded-full border border-white/20"><ArrowUp size={18} /></motion.a>
      </div>
    </footer>
  )
}
