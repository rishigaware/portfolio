import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'

// Counts up from 0 to `to` when scrolled into view.
export default function Counter({ to, className = 'text-4xl font-bold tabular-nums' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref} className={className}>{n}</span>
}
