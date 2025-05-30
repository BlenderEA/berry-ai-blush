
import React from 'react';
import { Button } from '@/components/ui/button';

const MutationHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-black"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-green-500/10 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-500/10 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Welcome Text */}
        <div className="mb-8">
          <p className="text-green-400 text-xl md:text-2xl font-mono mb-4 animate-glow">
            🔬 "Welcome to the Mutation. The kennel doors are open."
          </p>
        </div>

        {/* Main Mutant Head */}
        <div className="mb-12">
          <div className="text-8xl md:text-9xl mb-8 animate-pulse glitch-text">
            🐕‍🦺
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button className="acid-button text-xl px-12 py-6 animate-pulse">
            MINT NOW
          </Button>
          
          <a 
            href="https://t.me/+wIYulrAnMM4xMGY0" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button className="bg-pink-500 hover:bg-pink-600 text-white text-xl px-12 py-6 border-0 font-mono font-bold glitch-text">
              JOIN THE PACK 📱
            </Button>
          </a>
        </div>

        {/* Rotating Text Info */}
        <div className="space-y-4 text-gray-300 font-mono">
          <div className="flex flex-wrap justify-center gap-4 text-lg md:text-xl">
            <span className="text-green-400 animate-glow">500 Acid Muttz</span>
            <span className="text-pink-500">|</span>
            <span className="text-green-400 animate-glow">NFT Experiment</span>
            <span className="text-pink-500">|</span>
            <span className="text-green-400 animate-glow">Solana-Powered</span>
            <span className="text-pink-500">|</span>
            <span className="text-green-400 animate-glow">Designed to Devolve</span>
          </div>
        </div>

        {/* Community Call to Action */}
        <div className="mt-16 p-6 border border-pink-500/30 bg-pink-500/10 rounded-lg max-w-2xl mx-auto">
          <h3 className="text-pink-500 text-2xl font-bold font-mono mb-4 glitch-text">
            🧪 JOIN THE MUTATION LAB
          </h3>
          <p className="text-gray-300 font-mono mb-6">
            Connect with fellow mutants, get exclusive updates, and witness the chaos unfold in real-time.
          </p>
          <a 
            href="https://t.me/+wIYulrAnMM4xMGY0" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold px-8 py-4 text-lg border-0">
              ENTER TELEGRAM LAB 🔬
            </Button>
          </a>
        </div>
      </div>

      {/* Glitch overlay */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-pink-500 opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </section>
  );
};

export default MutationHero;
