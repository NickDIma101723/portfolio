'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Lenis from 'lenis';

export default function Home() {
  const [loadingPhase, setLoadingPhase] = useState('black');
  const [lineWidth, setLineWidth] = useState('0%');
  const [scrollY, setScrollY] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetSection, setTargetSection] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLineWidth('100%');
    }, 100);

    const blackTimer = setTimeout(() => {
      setLoadingPhase('image-fullscreen');
    }, 6000);

    const zoomTimer = setTimeout(() => {
      setLoadingPhase('image-small');
    }, 7000);

    return () => {
      clearTimeout(blackTimer);
      clearTimeout(zoomTimer);
    };
  }, []);

  // Separate effect for Lenis - only after animations complete
  useEffect(() => {
    if (loadingPhase === 'image-small') {
      // Wait for image animation to fully complete before enabling smooth scroll
      const initScrollTimer = setTimeout(() => {
        const lenis = new Lenis({
          duration: 1.8,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          lerp: 0.05,
          wheelMultiplier: 0.8,
          touchMultiplier: 1.5,
        });

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
          lenis.destroy();
        };
      }, 4000); // Wait 4 seconds after image-small state starts

      return () => {
        clearTimeout(initScrollTimer);
      };
    }
  }, [loadingPhase]);

  // Scroll listener effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation with zoom effect
  const handleNavigation = (section: string) => {
    setIsNavigating(true);
    setTargetSection(section);
    
    // Zoom in effect
    setTimeout(() => {
      // Navigate to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Zoom out effect after navigation
      setTimeout(() => {
        setIsNavigating(false);
      }, 1000);
    }, 800);
  };

  return (
    <div className={`min-h-screen text-sm sm:text-base ${
      loadingPhase === 'black' ? 'bg-white overflow-hidden' : 'bg-white'
    }`}>

      <div className={`w-screen h-screen bg-white transition-opacity duration-1000 relative overflow-hidden ${
        loadingPhase === 'black' ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
      
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-px bg-black/20">
          <div 
            className="h-full bg-black transition-all duration-[5000ms] ease-out"
            style={{
              width: lineWidth
            }}
          ></div>
        </div>
        
        <div 
          className="absolute top-4 left-2 sm:top-8 sm:left-4 md:top-12 md:left-6 lg:top-16 lg:left-8 xl:top-20 xl:left-8 text-black font-black transition-all duration-1500 ease-out"
          style={{
            fontSize: 'clamp(4rem, 12vw, 18rem)',
            fontWeight: 800,
            fontFamily: 'Work Sans, sans-serif',
            lineHeight: 0.9,
            transform: `translateY(${lineWidth === '100%' ? '0' : '-100vh'}) scale(${lineWidth === '100%' ? '1' : '0.3'})`,
            opacity: lineWidth === '100%' ? 1 : 0,
            transitionDelay: '1.5s'
          }}
        >
          NIKO
        </div>
        
        <div 
          className="absolute bottom-4 right-2 sm:bottom-8 sm:right-4 md:bottom-12 md:right-6 lg:bottom-16 lg:right-8 xl:bottom-20 xl:right-8 text-black font-black transition-all duration-1500 ease-out"
          style={{
            fontSize: 'clamp(4rem, 12vw, 18rem)',
            fontWeight: 800,
            fontFamily: 'Work Sans, sans-serif',
            lineHeight: 0.9,
            transform: `translateY(${lineWidth === '100%' ? '0' : '100vh'}) scale(${lineWidth === '100%' ? '1' : '0.3'})`,
            opacity: lineWidth === '100%' ? 1 : 0,
            transitionDelay: '2s'
          }}
        >
          DIMA
        </div>
      </div>
      
      {/* Image content with fade in */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
        loadingPhase !== 'black' ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="text-center">
          <div 
            className={`relative rounded-lg flex items-center justify-center mx-auto transition-all ease-in-out overflow-hidden ${
              loadingPhase === 'image-small'
                ? 'w-[98vw] h-[65vh] sm:w-[95vw] sm:h-[70vh] md:w-[92vw] md:h-[75vh] lg:w-[90vw] lg:h-[80vh] xl:w-[88vw] xl:h-[85vh] 2xl:w-[85vw] 2xl:h-[88vh]' 
                : 'w-screen h-screen rounded-none'
            } ${
              isNavigating ? 'duration-[800ms] scale-150' : 'duration-[3000ms] scale-100'
            }`}
            style={{
              marginTop: loadingPhase === 'image-small' ? '3vh' : '0'
            }}
          >
            <Image
              src="/test.jpg"
              alt="Portfolio Image"
              fill
              className="object-cover"
              style={{
                transform: `translateY(${scrollY * 0.1}px)` // Image moving effect - increased vertical movement
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar loadingPhase={loadingPhase} scrollY={scrollY} />

      {/* Simple scrollable content */}
      <div className={`${loadingPhase === 'image-small' ? 'block' : 'hidden'}`}>
        <div id="about" className="h-screen"></div>
        <div id="work" className="h-screen"></div>
        <div id="contact" className="h-screen"></div>
      </div>
    </div>
  );
}
