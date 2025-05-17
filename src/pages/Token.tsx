
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BustyBerryChart from '@/components/BustyBerryChart';
import TokenHero from '@/components/TokenHero';
import TokenFAQ from '@/components/TokenFAQ';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HowToBuyTab from '@/components/token/HowToBuyTab';
import TokenomicsTab from '@/components/token/TokenomicsTab';

const Token = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <TokenHero />
            
          {/* Live chart section with DEXScreener */}
          <div className="mb-12">
            <BustyBerryChart />
          </div>
            
          <div className="mb-12">
            <Tabs defaultValue="how-to-buy">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="how-to-buy">How to Buy</TabsTrigger>
                <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
              </TabsList>
                
              <TabsContent value="how-to-buy" className="mt-6">
                <HowToBuyTab />
              </TabsContent>
                
              <TabsContent value="tokenomics" className="mt-6">
                <TokenomicsTab />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-12">
            <TokenFAQ />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Token;
