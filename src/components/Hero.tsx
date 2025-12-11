"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const leftTextRef = useRef<HTMLHeadingElement>(null);
  const rightTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use quickTo for better performance
      const xToImage = gsap.quickTo(imageRef.current, "x", { duration: 1, ease: "power2.out" });
      const yToImage = gsap.quickTo(imageRef.current, "y", { duration: 1, ease: "power2.out" });
      const rotXToImage = gsap.quickTo(imageRef.current, "rotationX", { duration: 1, ease: "power2.out" });
      const rotYToImage = gsap.quickTo(imageRef.current, "rotationY", { duration: 1, ease: "power2.out" });

      const xToText = gsap.quickTo([leftTextRef.current, rightTextRef.current], "x", { duration: 1, ease: "power2.out" });
      const yToText = gsap.quickTo([leftTextRef.current, rightTextRef.current], "y", { duration: 1, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        // Disable parallax on mobile/tablet
        if (window.matchMedia("(max-width: 768px)").matches) return;

        const { clientX, clientY } = e;

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
      };

      window.addEventListener("mousemove", handleMouseMove);

      // ENTRANCE ANIMATION
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(imageRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      })
      .from(leftTextRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      }, "-=1.2")
      .from(rightTextRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      }, "-=1.2")
      .from(".hero-footer-text", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.5");

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-[100dvh] w-full relative flex justify-center items-center overflow-hidden bg-[#8c1921]" style={{ perspective: "1000px" }}>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-6 w-full max-w-[95vw]">
            
            {/* Left Text */}
            <h1 ref={leftTextRef} className="text-[35vw] md:text-[18vw] font-black uppercase tracking-tighter leading-none text-white z-10 will-change-transform select-none">
                Imp
            </h1>

            {/* Center Image */}
            <div className="relative w-[60vw] aspect-[3/4] md:w-[25vw] z-30 will-change-transform shadow-2xl -mx-0 md:-mx-10 my-4 md:my-0">
                <div className="absolute inset-0 bg-neutral-900" />
                <Image
                    ref={imageRef}
                    src="/Niko.png"
                    alt="Hero"
                    fill
                    sizes="(max-width: 768px) 60vw, 25vw"
                    className="object-cover transition-all duration-700"
                    priority
                />
            </div>

            {/* Right Text */}
            <h1 ref={rightTextRef} className="text-[35vw] md:text-[18vw] font-black uppercase tracking-tighter leading-none text-white z-10 will-change-transform select-none">
                Act
            </h1>

        </div>

        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white/50 text-[10px] md:text-sm uppercase tracking-widest hero-footer-text">
            Creative Developer
        </div>

        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-white/50 text-[10px] md:text-sm uppercase tracking-widest text-right hero-footer-text">
            Based in <br /> The Netherlands
        </div>

    </section>
  );
}
