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
  { name: "DevOps / Cloud", category: "Infrastructure", img: "https://images.unsplash.com/photo-1607799275518-d58665d099db?q=80&w=1000&auto=format&fit=crop" },
];

export default function SkillsList() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-40 bg-neutral-950 text-white overflow-hidden cursor-none">
      
      {/* Floating Image Cursor */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
        style={{ opacity: activeSkill !== null ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        {SKILLS.map((skill, i) => (
            <div 
                key={i}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: activeSkill === i ? 1 : 0, transition: "opacity 0.3s ease" }}
            >
                <Image 
                    src={skill.img} 
                    alt={skill.name} 
                    fill 
                    className="object-cover rounded-lg grayscale contrast-125"
                />
            </div>
        ))}
      </div>

      <div className="px-6 md:px-20">
        <h2 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-12 border-b border-neutral-800 pb-4">
            [ Technical Arsenal ]
        </h2>

        <div className="flex flex-col">
            {SKILLS.map((skill, i) => (
                <div 
                    key={i}
                    className="group relative flex items-center justify-between py-12 border-b border-neutral-800 transition-all duration-300 hover:px-10 hover:bg-neutral-900/20"
                    onMouseEnter={() => setActiveSkill(i)}
                    onMouseLeave={() => setActiveSkill(null)}
                >
                    <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter group-hover:text-transparent group-hover:stroke-white transition-colors duration-300" style={{ WebkitTextStroke: activeSkill === i ? "1px white" : "0px" }}>
                        {skill.name}
                    </h3>
                    <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">
                        {skill.category}
                    </span>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
