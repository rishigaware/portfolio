import { useScroll, useTransform, useMotionValueEvent } from 'motion/react'

// Subtle page background tint that shifts as you scroll.
export default function BgShift() {
  const { scrollYProgress } = useScroll()
  const color = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ['#0a0a0a', '#0b110a', '#0a0a14', '#130a0e', '#0a0a0a'])
  useMotionValueEvent(color, 'change', (v) => { document.body.style.backgroundColor = v })
  return null
}
