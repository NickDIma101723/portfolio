"use client";

import { useRef, useEffect } from "react";
import Magnetic from "./Magnetic";
import TextReveal from "./TextReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fixedFooterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
        // Animate the fixed footer text letters
        const letters = fixedFooterRef.current?.querySelectorAll(".footer-letter");
        if (letters) {
            gsap.fromTo(letters, 
                { y: -200, opacity: 0, filter: "blur(20px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    stagger: 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "bottom bottom",
                        end: "+=100%",
                        scrub: true
                    }
                }
            );
        }

        gsap.from(".footer-element", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
            }
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative h-full w-full">
        
        {/* 1. Main Footer Content (Scrolls Up) */}
        <div ref={containerRef} className="relative z-10 bg-[#8c1921] w-full min-h-screen flex flex-col justify-between mb-[85vh] shadow-2xl">
            
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />
            
            <div className="flex-grow flex flex-col justify-center items-center z-10 relative py-20">
                <div className="text-center mb-12 relative">
                    <div className="text-[15vw] leading-[0.8] font-bold uppercase tracking-tighter mix-blend-difference text-white">
                        <TextReveal>Let&apos;s Talk</TextReveal>
                    </div>
                </div>
                
                <Magnetic>
                    <a href="mailto:nikodima2007@gmail.com" className="footer-element group relative w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/20 flex items-center justify-center overflow-hidden transition-colors duration-300 hover:border-white hover:bg-white hover:text-black">
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        <span className="relative z-10 text-xs md:text-sm uppercase tracking-widest text-white group-hover:text-black">Get in Touch</span>
                    </a>
                </Magnetic>
            </div>

            <div className="w-full px-6 md:px-10 pb-10 flex flex-col md:flex-row justify-between items-end text-xs uppercase tracking-widest text-white/60 gap-4 footer-element relative z-10">
                <div className="flex flex-col gap-2 w-full md:w-auto">
                    <span className="text-white mb-2">Socials</span>
                    <div className="flex gap-6">
                        <Magnetic>
                            <a href="#" className="hover:text-white transition-colors inline-block">Instagram</a>
                        </Magnetic>
                        <Magnetic>
                            <a href="#" className="hover:text-white transition-colors inline-block">Twitter</a>
                        </Magnetic>
                        <Magnetic>
                            <a href="#" className="hover:text-white transition-colors inline-block">LinkedIn</a>
                        </Magnetic>
                    </div>
                </div>
                
                <div className="flex flex-col gap-2 text-right w-full md:w-auto">
                    <span className="text-white mb-2">Version</span>
                    <span>2025 Edition</span>
                </div>
            </div>
        </div>

        {/* 2. Fixed Reveal Layer (NIKO Text) */}
        <div ref={fixedFooterRef} className="fixed bottom-0 left-0 w-full h-[85vh] -z-10 bg-[#8c1921] flex items-center justify-center overflow-hidden pb-0">
             {/* Darker Overlay for depth */}
             <div className="absolute inset-0 bg-black/20 pointer-events-none" />
             
             <div className="w-full flex justify-between px-4 md:px-10 leading-none select-none overflow-hidden">
                {"NIKO".split("").map((char, i) => (
                    <span key={i} className="footer-letter text-[35vw] font-black text-[#500a0e] opacity-0">
                        {char}
                    </span>
                ))}
             </div>
        </div>

    </div>
  );
}
