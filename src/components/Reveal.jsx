import { motion, useReducedMotion } from 'motion/react'
import { EASE } from '../motion'

const mask = { hidden: { clipPath: 'inset(100% 0% 0% 0%)' }, show: { clipPath: 'inset(0% 0% 0% 0%)' } }
const zoom = { hidden: { scale: 1.15 }, show: { scale: 1 } }

// Image reveal: a mask wipes upward while the content settles from a slight zoom.
// The outer element is never clipped itself, so the in-view check stays reliable.
export default function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <motion.div variants={mask} transition={{ duration: 0.9, ease: EASE, delay }} className="h-full w-full overflow-hidden">
        <motion.div variants={zoom} transition={{ duration: 1.2, ease: EASE, delay }} className="h-full w-full">
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
