import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const bracket = 'absolute h-6 w-6 border-lime/70'

// Decorative HUD: corner brackets, a scan line and live-changing readouts. Purely visual.
export default function HudOverlay() {
  const [v, setV] = useState({ power: 98, scan: 42 })
  useEffect(() => {
    const id = setInterval(() => setV({ power: 96 + Math.floor(Math.random() * 4), scan: Math.floor(Math.random() * 100) }), 1100)
    return () => clearInterval(id)
  }, [])
  return (
    <div aria-hidden className="pointer-events-none absolute inset-3 z-[5] md:inset-6">
      <span className={`${bracket} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${bracket} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${bracket} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${bracket} bottom-0 right-0 border-b-2 border-r-2`} />
      <motion.div animate={{ top: ['0%', '100%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent" />
      <div className="absolute bottom-3 left-4 hidden space-y-1 font-mono text-[10px] uppercase tracking-widest text-lime/80 md:block">
        <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />Systems online</p>
        <p>Core power {v.power}%</p>
        <p>Scan {String(v.scan).padStart(2, '0')}</p>
      </div>
    </div>
  )
}
