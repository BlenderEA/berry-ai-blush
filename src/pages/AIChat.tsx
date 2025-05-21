
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, MessageSquare, Image } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

// Define chat message type
type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUrl?: string;
};

// Mock personalities for the AI companion
const personalities = {
  default: {
    name: "Berry Buddy",
    greeting: "Hey there! I'm your Berry Buddy, ready to chat about Busty Berry and the crypto world! What can I help you with today?",
    avatar: "/lovable-uploads/303b3657-5efd-47fc-bdfe-818534132a87.png"
  },
  "raspberry-queen": {
    name: "Raspberry Queen",
    greeting: "Hello darling! Raspberry Queen at your service. Let's talk about Busty Berry, the juiciest token on Solana!",
    avatar: "/lovable-uploads/dd62bd68-7508-43dd-86fc-6dde896d8568.png"
  },
  "crypto-guru": {
    name: "Crypto Guru",
    greeting: "Greetings, seeker of crypto knowledge. The Crypto Guru is here to enlighten you about Busty Berry and the ways of Solana.",
    avatar: "/lovable-uploads/bff1c9ab-ee76-4e59-9da2-6108d4000c9d.png"
  }
};

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const personality = searchParams.get('personality') || 'default';
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Initialize chat with greeting message
  useEffect(() => {
    const currentPersonality = personalities[personality as keyof typeof personalities] || personalities.default;
    setMessages([{
      id: '1',
      role: 'assistant',
      content: currentPersonality.greeting,
      timestamp: new Date(),
    }]);
  }, [personality]);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // For now, we'll simulate a response
      setTimeout(() => {
        const mockResponses = [
          "Busty Berry is mooning today! Have you checked the charts? 🚀",
          "You know what they say about Solana... it's fast, cheap, and never sleeps! Just like me! 😉",
          "Thinking about buying more $BUSTYBERRY? Always a juicy decision!",
          "Did you hear about the Solana developer who walked into a bar? He got his transaction confirmed before he ordered his drink!",
          "Staking your Busty Berry tokens is like planting seeds - watch them grow into a whole berry farm!",
        ];
        
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
      
      // In future: Implement actual API call to chatbot service
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get current personality
  const currentPersonality = personalities[personality as keyof typeof personalities] || personalities.default;

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
              <div className="mb-6">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <a 
                    href="/ai-chat?personality=default" 
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${personality === 'default' ? 'bg-berry text-white' : 'bg-dark-lighter text-gray-300'}`}
                  >
                    Berry Buddy
                  </a>
                  <a 
                    href="/ai-chat?personality=raspberry-queen" 
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${personality === 'raspberry-queen' ? 'bg-berry text-white' : 'bg-dark-lighter text-gray-300'}`}
                  >
                    Raspberry Queen
                  </a>
                  <a 
                    href="/ai-chat?personality=crypto-guru" 
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${personality === 'crypto-guru' ? 'bg-berry text-white' : 'bg-dark-lighter text-gray-300'}`}
                  >
                    Crypto Guru
                  </a>
                </div>
              </div>
              
              {/* Chat Messages */}
              <Card className="mb-4 flex-grow bg-dark-card border-dark-border">
                <CardContent className="p-4 h-[60vh] overflow-y-auto flex flex-col gap-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user' 
                            ? 'bg-berry text-white ml-auto' 
                            : 'bg-dark-lighter text-white'
                        }`}
                      >
                        {message.content}
                        {message.imageUrl && (
                          <img 
                            src={message.imageUrl} 
                            alt="Generated" 
                            className="mt-2 rounded-md max-w-full" 
                          />
                        )}
                        <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-gray-200' : 'text-gray-400'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-dark-lighter text-white rounded-lg p-4 max-w-[80%]">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-berry-light animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-berry-light animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-berry-light animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </CardContent>
              </Card>
              
              {/* Chat Input */}
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-dark-lighter border-dark-border"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-berry hover:bg-berry-light"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Right Sidebar - Coming Features */}
            <div className="w-full md:w-80 space-y-4">
              <Card className="bg-dark-card border-dark-border">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-3 text-berry">Premium Features</h3>
                  <p className="text-sm text-gray-400 mb-4">Connect your wallet to unlock premium features:</p>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-berry" />
                      Unlimited chat messages
                    </li>
                    <li className="flex items-center">
                      <Image className="h-4 w-4 mr-2 text-berry" />
                      AI image generation
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Button className="w-full bg-dark-lighter hover:bg-dark-card border border-dark-border">
                      Connect Wallet
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Only 10 $BUSTYBERRY/month
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-card border-dark-border">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-3 gradient-text">Coming Soon</h3>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• AI Image Generation</li>
                    <li>• Voice Chat</li>
                    <li>• Token Price Alerts</li>
                    <li>• Personalized Memes</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIChat;
