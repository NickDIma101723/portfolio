"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadingAnimations({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const mainPanelRef = useRef<HTMLDivElement>(null);
  const subPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // Also lock html
    
    // Stop Lenis scrolling if it exists
    // @ts-ignore
    if (window.lenis) window.lenis.stop();
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = ""; // Restore scrolling
            document.documentElement.style.overflow = "";
            // Resume Lenis scrolling
            // @ts-ignore
            if (window.lenis) window.lenis.start();
            onComplete();
        }
      });

      const progressObj = { value: 0 };

      // 1. Counter appears
      tl.to(counterRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
      })
      
      // 2. Counter counts up (Slower)
      .to(progressObj, {
        value: 100,
        duration: 2.0,
        ease: "expo.inOut",
        onUpdate: () => {
            if (counterRef.current) {
                counterRef.current.textContent = Math.round(progressObj.value).toString();
            }
        }
      })
      .to(".loading-bar", {
        scaleX: 1,
        duration: 2.0,
        ease: "expo.inOut"
      }, "<")

      // 3. Counter fades out
      .to([counterRef.current, ".loading-bar", ".loading-text"], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in"
      })

      // 4. Main Curtain Reveal (Red)
      .to(mainPanelRef.current, {
        yPercent: -100,
        duration: 0.8, // Faster reveal
        ease: "expo.inOut"
      }, "-=0.1")

      // 5. Secondary Curtain Reveal (Dark) - Parallax effect
      .to(subPanelRef.current, {
        yPercent: -100,
        duration: 0.8, // Faster reveal
        ease: "expo.inOut"
      }, "-=0.6");

    }, containerRef);

    return () => {
        document.body.style.overflow = ""; // Ensure scroll is restored on unmount
        document.documentElement.style.overflow = "";
        // @ts-ignore
        if (window.lenis) window.lenis.start();
        ctx.revert();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto">
        
        {/* Secondary Panel (Darker Red) - Background Layer */}
        <div ref={subPanelRef} className="absolute top-0 left-0 w-full h-full bg-[#2a0507] z-10" />

        {/* Main Panel (Brand Red) - Foreground Layer */}
        <div ref={mainPanelRef} className="absolute top-0 left-0 w-full h-full bg-[#8c1921] z-20 flex flex-col items-center justify-center overflow-hidden">
             {/* Counter */}
             <div className="relative overflow-hidden flex flex-col items-center gap-4">
                <span ref={counterRef} className="block text-[12vw] font-black leading-none tracking-tighter text-[#fbbf24] opacity-0 translate-y-5">0</span>
                
                {/* Progress Bar */}
                <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden loading-bar opacity-0">
                    <div className="w-full h-full bg-[#fbbf24] origin-left scale-x-0 loading-bar" />
                </div>
                
                {/* Loading Text */}
                <span className="font-mono text-xs uppercase tracking-widest text-white/60 loading-text opacity-0">
                    Initializing System...
                </span>
             </div>
        </div>

    </div>
  );
}
