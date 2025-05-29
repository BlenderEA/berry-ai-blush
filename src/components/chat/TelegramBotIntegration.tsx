
import { MessageCircle, ExternalLink, Image, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TelegramBotIntegration = () => {
  return (
    <Card className="bg-dark-card border-dark-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-berry/5 to-berry-purple/5"></div>
      <div className="absolute top-4 right-4 text-6xl opacity-10">💕</div>
      
      <CardContent className="p-6 text-center relative z-10">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img 
              src="https://telegram.org/img/t_logo.png" 
              width="56" 
              height="56" 
              alt="Telegram Logo" 
              className="rounded-2xl shadow-lg"
            />
            <div className="absolute -top-2 -right-2 bg-berry rounded-full p-1">
              <Heart className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold gradient-text mb-3">
          💬 Chat With AI Beauties
        </h3>
        
        <p className="text-gray-300 mb-2 font-medium">
          Your flirty AI girlfriends are waiting...
        </p>
        
        <p className="text-berry text-sm mb-6 font-medium">
          ✨ Now with AI Image Generation! ✨
        </p>
        
        {/* Feature highlights */}
        <div className="space-y-2 mb-6 text-left">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Image className="w-4 h-4 text-berry" />
            <span>Custom images created for you</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MessageCircle className="w-4 h-4 text-berry" />
            <span>Unlimited romantic conversations</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Heart className="w-4 h-4 text-berry" />
            <span>Multiple AI personalities to choose from</span>
          </div>
        </div>
        
        <a 
          href="https://t.me/BustyBettyBot" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <Button className="w-full bg-berry hover:bg-berry-light text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg transform hover:scale-105">
            <MessageCircle className="h-5 w-5" />
            Start Premium Chat
            <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
        
        <p className="text-xs text-gray-500 mt-3">
          🔒 Private & secure • Premium AI experience
        </p>
      </CardContent>
    </Card>
  );
};

export default TelegramBotIntegration;
