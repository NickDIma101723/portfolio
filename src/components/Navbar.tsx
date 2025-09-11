'use client';

interface NavbarProps {
  loadingPhase: string;
}

export default function Navbar({ loadingPhase }: NavbarProps) {
  return (
    <div className={`absolute top-0 left-0 right-0 flex justify-center transition-all duration-1000 ease-out ${
      loadingPhase === 'image-small' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
    }`}>
      <div 
        className={`flex justify-between items-center pt-8 transition-all duration-[3000ms] ease-in-out ${
          loadingPhase === 'image-small'
            ? 'w-[92vw] sm:w-[87vw] md:w-[82vw] lg:w-[92vw] xl:w-[115rem] 2xl:w-[125rem]' 
            : 'w-screen'
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
    </div>
  );
}
