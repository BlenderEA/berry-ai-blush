
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const LorePreview = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4 font-mono glitch-text">
              QUICK LORE PREVIEW
            </h2>
          </div>

          {/* Comic Panel */}
          <div className="relative">
            <div className={`comic-panel transition-all duration-500 ${isOpen ? 'expanded' : 'collapsed'}`}>
              <div className="p-8 bg-gradient-to-br from-green-500/20 to-pink-500/20 border-2 border-green-500/50 rounded-lg relative overflow-hidden">
                {/* Comic book style border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-pulse"></div>
                
                <div className="relative z-10">
                  <div className="text-center">
                    <div className="inline-block bg-black/80 px-6 py-3 rounded border border-green-500/50 mb-6">
                      <span className="text-green-400 font-mono text-lg tracking-wider">GENESIS PROTOCOL</span>
                    </div>
                  </div>

                  <div className="text-center text-xl md:text-2xl text-gray-300 font-mono leading-relaxed mb-6">
                    <span className="text-pink-500">"In a world melted by greed and radiation…</span>
                    <br />
                    <span className="text-green-400">only the Muttz survived."</span>
                  </div>

                  {isOpen && (
                    <div className="animate-fade-in space-y-4 text-gray-300 font-mono">
                      <p>
                        The year is 2087. The <span className="text-green-400">Acid Wars</span> have left Earth a wasteland of 
                        neon ruins and radioactive storms. In the abandoned laboratories of <span className="text-pink-500">Dr. Muttz</span>, 
                        something stirred in the darkness...
                      </p>
                      
                      <p>
                        500 experimental canines, exposed to decades of <span className="text-blue-400">quantum radiation</span> and 
                        <span className="text-yellow-400"> corrupted code</span>, began to evolve beyond recognition. 
                        Their DNA twisted, their consciousness expanded, their loyalty... questionable.
                      </p>
                      
                      <p className="text-green-400 text-center font-bold">
                        🧬 THE MUTATION HAS BEGUN 🧬
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Toggle Button */}
            <div className="text-center mt-6">
              <Button
                onClick={() => setIsOpen(!isOpen)}
                className="acid-button"
              >
                {isOpen ? (
                  <>
                    COLLAPSE LORE <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    EXPAND LORE <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LorePreview;
