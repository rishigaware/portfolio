import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const text = 'I don’t just build websites. I craft fast, accessible and memorable digital products that people actually enjoy using.'

function Word({ w, i, n, progress }) {
  const opacity = useTransform(progress, [i / n, (i + 1) / n], [0.15, 1])
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{w}</motion.span>
}

// Words light up one by one as you scroll.
export default function Statement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const words = text.split(' ')
  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="text-[clamp(1.3rem,3.6vw,2.25rem)] font-semibold leading-[1.3] tracking-tight">
        {words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} progress={scrollYProgress} />)}
      </p>
    </section>
  )
}
