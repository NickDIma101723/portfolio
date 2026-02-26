"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ScrambleText from "./ScrambleText";

const SKILLS = [
  { name: "React / Next.js", category: "Frontend", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop" },
  { name: "TypeScript", category: "Language", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop" },
  { name: "WebGL / Three.js", category: "Creative", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop" },
  { name: "Node.js / Backend", category: "Server", img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000&auto=format&fit=crop" },
  { name: "UI / UX Design", category: "Design", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop" },
  { name: "Motion / GSAP", category: "Animation", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop" },
];

export default function SkillsList() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      // Only move cursor on desktop
      if (window.matchMedia("(min-width: 768px)").matches) {
          gsap.to(cursorRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: "power2.out",
          });
      }
    };

    window.addEventListener("mousemove", moveCursor);

    gsap.registerPlugin(ScrollTrigger);

    // Entrance Animation
    const ctx = gsap.context(() => {
        
        // Trigger Header Scramble
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%",
            onEnter: () => setHeaderVisible(true)
        });

        // Line-by-line staggered reveal
        gsap.fromTo(".skill-item", 
            { 
               x: -50,
               opacity: 0,
               rotationX: 90,
               transformOrigin: "bottom center"
            },
            {
                x: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );
    }, containerRef);

    return () => {
        window.removeEventListener("mousemove", moveCursor);
        ctx.revert();
    };
  }, []);

  // Text Glitch Effect
  const triggerGlitch = (e: React.MouseEvent<HTMLElement>) => {
      const target = e.currentTarget.querySelector("h3");
      if (!target) return;
      
      const originalText = target.dataset.text || target.innerText;
      if (!target.dataset.text) target.dataset.text = originalText;
      
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";
      
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
            target.innerText = originalText;
        }
        iterations += 1 / 2; // Speed of decode
      }, 30);
  };

  return (
    <section ref={containerRef} className="relative w-full py-20 md:py-40 text-white overflow-hidden md:cursor-none">
      
      {/* Floating Image Cursor (Custom Design) */}
      <div 
        ref={cursorRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-0 md:left-0 h-[250px] pointer-events-none z-50 md:-translate-x-1/2 md:-translate-y-1/2 flex items-stretch shadow-[0_0_50px_rgba(140,25,33,0.5)]"
        style={{ opacity: activeSkill !== null ? 1 : 0, transition: "opacity 0.3s ease-out" }}
      >
        {/* Left Red Bar with Lines */}
        <div className="w-12 bg-[#8c1921] flex flex-col justify-center gap-3 px-2 border-r border-[#fbbf24]/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            {[...Array(8)].map((_, i) => (
                <div key={i} className="w-full h-[1px] bg-white/60" />
            ))}
        </div>

        {/* Image Container */}
        <div className="relative w-[350px] bg-black border-t border-b border-r border-[#fbbf24]/30">
            {SKILLS.map((skill, i) => (
                <div 
                    key={i}
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ 
                        opacity: activeSkill === i ? 1 : 0,
                        zIndex: activeSkill === i ? 10 : 1,
                        transition: `opacity ${activeSkill === i ? "0s" : "0.4s"} ease-out`
                    }}
                >
                    <Image 
                        src={skill.img} 
                        alt={skill.name} 
                        fill 
                        className="object-cover grayscale contrast-125 transition-transform duration-500 ease-out"
                        style={{ transform: activeSkill === i ? "scale(1)" : "scale(1.2)" }}
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8c1921]/50 to-transparent mix-blend-overlay" />
                </div>
            ))}
        </div>
      </div>

      <div className="px-6 md:px-20">
        <h2 className="text-xs font-mono text-[#fbbf24] uppercase tracking-widest mb-12 border-b border-white/20 pb-4">
            <ScrambleText text="[ Technical Arsenal ]" trigger={headerVisible} className="inline-block" />
        </h2>

        <div className="flex flex-col">
            {SKILLS.map((skill, i) => (
                <div 
                    key={i}
                    className="skill-item group relative flex items-center justify-between py-6 md:py-12 border-b border-white/20 transition-all duration-300 hover:bg-black z-20 cursor-pointer md:cursor-none"
                    onMouseEnter={(e) => {
                        setActiveSkill(i);
                        triggerGlitch(e);
                    }}
                    onMouseLeave={() => setActiveSkill(null)}
                    onClick={() => setActiveSkill(activeSkill === i ? null : i)}
                >
                    <h3 className={`text-2xl md:text-7xl font-black uppercase tracking-tighter transition-colors duration-300 ${activeSkill === i ? 'text-[#fbbf24]' : 'text-white group-hover:text-[#fbbf24]'}`}>
                        {skill.name}
                    </h3>
                    <span className={`text-xs md:text-sm font-mono uppercase tracking-widest transition-colors whitespace-nowrap ml-4 ${activeSkill === i ? 'text-[#fbbf24]' : 'text-white/90 md:text-white/60 group-hover:text-[#fbbf24]'}`}>
                        {skill.category}
                    </span>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
