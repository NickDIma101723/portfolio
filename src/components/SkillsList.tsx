"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

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

    // Entrance Animation
    const ctx = gsap.context(() => {
        gsap.fromTo(".skill-item", 
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.05,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                }
            }
        );
    }, containerRef);

    return () => {
        window.removeEventListener("mousemove", moveCursor);
        ctx.revert();
    };
  }, []);

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
            [ Technical Arsenal ]
        </h2>

        <div className="flex flex-col">
            {SKILLS.map((skill, i) => (
                <div 
                    key={i}
                    className="skill-item group relative flex items-center justify-between py-6 md:py-12 border-b border-white/20 transition-all duration-300 hover:bg-black z-20 cursor-pointer md:cursor-none"
                    onMouseEnter={() => setActiveSkill(i)}
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
