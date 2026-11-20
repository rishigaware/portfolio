import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// Counter + curtain intro. Calls onDone once the curtain has lifted.
export default function Preloader({ onDone }) {
  const [n, setN] = useState(0)
  const [done, setDone] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setN((v) => {
      if (v >= 100) { clearInterval(id); setTimeout(() => setDone(true), 250); return 100 }
      return v + 4
    }), 40)
    return () => clearInterval(id)
  }, [])
  return (
    <AnimatePresence onExitComplete={onDone}>
      {!done && (
        <motion.div exit={{ y: '-100%' }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-lime text-black" role="status" aria-label="Loading">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em]">Loading portfolio</p>
            <p className="text-[clamp(4rem,16vw,8rem)] font-extrabold leading-none tabular-nums">{n}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
