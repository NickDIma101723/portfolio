'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [loadingPhase, setLoadingPhase] = useState('black');
  const [lineWidth, setLineWidth] = useState('0%');

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

  return (
    <div className={`min-h-screen flex items-center justify-center overflow-hidden ${
      loadingPhase === 'black' ? 'bg-white' : 'bg-white'
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
            className={`relative rounded-lg flex items-center justify-center mx-auto transition-all duration-[3000ms] ease-in-out overflow-hidden ${
              loadingPhase === 'image-small'
                ? 'w-[95vw] h-[35vh] sm:w-[90vw] sm:h-[40vh] md:w-[85vw] md:h-[45vh] lg:w-[95vw] lg:h-[55vh] xl:w-[120rem] xl:h-[45rem] 2xl:w-[130rem] 2xl:h-[50rem]' 
                : 'w-screen h-screen rounded-none'
            }`}
            style={{
              marginTop: loadingPhase === 'image-small' ? '-10vh' : '0'
            }}
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
