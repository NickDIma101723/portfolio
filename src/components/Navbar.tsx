'use client';

import { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  loadingPhase: string;
  scrollY: number;
}

export default function Navbar({ loadingPhase, scrollY }: NavbarProps) {
  const isScrolled = scrollY > 30;
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
        className={`flex justify-between items-center transition-all duration-700 ease-in-out ${
          loadingPhase === 'image-small'
            ? 'w-[96vw] sm:w-[94vw] md:w-[92vw] lg:w-[90vw] xl:w-[88vw] 2xl:w-[85vw] pt-3 sm:pt-4 md:pt-6 lg:pt-8' 
            : 'w-screen pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16'
        } ${
          isScrolled ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100'
        }`}
      >
        <div 
          className={`text-black font-bold transition-all duration-800 ease-out ${
            loadingPhase === 'image-small' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
          style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            fontFamily: 'Work Sans, sans-serif', 
            fontWeight: 700,
            transitionDelay: loadingPhase === 'image-small' ? '0.3s' : '0s'
          }}
        >
          NIKO.STUDIOS
        </div>
        <nav 
          className={`hidden sm:flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 text-black transition-all duration-800 ease-out ${
            loadingPhase === 'image-small' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
          style={{ 
            fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)',
            fontFamily: 'Work Sans, sans-serif', 
            fontWeight: 300,
            transitionDelay: loadingPhase === 'image-small' ? '0.5s' : '0s'
          }}
        >
          <a href="#about" className="relative group cursor-pointer transition-all duration-200 hover:opacity-60 hover:-translate-y-0.5 py-2 px-1">
            <span className="transition-all duration-200 group-hover:tracking-wide">About</span>
          </a>
          <a href="#work" className="relative group cursor-pointer transition-all duration-200 hover:opacity-60 hover:-translate-y-0.5 py-2 px-1">
            <span className="transition-all duration-200 group-hover:tracking-wide">Work</span>
          </a>
          <a href="#contact" className="relative group cursor-pointer transition-all duration-200 hover:opacity-60 hover:-translate-y-0.5 py-2 px-1">
            <span className="transition-all duration-200 group-hover:tracking-wide">Contact</span>
          </a>
        </nav>
        
        {/* Mobile Menu Button - visible on small screens */}
        <button
          className={`sm:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1 transition-all duration-800 ease-out ${
            loadingPhase === 'image-small' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
          onClick={toggleMenu}
          style={{ 
            transitionDelay: loadingPhase === 'image-small' ? '0.5s' : '0s'
          }}
        >
          <div className={`w-5 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`w-5 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>
      </div>

      {/* Circle Navbar - visible when scrolled */}
      <div 
        className={`fixed transition-all duration-700 ease-in-out z-50 ${
          isScrolled && loadingPhase === 'image-small' 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-50 pointer-events-none'
        }`}
        style={{
          top: 'clamp(1rem, 3vh, 2rem)',
          right: 'clamp(1rem, 3vw, 2rem)'
        }}
      >
        <div 
          ref={circleRef}
          className="relative bg-black rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ease-out touch-manipulation"
          style={{
            width: 'clamp(3.5rem, 12vw, 6rem)',
            height: 'clamp(3.5rem, 12vw, 6rem)',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) ${isHovering ? 'scale(1.1)' : 'scale(1)'}`,
            transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={toggleMenu}
        >
          {/* Hamburger Lines - animate to X when menu is open */}
          <div className="flex flex-col justify-center items-center pointer-events-none">
            <div 
              className={`bg-white transition-all duration-500 ease-out ${
                isMenuOpen 
                  ? 'transform rotate-45 absolute' 
                  : 'mb-1.5'
              }`}
              style={{
                width: isMenuOpen ? 'clamp(1.25rem, 5vw, 1.75rem)' : isHovering ? 'clamp(1.5rem, 6vw, 2.25rem)' : 'clamp(1.25rem, 5vw, 1.75rem)',
                height: 'clamp(0.125rem, 0.5vw, 0.125rem)'
              }}
            ></div>
            <div 
              className={`bg-white transition-all duration-500 ease-out ${
                isMenuOpen 
                  ? 'transform -rotate-45 absolute' 
                  : ''
              }`}
              style={{
                width: isMenuOpen ? 'clamp(1.25rem, 5vw, 1.75rem)' : isHovering ? 'clamp(1.5rem, 6vw, 2.25rem)' : 'clamp(0.75rem, 3vw, 1.25rem)',
                height: 'clamp(0.125rem, 0.5vw, 0.125rem)'
              }}
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
          className="absolute cursor-pointer flex items-center justify-center touch-manipulation z-60"
          style={{
            top: 'clamp(1rem, 3vh, 2.5rem)',
            right: 'clamp(1rem, 3vw, 2.5rem)',
            width: 'clamp(3rem, 10vw, 4rem)',
            height: 'clamp(3rem, 10vw, 4rem)'
          }}
          onClick={closeMenu}
        >
          <div className="relative">
            <div 
              className="bg-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
              style={{
                width: 'clamp(1.5rem, 5vw, 2rem)',
                height: 'clamp(0.125rem, 0.5vw, 0.125rem)'
              }}
            ></div>
            <div 
              className="bg-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"
              style={{
                width: 'clamp(1.5rem, 5vw, 2rem)',
                height: 'clamp(0.125rem, 0.5vw, 0.125rem)'
              }}
            ></div>
          </div>
        </div>

        {/* Menu Content */}
        <div className="flex items-center justify-start h-full overflow-hidden relative"
          style={{
            paddingLeft: 'clamp(1.5rem, 6vw, 3rem)',
            paddingRight: 'clamp(1rem, 4vw, 2rem)'
          }}
        >
          <nav className="text-left w-full">
            <div 
              className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 xl:space-y-28"
            >
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
                  <div className="flex items-baseline"
                    style={{
                      gap: 'clamp(0.5rem, 2vw, 1rem)'
                    }}
                  >
                    <span 
                      className="text-black font-light self-start flex-shrink-0"
                      style={{ 
                        fontFamily: 'Work Sans, sans-serif',
                        fontSize: 'clamp(2rem, 8vw, 5rem)',
                        minWidth: 'clamp(3rem, 12vw, 5rem)'
                      }}
                    >
                      {item.number}
                    </span>
                    <h2 
                      className="text-black font-light transition-all duration-300 group-hover:translate-x-2 sm:group-hover:translate-x-4 md:group-hover:translate-x-8 overflow-hidden"
                      style={{ 
                        fontFamily: 'Work Sans, sans-serif',
                        fontSize: 'clamp(3rem, 15vw, 12rem)',
                        lineHeight: '0.9'
                      }}
                    >
                      <span className="inline-block">
                        {item.title.split('').map((letter, letterIndex) => (
                          <span
                            key={letterIndex}
                            className="inline-block transition-transform duration-700 ease-out group-hover:-translate-y-1 sm:group-hover:-translate-y-2 md:group-hover:-translate-y-4 group-hover:scale-105"
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
                  {index < 2 && <div 
                    className="bg-black mt-8 sm:mt-10 md:mt-12 h-0.5 w-screen absolute"
                    style={{
                      left: 'calc(-1 * clamp(1.5rem, 6vw, 3rem))'
                    }}
                  ></div>}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
