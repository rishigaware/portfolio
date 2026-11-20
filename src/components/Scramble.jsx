import { useEffect, useState } from 'react'

const CHARS = '!<>-_\\/[]{}=+*^?#'

// Text scramble: characters cycle through random glyphs, then settle one by one.
export default function Scramble({ text, className = '' }) {
  const [out, setOut] = useState(text)
  useEffect(() => {
    let frame = 0
    const total = text.length * 3 + 6
    const id = setInterval(() => {
      frame++
      setOut(text.split('').map((c, i) => (c === ' ' || frame > i * 3 + 6 ? c : CHARS[Math.floor(Math.random() * CHARS.length)])).join(''))
      if (frame >= total) { clearInterval(id); setOut(text) }
    }, 40)
    return () => clearInterval(id)
  }, [text])
  return <span className={className} aria-label={text}><span aria-hidden>{out}</span></span>
}
