"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const HOBBIES = [
  { id: "01", name: "Photography", desc: "Capturing the ephemeral moments of reality.", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop" },
  { id: "02", name: "Music", desc: "Sonic landscapes and auditory hallucinations.", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop" },
  { id: "03", name: "Travel", desc: "Lost in translation, found in motion.", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop" },
  { id: "04", name: "Gaming", desc: "Interactive narratives and digital reflexes.", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop" },
  { id: "05", name: "Cinema", desc: "The architecture of dreams and light.", img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop" },
];

export default function HobbiesAccordion() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full py-32 bg-neutral-950 relative z-10">
      <div className="px-6 md:px-20 mb-16 flex items-end justify-between border-b border-neutral-800 pb-6">
         <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Personal <span className="text-neutral-700">Archive</span>
         </h2>
         <p className="text-xs font-mono text-neutral-500 mb-2 hidden md:block uppercase tracking-widest">
            [ Select to Expand ]
         </p>
      </div>

      <div className="flex flex-col md:flex-row h-[80vh] w-full px-4 md:px-20 gap-2">
        {HOBBIES.map((hobby, index) => (
          <motion.div
            key={hobby.id}
            layout
            onClick={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
            className={cn(
              "relative h-[15vh] md:h-full overflow-hidden cursor-pointer rounded-none border-r border-neutral-800 last:border-r-0 md:border-none",
              "transition-colors duration-500"
            )}
            style={{
                flex: active === index ? 4 : 1,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          >
             {/* Background Image */}
             <div className="absolute inset-0 w-full h-full">
                <Image 
                    src={hobby.img} 
                    alt={hobby.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className={cn(
                        "object-cover transition-all duration-700 ease-out",
                        active === index ? "grayscale-0 scale-100" : "grayscale scale-110 opacity-30"
                    )}
                />
                <div className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    active === index ? "bg-black/20" : "bg-black/60"
                )} />
             </div>

             {/* Content Container */}
             <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between z-10">
                
                {/* Top Number */}
                <div className="flex justify-between items-start">
                    <span className={cn(
                        "text-xl font-mono font-bold transition-colors duration-300",
                        active === index ? "text-white" : "text-neutral-600"
                    )}>
                        {hobby.id}
                    </span>
                    
                    {/* Icon or Indicator */}
                    <motion.div 
                        animate={{ rotate: active === index ? 45 : 0 }}
                        className="text-white text-2xl opacity-50"
                    >
                        +
                    </motion.div>
                </div>

                {/* Bottom Text */}
                <div className="relative overflow-hidden">
                    {/* Active State Text */}
                    {active === index ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4 leading-[0.9]">
                                {hobby.name}
                            </h3>
                            <p className="text-neutral-300 text-lg md:text-xl max-w-md font-light leading-relaxed">
                                {hobby.desc}
                            </p>
                        </motion.div>
                    ) : (
                        /* Inactive State Text (Vertical on Desktop) */
                        <div className="absolute bottom-0 left-0 md:left-1/2 md:-translate-x-1/2 md:w-max">
                            <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-widest text-neutral-500 md:-rotate-90 md:origin-left whitespace-nowrap">
                                {hobby.name}
                            </h3>
                        </div>
                    )}
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
