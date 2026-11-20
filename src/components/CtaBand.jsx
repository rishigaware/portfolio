import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'motion/react'

// Tilted band whose text rows slide in opposite directions as you scroll past.
export default function CtaBand() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['10%', '-45%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-45%', '10%'])
  const row = 'whitespace-nowrap text-[clamp(1.75rem,6vw,3.5rem)] font-bold uppercase leading-[1.1]'
  return (
    <section ref={ref} aria-label="Let’s work together" className="-mx-[5%] my-12 w-[110%] -rotate-2 overflow-hidden bg-lime py-3 text-black">
      <motion.p style={{ x: x1 }} className={row}>Let’s work together ✶ Let’s work together ✶ Let’s work together</motion.p>
      <motion.p style={{ x: x2 }} className={`${row} text-transparent [-webkit-text-stroke:1px_#000]`}>Available for hire ✶ Available for hire ✶ Available for hire</motion.p>
    </section>
  )
}
