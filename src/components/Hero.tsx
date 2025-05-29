
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Star, Users, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden pt-20 flex items-center">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-berry/20 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-berry-purple/20 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-berry/10 to-berry-purple/10 blur-[120px] animate-pulse"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-berry rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-berry-purple rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-berry rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-berry/10 border border-berry/20 mb-8 animate-fade-in">
            <Star className="w-4 h-4 text-berry" />
            <span className="text-sm text-berry font-medium">The Juiciest Memecoin on Solana</span>
            <TrendingUp className="w-4 h-4 text-berry" />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold mb-8 leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="gradient-text">Decentralizing </span> 
            <br className="md:hidden" />
            <span className="text-white">the Creator</span>
            <br />
            <span className="text-berry">Economy</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            BustyBerry is a revolutionary <span className="text-berry font-semibold">blockchain-based platform</span> empowering 
            adult content creators on Solana with <span className="text-berry-purple font-semibold">ultra-low fees</span>, 
            creator ownership, and community governance.
          </p>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/token">
              <Button className="berry-button group min-w-[200px] text-lg py-4 px-8 relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Buy $BUSTY
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-berry-light to-berry opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
            
            <Link to="/ai-chat">
              <Button variant="outline" className="secondary-button min-w-[200px] text-lg py-4 px-8 group border-2 border-berry/30 hover:border-berry">
                <span className="flex items-center">
                  💬 AI Chat
                  <span className="ml-2 text-xs bg-berry px-2 py-1 rounded-full text-white">HOT</span>
                </span>
              </Button>
            </Link>
          </div>
          
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link to="/token" className="inline-flex items-center text-berry hover:text-berry-hover transition-colors group">
              <BookOpen className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="underline underline-offset-4 text-lg">Learn about $BUSTY tokenomics</span>
            </Link>
          </div>
          
          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="p-6 rounded-2xl bg-dark-lighter/50 border border-dark-border/50 hover:border-berry/30 transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl md:text-4xl font-bold text-berry mb-2">2-5%</div>
              <div className="text-gray-300">Platform fees vs 20-30% traditional</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-dark-lighter/50 border border-dark-border/50 hover:border-berry/30 transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl md:text-4xl font-bold text-berry-purple mb-2">138</div>
              <div className="text-gray-300">Exclusive NFTitties collection</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-dark-lighter/50 border border-dark-border/50 hover:border-berry/30 transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">AI</div>
              <div className="text-gray-300">Powered chat personalities</div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <div className="flex items-center justify-center gap-8 opacity-70">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-berry" />
                <span className="text-gray-400">400+ Community Members</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-dark-border"></div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-berry" />
                <span className="text-gray-400">Built on Solana</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
