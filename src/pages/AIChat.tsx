
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TelegramBotIntegration from '@/components/chat/TelegramBotIntegration';
import PremiumFeatures from '@/components/chat/PremiumFeatures';

const AIChat = () => {
  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-4">
              Chat with Busty Betty
            </h1>
            <p className="text-gray-400 text-lg">
              Connect with our AI personalities through Telegram for the best chatting experience
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {/* Telegram Bot Integration */}
            <div className="flex-1 max-w-md">
              <TelegramBotIntegration />
            </div>
            
            {/* Premium Features */}
            <div className="flex-1 max-w-md">
              <PremiumFeatures />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIChat;
