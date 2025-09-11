'use client';

import { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  loadingPhase: string;
  scrollY: number;
}

export default function Navbar({ loadingPhase, scrollY }: NavbarProps) {
  const isScrolled = scrollY > 100;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!circleRef.current) return;
    
    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    
    setMousePosition({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  return (
    <div className={`fixed top-0 left-0 right-0 flex justify-center transition-all duration-1000 ease-out z-50 ${
      loadingPhase === 'image-small' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
    }`}>
      
      {/* Regular Navbar - visible when not scrolled */}
      <div 
        className={`flex justify-between items-center pt-8 transition-all duration-700 ease-in-out ${
          loadingPhase === 'image-small'
            ? 'w-[92vw] sm:w-[87vw] md:w-[82vw] lg:w-[92vw] xl:w-[115rem] 2xl:w-[105rem]' 
            : 'w-screen'
        } ${
          isScrolled ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100'
        }`}
      >
        <div 
          className={`text-black text-xl transition-all duration-800 ease-out ${
            loadingPhase === 'image-small' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
          style={{ 
            fontFamily: 'Work Sans, sans-serif', 
            fontWeight: 700,
            transitionDelay: loadingPhase === 'image-small' ? '0.3s' : '0s'
          }}
        >
          NIKO.STUDIOS
        </div>
        <nav 
          className={`flex gap-6 text-black text-xl transition-all duration-800 ease-out ${
            loadingPhase === 'image-small' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
          style={{ 
            fontFamily: 'Work Sans, sans-serif', 
            fontWeight: 300,
            transitionDelay: loadingPhase === 'image-small' ? '0.5s' : '0s'
          }}
        >
          <a href="#about" className="relative group cursor-pointer transition-all duration-200 hover:opacity-60 hover:-translate-y-0.5">
            <span className="transition-all duration-200 group-hover:tracking-wide">About</span>
          </a>
          <a href="#work" className="relative group cursor-pointer transition-all duration-200 hover:opacity-60 hover:-translate-y-0.5">
            <span className="transition-all duration-200 group-hover:tracking-wide">Work</span>
          </a>
          <a href="#contact" className="relative group cursor-pointer transition-all duration-200 hover:opacity-60 hover:-translate-y-0.5">
            <span className="transition-all duration-200 group-hover:tracking-wide">Contact</span>
          </a>
        </nav>
      </div>

      {/* Circle Navbar - visible when scrolled */}
      <div 
        className={`fixed top-6 right-12 transition-all duration-700 ease-in-out z-50 ${
          isScrolled && loadingPhase === 'image-small' 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-50 pointer-events-none'
        }`}
      >
        <div 
          ref={circleRef}
          className="relative w-24 h-24 bg-black rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ease-out"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={toggleMenu}
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) ${isHovering ? 'scale(1.1)' : 'scale(1)'}`,
            transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
          }}
        >
          {/* Hamburger Lines - animate to X when menu is open */}
          <div className="flex flex-col justify-center items-end space-y-2.5 pointer-events-none">
            <div 
              className={`h-0.5 bg-white transition-all duration-500 ease-out ${
                isMenuOpen 
                  ? 'w-6 transform rotate-45 translate-y-1.5' 
                  : isHovering ? 'w-9' : 'w-7'
              }`}
            ></div>
            <div 
              className={`h-0.5 bg-white transition-all duration-500 ease-out ${
                isMenuOpen 
                  ? 'w-6 transform -rotate-45 -translate-y-1.5' 
                  : isHovering ? 'w-9' : 'w-5'
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 w-screen h-screen bg-white transition-all duration-1000 ease-out ${
          isMenuOpen 
            ? 'opacity-100 visible z-50' 
            : 'opacity-0 invisible z-50'
        }`}
        style={{
          transform: isMenuOpen ? 'translateX(0%)' : 'translateX(100%)',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        {/* X Close button */}
        <div 
          className="absolute top-8 right-8 w-12 h-12 cursor-pointer flex items-center justify-center"
          onClick={closeMenu}
        >
          <div className="flex flex-col justify-center items-center space-y-2.5">
            <div className="w-6 h-0.5 bg-black transform rotate-45 translate-y-1.5"></div>
            <div className="w-6 h-0.5 bg-black transform -rotate-45 -translate-y-1.5"></div>
          </div>
        </div>

        {/* Menu Content */}
        <div className="flex items-center justify-start h-full pl-12">
          <nav className="text-left w-full">
            <div className="space-y-20">
              {[
                { number: '01', title: 'About' },
                { number: '02', title: 'Work' },
                { number: '03', title: 'Contact' }
              ].map((item, index) => (
                <div
                  key={item.number}
                  className={`transition-all duration-1000 ease-out hover:opacity-60 cursor-pointer group ${
                    isMenuOpen 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${0.4 + index * 0.15}s` : '0s'
                  }}
                  onClick={closeMenu}
                >
                  <div className="flex items-baseline space-x-2">
                    <span 
                      className="text-black text-5xl font-light min-w-[5rem] self-start"
                      style={{ fontFamily: 'Work Sans, sans-serif' }}
                    >
                      {item.number}
                    </span>
                    <h2 
                      className="text-black text-8xl md:text-[12rem] font-light transition-all duration-300 group-hover:translate-x-8 overflow-hidden"
                      style={{ fontFamily: 'Work Sans, sans-serif' }}
                    >
                      <span className="inline-block">
                        {item.title.split('').map((letter, letterIndex) => (
                          <span
                            key={letterIndex}
                            className="inline-block transition-transform duration-700 ease-out group-hover:-translate-y-4 group-hover:scale-105"
                            style={{
                              transitionDelay: `${letterIndex * 80}ms`
                            }}
                          >
                            {letter === ' ' ? '\u00A0' : letter}
                          </span>
                        ))}
                      </span>
                    </h2>
                  </div>
                  {index < 2 && <div className="w-screen mt-6 h-0.5 bg-black"></div>}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
