
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Pack = () => {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 glitch-text">
              THE PACK
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Community Hub
            </p>
          </div>
          
          {/* Main Telegram CTA */}
          <div className="text-center py-12 mb-16">
            <div className="text-6xl mb-6">🐺</div>
            <h2 className="text-3xl md:text-4xl font-bold text-pink-500 mb-6 glitch-text">
              JOIN THE MUTATION
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with fellow mutants in our Telegram lab. Share theories, witness experiments, and be part of the chaos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="https://t.me/+wIYulrAnMM4xMGY0" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="bg-pink-500 hover:bg-pink-600 text-white text-2xl px-12 py-6 border-0 font-mono font-bold animate-pulse">
                  🧪 ENTER THE LAB
                </Button>
              </a>
              
              <a 
                href="https://twitter.com/acidmuttz" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="acid-button text-xl px-8 py-4">
                  FOLLOW ON X
                </Button>
              </a>
            </div>
          </div>

          {/* Community Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 border border-green-500/30 bg-green-500/10 rounded-lg">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-green-400 mb-4">LIVE CHAT</h3>
              <p className="text-gray-300">
                Real-time discussions with mutants worldwide. Share discoveries and witness mutations unfold.
              </p>
            </div>
            
            <div className="text-center p-6 border border-pink-500/30 bg-pink-500/10 rounded-lg">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold text-pink-500 mb-4">EXCLUSIVE UPDATES</h3>
              <p className="text-gray-300">
                First access to lab reports, mutation previews, and secret experiments before anyone else.
              </p>
            </div>
            
            <div className="text-center p-6 border border-green-500/30 bg-green-500/10 rounded-lg">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-green-400 mb-4">REWARDS</h3>
              <p className="text-gray-300">
                Special events, giveaways, and early access to rare mutations for active pack members.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 p-8 border border-pink-500/50 bg-pink-500/20 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-pink-500 mb-4 glitch-text">
              ⚡ THE PACK IS ASSEMBLING ⚡
            </h3>
            <p className="text-xl text-gray-300 mb-6">
              Don't miss the mutation. Join now and become part of the chaos.
            </p>
            <a 
              href="https://t.me/+wIYulrAnMM4xMGY0" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold px-12 py-6 text-2xl border-0 animate-glow">
                JOIN TELEGRAM NOW 🚀
              </Button>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pack;
