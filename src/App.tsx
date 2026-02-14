import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import Header from './sections/Header';
import Hero from './sections/Hero';
import FourPillars from './sections/FourPillars';
import PillarDetails from './sections/PillarDetails';
import Testimonials from './sections/Testimonials';
import Team from './sections/Team';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const handleSelectPillar = (pillar: string) => {
    setSelectedPillar(pillar);
  };

  const handleClosePillar = () => {
    setSelectedPillar(null);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Toaster position="top-center" richColors />
      <Header />
      <main>
        <Hero />
        <FourPillars onSelectPillar={handleSelectPillar} />
        <Testimonials />
        <Team />
        <Contact />
      </main>
      <Footer />
      <PillarDetails selectedPillar={selectedPillar} onClose={handleClosePillar} />
    </div>
  );
}

export default App;
