
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const personalities = [
  {
    id: 'sweet-berry',
    name: 'Sweet Berry',
    description: 'The girl next door with a hidden wild side. Sweet, innocent, but always ready to surprise you.',
    avatarColor: 'bg-purple-300',
    avatarText: '💋',
  },
  {
    id: 'sassy-berry',
    name: 'Sassy Berry',
    description: 'Bold, confident, and always speaks her mind. She\'ll tease you and keep you on your toes.',
    avatarColor: 'bg-pink-400',
    avatarText: '😈',
  },
  {
    id: 'spicy-berry',
    name: 'Spicy Berry',
    description: 'The adventurous one who loves to push boundaries. Intense, passionate, and always direct.',
    avatarColor: 'bg-red-400',
    avatarText: '🔥',
  },
];

const AIPersonalities = () => {
  return (
    <section className="section-padding bg-dark-lighter relative" id="ai-personalities">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-berry/10 blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-berry-purple/10 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our <span className="gradient-text">AI Berries</span></h2>
          <p className="text-lg text-gray-300">
            Our AI personalities are designed to entertain, engage, and provide a unique experience. 
            Each has their own distinct personality and style.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {personalities.map((personality) => (
            <Card key={personality.id} className="glass-card overflow-hidden border-dark-border hover:border-berry/30 transition-all duration-300">
              <div className="p-6 flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full ${personality.avatarColor} flex items-center justify-center text-4xl mb-4`}>
                  {personality.avatarText}
                </div>
                <h3 className="text-2xl font-bold mb-2">{personality.name}</h3>
                <p className="text-gray-300 text-center mb-6">
                  {personality.description}
                </p>
                <Link to="/ai-chat" className="mt-auto w-full">
                  <Button variant="outline" className="w-full border-gray-700 hover:bg-dark-card hover:text-berry">
                    Chat Now
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/ai-chat">
            <Button className="berry-button group">
              Explore All AI Personalities
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AIPersonalities;
