import { motion, useSpring } from 'motion/react'

// Wrapper that pulls its child toward the cursor.
export default function Magnetic({ children, strength = 0.35 }) {
  const x = useSpring(0, { stiffness: 200, damping: 15 })
  const y = useSpring(0, { stiffness: 200, damping: 15 })
  return (
    <motion.div style={{ x, y }} className="inline-block"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}>
      {children}
    </motion.div>
  )
}
