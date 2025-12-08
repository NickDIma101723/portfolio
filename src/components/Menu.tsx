"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Home", href: "/", id: "01" },
  { label: "Work", href: "#work", id: "02" },
  { label: "About", href: "#about", id: "03" },
  { label: "Contact", href: "#contact", id: "04" },
];

export default function Menu({ isOpen, onClose }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // 1. Overlay expands (clip path)
      tl.to(menuRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power4.inOut",
      })
      // 2. Grid lines expand
      .from(".menu-divider", {
        scaleX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.inOut",
        transformOrigin: "left"
      }, "-=0.4")
      // 3. Text reveals
      .from(".menu-text", {
        y: 100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
      }, "-=0.6");

      if (isOpen) {
        tl.play();
      } else {
        tl.reverse();
      }
    }, menuRef);

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <div 
        ref={menuRef} 
        className="fixed inset-0 z-50 w-full h-screen bg-neutral-950 text-white flex flex-col"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
    >
        {/* Header Row */}
        <div className="w-full h-20 border-b border-neutral-800 flex items-center px-6 md:px-12 justify-between menu-divider origin-left">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 menu-text">Navigation</span>
            <button onClick={onClose} className="font-mono text-xs uppercase tracking-widest text-white hover:text-red-500 transition-colors menu-text">
                [ Close ]
            </button>
        </div>

        {/* Main Links Area */}
        <div className="flex-1 flex flex-col">
            {menuItems.map((item, i) => (
                <div key={i} className="relative flex-1 border-b border-neutral-800 group overflow-hidden menu-divider origin-left">
                    <Link 
                        href={item.href} 
                        onClick={onClose}
                        className="absolute inset-0 flex items-center justify-between px-6 md:px-12 hover:bg-neutral-900 transition-colors duration-500"
                    >
                        <span className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-transparent stroke-white group-hover:text-white transition-all duration-300 menu-text" style={{ WebkitTextStroke: "1px white" }}>
                            {item.label}
                        </span>
                        <span className="font-mono text-sm text-neutral-600 group-hover:text-white transition-colors duration-300 menu-text">
                            {item.id}
                        </span>
                    </Link>
                </div>
            ))}
        </div>

        {/* Footer Row */}
        <div className="w-full h-auto md:h-32 border-t border-neutral-800 flex flex-col md:flex-row menu-divider origin-left">
            <div className="flex-1 border-r border-neutral-800 p-6 md:p-8 flex flex-col justify-between hover:bg-neutral-900 transition-colors">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest menu-text">Socials</span>
                <div className="flex gap-4 mt-4 menu-text">
                    <a href="#" className="text-lg font-bold hover:text-red-500 transition-colors">Instagram</a>
                    <a href="#" className="text-lg font-bold hover:text-red-500 transition-colors">Twitter</a>
                    <a href="#" className="text-lg font-bold hover:text-red-500 transition-colors">LinkedIn</a>
                </div>
            </div>
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between hover:bg-neutral-900 transition-colors">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest menu-text">Contact</span>
                <a href="mailto:hello@niko.studios" className="text-lg md:text-2xl font-bold mt-4 hover:text-red-500 transition-colors menu-text">
                    hello@niko.studios
                </a>
            </div>
        </div>
    </div>
  );
}
