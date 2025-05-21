
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PersonalityType, personalities } from '@/types/chat';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import PersonalitySelector from '@/components/chat/PersonalitySelector';
import PremiumFeatures from '@/components/chat/PremiumFeatures';
import { useAIChat } from '@/hooks/use-ai-chat';

const AIChat = () => {
  const [searchParams] = useSearchParams();
  const personality = (searchParams.get('personality') || 'default') as PersonalityType;
  const { messages, isLoading, sendMessage } = useAIChat(personality);
  
  // Get current personality
  const currentPersonality = personalities[personality];

  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Chat Container */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <img
                  src={currentPersonality.avatar}
                  alt={currentPersonality.name}
                  className="w-10 h-10 rounded-full"
                />
                <h1 className="text-2xl font-bold gradient-text">
                  {currentPersonality.name}
                </h1>
              </div>
              
              {/* Personality Selector */}
              <PersonalitySelector selectedPersonality={personality} />
              
              {/* Chat Messages */}
              <Card className="mb-4 flex-grow bg-dark-card border-dark-border">
                <CardContent className="p-0"> {/* Remove padding, it's handled by ChatMessages */}
                  <ChatMessages messages={messages} isLoading={isLoading} />
                </CardContent>
              </Card>
              
              {/* Chat Input */}
              <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
            </div>
            
            {/* Right Sidebar - Premium Features */}
            <PremiumFeatures />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIChat;
