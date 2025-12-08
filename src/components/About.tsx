"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import GrainOverlay from "./GrainOverlay";
import SkillsList from "./SkillsList";
import HobbiesAccordion from "./HobbiesAccordion";

// Simple Scramble Component for the "Stats"
const ScrambleText = ({ text, trigger }: { text: string, trigger?: boolean }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  
  useEffect(() => {
    if (!trigger) return;
    
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [text, trigger]);

  return <span>{display}</span>;
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      
      // 0. CHAOS BACKGROUND BLOBS
      gsap.to(".chaos-blob", {
        x: "random(-100, 100, 5)",
        y: "random(-100, 100, 5)",
        scale: "random(0.8, 1.5)",
        rotation: "random(-180, 180)",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1
      });

      // 1. HERO: ELASTIC EXPLOSION
      const words = gsap.utils.toArray(".hero-word", containerRef.current);
      gsap.fromTo(words, 
        { 
            y: 300, 
            x: () => gsap.utils.random(-100, 100), 
            rotation: () => gsap.utils.random(-45, 45),
            opacity: 0,
            scale: 0 
        },
        {
            y: 0,
            x: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 1.8,
            stagger: 0.05,
            ease: "elastic.out(1, 0.4)",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
            }
        }
      );

      // 2. PHILOSOPHY: HORIZONTAL SCROLL (PINNED)
      const sections = gsap.utils.toArray(".philosophy-item");
      const track = document.querySelector(".philosophy-track");
      
      if (track && sections.length > 0) {
          gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".philosophy-wrapper",
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                end: "+=3000", // Adjust scroll length
            }
          });
      }

      // 3. PERSONA: SHATTER REVEAL
      ScrollTrigger.create({
        trigger: ".persona-section",
        start: "top 60%",
        onEnter: () => setStatsVisible(true),
      });

      gsap.fromTo(".persona-title", 
        { y: 100, opacity: 0, skewY: 10 },
        { 
            y: 0, 
            opacity: 1, 
            skewY: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".persona-section",
                start: "top 70%"
            }
        }
      );

      gsap.fromTo(".persona-img-overlay", 
        { scaleY: 1 },
        { 
            scaleY: 0, 
            duration: 1.5, 
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: ".persona-section",
                start: "top 70%"
            }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Glitch Effect Function
  const triggerGlitch = (e: any) => {
      const target = e.target;
      const originalText = target.dataset.text || target.innerText;
      target.dataset.text = originalText; // Store original
      
      const chars = "!<>-_\\/[]{}—=+*^?#________";
      
      let iterations = 0;
      const interval = setInterval(() => {
        target.innerText = originalText
          .split("")
          .map((letter: string, index: number) => {
            if (index < iterations) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        
        if (iterations >= originalText.length) {
            clearInterval(interval);
            target.innerText = originalText; // Ensure clean finish
        }
        iterations += 1 / 2;
      }, 30);
  };

  return (
    <section ref={containerRef} className="relative w-full bg-neutral-950 text-white selection:bg-red-500 selection:text-black">
      
      {/* Background Wrapper - Handles Overflow for Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GrainOverlay />
          <div className="chaos-blob absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[100px] mix-blend-screen" />
          <div className="chaos-blob absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px] mix-blend-screen" />
          <div className="chaos-blob absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-purple-900/20 rounded-full blur-[80px] mix-blend-screen" />
      </div>
      
      {/* --- PART 1: THE MANIFESTO --- */}
      <div className="min-h-screen flex flex-col justify-center px-4 md:px-20 py-20 relative z-10" style={{ perspective: "1000px" }}>
        <div className="max-w-[95vw]">
            <h2 className="text-xs md:text-sm font-mono text-red-500 mb-8 tracking-[0.5em] uppercase opacity-80">
                // The Manifesto
            </h2>
            
            {/* Line 1 */}
            <div className="leading-[0.85] flex flex-wrap gap-x-4 md:gap-x-8">
                {"I DON'T JUST".split(" ").map((word, i) => (
                    <span 
                        key={i} 
                        className="hero-word inline-block text-[12vw] font-black tracking-tighter mix-blend-difference hover:text-red-500 transition-colors duration-300 cursor-none"
                        onMouseEnter={triggerGlitch}
                    >
                        {word}
                    </span>
                ))}
            </div>
            
            {/* Line 2 */}
            <div className="leading-[0.85] flex flex-wrap gap-x-4 md:gap-x-8">
                {"WRITE CODE.".split(" ").map((word, i) => (
                    <span 
                        key={i} 
                        className="hero-word inline-block text-[12vw] font-black tracking-tighter mix-blend-difference hover:text-red-500 transition-colors duration-300 cursor-none"
                        onMouseEnter={triggerGlitch}
                    >
                        {word}
                    </span>
                ))}
            </div>

            {/* Line 3 (Hollow) */}
            <div className="leading-[0.85] mt-4 flex flex-wrap gap-x-4 md:gap-x-8">
                {"I ENGINEER".split(" ").map((word, i) => (
                    <span 
                        key={i} 
                        className="hero-word inline-block text-[12vw] font-black tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.3)] hover:[-webkit-text-stroke:2px_white] hover:text-white transition-colors duration-500"
                        onMouseEnter={triggerGlitch}
                    >
                        {word}
                    </span>
                ))}
            </div>

             {/* Line 4 */}
             <div className="leading-[0.85] flex flex-wrap gap-x-4 md:gap-x-8">
                {"EMOTION.".split(" ").map((word, i) => (
                    <span 
                        key={i} 
                        className="hero-word inline-block text-[12vw] font-black tracking-tighter text-neutral-100"
                        onMouseEnter={triggerGlitch}
                    >
                        {word}
                    </span>
                ))}
            </div>
        </div>
        
        <div className="mt-20 max-w-xl ml-auto border-l border-neutral-800 pl-8">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-neutral-400">
                The web is crowded with average. I exist to destroy the mundane. 
                My work is a violent collision of <span className="text-white font-bold">aesthetic precision</span> and <span className="text-white font-bold">technical chaos</span>.
            </p>
        </div>
      </div>

      {/* --- PART 2: THE PHILOSOPHY (Horizontal Scroll) --- */}
      <div className="philosophy-wrapper h-screen w-full overflow-hidden bg-white text-black relative z-20">
        <div className="philosophy-track flex h-full w-[300vw]">
            
            {/* Item 1 */}
            <div className="philosophy-item w-screen h-full flex items-center justify-center gap-10 md:gap-20 px-4 md:px-20">
                <div className="flex flex-col gap-4">
                    <h2 className="text-[15vw] font-black tracking-tighter leading-none">OBSESSION</h2>
                    <span className="font-mono text-sm tracking-widest uppercase border-b border-black pb-2 w-max">01 — Focus</span>
                </div>
                <div className="w-[30vw] aspect-[3/4] relative bg-black overflow-hidden group">
                    <Image 
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop" 
                        alt="Focus" 
                        fill
                        sizes="(max-width: 768px) 50vw, 30vw"
                        loading="lazy"
                        className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" 
                    />
                </div>
            </div>

            {/* Item 2 */}
            <div className="philosophy-item w-screen h-full flex items-center justify-center gap-10 md:gap-20 px-4 md:px-20">
                <div className="flex flex-col gap-4">
                    <h2 className="text-[15vw] font-black tracking-tighter leading-none text-transparent [-webkit-text-stroke:2px_black] hover:text-black transition-colors duration-500">PRECISION</h2>
                    <span className="font-mono text-sm tracking-widest uppercase border-b border-black pb-2 w-max">02 — Code</span>
                </div>
                <div className="w-[40vw] aspect-video relative bg-black overflow-hidden group">
                    <Image 
                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" 
                        alt="Code" 
                        fill
                        sizes="(max-width: 768px) 80vw, 40vw"
                        loading="lazy"
                        className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" 
                    />
                </div>
            </div>

            {/* Item 3 */}
            <div className="philosophy-item w-screen h-full flex items-center justify-center gap-10 md:gap-20 px-4 md:px-20">
                <div className="flex flex-col gap-4">
                    <h2 className="text-[15vw] font-black tracking-tighter leading-none">IMPACT</h2>
                    <span className="font-mono text-sm tracking-widest uppercase border-b border-black pb-2 w-max">03 — Result</span>
                </div>
                <div className="w-[30vw] aspect-[3/4] relative bg-black overflow-hidden group">
                    <Image 
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop" 
                        alt="Impact" 
                        fill
                        sizes="(max-width: 768px) 50vw, 30vw"
                        loading="lazy"
                        className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" 
                    />
                </div>
            </div>

        </div>
      </div>

      {/* --- PART 3: THE PERSONA --- */}
      <div className="persona-section min-h-screen py-40 px-4 md:px-20 flex flex-col md:flex-row gap-20 items-center bg-neutral-950 relative z-10">
        
        {/* Image with Curtain Reveal */}
        <div className="w-full md:w-1/2 relative">
            <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" 
                    alt="Portrait" 
                    fill 
                    className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                />
                {/* The Curtain */}
                <div className="persona-img-overlay absolute inset-0 bg-red-600 origin-bottom z-10" />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-neutral-800 rounded-full animate-spin-slow flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
            </div>
        </div>

        {/* Content & Stats */}
        <div className="w-full md:w-1/2 flex flex-col gap-12">
            <div>
                <h3 className="persona-title text-6xl md:text-8xl font-bold uppercase leading-[0.9] mb-6">
                    The <br/> <span className="text-red-600">Alchemist</span>
                </h3>
                <p className="text-xl text-neutral-400 leading-relaxed max-w-md">
                    I am not a "developer". I am a problem solver who uses code as a weapon. 
                    I bridge the gap between the logical and the beautiful.
                </p>
            </div>
            
            <div className="grid grid-cols-1 gap-y-12 mt-10 border-t border-neutral-800 pt-10">
                
                {/* ROW 1: STATS */}
                <div className="grid grid-cols-2 gap-8">
                    <div className="group">
                        <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2 group-hover:text-red-500 transition-colors">
                            [ Coordinates ]
                        </h4>
                        <p className="text-xl md:text-2xl font-bold">
                            <ScrambleText text="The Netherlands" trigger={statsVisible} />
                        </p>
                    </div>
                    <div className="group">
                        <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2 group-hover:text-red-500 transition-colors">
                            [ Directive ]
                        </h4>
                        <p className="text-xl md:text-2xl font-bold text-white">
                            <ScrambleText text="Kill the Boring" trigger={statsVisible} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- PART 4: THE ARSENAL (SKILLS) --- */}
      <SkillsList />

      {/* --- PART 5: THE ARCHIVE (HOBBIES) --- */}
      <div className="w-full bg-neutral-950">
          <HobbiesAccordion />
      </div>

    </section>
  );
}
