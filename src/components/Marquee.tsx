"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    xPercent += 0.05 * direction;
    requestAnimationFrame(animate);
  };

  return (
    <div className="relative flex h-screen w-[100vw] flex-shrink-0 overflow-hidden bg-neutral-900 text-white items-center border-x border-neutral-800 snap-start">
      <div ref={slider} className="absolute whitespace-nowrap flex">
        <p ref={firstText} className="text-[10vh] md:text-[15vh] font-bold uppercase tracking-tighter m-0 pr-10 opacity-30">
          Design • Develop • Deploy •
        </p>
        <p ref={secondText} className="text-[10vh] md:text-[15vh] font-bold uppercase tracking-tighter m-0 pr-10 opacity-30">
          Design • Develop • Deploy •
        </p>
      </div>
    </div>
  );
}
