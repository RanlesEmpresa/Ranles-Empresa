import { useEffect, useRef, useState } from 'react';
import { Calendar, Utensils, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pillars = [
  {
    id: 'eventos',
    icon: Calendar,
    title: 'Organización de Eventos',
    description: 'Creamos experiencias memorables para cada ocasión. Desde bodas elegantes hasta eventos corporativos de alto impacto.',
    color: 'from-purple to-purple-light',
  },
  {
    id: 'gastronomia',
    icon: Utensils,
    title: 'Gastronomía',
    description: 'Propuestas culinarias que deleitan los sentidos. Menús personalizados con los más altos estándares de calidad.',
    color: 'from-roseGold to-roseGold-light',
  },
  {
    id: 'belleza',
    icon: Sparkles,
    title: 'Belleza',
    description: 'Servicios de belleza que realzan tu esencia. Maquillaje profesional, cuidado de la piel y tratamientos exclusivos.',
    color: 'from-purple to-roseGold',
  },
  {
    id: 'educacion',
    icon: GraduationCap,
    title: 'Academia & Educación',
    description: 'Formación de excelencia en belleza y otras modalidades. Certificaciones reconocidas y instructores expertos.',
    color: 'from-roseGold-light to-purple-light',
  },
];

interface FourPillarsProps {
  onSelectPillar: (pillar: string) => void;
}

export default function FourPillars({ onSelectPillar }: FourPillarsProps) {
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

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-ivory"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-blush text-purple text-sm font-semibold rounded-full mb-4">
            Nuestros Servicios
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-deepPlum mb-4">
            Cuatro Pilares de <span className="text-roseGold">Excelencia</span>
          </h2>
          <p className="text-lg text-mauve max-w-2xl mx-auto">
            Descubre todo lo que tenemos para ofrecerte. Cada servicio está diseñado 
            para superar tus expectativas.
          </p>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`group relative bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => onSelectPillar(pillar.id)}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl font-bold text-deepPlum mb-3 group-hover:text-purple transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-mauve mb-6 leading-relaxed">
                  {pillar.description}
                </p>

                {/* CTA */}
                <Button
                  variant="ghost"
                  className="text-purple hover:text-roseGold hover:bg-blush/50 p-0 h-auto font-semibold group/btn"
                >
                  Ver más
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-roseGold/30 transition-colors duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
