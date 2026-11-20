import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// Custom cursor for fine pointers only (hidden on touch devices).
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [hover, setHover] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => {
      const el = e.target.closest?.('[data-cursor]')
      const link = e.target.closest?.('a,button')
      setLabel(el ? el.dataset.cursor : '')
      setHover(!!(el || link))
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null
  const size = label ? 84 : hover ? 56 : 14
  return (
    <motion.div aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] flex items-center justify-center rounded-full bg-lime font-mono text-[10px] font-bold uppercase text-black"
      style={{ x: sx, y: sy, translate: '-50% -50%' }}
      animate={{ width: size, height: size }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
      {label}
    </motion.div>
  )
}
