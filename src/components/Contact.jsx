import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useAnimate, useReducedMotion } from 'motion/react'
import { Copy, Check, Github, Linkedin, Loader2, Mail } from 'lucide-react'
import { site } from '../data/projects'

const SHAKE = { x: [0, -6, 6, -4, 4, 0] }

// One labelled field. Shakes briefly each time a submit attempt leaves it invalid,
// and links its error text to the input for screen readers.
function Field({ id, label, error, shake, children }) {
  const [scope, animate] = useAnimate()
  const reduced = useReducedMotion()
  useEffect(() => {
    if (shake && error && !reduced) animate(scope.current, SHAKE, { duration: 0.35 })
    // Runs once per submit attempt (shake counter), not on every error change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shake])
  return (
    <div ref={scope}>
      <label htmlFor={id} className="mb-1 block text-sm text-white/70">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1 text-sm text-pink">{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('idle') // idle | loading | sent | demo
  const [errors, setErrors] = useState({})
  const [shake, setShake] = useState(0)

  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* clipboard unavailable */ }
  }

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = Object.fromEntries(new FormData(form))
    const err = {}
    if (!f.name.trim()) err.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) err.email = 'Enter a valid email address.'
    if (f.message.trim().length < 10) err.message = 'Write at least 10 characters.'
    setErrors(err)
    const first = Object.keys(err)[0]
    if (first) { setShake((n) => n + 1); form.elements[first].focus(); return }
    setStatus('loading')
    // TODO: connect a real service (Formspree, EmailJS, your own API) and send `f` here.
    // When the request succeeds, call setStatus('sent') and form.reset(): the button then shows the check mark.
    // Until then the form stays honest and says nothing was sent.
    await new Promise((r) => setTimeout(r, 800))
    setStatus('demo')
  }

  const field = 'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none transition-colors focus:border-lime aria-[invalid=true]:border-pink'
  const aria = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-error` : undefined })

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mb-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white/70">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
        </span>
        Available for new projects
      </div>
      <h2 className="text-[clamp(2rem,6vw,3.75rem)] font-bold leading-[1.05] tracking-tight">
        Have a project<br />
        <span className="text-lime">in mind?</span>
      </h2>
      <p className="mt-4 max-w-xl text-white/70">Get in touch with {site.name} about a project, a role, or just to say hello.</p>
      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <button onClick={copy} data-cursor="Copy" aria-label="Copy email address" className="inline-flex min-h-[44px] items-center gap-3 break-all text-left text-lg font-medium hover:text-lime md:text-xl transition-colors">
            <Mail size={22} className="text-lime shrink-0" />
            <span>{site.email}</span>
            {copied ? <Check size={20} className="text-lime shrink-0" /> : <Copy size={20} className="text-white/50 shrink-0" />}
          </button>
          <p className="mt-2 text-sm text-white/50" aria-live="polite">{copied ? 'Copied to clipboard' : 'Click to copy'}</p>
          <div className="mt-8 flex gap-4">
            <a href={`mailto:${site.email}`} aria-label={`Send email to ${site.name}`} className="rounded-full border border-white/20 p-3 transition-colors hover:border-lime hover:bg-white/10 hover:text-lime"><Mail size={22} /></a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on GitHub`} className="rounded-full border border-white/20 p-3 transition-colors hover:border-lime hover:bg-white/10 hover:text-lime"><Github size={22} /></a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on LinkedIn`} className="rounded-full border border-white/20 p-3 transition-colors hover:border-lime hover:bg-white/10 hover:text-lime"><Linkedin size={22} /></a>
          </div>
        </div>
        <form onSubmit={submit} noValidate className="space-y-4">
          {[['name', 'Name', 'text'], ['email', 'Email', 'email']].map(([k, label, type]) => (
            <Field key={k} id={k} label={label} error={errors[k]} shake={shake}>
              <input id={k} name={k} type={type} className={field} {...aria(k)} />
            </Field>
          ))}
          <Field id="message" label="Message" error={errors.message} shake={shake}>
            <textarea id="message" name="message" rows={4} className={field} {...aria('message')} />
          </Field>
          <motion.button type="submit" disabled={status === 'loading' || status === 'sent'} data-cursor="Send" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
            className="inline-flex min-w-[11rem] items-center justify-center gap-2 rounded-full bg-lime px-8 py-3 font-semibold text-black disabled:opacity-80">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={status === 'demo' ? 'idle' : status} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="inline-flex items-center gap-2">
                {status === 'loading' && <><Loader2 size={18} aria-hidden className="animate-spin" /> Sending…</>}
                {status === 'sent' && <><Check size={18} aria-hidden /> Message sent</>}
                {(status === 'idle' || status === 'demo') && 'Send message'}
              </motion.span>
            </AnimatePresence>
          </motion.button>
          <AnimatePresence>
            {status === 'demo' && (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="text-sm text-white/70">
                Form checked, but no backend is connected yet, so nothing was sent. Email me directly at {site.email}.
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  )
}
