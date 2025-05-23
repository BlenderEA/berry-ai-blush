
import React from 'react';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import AIPersonalities from '@/components/AIPersonalities';
import Tokenomics from '@/components/Tokenomics';
import Community from '@/components/Community';
import AgeVerification from '@/components/AgeVerification';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NFTSection from '@/components/NFTSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <AgeVerification />
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <NFTSection />
        <AIPersonalities />
        <Tokenomics />
        <Community />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
