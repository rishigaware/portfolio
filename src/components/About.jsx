import { Download } from "lucide-react";
import { motion } from "motion/react";

import { stats, site } from "../data/projects";
import { rise } from "../motion";
import Counter from "./Counter";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16"
    >
      <motion.div
        {...rise()}
        className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-lime/40 to-pink/40 border border-white/10"
      >
        <div
          role="img"
          aria-label={`${site.name} profile`}
          className="flex flex-col items-center justify-center h-full bg-black/50 backdrop-blur-sm p-6 text-center"
        >
          <img
            src="/RG-logo.png"
            alt={site.name}
            className="h-28 w-auto object-contain drop-shadow-[0_0_25px_rgba(212,255,58,0.35)]"
          />
          <p className="mt-4 font-mono text-sm uppercase tracking-wider text-lime">
            {site.name}
          </p>
          <p className="text-xs text-white/70">{site.role}</p>
          <p className="mt-1 text-[11px] text-white/50">{site.location}</p>
        </div>
      </motion.div>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-lime">
          About me
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          About {site.name}
        </h2>
        <div className="mt-6 space-y-3 text-base text-white/70">
          <p>
            I’m {site.name}, a Full Stack Developer based in Vadodara, India,
            with 3 years of experience building scalable, enterprise-grade
            full-stack web applications. Proficient in React.js, Node.js,
            Express.js, and MongoDB, with strong expertise in REST API
            architecture, role-based access control, and compliance workflow
            automation.
          </p>
          <p>
            At GAMP Lifetech, I develop compliance and monitoring software for
            the pharmaceutical industry that reduced manual processing time by
            40%. I also specialize in integrating Generative AI (Gemini, Qdrant
            vector search) into practical systems and actively use AI coding
            agents to accelerate engineering velocity.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-2.5 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4"
            >
              <Counter
                to={s.value}
                className="text-3xl font-bold tabular-nums sm:text-4xl"
              />
              <p className="mt-1 text-xs text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
        <motion.a
          href={site.resume}
          download="Rushikesh_Gaware_Resume.pdf"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-medium transition-colors hover:border-lime hover:text-lime"
        >
          <Download size={18} /> Download resume
        </motion.a>
      </div>
    </section>
  );
}
