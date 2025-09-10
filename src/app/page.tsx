'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [loadingPhase, setLoadingPhase] = useState('black'); // 'black', 'image-fullscreen', 'image-small'
  const [lineWidth, setLineWidth] = useState('0%');

  useEffect(() => {
    // Start the line animation immediately
    setTimeout(() => {
      setLineWidth('100%');
    }, 100);

    // Phase 1: Black screen for 6 seconds (even slower)
    const blackTimer = setTimeout(() => {
      setLoadingPhase('image-fullscreen');
    }, 6000);

    // Phase 2: Show fullscreen image for 1 second, then zoom out
    const zoomTimer = setTimeout(() => {
      setLoadingPhase('image-small');
    }, 7000);

    return () => {
      clearTimeout(blackTimer);
      clearTimeout(zoomTimer);
    };
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center overflow-hidden ${
      loadingPhase === 'black' ? 'bg-black' : 'bg-white'
    }`}>
      {/* Black loading screen with fade out */}
      <div className={`w-screen h-screen bg-black transition-opacity duration-1000 relative overflow-hidden ${
        loadingPhase === 'black' ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Loading line that fills from left to right */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-px bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-[5000ms] ease-out"
            style={{
              width: lineWidth
            }}
          ></div>
        </div>
        
        {/* Animated text - NIKO sliding down from top left */}
        <div 
          className="absolute top-20 left-8 text-white font-black transition-all duration-1500 ease-out"
          style={{
            fontSize: '18rem',
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
        
        {/* Animated text - DIMA sliding up from bottom right */}
        <div 
          className="absolute bottom-20 right-8 text-white font-black transition-all duration-1500 ease-out"
          style={{
            fontSize: '18rem',
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
            className={`relative rounded-lg flex items-center justify-center mx-auto transition-all duration-[3000ms] ease-in-out overflow-hidden ${
              loadingPhase === 'image-small'
                ? 'w-[105rem] h-[50rem]' 
                : 'w-screen h-screen rounded-none'
            }`}
          >
            <Image
              src="/portfolio-image.svg"
              alt="Portfolio Image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
