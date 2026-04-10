import React, { Suspense, lazy, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import CursorSpotlight from "./components/ui/CursorSpotlight";
import { Skeleton } from "./components/ui/Skeleton";

gsap.registerPlugin(ScrollTrigger);

const About    = lazy(() => import("./components/sections/About"));
const Skills   = lazy(() => import("./components/sections/Skills"));
const Projects = lazy(() => import("./components/sections/Projects"));
const AITools  = lazy(() => import("./components/sections/AITools"));
const Contact  = lazy(() => import("./components/sections/Contact"));

function SectionFallback() {
  return (
    <div className="section-container">
      <Skeleton className="h-10 w-48 mb-4" />
      <Skeleton className="h-5 w-96 mb-16" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
      </div>
    </div>
  );
}

export default function App() {
  // GSAP scroll-driven section reveals
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]:not(#hero)");
    sections.forEach((sec) => {
      gsap.from(sec, {
        scrollTrigger: {
          trigger: sec,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="min-h-screen text-slate-100" style={{ background: "#020510" }}>
      <CursorSpotlight />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}><About /></Suspense>
        <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
        <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
        <Suspense fallback={<SectionFallback />}><AITools /></Suspense>
        <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
      </main>
      <Footer />
    </div>
  );
}
