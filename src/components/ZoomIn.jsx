import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

// Section scales up, fades in and loses its rounded corners as it scrolls into view.
export default function ZoomIn({ children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1])
  const borderRadius = useTransform(scrollYProgress, [0, 1], [48, 0])
  return <motion.div ref={ref} style={{ scale, opacity, borderRadius }} className="origin-top overflow-hidden">{children}</motion.div>
}
