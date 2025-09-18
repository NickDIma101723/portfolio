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
    }, 8500);

    return () => {
      clearTimeout(blackTimer);
      clearTimeout(zoomTimer);
    };
  }, []);

  useEffect(() => {
    if (loadingPhase === 'image-small') {

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
      }, 4000);

      return () => {
        clearTimeout(initScrollTimer);
      };
    }
  }, [loadingPhase]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (section: string) => {
    setTargetSection(section);
    
    // Navigate to section directly without zoom
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen text-sm sm:text-base text-black ${
      loadingPhase === 'black' ? 'bg-black overflow-hidden' : 'bg-white'
    }`}>

      {/* Loading Screen */}
      <div className={`w-screen h-screen bg-white transition-all duration-1000 relative overflow-hidden ${
        loadingPhase === 'black' ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
      
        {/* Full Width Loading Line */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-px bg-black/20">
          <div 
            className="h-full bg-black transition-all duration-[5000ms] ease-out"
            style={{
              width: lineWidth
            }}
          ></div>
        </div>
        
        {/* NIKO Text - Responsive */}
        <div 
          className="absolute text-black font-black transition-all duration-1500 ease-out loading-text"
          style={{
            top: 'clamp(1rem, 4vh, 5rem)',
            left: 'clamp(0.5rem, 2vw, 2rem)',
            fontSize: 'clamp(3rem, 15vw, 18rem)',
            fontWeight: 800,
            fontFamily: 'Work Sans, sans-serif',
            lineHeight: 0.85,
            transform: `translateY(${lineWidth === '100%' ? '0' : '-100vh'}) scale(${lineWidth === '100%' ? '1' : '0.3'})`,
            opacity: lineWidth === '100%' ? 1 : 0,
            transitionDelay: '1.5s'
          }}
        >
          NIKO
        </div>
        
        {/* DIMA Text - Responsive */}
        <div 
          className="absolute text-black font-black transition-all duration-1500 ease-out loading-text"
          style={{
            bottom: 'clamp(1rem, 4vh, 5rem)',
            right: 'clamp(0.5rem, 2vw, 2rem)',
            fontSize: 'clamp(3rem, 15vw, 18rem)',
            fontWeight: 800,
            fontFamily: 'Work Sans, sans-serif',
            lineHeight: 0.85,
            transform: `translateY(${lineWidth === '100%' ? '0' : '100vh'}) scale(${lineWidth === '100%' ? '1' : '0.3'})`,
            opacity: lineWidth === '100%' ? 1 : 0,
            transitionDelay: '2s'
          }}
        >
          DIMA
        </div>
      </div>
      
      {/* Image content with responsive sizing */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
        loadingPhase !== 'black' ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className={`text-center w-full ${loadingPhase === 'image-small' ? 'px-2 sm:px-4 pt-10 sm:pt-12 md:pt-14' : ''}`}>
          <div 
            className={`relative flex items-center justify-center transform-gpu ${
              loadingPhase === 'image-small'
                ? 'w-[96vw] h-[57vh] sm:w-[94vw] sm:h-[62vh] md:w-[92vw] md:h-[72vh] lg:w-[90vw] lg:h-[77vh] xl:w-[88vw] xl:h-[82vh] 2xl:w-[85vw] 2xl:h-[85vh] rounded-lg duration-[1500ms] ease-out mx-auto' 
                : 'w-screen h-screen duration-[1500ms] ease-in-out rounded-none'
            }`}
            style={{
              transformOrigin: 'center center',
              overflow: 'hidden',
              marginTop: loadingPhase === 'image-small' ? 'clamp(-8vh, -6vh, -4vh)' : '0',
              minHeight: loadingPhase === 'image-small' ? 'clamp(300px, 60vh, 800px)' : 'auto'
            }}
          >
            <Image
              src="/test.jpg"
              alt="Portfolio Image"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 96vw, (max-width: 768px) 94vw, (max-width: 1024px) 92vw, (max-width: 1280px) 90vw, 85vw"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar loadingPhase={loadingPhase} scrollY={scrollY} onNavigate={handleNavigation} />

      {/* Simple scrollable content */}
      <div className={`${loadingPhase === 'image-small' ? 'block' : 'hidden'}`}>
        <div id="about" className="h-screen"></div>
        <div id="work" className="h-screen"></div>
        <div id="contact" className="h-screen"></div>
      </div>
    </div>
  );
}
