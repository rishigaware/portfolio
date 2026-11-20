import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const ids = ['home', 'about', 'skills', 'work', 'process', 'experience', 'services', 'blog', 'faq', 'contact']

// Fixed vertical progress dots (extra-large screens only, where there is margin beside the content).
export default function SideDots() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-50% 0px -50% 0px' })
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <nav aria-label="Section progress" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex">
      {ids.map((id) => (
        <motion.a key={id} href={`#${id}`} aria-label={`Go to ${id}`} animate={{ height: active === id ? 22 : 8, backgroundColor: active === id ? '#d4ff3a' : 'rgba(255,255,255,0.3)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="block w-2 rounded-full" />
      ))}
    </nav>
  )
}
