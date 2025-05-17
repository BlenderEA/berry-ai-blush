
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const personalities = [
  {
    id: 'blueberry-babe',
    name: 'Blueberry Babe',
    description: 'Sweet and playful with a mischievous side. She loves talking about her day while surrounded by blueberries.',
    avatarSrc: '/lovable-uploads/0a8988bd-61e8-4bc1-a2b0-f4bb4b83e799.png',
    avatarColor: 'bg-blue-300',
    avatarText: '💙',
  },
  {
    id: 'berry-bold',
    name: 'Berry Bold',
    description: 'Confident and straightforward. She doesn\'t beat around the bush and always tells you what she thinks.',
    avatarSrc: '/lovable-uploads/0ae62df3-dbef-4830-b9d2-215f5ac5fb43.png',
    avatarColor: 'bg-blue-400',
    avatarText: '😎',
  },
  {
    id: 'white-berry',
    name: 'White Berry',
    description: 'Elegant and sophisticated with a touch of innocence. She loves deep conversations about life and dreams.',
    avatarSrc: '/lovable-uploads/dd62bd68-7508-43dd-86fc-6dde896d8568.png',
    avatarColor: 'bg-indigo-200',
    avatarText: '✨',
  },
  {
    id: 'blue-frost',
    name: 'Blue Frost',
    description: 'Cool and collected with a warm heart. She\'ll listen to your problems and offer thoughtful advice.',
    avatarSrc: '/lovable-uploads/87c037c1-9bd0-4e88-bc99-48e731a52160.png',
    avatarColor: 'bg-blue-500',
    avatarText: '❄️',
  },
  {
    id: 'raspberry-queen',
    name: 'Raspberry Queen',
    description: 'Vivacious and full of life. She loves to share her joy and excitement about the little things.',
    avatarSrc: '/lovable-uploads/bff1c9ab-ee76-4e59-9da2-6108d4000c9d.png',
    avatarColor: 'bg-pink-400',
    avatarText: '👑',
  },
  {
    id: 'blackberry-dream',
    name: 'Blackberry Dream',
    description: 'Mysterious and alluring. She speaks in riddles and loves to challenge your thinking.',
    avatarSrc: '/lovable-uploads/3ddf135c-0506-43d5-a67b-e067f6fa8dcc.png',
    avatarColor: 'bg-purple-400',
    avatarText: '🌙',
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
            <Card key={personality.id} className="glass-card overflow-hidden border-dark-border hover:border-berry/30 transition-all duration-300 hover:-translate-y-1">
              <div className="p-6 flex flex-col items-center">
                <div className="mb-4 relative w-24 h-24 rounded-full overflow-hidden border-2 border-berry/30">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={personality.avatarSrc} alt={personality.name} className="object-cover" />
                    <AvatarFallback className={`${personality.avatarColor} text-4xl`}>
                      {personality.avatarText}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-2xl font-bold mb-2">{personality.name}</h3>
                <p className="text-gray-300 text-center mb-6">
                  {personality.description}
                </p>
                <Link to={`/ai-chat?personality=${personality.id}`} className="mt-auto w-full">
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
