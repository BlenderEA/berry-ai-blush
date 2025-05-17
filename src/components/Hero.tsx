
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden pt-20 flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-berry/20 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-berry-purple/20 blur-[100px] animate-pulse-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            <span className="gradient-text">The Juiciest </span> 
            <span className="text-white">Memecoin with AI Spice</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            $BUSTYBERRY combines the thrilling world of Solana memecoins with
            enticing AI chat personalities that will keep you coming back for more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/token">
              <Button className="berry-button group min-w-[180px]">
                Buy $BUSTYBERRY
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/ai-chat">
              <Button variant="outline" className="secondary-button min-w-[180px]">
                Meet Our AI Berries
              </Button>
            </Link>
          </div>
          
          <div className="mt-12">
            <div className="inline-block p-2 px-4 rounded-full bg-dark-lighter border border-dark-border">
              <p className="text-sm md:text-base text-gray-300">
                <span className="text-berry font-medium">30,000+</span> holders and growing!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
