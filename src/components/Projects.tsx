"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Aria",
    category: "Fitness App",
    year: "2025",
    src: "/aria.png",
    description: "A revolutionary approach to personal fitness tracking.",
    link: "https://aria-health.netlify.app/",
    imgClass: "opacity-80 grayscale-0"
  },
  {
    title: "Museum",
    category: "Web Design",
    year: "2025",
    src: "/museum.png",
    description: "A digital archive of modern art and culture.",
    link: "https://museuum.netlify.app/",
    imgClass: "opacity-80 grayscale-0"
  },
  {
    title: "Ethereal",
    category: "Web Design",
    year: "2024",
    src: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=2695&auto=format&fit=crop",
    description: "Redefining digital aesthetics through minimalism.",
  },
  {
    title: "Vanguard",
    category: "Development",
    year: "2023",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    description: "Next-generation financial platform interface.",
  },
  {
    title: "Lumina",
    category: "Art Direction",
    year: "2023",
    src: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=2671&auto=format&fit=crop",
    description: "Lighting the way for modern architectural brands.",
  },
  {
    title: "Apex",
    category: "Concept",
    year: "2022",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    description: "Pushing the boundaries of automotive web experiences.",
  },
  {
    title: "Horizon",
    category: "Immersive",
    year: "2022",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
    description: "Virtual reality landscapes for the digital explorer.",
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      
      cards.forEach((card, i) => {
        const nextCard = cards[i + 1];
        const cardInner = card.querySelector(".card-inner");
        const innerContent = card.querySelector(".inner-content");
        const bgImage = card.querySelector(".bg-image");
        const overlay = card.querySelector(".stack-overlay");

        // 1. Entry Animation (Text Reveal - Masked)
        gsap.from(card.querySelectorAll(".reveal-text"), {
            y: "100%",
            duration: 1.5,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        if (!nextCard || !cardInner) return;

        // 2. Stacking Animation (Exit)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: nextCard,
                start: "top bottom",
                end: "top top",
                scrub: true,
            }
        });

        tl.to(cardInner, {
            scale: 0.95,
            transformOrigin: "center top",
            ease: "linear",
            force3D: true,
        }, 0)
        .to(bgImage, {
            scale: 1.2, // Parallax zoom on exit
            ease: "linear",
        }, 0)
        .to(innerContent, {
            opacity: 0,
            y: -100, // Slide content up
            ease: "linear",
        }, 0)
        .to(overlay, {
            opacity: 0.8,
            ease: "linear",
        }, 0);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black relative z-30">
       
       {/* Header */}
       <div className="container mx-auto px-4 py-40 text-center relative z-10">
          <span className="text-[#fbbf24] font-mono text-sm uppercase tracking-[0.5em] mb-6 block">
            [ Selected Works ]
          </span>
          <h2 className="text-5xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.8]">
            Featured <br/> <span className="text-[#8c1921] stroke-white" style={{ WebkitTextStroke: "2px #8c1921" }}>Cases</span>
          </h2>
       </div>

       {/* Stacked Cards */}
       <div className="flex flex-col items-center w-full">
          {projects.map((project, i) => (
            <div 
              key={i} 
              className="project-card sticky top-0 w-full min-h-screen flex items-center justify-center overflow-hidden"
              style={{ 
                zIndex: i + 1, 
                marginBottom: i === projects.length - 1 ? 0 : "50vh",
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden"
              }}
            >
               <div className="card-inner group relative w-full h-full bg-[#050505] overflow-hidden border-t border-l border-r border-white/20 shadow-2xl will-change-transform" style={{ backfaceVisibility: "hidden" }}>
                  
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-image">
                      <Image 
                        src={project.src} 
                        alt={project.title} 
                        fill 
                        className={cn(
                            "object-cover opacity-50 grayscale transition-all duration-700 ease-out group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105",
                            project.imgClass
                        )}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 opacity-80" />
                  </div>

                  {/* Content */}
                  <div className="inner-content absolute inset-0 p-6 md:p-12 flex flex-col justify-between z-20">
                      
                      {/* Corner Accents */}
                      <div className="absolute top-8 left-8 w-24 h-24 border-l-4 border-t-4 border-white/30 group-hover:border-[#fbbf24] transition-colors duration-500 reveal-text" />
                      <div className="absolute top-8 right-8 w-24 h-24 border-r-4 border-t-4 border-white/30 group-hover:border-[#fbbf24] transition-colors duration-500 reveal-text" />
                      <div className="absolute bottom-8 left-8 w-24 h-24 border-l-4 border-b-4 border-white/30 group-hover:border-[#fbbf24] transition-colors duration-500 reveal-text" />
                      <div className="absolute bottom-8 right-8 w-24 h-24 border-r-4 border-b-4 border-white/30 group-hover:border-[#fbbf24] transition-colors duration-500 reveal-text" />

                      {/* Top Bar */}
                      <div className="flex justify-between items-start reveal-text">
                          <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 backdrop-blur-md border border-white/10">
                                <span className="w-2 h-2 bg-[#fbbf24] animate-pulse" />
                                <span className="text-[#fbbf24] font-mono text-sm uppercase tracking-widest">
                                    CASE_0{i + 1}
                                </span>
                              </div>
                              <span className="text-white/60 font-mono text-xs uppercase tracking-widest pl-2">
                                  // {project.year} — {project.category}
                              </span>
                          </div>
                          
                          <div className="hidden md:flex flex-col items-end gap-1 font-mono text-xs text-white/40 uppercase tracking-widest">
                              <span>COORD: {40 + (i * 5)}°N, {70 - (i * 3)}°W</span>
                              <span>SEC: {["ALPHA", "BETA", "GAMMA", "DELTA"][i % 4]}</span>
                          </div>
                      </div>

                      {/* Center Title */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <div className="overflow-hidden">
                            <h3 className="reveal-text block text-[12vw] md:text-[14vw] font-black text-transparent uppercase tracking-tighter leading-none transition-all duration-700 ease-out group-hover:scale-110" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}>
                                {project.title}
                            </h3>
                          </div>
                          <h3 className="absolute text-[12vw] md:text-[14vw] font-black text-white uppercase tracking-tighter leading-none transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-110">
                            {project.title}
                          </h3>
                      </div>

                      {/* Bottom Content */}
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 reveal-text">
                          <div className="max-w-xl bg-black/40 backdrop-blur-md p-6 border border-white/10">
                            <p className="text-xl md:text-3xl text-white font-light leading-tight mb-4">
                                {project.description}
                            </p>
                            <div className="h-1 w-20 bg-[#fbbf24] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                          </div>
                          
                          {project.link ? (
                            <Link href={project.link} target="_blank" className="group/btn relative cursor-pointer overflow-hidden border border-white/20 bg-black/20 px-8 py-4 backdrop-blur-sm transition-all duration-300 hover:border-[#fbbf24]">
                                {/* Sliding Background */}
                                <div className="absolute inset-0 translate-y-full bg-[#fbbf24] transition-transform duration-300 ease-out group-hover/btn:translate-y-0" />
                                
                                <div className="relative z-10 flex items-center gap-4">
                                    <span className="font-mono text-sm uppercase tracking-widest text-white transition-colors duration-300 group-hover/btn:text-black">
                                        Visit Live Site
                                    </span>
                                    {/* Arrow Animation */}
                                    <div className="relative h-4 w-4 overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover/btn:-translate-y-full group-hover/btn:translate-x-full">
                                            <svg className="h-4 w-4 text-white transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </div>
                                        <div className="absolute inset-0 flex -translate-x-full translate-y-full items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0">
                                            <svg className="h-4 w-4 text-black transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                          ) : (
                            <div className="group/btn relative cursor-pointer overflow-hidden border border-white/20 bg-black/20 px-8 py-4 backdrop-blur-sm transition-all duration-300 hover:border-[#fbbf24]">
                                {/* Sliding Background */}
                                <div className="absolute inset-0 translate-y-full bg-[#fbbf24] transition-transform duration-300 ease-out group-hover/btn:translate-y-0" />
                                
                                <div className="relative z-10 flex items-center gap-4">
                                    <span className="font-mono text-sm uppercase tracking-widest text-white transition-colors duration-300 group-hover/btn:text-black">
                                        Explore Case
                                    </span>
                                    {/* Arrow Animation */}
                                    <div className="relative h-4 w-4 overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover/btn:-translate-y-full group-hover/btn:translate-x-full">
                                            <svg className="h-4 w-4 text-white transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </div>
                                        <div className="absolute inset-0 flex -translate-x-full translate-y-full items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0">
                                            <svg className="h-4 w-4 text-black transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          )}
                      </div>
                  </div>

                  {/* Stacking Overlay (Performance optimized dimming) */}
                  <div className="stack-overlay absolute inset-0 bg-black opacity-0 z-40 pointer-events-none transition-opacity duration-300" />

               </div>
            </div>
          ))}
       </div>

       {/* Footer / More */}
       <div className="h-[50vh] flex items-center justify-center bg-black relative z-50">
          <Link href="/archive" className="group relative inline-flex items-center gap-4 px-12 py-6 border border-white/20 hover:border-[#fbbf24] transition-colors duration-300">
             <span className="text-white text-lg font-mono uppercase tracking-widest group-hover:text-[#fbbf24] transition-colors">View All Projects</span>
             <span className="w-3 h-3 bg-[#fbbf24] animate-pulse" />
          </Link>
       </div>

    </section>
  );
}
