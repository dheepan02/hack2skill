import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, X } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  category?: string;
  aspectRatio?: string;
}

interface InteractiveCarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
  className?: string;
}

export const InteractiveCarousel: React.FC<InteractiveCarouselProps> = ({
  slides,
  autoPlayInterval = 5000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide, autoPlayInterval]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlide = slides[currentIndex];

  return (
    <div className={`relative space-y-4 ${className}`}>
      {/* Main Carousel Stage */}
      <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 group">
        <div className="aspect-[16/9] w-full overflow-hidden relative">
          <ImageWithFallback
            src={currentSlide.image}
            alt={currentSlide.title}
            fallbackTitle={currentSlide.title}
            aspectRatioClass="aspect-[16/9]"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          />

          {/* Scrim and Caption */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent flex flex-col justify-end p-6 md:p-8">
            <div className="space-y-1.5 max-w-xl">
              {currentSlide.category && (
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                  {currentSlide.category}
                </span>
              )}
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {currentSlide.title}
              </h3>
              {currentSlide.subtitle && (
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                  {currentSlide.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-950/70 hover:bg-zinc-950 border border-zinc-800 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-950/70 hover:bg-zinc-950 border border-zinc-800 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Top-Right Controls: Autoplay & Lightbox */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="p-2 rounded-lg bg-zinc-950/70 hover:bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white backdrop-blur-md transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsLightboxOpen(true)}
            title="Open high-res lightbox"
            className="p-2 rounded-lg bg-zinc-950/70 hover:bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white backdrop-blur-md transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Counter Badge */}
        <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-zinc-800 text-[11px] font-mono text-zinc-300">
          SLIDE {currentIndex + 1} / {slides.length}
        </div>
      </div>

      {/* Thumbnails Strip & Dot Indicators */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? 'w-8 bg-white' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>

        {/* Mini Thumbnails */}
        <div className="hidden sm:flex items-center gap-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-14 h-9 rounded-md overflow-hidden border transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'border-white ring-1 ring-white'
                  : 'border-zinc-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">
              LIGHTBOX INSPECTOR · {currentIndex + 1} OF {slides.length}
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              referrerPolicy="no-referrer"
              className="max-h-[80vh] max-w-full object-contain rounded-xl border border-zinc-800"
            />
          </div>

          <div className="text-center space-y-1">
            <h4 className="text-lg font-semibold text-white">{currentSlide.title}</h4>
            <p className="text-xs text-zinc-400">{currentSlide.subtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
};
