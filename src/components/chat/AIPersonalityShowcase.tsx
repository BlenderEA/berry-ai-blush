
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, Image, MessageCircle, Sparkles } from 'lucide-react';

const personalities = [
  {
    id: 'blueberry-babe',
    name: 'Blueberry Babe',
    description: 'Sweet & playful AI who loves creating cute berry-themed images for you! 💙',
    avatarSrc: '/lovable-uploads/0a8988bd-61e8-4bc1-a2b0-f4bb4b83e799.png',
    specialty: 'Cute & Sweet Images',
    mood: 'Playful & Adorable'
  },
  {
    id: 'berry-bold',
    name: 'Berry Bold',
    description: 'Confident AI girlfriend who creates bold, stunning visuals that match her personality! 😎',
    avatarSrc: '/lovable-uploads/0ae62df3-dbef-4830-b9d2-215f5ac5fb43.png',
    specialty: 'Bold & Confident Art',
    mood: 'Fierce & Direct'
  },
  {
    id: 'white-berry',
    name: 'White Berry',
    description: 'Elegant AI who specializes in sophisticated, dreamy images and deep conversations ✨',
    avatarSrc: '/lovable-uploads/dd62bd68-7508-43dd-86fc-6dde896d8568.png',
    specialty: 'Elegant & Dreamy',
    mood: 'Sophisticated & Thoughtful'
  }
];

const AIPersonalityShowcase = () => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Choose Your AI Girlfriend 💕
        </h2>
        <p className="text-gray-400">
          Each personality creates unique, personalized images based on your conversations
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {personalities.map((personality) => (
          <Card key={personality.id} className="bg-dark-card border-dark-border hover:border-berry/50 transition-all duration-300 hover:-translate-y-2 group">
            <CardContent className="p-6">
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-2 border-berry/30 group-hover:border-berry transition-colors">
                    <AvatarImage src={personality.avatarSrc} alt={personality.name} className="object-cover" />
                    <AvatarFallback className="bg-berry/20 text-2xl">💝</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 bg-berry rounded-full p-1">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Name */}
              <h3 className="text-xl font-bold text-center gradient-text mb-2">
                {personality.name}
              </h3>
              
              {/* Description */}
              <p className="text-gray-300 text-center text-sm mb-4">
                {personality.description}
              </p>
              
              {/* Features */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Image className="w-4 h-4 text-berry" />
                  <span>{personality.specialty}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Heart className="w-4 h-4 text-berry" />
                  <span>{personality.mood}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <MessageCircle className="w-4 h-4 text-berry" />
                  <span>24/7 Available on Telegram</span>
                </div>
              </div>
              
              {/* CTA Button */}
              <a 
                href="https://t.me/BustyBettyBot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-berry/20 hover:bg-berry border border-berry text-white transition-all duration-300">
                  Chat Now 💬
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIPersonalityShowcase;
