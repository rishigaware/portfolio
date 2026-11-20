import { useEffect } from 'react'

// Film grain over the page plus a soft glow that follows the pointer (transform only, no re-renders).
export default function Overlay() {
  useEffect(() => {
    const glow = document.getElementById('glow')
    const move = (e) => { glow.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)` }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])
  return (
    <>
      <div aria-hidden className="grain pointer-events-none fixed -inset-[10%] z-[55]" />
      <div id="glow" aria-hidden className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[600px] w-[600px] [@media(hover:hover)_and_(pointer:fine)]:block rounded-full bg-[radial-gradient(circle,rgba(212,255,58,0.10),transparent_60%)]" />
    </>
  )
}
