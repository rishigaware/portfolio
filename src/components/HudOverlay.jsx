import { motion } from "motion/react";
import { useEffect, useState } from "react";

const bracket = "absolute h-6 w-6 border-lime/70";

// Decorative HUD: corner brackets, a scan line and live-changing readouts. Purely visual.
export default function HudOverlay() {
  const [v, setV] = useState({ power: 98, scan: 42 });
  useEffect(() => {
    const id = setInterval(
      () =>
        setV({
          power: 96 + Math.floor(Math.random() * 4),
          scan: Math.floor(Math.random() * 100),
        }),
      1100,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-6 z-[5] hidden md:block"
    >
      <span className={`${bracket} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${bracket} bottom-0 right-0 border-b-2 border-r-2`} />
      <motion.div
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent"
      />
    </div>
  );
}
