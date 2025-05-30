
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MutationHero from '@/components/MutationHero';
import LorePreview from '@/components/LorePreview';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <Header />
      <main>
        <MutationHero />
        <LorePreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
