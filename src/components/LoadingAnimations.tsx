"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadingAnimations({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      const progressObj = { value: 0 };

      // Initial State
      gsap.set(lineRef.current, { scaleX: 0 });

      // 1. Line expands horizontally
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: "expo.inOut"
      })
      
      // 2. Counter counts up
      .to(progressObj, {
        value: 100,
        duration: 0.8,
        ease: "power1.inOut",
        onUpdate: () => {
            if (counterRef.current) {
                counterRef.current.textContent = Math.round(progressObj.value).toString();
            }
        }
      })

      // 3. Counter fades out
      .to(counterRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: "power2.in"
      })

      // 4. The Split Reveal (Horizon Line opens)
      .to(".loader-top", {
        yPercent: -100,
        duration: 0.6,
        ease: "power4.inOut"
      }, "split")
      .to(".loader-bottom", {
        yPercent: 100,
        duration: 0.6,
        ease: "power4.inOut"
      }, "split")
      
      // 5. Line fades out during split
      .to(lineRef.current, {
        opacity: 0,
        duration: 0.2
      }, "split");

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none">
        
        {/* Top Half */}
        <div className="loader-top absolute top-0 left-0 w-full h-[50%] bg-[#0a0a0a] z-20 flex items-end justify-center pb-4 border-b border-white/10">
             {/* Counter sits here */}
             <div className="overflow-hidden">
                <span ref={counterRef} className="text-[10vw] font-black leading-none tracking-tighter text-white mix-blend-difference">0</span>
             </div>
        </div>

        {/* Bottom Half */}
        <div className="loader-bottom absolute bottom-0 left-0 w-full h-[50%] bg-[#0a0a0a] z-20 flex items-start justify-center pt-4 border-t border-white/10">
            {/* Reflection or secondary text could go here */}
        </div>

        {/* The Horizon Line */}
        <div ref={lineRef} className="absolute top-1/2 left-0 w-full h-[2px] bg-white z-30 -translate-y-1/2 origin-center" />

    </div>
  );
}
