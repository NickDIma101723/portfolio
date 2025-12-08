"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const projects = [
  {
    title: "Ethereal",
    category: "Web Design",
    year: "2024",
    src: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=2695&auto=format&fit=crop",
  },
  {
    title: "Vanguard",
    category: "Development",
    year: "2023",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: "Lumina",
    category: "Art Direction",
    year: "2023",
    src: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=2671&auto=format&fit=crop",
  },
  {
    title: "Apex",
    category: "Concept",
    year: "2022",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  },
  {
    title: "Horizon",
    category: "Immersive",
    year: "2022",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".project-item") as HTMLElement[];

      // Velocity-based Skew on the container or items?
      // Since we are scrolling the whole page, we can just watch the scroll velocity
      
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "left left",
        end: "right right",
        horizontal: true,
        onUpdate: (self) => {
            const skew = self.getVelocity() / -300;
            gsap.to(items, {
                skewX: skew,
                duration: 0.5,
                ease: "power3.out",
                overwrite: true
            });
        }
      });

      // Internal Image Parallax
      items.forEach((item) => {
        const img = item.querySelector(".project-img") as HTMLElement;
        if (img) {
            gsap.fromTo(img, 
                { scale: 1.2, x: -50 },
                { 
                    x: 50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "left right",
                        end: "right left",
                        scrub: true,
                        horizontal: true,
                    }
                }
            );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
        <section ref={sectionRef} className="relative w-full min-h-screen bg-neutral-950 text-white flex flex-col py-20">
        
        {/* Header */}
        <div className="w-full px-4 md:px-20 mb-20">
            <h2 className="text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-none">
            Selected <br /> Works
            </h2>
            <p className="mt-8 text-neutral-500 max-w-md text-lg">
                A collection of projects that showcase my passion for design and development.
            </p>
        </div>

        {/* Projects Vertical List */}
        <div className="flex flex-col gap-20 px-4 md:px-20">
            {projects.map((project, i) => (
                <div 
                    key={i} 
                    className="project-item w-full flex flex-col md:flex-row gap-8 md:gap-20 border-t border-neutral-800 pt-10 group hover:bg-neutral-900/30 transition-colors duration-500"
                >
                    <div className="md:w-1/3 flex flex-col justify-between">
                        <div>
                            <div className="text-sm font-mono text-neutral-500 mb-4">
                                0{i + 1} / {project.year}
                            </div>
                            <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-2">{project.title}</h3>
                            <p className="text-neutral-400 text-xl">{project.category}</p>
                        </div>
                        <Link href="#" className="hidden md:inline-block mt-8 text-sm uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors w-fit">
                            View Case Study
                        </Link>
                    </div>

                    <div className="md:w-2/3 relative aspect-video overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                        <Image
                            src={project.src}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 66vw"
                            loading="lazy"
                            className="project-img object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
}
