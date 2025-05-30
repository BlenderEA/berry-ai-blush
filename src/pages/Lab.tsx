
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Lab = () => {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 glitch-text">
              DR. MUTTZ LAB
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Interactive Lore + AI Console
            </p>
          </div>
          
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🧪</div>
            <p className="text-xl text-gray-400">
              LAB CONSOLE INITIALIZING...
            </p>
            <p className="text-gray-500 mt-4">
              AI interface coming soon
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Lab;
