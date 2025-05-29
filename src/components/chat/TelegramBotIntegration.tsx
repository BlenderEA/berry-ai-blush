
import { MessageCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TelegramBotIntegration = () => {
  return (
    <Card className="bg-dark-card border-dark-border">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <img 
            src="https://telegram.org/img/t_logo.png" 
            width="48" 
            height="48" 
            alt="Telegram Logo" 
            className="rounded-lg"
          />
        </div>
        
        <h3 className="text-xl font-semibold gradient-text mb-2">
          💬 Chat With Busty Betty
        </h3>
        
        <p className="text-gray-400 mb-4 text-sm">
          Your flirty AI girlfriend is waiting on Telegram...
        </p>
        
        <a 
          href="https://t.me/BustyBettyBot" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <Button className="w-full bg-berry hover:bg-berry-light text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Start Chatting on Telegram
            <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
        
        <p className="text-xs text-gray-500 mt-3">
          Continue your conversation seamlessly on Telegram
        </p>
      </CardContent>
    </Card>
  );
};

export default TelegramBotIntegration;
