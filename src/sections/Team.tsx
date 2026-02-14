import { useEffect, useRef, useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Dra. Carmen Vásquez',
    role: 'Directora General',
    bio: 'Con más de 25 años de experiencia liderando equipos de excelencia en el sector de servicios.',
    image: '/images/team-1.jpg',
  },
  {
    id: 2,
    name: 'Lic. Roberto Méndez',
    role: 'Director de Eventos',
    bio: 'Especialista en organización de eventos corporativos y sociales de alto nivel.',
    image: '/images/team-2.jpg',
  },
  {
    id: 3,
    name: 'Chef Isabella Ruiz',
    role: 'Directora de Gastronomía',
    bio: 'Chef ejecutiva con experiencia internacional y pasión por la cocina innovadora.',
    image: '/images/team-3.jpg',
  },
  {
    id: 4,
    name: 'Mtra. Fernanda López',
    role: 'Directora de Belleza',
    bio: 'Experta en tratamientos faciales y maquillaje profesional con certificación internacional.',
    image: '/images/team-4.jpg',
  },
  {
    id: 5,
    name: 'Prof. Diego Santos',
    role: 'Director Académico',
    bio: 'Formador de profesionales con amplia trayectoria en educación y capacitación.',
    image: '/images/team-5.jpg',
  },
  {
    id: 6,
    name: 'Lic. Patricia Morales',
    role: 'Coordinadora de Experiencia',
    bio: 'Dedicada a garantizar la satisfacción total de nuestros clientes en cada servicio.',
    image: '/images/team-6.jpg',
  },
];

export default function Team() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-lavender"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-blush text-purple text-sm font-semibold rounded-full mb-4">
            Nuestro Equipo
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-deepPlum mb-4">
            Profesionales <span className="text-roseGold">apasionados</span>
          </h2>
          <p className="text-lg text-mauve max-w-2xl mx-auto">
            Conoce al equipo de expertos que hacen realidad cada proyecto 
            con dedicación y excelencia.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Social Links */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-purple transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-purple transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="font-serif text-xl font-bold text-deepPlum mb-1 group-hover:text-purple transition-colors">
                  {member.name}
                </h3>
                <p className="text-roseGold font-medium text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-mauve text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
