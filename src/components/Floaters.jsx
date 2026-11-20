import { motion, useScroll, useTransform } from 'motion/react'

// Decorative shapes that move at different speeds as you scroll, plus a rotating badge.
export default function Floaters() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 800], [0, -220])
  const y2 = useTransform(scrollY, [0, 800], [0, 160])
  const rot = useTransform(scrollY, [0, 800], [0, 200])
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div style={{ y: y1, rotate: rot }} className="absolute right-[12%] top-[22%] hidden h-16 w-16 rounded-3xl border-2 border-lime sm:block md:h-20 md:w-20" />
      <motion.div style={{ y: y2 }} className="absolute right-[30%] top-[62%] hidden h-10 w-10 rounded-full bg-pink sm:block" />
      <motion.div style={{ y: y1, rotate: rot }} className="absolute left-[8%] top-[20%] hidden h-6 w-6 rotate-45 bg-lime/80 sm:block" />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }} className="absolute bottom-10 right-8 hidden md:block">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <defs><path id="c" d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" /></defs>
          <text fill="#d4ff3a" fontSize="13" letterSpacing="4" fontFamily="monospace"><textPath href="#c">SCROLL DOWN • SCROLL DOWN • </textPath></text>
        </svg>
      </motion.div>
    </div>
  )
}
