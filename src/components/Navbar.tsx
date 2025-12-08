"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Magnetic from "./Magnetic";
import Menu from "./Menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
        <motion.nav
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -100, opacity: 0 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full z-50 py-8 mix-blend-difference"
        >
            <div className="mx-auto w-full px-8 md:px-12 flex justify-between items-center">
                
                {/* Logo */}
                <div className="pointer-events-auto">
                    <Magnetic>
                        <Link href="/" className="group relative block overflow-hidden">
                            <span className="block text-sm font-bold tracking-widest uppercase text-white transition-transform duration-500 group-hover:-translate-y-full">
                                Niko
                            </span>
                            <span className="absolute top-0 left-0 block text-sm font-bold tracking-widest uppercase text-white transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                                Niko
                            </span>
                        </Link>
                    </Magnetic>
                </div>

                {/* Menu Button */}
                <div className="pointer-events-auto">
                    <Magnetic>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="group relative block overflow-hidden cursor-pointer text-white"
                        >
                            <span className="block text-sm font-bold tracking-widest uppercase transition-transform duration-500 group-hover:-translate-y-full">
                                {isMenuOpen ? "Close" : "Menu"}
                            </span>
                            <span className="absolute top-0 left-0 block text-sm font-bold tracking-widest uppercase transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                                {isMenuOpen ? "Close" : "Menu"}
                            </span>
                        </button>
                    </Magnetic>
                </div>
            </div>
        </motion.nav>

        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
