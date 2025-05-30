
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const MutationHero = () => {
  const [rotatingText, setRotatingText] = useState(0);
  
  const rotatingTexts = [
    "500 ACID MUTTZ",
    "NFT EXPERIMENT", 
    "SOLANA-POWERED",
    "DESIGNED TO DEVOLVE"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingText((prev) => (prev + 1) % rotatingTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden pt-20 flex items-center bg-black">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-green-500/20 blur-[100px] animate-pulse mutation-glow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-pink-500/20 blur-[100px] animate-pulse mutation-glow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-[120px] animate-pulse"></div>
        
        {/* Floating mutation particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-bounce glitch-particle"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-500 rounded-full animate-bounce glitch-particle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce glitch-particle" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Warning Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-green-500/50 bg-green-500/10 mb-8 animate-fade-in glitch-border">
            <span className="text-sm text-green-400 font-mono uppercase tracking-wider">🔬 MUTATION IN PROGRESS</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in glitch-text" style={{ animationDelay: '0.2s' }}>
            <span className="text-green-400">WELCOME TO THE </span> 
            <br />
            <span className="text-pink-500 mutation-text">MUTATION</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed animate-fade-in font-mono" style={{ animationDelay: '0.4s' }}>
            <span className="text-green-400">THE KENNEL DOORS ARE OPEN.</span>
          </p>

          {/* Massive Mutant Head Placeholder */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative max-w-md mx-auto">
              <img 
                src="/lovable-uploads/db853ab8-81c3-4cdb-a3f7-69db2f7ca1a7.png" 
                alt="Acid Muttz"
                className="w-full h-auto mutation-image animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
          
          {/* Rotating Text */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="text-lg md:text-xl text-green-400 font-mono tracking-wider mutation-text">
              {rotatingTexts[rotatingText]}
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Button className="acid-button mint-button group min-w-[200px] text-lg py-4 px-8">
              <span className="relative z-10 flex items-center">
                🧬 MINT NOW
              </span>
            </Button>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="p-6 rounded-lg bg-green-500/10 border border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1 mutation-card">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2 font-mono">500</div>
              <div className="text-gray-300 font-mono text-sm">TOTAL MUTTZ</div>
            </div>
            
            <div className="p-6 rounded-lg bg-pink-500/10 border border-pink-500/30 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1 mutation-card">
              <div className="text-3xl md:text-4xl font-bold text-pink-500 mb-2 font-mono">69</div>
              <div className="text-gray-300 font-mono text-sm">MUTATION LEVELS</div>
            </div>
            
            <div className="p-6 rounded-lg bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 mutation-card">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 font-mono">∞</div>
              <div className="text-gray-300 font-mono text-sm">CHAOS FACTOR</div>
            </div>

            <div className="p-6 rounded-lg bg-yellow-500/10 border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-1 mutation-card">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 font-mono">$00ZE</div>
              <div className="text-gray-300 font-mono text-sm">MEMECOIN</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MutationHero;
