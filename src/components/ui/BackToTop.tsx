"use client";

import { useEffect, useState } from "react";
import s from "./BackToTop.module.scss";

type LenisWithScrollTo = {
  scrollTo?: (target: number | string, options?: { duration?: number }) => void;
};

function PixelArrowUp() {
  return (
    <svg className={s.arrow} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 11h11V7h2v2h2v2h2v2h-2v2h-2v2h-2v-4H4z" />
    </svg>
  );
}

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactActive, setIsContactActive] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateVisibility = () => {
      frame = 0;
      setIsVisible(window.scrollY > window.innerHeight * 0.7);
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const contact = document.querySelector<HTMLElement>("#contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsContactActive(entry.isIntersecting),
      { rootMargin: "-40% 0px -40% 0px" },
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const scrollBackUp = () => {
    window.dispatchEvent(new CustomEvent("sound-play", { detail: { sound: "tick" } }));

    const lenis = window.lenis as LenisWithScrollTo | undefined;
    if (lenis?.scrollTo) {
      lenis.scrollTo(0, { duration: 0.85 });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={s.button}
      data-visible={isVisible}
      data-contact-active={isContactActive}
      onClick={scrollBackUp}
      aria-label="Back to top"
      data-sound="tick"
    >
      <span>Back to top</span>
      <PixelArrowUp />
    </button>
  );
}
