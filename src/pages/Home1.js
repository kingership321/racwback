import HeroSection from './HeroSection'
import Quote from './Quote';
import PresidentSection from './PresidentSection';
import StatsSection from './StatsCard';
import ThemeSection from './ThemeSection'
import BlurredSection from './BlurredSection'

import './Home1.css';

function Home() {

  return (
    <div className="home">
      {/* Hero Banner Section */}
      <HeroSection />
      
      {/* Quote Section */}
      <Quote />

      {/* President Section */}
      <PresidentSection />

      {/* Theme Section */}
      <ThemeSection />
  
      {/* Stats Section */}
      <StatsSection />

      {/* Blurred Section */}
      <BlurredSection />
    </div>
  );
}

export default Home;