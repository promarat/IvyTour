import React from 'react';
import HeroSection from './HeroSection';
import { FeatureSection } from './FeatureSection';
import { PartnerSection } from './PartnerSection';
import { FreeTourSection } from './FreeTourSection';
import Footer from '../../components/footer/Footer';

const HomeScreen = () => {
  return (
    <>
      <HeroSection />
      <div className="sm:mt-[-40px] md:mt-[-60px] lg:mt-[-80px]">
        <FeatureSection />
      </div>
      <PartnerSection />
      <FreeTourSection />
      <Footer />
    </>
  );
}

export default HomeScreen;
