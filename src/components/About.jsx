import { Download, MapPin } from "lucide-react";
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
        className="group relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-lime/30 via-white/[0.03] to-pink/30 p-1 shadow-2xl transition-all duration-500 hover:border-lime/40"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-neutral-900">
          <img
            src={site.photo || "/profile.png"}
            alt={`${site.name} profile portrait`}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          {/* Profile details overlay */}
          <div className="absolute inset-x-0 bottom-0 p-5 text-left">
            <p className="font-mono text-xs uppercase tracking-wider text-lime">
              {site.name}
            </p>
            <p className="text-sm font-medium text-white/90">{site.role}</p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-white/60">
              <MapPin size={12} className="text-lime" />
              <span>{site.location}</span>
            </div>
          </div>
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
