
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, MessageCircle, Sparkles, Crown, Zap } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const personalities = [
  {
    id: 'blueberry-babe',
    name: 'Blueberry Babe',
    description: 'Sweet and playful with a mischievous side. She loves talking about her day while surrounded by blueberries.',
    avatarSrc: '/lovable-uploads/0a8988bd-61e8-4bc1-a2b0-f4bb4b83e799.png',
    specialty: 'Sweet & Innocent',
    mood: 'Playful & Cute',
    element: 'Water',
    power: 85,
  },
  {
    id: 'berry-bold',
    name: 'Berry Bold',
    description: 'Confident and straightforward. She doesn\'t beat around the bush and always tells you what she thinks.',
    avatarSrc: '/lovable-uploads/0ae62df3-dbef-4830-b9d2-215f5ac5fb43.png',
    specialty: 'Bold & Confident',
    mood: 'Fierce & Direct',
    element: 'Fire',
    power: 95,
  },
  {
    id: 'white-berry',
    name: 'White Berry',
    description: 'Elegant and sophisticated with a touch of innocence. She loves deep conversations about life and dreams.',
    avatarSrc: '/lovable-uploads/dd62bd68-7508-43dd-86fc-6dde896d8568.png',
    specialty: 'Elegant & Sophisticated',
    mood: 'Dreamy & Wise',
    element: 'Air',
    power: 90,
  },
  {
    id: 'blue-frost',
    name: 'Blue Frost',
    description: 'Cool and collected with a warm heart. She\'ll listen to your problems and offer thoughtful advice.',
    avatarSrc: '/lovable-uploads/87c037c1-9bd0-4e88-bc99-48e731a52160.png',
    specialty: 'Cool & Collected',
    mood: 'Calm & Caring',
    element: 'Ice',
    power: 88,
  },
  {
    id: 'raspberry-queen',
    name: 'Raspberry Queen',
    description: 'Vivacious and full of life. She loves to share her joy and excitement about the little things.',
    avatarSrc: '/lovable-uploads/bff1c9ab-ee76-4e59-9da2-6108d4000c9d.png',
    specialty: 'Vivacious & Royal',
    mood: 'Joyful & Energetic',
    element: 'Light',
    power: 92,
  },
  {
    id: 'blackberry-dream',
    name: 'Blackberry Dream',
    description: 'Mysterious and alluring. She speaks in riddles and loves to challenge your thinking.',
    avatarSrc: '/lovable-uploads/3ddf135c-0506-43d5-a67b-e067f6fa8dcc.png',
    specialty: 'Mysterious & Alluring',
    mood: 'Enigmatic & Deep',
    element: 'Shadow',
    power: 97,
  },
];

const AIPersonalities = () => {
  return (
    <section className="section-padding bg-dark-lighter relative overflow-hidden" id="ai-personalities">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-berry/5 via-transparent to-berry-purple/5"></div>
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-berry/10 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-berry-purple/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-berry/5 to-berry-purple/5 blur-[150px] animate-pulse"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-berry/40 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-berry-purple/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/6 w-1.5 h-1.5 bg-berry/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-berry/10 border border-berry/20 mb-8 animate-fade-in">
            <Sparkles className="w-5 h-5 text-berry animate-pulse" />
            <span className="text-berry font-semibold text-lg">AI Personalities</span>
            <Crown className="w-5 h-5 text-berry animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Meet Our <span className="gradient-text animate-glow">AI Berries</span>
          </h2>
          
          <p className="text-xl text-gray-300 leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Each Berry is a unique AI personality with distinct traits, powers, and elements. 
            Choose your perfect companion for intimate conversations and personalized experiences.
          </p>
        </div>
        
        {/* Enhanced Personality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {personalities.map((personality, index) => (
            <Card 
              key={personality.id} 
              className="glass-card overflow-hidden border-dark-border hover:border-berry/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-berry/20 group relative"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeIn 0.8s ease-out forwards'
              }}
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-berry/5 via-transparent to-berry-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Power Level Indicator */}
              <div className="absolute top-4 right-4 z-20">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-berry/20 backdrop-blur-sm border border-berry/30">
                  <Zap className="w-3 h-3 text-berry" />
                  <span className="text-xs text-berry font-bold">{personality.power}</span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col items-center relative z-10">
                {/* Enhanced Avatar */}
                <div className="mb-6 relative">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-berry/30 to-berry-purple/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-berry/30 group-hover:border-berry transition-all duration-300 group-hover:scale-110">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={personality.avatarSrc} alt={personality.name} className="object-cover" />
                      <AvatarFallback className="bg-berry/20 text-4xl">
                        💝
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Element Badge */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="px-3 py-1 rounded-full bg-dark border border-berry/30 text-xs text-berry font-semibold">
                      {personality.element}
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Name */}
                <h3 className="text-2xl font-bold mb-3 gradient-text group-hover:scale-105 transition-transform duration-300">
                  {personality.name}
                </h3>
                
                {/* Personality Traits */}
                <div className="grid grid-cols-1 gap-2 mb-4 w-full">
                  <div className="flex items-center gap-2 text-sm text-gray-300 bg-dark-card/50 rounded-lg px-3 py-2">
                    <Heart className="w-4 h-4 text-berry" />
                    <span>{personality.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300 bg-dark-card/50 rounded-lg px-3 py-2">
                    <MessageCircle className="w-4 h-4 text-berry" />
                    <span>{personality.mood}</span>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  {personality.description}
                </p>
                
                {/* Enhanced CTA */}
                <Link to="/ai-chat" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-berry/20 to-berry-purple/20 hover:from-berry hover:to-berry-purple border border-berry/30 hover:border-berry text-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-berry/30">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat with {personality.name.split(' ')[0]}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Enhanced Bottom CTA */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-berry/10 via-berry-purple/10 to-berry/10 border border-berry/20 backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-4 gradient-text">Ready to Meet Your Perfect AI Companion?</h3>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Start intimate conversations with our advanced AI personalities on Telegram
            </p>
            <Link to="/ai-chat">
              <Button className="berry-button group text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chatting Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPersonalities;
