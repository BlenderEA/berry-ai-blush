
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const NFTSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-berry/20 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-berry-purple/20 blur-[100px] animate-pulse-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">NFTitties</span> Collection
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            More than just spicy eye candy — real utility and rewards based on rarity!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* NFT Preview Image */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-berry to-berry-purple rounded-xl blur opacity-75"></div>
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/2fa7f246-e7e0-42f6-a543-313c3247fa40.png" 
                  alt="NFTitties Collection" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* NFT Info */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">Collection Highlights</h3>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-berry mr-2">•</span>
                <span>138 unique NFTs (69 Vibrant + 69 Pink)</span>
              </li>
              <li className="flex items-start">
                <span className="text-berry mr-2">•</span>
                <span>Rare Topless NFTs with $100k $Busty redemption value</span>
              </li>
              <li className="flex items-start">
                <span className="text-berry mr-2">•</span>
                <span>Ultra-Rare Triple Nipple NFTs with $1M $Busty redemption</span>
              </li>
              <li className="flex items-start">
                <span className="text-berry mr-2">•</span>
                <span>Golden Tickets with special rewards at market cap milestones</span>
              </li>
            </ul>
            
            <div className="flex gap-4">
              <Link to="/nft">
                <Button className="berry-button group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <a 
                href="https://tinyurl.com/BustyBerry" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="secondary-button group">
                  Buy Now
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Rarity Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <Card className="glass-card bg-gradient-to-br from-dark to-dark-lighter border-dark-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="inline-block bg-gray-700 text-white text-xs px-3 py-1 rounded-full mb-4">
                  Common
                </div>
                <h3 className="text-xl font-bold mb-2">Regular NFTs</h3>
                <p className="text-2xl text-berry font-bold">116 Total</p>
                <p className="text-gray-400 text-sm">(58 Vibrant + 58 Pink)</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card bg-gradient-to-br from-dark to-dark-lighter border-dark-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="inline-block bg-purple-700 text-white text-xs px-3 py-1 rounded-full mb-4">
                  Rare
                </div>
                <h3 className="text-xl font-bold mb-2">Topless NFTs</h3>
                <p className="text-2xl text-berry font-bold">20 Total</p>
                <p className="text-gray-400 text-sm">(10 Vibrant + 10 Pink)</p>
                <p className="text-sm text-berry mt-2">$100k $Busty Redemption</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card bg-gradient-to-br from-dark to-dark-lighter border-dark-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs px-3 py-1 rounded-full mb-4">
                  Ultra-Rare
                </div>
                <h3 className="text-xl font-bold mb-2">Triple Nipple NFTs</h3>
                <p className="text-2xl text-berry font-bold">2 Total</p>
                <p className="text-gray-400 text-sm">(1 Vibrant + 1 Pink)</p>
                <p className="text-sm text-berry mt-2">$1M $Busty Redemption</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NFTSection;
