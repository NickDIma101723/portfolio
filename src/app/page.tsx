"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";
import LoadingAnimations from "@/components/LoadingAnimations";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Marquee from "@/components/Marquee";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SmoothScroll>
      <main className="bg-neutral-950 min-h-screen w-full flex flex-col cursor-none">
        <CustomCursor />
        {isLoading && <LoadingAnimations onComplete={() => setIsLoading(false)} />}

        <Navbar />
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
