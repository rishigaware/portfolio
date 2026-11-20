// One motion language for the whole site. Change timing here, not in each component.
export const EASE = [0.16, 1, 0.3, 1]
export const DUR = 0.6

// Standard entrance: rise 24px and fade in, once, when scrolled into view.
// Usage: <motion.div {...rise()} /> or <motion.div {...rise(i * 0.08)} /> to stagger.
export const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: DUR, ease: EASE, delay },
})
