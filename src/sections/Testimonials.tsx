import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    role: 'Novia',
    service: 'Organización de Eventos',
    content: 'La organización de mi boda fue perfecta. Cada detalle estuvo cuidado y el resultado superó todas mis expectativas. El equipo fue increíblemente profesional y atento.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'CEO, TechCorp',
    service: 'Gastronomía',
    content: 'El catering para nuestro evento corporativo fue excepcional. Todos los asistentes quedaron encantados con la calidad y presentación de los alimentos.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Laura Martínez',
    role: 'Egresada',
    service: 'Academia',
    content: 'El curso de maquillaje profesional cambió mi vida. Ahora tengo mi propio negocio gracias a la formación recibida y el apoyo continuo de los instructores.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Ana Patricia',
    role: 'Cliente frecuente',
    service: 'Belleza',
    content: 'Los servicios de belleza son de primera calidad. El ambiente es relajante, el personal muy profesional y los resultados siempre superan mis expectativas.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-purple relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-roseGold rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-white/10 text-blush text-sm font-semibold rounded-full mb-4">
            Testimonios
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
            Lo que dicen nuestros <span className="text-roseGold">clientes</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestro mayor orgullo.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <Quote className="w-16 h-16 text-roseGold/30" />
          </div>

          {/* Testimonial Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 text-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-500 ${
                  index === currentIndex
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 absolute inset-0 translate-x-8'
                }`}
              >
                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-xl lg:text-2xl text-white leading-relaxed mb-8 font-light italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div>
                  <p className="font-serif text-xl font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-roseGold">{testimonial.role}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-white/10 rounded-full text-sm text-white/70">
                    {testimonial.service}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-roseGold w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
