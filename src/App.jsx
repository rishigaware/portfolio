import { MotionConfig } from "motion/react";

import About from "./components/About";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import CtaBand from "./components/CtaBand";
import Cursor from "./components/Cursor";
import Education from "./components/Education";
import Experience from "./components/Experience";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HorizontalProjects from "./components/HorizontalProjects";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import Overlay from "./components/Overlay";
import ParallaxGrid from "./components/ParallaxGrid";
import Process from "./components/Process";
import Services from "./components/Services";
import SideDots from "./components/SideDots";
import Skills from "./components/Skills";
import Statement from "./components/Statement";
import Testimonials from "./components/Testimonials";
import useSmoothScroll from "./hooks/useSmoothScroll";

// Reorder or remove sections below. reducedMotion="user" respects the OS setting.
// Shared animation timing lives in src/motion.js.
export default function App() {
  useSmoothScroll();
  return (
    <MotionConfig reducedMotion="user">
      <Overlay />
      <SideDots />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Statement />
        <About />
        <Skills />
        <HorizontalProjects />
        <Process />
        <Experience />
        <Education />
        <Services />
        <ParallaxGrid />
        {/* <CtaBand /> */}
        <Testimonials />
        {/* <Blog /> */}
        {/* <FAQ /> */}
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
