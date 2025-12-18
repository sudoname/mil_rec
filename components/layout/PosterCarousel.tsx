'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const posters = [
  {
    id: 1,
    src: '/posters/poster1.jpg',
    alt: 'Military Recruitment Poster 1',
  },
  {
    id: 2,
    src: '/posters/poster2.jpg',
    alt: 'Military Recruitment Poster 2',
  },
];

export default function PosterCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posters.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % posters.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + posters.length) % posters.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Carousel Container */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl border-2 border-military-gold/30">
        {posters.map((poster, index) => (
          <div
            key={poster.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={poster.src}
              alt={poster.alt}
              fill
              className="object-contain bg-military-navy"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-military-navy/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-military-navy transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 text-military-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-military-navy/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-military-navy transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 text-military-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {posters.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-military-gold'
                : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <div className="text-center mt-3">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-xs text-military-muted hover:text-military-gold transition-colors"
        >
          {isAutoPlaying ? '⏸ Pause' : '▶ Play'} Auto-scroll
        </button>
      </div>
    </div>
  );
}
