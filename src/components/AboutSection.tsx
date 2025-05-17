
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign, MessageCircle } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="section-padding relative" id="about">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What is <span className="gradient-text">Busty Berry</span>?</h2>
          <p className="text-lg text-gray-300">
            Busty Berry brings together the exciting world of memecoin investments with 
            adult-themed AI personalities, creating a unique ecosystem where fun meets gains.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="glass-card hover:border-berry/30 transition-all hover:-translate-y-1 duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-berry/20 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-berry" />
              </div>
              <CardTitle className="text-2xl">Memecoin With Potential</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                $BUSTYBERRY isn't just another memecoin. Built on the Solana blockchain for lightning-fast 
                transactions and minimal fees, our token combines virality with real utility through our
                AI chat platform. Our tokenomics are designed with community growth and sustainability in mind.
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card hover:border-berry/30 transition-all hover:-translate-y-1 duration-300">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-berry/20 flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-berry" />
              </div>
              <CardTitle className="text-2xl">AI Chat Personalities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Our platform features multiple AI personalities, each with their own unique character and style. 
                From sweet and innocent to bold and spicy, our AI Berries are here to entertain and engage. 
                Experience interactive conversations that push the boundaries of AI technology in an adult-themed 
                environment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
