'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger the transition after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); // 1 second delay before starting transition

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="text-center">
        <div 
          className={`relative rounded-lg flex items-center justify-center mx-auto transition-all duration-[3000ms] ease-in-out overflow-hidden ${
            isLoaded 
              ? 'w-[105rem] h-[50rem]' 
              : 'w-screen h-screen rounded-none'
          }`}
        >
          <Image
            src="/image.png"
            alt="Portfolio Image"
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyuVz/HK9d+g8mDaASBXTTgFzNs4m3qzLLq1p0DW1JL/9k="
          />
        </div>
      </div>
    </div>
  );
}
