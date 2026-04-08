"use client";

import type { Commentary } from '@/types/commentary';

import React, { useState, useEffect, useCallback } from 'react';

interface Props {
  initialData: Commentary[];
}

export default function ComentariesCarousel({ initialData = [] }: Props) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const handleNext = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1 === initialData.length ? 0 : prev + 1));
      setFade(true);
    }, 300);
  }, [initialData.length]);

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 < 0 ? initialData.length - 1 : prev - 1));
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    if (initialData.length <= 1) return;
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [handleNext, initialData.length]);

  return (
    <section 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/bgCommentaries.webp')` }} 
      className="py-20 bg-neutral-900 overflow-hidden bg-cover bg-center bg-no-repeat"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <div className={`min-h-[250px] flex flex-col justify-center transition-opacity duration-300 ease-in-out ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}>
          
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i: number) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                fill={i < (initialData[index]?.stars || 0) ? "#D4AF37" : "rgba(255,255,255,0.2)"}
                className="w-5 h-5"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>

          <blockquote className="text-xl md:text-2xl text-white font-light italic mb-8 leading-relaxed drop-shadow-md">
            &quot;{initialData[index]?.commentary}&quot;
          </blockquote>

          <cite className="not-italic">
            <span className="block text-sm uppercase tracking-[0.3em] font-bold text-gray-200">
              {initialData[index]?.name}
            </span>
          </cite>
        </div>

        <div className="flex justify-center items-center gap-10 mt-10">
          <button onClick={handlePrev} className="group p-2" aria-label="Anterior">
            <svg className="w-6 h-6 stroke-gray-400 group-hover:stroke-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div className="flex gap-3">
            {initialData.map((_: Commentary, i: number) => (
              <button
                key={i}
                onClick={() => {
                  setFade(false);
                  setTimeout(() => { setIndex(i); setFade(true); }, 300);
                }}
                className={`h-1 transition-all duration-500 ${
                  i === index ? 'w-8 bg-white' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>

          <button onClick={handleNext} className="group p-2" aria-label="Siguiente">
            <svg className="w-6 h-6 stroke-gray-400 group-hover:stroke-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}