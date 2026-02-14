import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+52 (55) 1234-5678',
    href: 'tel:+525512345678',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@eleganciagral.com',
    href: 'mailto:info@eleganciagral.com',
  },
  {
    icon: MapPin,
    label: 'Dirección',
    value: 'Av. Reforma 123, Ciudad de México',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Horario',
    value: 'Lunes a Viernes: 9:00 - 18:00',
    href: '#',
  },
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/525512345678' },
];

const services = [
  { value: 'eventos', label: 'Organización de Eventos' },
  { value: 'gastronomia', label: 'Gastronomía' },
  { value: 'belleza', label: 'Belleza' },
  { value: 'educacion', label: 'Academia & Educación' },
  { value: 'otro', label: 'Otro' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: '¡Mensaje enviado!',
      description: 'Nos pondremos en contacto contigo pronto.',
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contacto"
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
            Contacto
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-deepPlum mb-4">
            Estamos aquí para <span className="text-roseGold">ayudarte</span>
          </h2>
          <p className="text-lg text-mauve max-w-2xl mx-auto">
            Contáctanos por cualquiera de nuestros canales. Estamos listos 
            para atenderte y resolver todas tus dudas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`bg-white rounded-2xl p-8 shadow-card transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <h3 className="font-serif text-2xl font-bold text-deepPlum mb-6">
              Envíanos un mensaje
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    className="border-gray-200 focus:border-purple focus:ring-purple"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                    className="border-gray-200 focus:border-purple focus:ring-purple"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(55) 1234-5678"
                    className="border-gray-200 focus:border-purple focus:ring-purple"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Servicio de interés</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, service: value }))}
                  >
                    <SelectTrigger className="border-gray-200 focus:border-purple focus:ring-purple">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  rows={5}
                  required
                  className="border-gray-200 focus:border-purple focus:ring-purple resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple hover:bg-purple-light text-white rounded-full py-6 text-lg font-semibold shadow-button transition-all duration-200 hover:scale-[1.02] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Enviar mensaje
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className={`space-y-8 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="group bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blush flex items-center justify-center mb-4 group-hover:bg-purple transition-colors">
                      <Icon className="w-6 h-6 text-purple group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-sm text-mauve mb-1">{item.label}</p>
                    <p className="font-medium text-deepPlum">{item.value}</p>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl p-6 shadow-card">
              <h4 className="font-serif text-lg font-bold text-deepPlum mb-4">
                Síguenos en redes
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-lavender flex items-center justify-center text-purple hover:bg-purple hover:text-white transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/525512345678"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div>
                  <p className="font-semibold text-lg">¿Prefieres WhatsApp?</p>
                  <p className="text-white/80">Escríbenos y te respondemos inmediatamente</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
