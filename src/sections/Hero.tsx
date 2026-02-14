import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const heroImages = [
  {
    src: '/images/hero-1.jpg',
    alt: 'Eventos elegantes',
  },
  {
    src: '/images/hero-2.jpg',
    alt: 'Gastronomía de excelencia',
  },
  {
    src: '/images/hero-3.jpg',
    alt: 'Servicios de belleza',
  },
  {
    src: '/images/hero-4.jpg',
    alt: 'Academia de formación',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const scrollToServices = () => {
    const element = document.querySelector('#servicios');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-800 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-deepPlum/60 via-deepPlum/40 to-deepPlum/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo Animation */}
          <div className="mb-8 animate-fade-in">
            <img
              src="/images/logo.png"
              alt="Elegancia Integral"
              className="h-24 w-auto mx-auto drop-shadow-2xl"
            />
          </div>

          {/* Headline */}
          <h1
            key={`headline-${currentSlide}`}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up"
          >
            Transformamos tus momentos en{' '}
            <span className="text-blush">experiencias inolvidables</span>
          </h1>

          {/* Subtitle */}
          <p
            key={`subtitle-${currentSlide}`}
            className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-in-up stagger-2"
          >
            Eventos, gastronomía, belleza y educación de excelencia
          </p>

          {/* CTA Buttons */}
          <div
            key={`buttons-${currentSlide}`}
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3"
          >
            <Button
              onClick={scrollToServices}
              size="lg"
              className="bg-roseGold hover:bg-roseGold-light text-white rounded-full px-8 py-6 text-lg font-semibold shadow-button transition-all duration-200 hover:scale-105"
            >
              Descubre nuestros servicios
            </Button>
            <Button
              onClick={scrollToContact}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple rounded-full px-8 py-6 text-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              Contáctanos
            </Button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentSlide(index);
                  setTimeout(() => setIsAnimating(false), 800);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-roseGold w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToServices}
            className="text-white/70 hover:text-white transition-colors"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
