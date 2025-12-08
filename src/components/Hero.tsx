"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const leftTextRef = useRef<HTMLHeadingElement>(null);
  const rightTextRef = useRef<HTMLHeadingElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Apply filter after mount to avoid LCP delay
      gsap.set(imageRef.current, { filter: "url(#liquid)" });

      // Use quickTo for better performance
      const xToImage = gsap.quickTo(imageRef.current, "x", { duration: 1, ease: "power2.out" });
      const yToImage = gsap.quickTo(imageRef.current, "y", { duration: 1, ease: "power2.out" });
      const rotXToImage = gsap.quickTo(imageRef.current, "rotationX", { duration: 1, ease: "power2.out" });
      const rotYToImage = gsap.quickTo(imageRef.current, "rotationY", { duration: 1, ease: "power2.out" });

      const xToText = gsap.quickTo([leftTextRef.current, rightTextRef.current], "x", { duration: 1, ease: "power2.out" });
      const yToText = gsap.quickTo([leftTextRef.current, rightTextRef.current], "y", { duration: 1, ease: "power2.out" });

      let timeout: NodeJS.Timeout;

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY, movementX, movementY } = e;
        const speed = Math.sqrt(movementX ** 2 + movementY ** 2);
        
        // Animate turbulence base frequency based on speed
        gsap.to(turbulenceRef.current, {
            attr: { baseFrequency: `0.01 ${0.01 + speed * 0.002}` },
            duration: 0.2,
            overwrite: true
        });

        // Animate displacement scale based on speed
        gsap.to(displacementRef.current, {
            attr: { scale: Math.min(speed * 1.5, 50) },
            duration: 0.2,
            overwrite: true
        });

        // Parallax
        const x = (clientX / window.innerWidth - 0.5) * 40;
        const y = (clientY / window.innerHeight - 0.5) * 40;

        xToImage(x);
        yToImage(y);
        rotYToImage(x * 0.5);
        rotXToImage(-y * 0.5);

        // Text Parallax (Opposite direction)
        xToText(-x * 1.5);
        yToText(-y * 1.5);

        // Reset when mouse stops
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            gsap.to(turbulenceRef.current, {
                attr: { baseFrequency: "0 0" },
                duration: 1,
                ease: "power2.out"
            });
            gsap.to(displacementRef.current, {
                attr: { scale: 0 },
                duration: 1,
                ease: "power2.out"
            });
        }, 100);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        clearTimeout(timeout);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full relative flex justify-center items-center bg-neutral-950 overflow-hidden" style={{ perspective: "1000px" }}>
        
        {/* SVG Filter Definition */}
        <svg className="absolute w-0 h-0 pointer-events-none">
            <defs>
                <filter id="liquid">
                    <feTurbulence ref={turbulenceRef} type="fractalNoise" baseFrequency="0 0" numOctaves="1" result="noise" />
                    <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="noise" scale="0" />
                </filter>
            </defs>
        </svg>

        <div className="relative z-10 flex items-center justify-center gap-4 md:gap-12 w-full max-w-[90vw]">
            
            {/* Left Text */}
            <h1 ref={leftTextRef} className="text-[12vw] font-black uppercase tracking-tighter leading-none text-white z-20 will-change-transform">
                Imp
            </h1>

            {/* Center Image with Liquid Effect */}
            <div className="relative w-[25vw] aspect-[3/4] md:w-[20vw] z-10 will-change-transform">
                <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                <Image
                    ref={imageRef}
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=60&w=600&auto=format&fit=crop"
                    alt="Hero"
                    fill
                    sizes="(max-width: 768px) 30vw, 25vw"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    priority
                />
            </div>

            {/* Right Text */}
            <h1 ref={rightTextRef} className="text-[12vw] font-black uppercase tracking-tighter leading-none text-white z-20 will-change-transform">
                Act
            </h1>

        </div>

        <div className="absolute bottom-10 left-10 text-white/50 text-sm uppercase tracking-widest">
            Creative Developer
        </div>

        <div className="absolute bottom-10 right-10 text-white/50 text-sm uppercase tracking-widest text-right">
            Based in <br /> The Netherlands
        </div>

    </section>
  );
}
