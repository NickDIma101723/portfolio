"use client";

import { useRef } from "react";
import Magnetic from "./Magnetic";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="w-[100vw] h-screen flex-shrink-0 flex flex-col justify-between bg-neutral-950 text-white relative overflow-hidden snap-start py-10">
        
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        <div className="flex-grow flex flex-col justify-center items-center z-10 relative">
            <div className="text-center mb-12 relative">
                <h2 className="text-[15vw] leading-[0.8] font-bold uppercase tracking-tighter mix-blend-difference relative z-10">
                    Let's Talk
                </h2>
            </div>
            
            <Magnetic>
                <a href="mailto:hello@niko.dev" className="group relative w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/20 flex items-center justify-center overflow-hidden transition-colors duration-300 hover:border-white/100 hover:bg-white hover:text-black">
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <span className="relative z-10 text-xs md:text-sm uppercase tracking-widest">Get in Touch</span>
                </a>
            </Magnetic>
        </div>

        <div className="w-full px-6 md:px-10 flex flex-col md:flex-row justify-between items-end text-xs uppercase tracking-widest text-neutral-500 gap-4">
            <div className="flex flex-col gap-2 w-full md:w-auto">
                <span className="text-white mb-2">Socials</span>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>
            </div>
            
            <div className="flex flex-col gap-2 text-right w-full md:w-auto">
                <span className="text-white mb-2">Version</span>
                <span>2025 Edition</span>
            </div>
        </div>
    </section>
  );
}
