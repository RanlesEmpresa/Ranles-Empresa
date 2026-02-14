import { useEffect, useRef, useState } from 'react';
import { X, Check, ArrowLeft, Calendar, Utensils, Sparkles, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pillarData = {
  eventos: {
    icon: Calendar,
    title: 'Organización de Eventos',
    subtitle: 'Hacemos realidad tus sueños',
    description: 'Nuestro equipo de expertos en organización de eventos se encarga de cada detalle para que tú solo disfrutes. Transformamos tus ideas en experiencias inolvidables.',
    image: '/images/events-1.jpg',
    gallery: ['/images/events-1.jpg', '/images/events-2.jpg', '/images/hero-1.jpg'],
    services: [
      'Bodas y celebraciones sociales',
      'Eventos corporativos y empresariales',
      'Lanzamientos de productos',
      'Conferencias y seminarios',
      'Fiestas temáticas y aniversarios',
      'Eventos benéficos y galas',
    ],
    features: [
      'Coordinación completa del evento',
      'Diseño y decoración personalizada',
      'Gestión de proveedores',
      'Cronograma detallado',
      'Personal capacitado',
    ],
  },
  gastronomia: {
    icon: Utensils,
    title: 'Gastronomía',
    subtitle: 'Sabores que enamoran',
    description: 'Nuestro equipo de chefs profesionales crea experiencias culinarias únicas, adaptadas a tus necesidades y preferencias. Cada platillo es una obra de arte.',
    image: '/images/gastronomy-1.jpg',
    gallery: ['/images/gastronomy-1.jpg', '/images/gastronomy-2.jpg', '/images/hero-2.jpg'],
    services: [
      'Catering para eventos sociales y corporativos',
      'Menús personalizados y temáticos',
      'Estaciones de comida en vivo',
      'Coffee breaks ejecutivos',
      'Mesas de postres y candy bars',
      'Banquetes y buffets',
    ],
    features: [
      'Ingredientes frescos y de alta calidad',
      'Presentación artística',
      'Opciones vegetarianas y veganas',
      'Servicio profesional',
      'Degustaciones previas',
    ],
  },
  belleza: {
    icon: Sparkles,
    title: 'Belleza',
    subtitle: 'Realza tu esencia natural',
    description: 'Ofrecemos servicios de belleza profesionales con productos de alta calidad y técnicas innovadoras. Te ayudamos a lucir y sentirte espléndida.',
    image: '/images/beauty-1.jpg',
    gallery: ['/images/beauty-1.jpg', '/images/beauty-2.jpg', '/images/hero-3.jpg'],
    services: [
      'Maquillaje profesional (social, editorial, novias)',
      'Tratamientos faciales personalizados',
      'Cuidado de la piel avanzado',
      'Peinados y styling para toda ocasión',
      'Asesoría de imagen completa',
      'Manicure y pedicure de lujo',
    ],
    features: [
      'Productos premium y dermatológicos',
      'Profesionales certificados',
      'Ambiente relajante y exclusivo',
      'Tratamientos personalizados',
      'Tecnología de vanguardia',
    ],
  },
  educacion: {
    icon: GraduationCap,
    title: 'Academia & Educación',
    subtitle: 'Aprende de los mejores',
    description: 'Nuestra academia ofrece programas de formación certificados con los más altos estándares de calidad. Preparamos profesionales exitosos en el mundo de la belleza.',
    image: '/images/education-1.jpg',
    gallery: ['/images/education-1.jpg', '/images/education-2.jpg', '/images/hero-4.jpg'],
    services: [
      'Maquillaje profesional (básico, intermedio, avanzado)',
      'Estética facial y corporal',
      'Peinados y barbería profesional',
      'Manicure y pedicure avanzado',
      'Gestión de spa y bienestar',
      'Emprendimiento en belleza',
    ],
    features: [
      'Instructores con amplia experiencia',
      'Certificaciones reconocidas',
      'Práctica en modelos reales',
      'Material de apoyo completo',
      'Bolsa de trabajo exclusiva',
    ],
    partners: [
      { name: 'Beauty Academy Partner', logo: '/images/partner-1.png' },
      { name: 'Cosmeiology Academy', logo: '/images/partner-2.png' },
      { name: 'Training Institute', logo: '/images/partner-3.png' },
      { name: 'International Certification', logo: '/images/partner-4.png' },
    ],
  },
};

interface PillarDetailsProps {
  selectedPillar: string | null;
  onClose: () => void;
}

export default function PillarDetails({ selectedPillar, onClose }: PillarDetailsProps) {
  const [activeImage, setActiveImage] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedPillar) {
      document.body.style.overflow = 'hidden';
      setActiveImage(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPillar]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!selectedPillar) return null;

  const pillar = pillarData[selectedPillar as keyof typeof pillarData];
  if (!pillar) return null;

  const Icon = pillar.icon;
  const isEducation = selectedPillar === 'educacion';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative min-h-screen bg-ivory animate-slide-in-right"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md shadow-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-deepPlum hover:text-purple hover:bg-blush/50"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver a servicios
              </Button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-deepPlum" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-card">
                <img
                  src={pillar.gallery[activeImage]}
                  alt={pillar.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                {pillar.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 h-16 rounded-lg overflow-hidden transition-all ${
                      idx === activeImage
                        ? 'ring-2 ring-purple ring-offset-2'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${pillar.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple to-roseGold flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-roseGold font-semibold mb-2">{pillar.subtitle}</span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-deepPlum mb-6">
                {pillar.title}
              </h2>
              <p className="text-lg text-mauve leading-relaxed mb-8">
                {pillar.description}
              </p>
              <Button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
                className="bg-purple hover:bg-purple-light text-white rounded-full px-8 py-6 text-lg font-semibold shadow-button transition-all duration-200 hover:scale-105 w-fit"
              >
                Solicita información
              </Button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-card">
              <h3 className="font-serif text-2xl font-bold text-deepPlum mb-6">
                Nuestros Servicios
              </h3>
              <ul className="space-y-4">
                {pillar.services.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blush flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-purple" />
                    </div>
                    <span className="text-mauve">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-card">
              <h3 className="font-serif text-2xl font-bold text-deepPlum mb-6">
                ¿Por qué elegirnos?
              </h3>
              <ul className="space-y-4">
                {pillar.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-roseGold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-roseGold" />
                    </div>
                    <span className="text-mauve">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Partner Institutions - Only for Education */}
          {isEducation && (
            <div className="bg-lavender rounded-2xl p-8 lg:p-12">
              <div className="text-center mb-10">
                <h3 className="font-serif text-3xl font-bold text-deepPlum mb-4">
                  Instituciones Aliadas
                </h3>
                <p className="text-mauve max-w-2xl mx-auto">
                  Colaboramos con las mejores instituciones para brindarte una 
                  formación de excelencia y reconocimiento internacional.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {pillarData.educacion.partners?.map((partner, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
