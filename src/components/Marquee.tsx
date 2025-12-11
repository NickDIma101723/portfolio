"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee() {
  const textRef = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    // Animate the startOffset of the textPath to create the loop
    // The path is 2000 units wide (2 waves). We animate half of it to loop seamlessly if text repeats.
    gsap.to(textRef.current, {
      attr: { startOffset: "-100%" }, // Move full length
      duration: 30,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <div className="relative w-full h-[30vh] overflow-hidden bg-[#8c1921] border-y border-[#fbbf24]/20 z-20 flex items-center">
      <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 1000 200" preserveAspectRatio="none">
        {/* 
            Path Definition:
            M 0 100: Start at middle height
            Q 250 0 500 100: Curve up to top, end at middle (500)
            T 1000 100: Curve down (reflected), end at middle (1000)
            ... Repeat for length
        */}
        <path
          id="curve"
          d="M 0 100 Q 250 20 500 100 T 1000 100 T 1500 100 T 2000 100 T 2500 100 T 3000 100"
          fill="transparent"
        />
        <text width="100%" className="text-[60px] font-black uppercase tracking-tighter fill-[#fbbf24]" style={{ fontSize: "60px" }}>
          <textPath ref={textRef} href="#curve" startOffset="0%">
             • Design • Develop • Deploy • Design • Develop • Deploy • Design • Develop • Deploy • Design • Develop • Deploy • Design • Develop • Deploy • Design • Develop • Deploy
          </textPath>
        </text>
      </svg>
      
      {/* Overlay Gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8c1921] via-transparent to-[#8c1921] pointer-events-none z-10" />
    </div>
  );
}
