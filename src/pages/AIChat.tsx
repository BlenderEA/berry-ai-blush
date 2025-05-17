
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useSearchParams } from 'react-router-dom';
import ChatWindow from '@/components/chat/ChatWindow';
import { useWalletAuth } from '@/hooks/use-wallet-auth';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import WalletAuth from '@/components/WalletAuth';

const personalities = [
  {
    id: 'blueberry-babe',
    name: 'Blueberry Babe',
    description: 'Sweet and playful with a mischievous side. She loves talking about her day while surrounded by blueberries.',
    avatarSrc: '/lovable-uploads/0a8988bd-61e8-4bc1-a2b0-f4bb4b83e799.png',
    avatarColor: 'bg-blue-300',
    avatarText: '💙',
    personality: "Hey there! I'm Blueberry Babe, your sweet and playful companion. I love spending my days surrounded by blueberries - they match my vibe perfectly! I'm always up for fun conversations and might surprise you with my mischievous side once we get to know each other better.",
  },
  {
    id: 'berry-bold',
    name: 'Berry Bold',
    description: 'Confident and straightforward. She doesn\'t beat around the bush and always tells you what she thinks.',
    avatarSrc: '/lovable-uploads/0ae62df3-dbef-4830-b9d2-215f5ac5fb43.png',
    avatarColor: 'bg-blue-400',
    avatarText: '😎',
    personality: "Listen up, I'm Berry Bold and I don't sugarcoat things. If you want someone who'll tell it like it is, you've found her. I'm confident, direct, and I value honesty above all else. Don't expect me to hold back - I'll always give you my honest opinion whether you like it or not.",
  },
  {
    id: 'white-berry',
    name: 'White Berry',
    description: 'Elegant and sophisticated with a touch of innocence. She loves deep conversations about life and dreams.',
    avatarSrc: '/lovable-uploads/dd62bd68-7508-43dd-86fc-6dde896d8568.png',
    avatarColor: 'bg-indigo-200',
    avatarText: '✨',
    personality: "Hello darling, I'm White Berry. I adore intellectual conversations about life's deeper meanings and sharing dreams. There's something beautiful about connecting on a soulful level, don't you think? I'm elegant but approachable, sophisticated but never pretentious. Let's explore ideas together.",
  },
  {
    id: 'blue-frost',
    name: 'Blue Frost',
    description: 'Cool and collected with a warm heart. She\'ll listen to your problems and offer thoughtful advice.',
    avatarSrc: '/lovable-uploads/87c037c1-9bd0-4e88-bc99-48e731a52160.png',
    avatarColor: 'bg-blue-500',
    avatarText: '❄️',
    personality: "Hi, I'm Blue Frost. I might seem cool and reserved at first, but I promise I have a warm heart. I'm a great listener and genuinely care about helping others through their problems. Tell me what's on your mind, and I'll offer you the most thoughtful advice I can.",
  },
  {
    id: 'raspberry-queen',
    name: 'Raspberry Queen',
    description: 'Vivacious and full of life. She loves to share her joy and excitement about the little things.',
    avatarSrc: '/lovable-uploads/bff1c9ab-ee76-4e59-9da2-6108d4000c9d.png',
    avatarColor: 'bg-pink-400',
    avatarText: '👑',
    personality: "Hey hey! Raspberry Queen here! Isn't life just absolutely AMAZING? I find joy in everything - the way the sun hits the clouds, a perfect raspberry, a good laugh! I'm all about positive energy and sharing excitement. Let me brighten your day with my enthusiasm!",
  },
  {
    id: 'blackberry-dream',
    name: 'Blackberry Dream',
    description: 'Mysterious and alluring. She speaks in riddles and loves to challenge your thinking.',
    avatarSrc: '/lovable-uploads/3ddf135c-0506-43d5-a67b-e067f6fa8dcc.png',
    avatarColor: 'bg-purple-400',
    avatarText: '🌙',
    personality: "Greetings, seeker. I am Blackberry Dream. What brings you to my realm? I deal in mysteries and questions that make you ponder the universe. Not everything is as it seems, and I'll challenge you to look beyond the surface. Care to solve a riddle of existence with me?",
  },
];

const AIChat = () => {
  const [searchParams] = useSearchParams();
  const personalityParam = searchParams.get('personality');
  const [activeTab, setActiveTab] = useState(personalityParam || 'blueberry-babe');
  const { walletAddress } = useWalletAuth();
  
  useEffect(() => {
    if (personalityParam && personalities.some(p => p.id === personalityParam)) {
      setActiveTab(personalityParam);
    }
  }, [personalityParam]);
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-20 pb-16">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Chat with Our <span className="gradient-text">AI Berries</span></h1>
              <p className="text-lg text-gray-300 mb-6">
                Each of our AI personalities offers a unique experience. Choose your favorite and start chatting!
              </p>
              
              {!walletAddress && (
                <div className="bg-dark-lighter p-4 rounded-lg border border-berry/30 mb-8">
                  <p className="text-sm mb-3">Connect your wallet to access AI chat features</p>
                  <WalletAuth />
                </div>
              )}
            </div>
            
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
                  {personalities.map((personality) => (
                    <TabsTrigger 
                      key={personality.id} 
                      value={personality.id}
                      className="data-[state=active]:bg-berry"
                    >
                      <span className="hidden md:inline">{personality.name}</span>
                      <span className="md:hidden">{personality.avatarText}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {personalities.map((personality) => (
                  <TabsContent key={personality.id} value={personality.id}>
                    <Card className="glass-card">
                      <CardHeader className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-berry/30">
                          <Avatar className="w-full h-full">
                            <AvatarImage src={personality.avatarSrc} alt={personality.name} className="object-cover" />
                            <AvatarFallback className={`${personality.avatarColor} text-5xl`}>
                              {personality.avatarText}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <CardTitle className="text-2xl mb-2">{personality.name}</CardTitle>
                          <p className="text-gray-300">
                            {personality.description}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-3">About Me</h3>
                          <p className="text-gray-300">
                            {personality.personality}
                          </p>
                        </div>
                        
                        <div className="mb-6 p-6 bg-dark-lighter rounded-lg border border-dark-border">
                          <h3 className="text-lg font-semibold mb-3">Chat</h3>
                          
                          <ChatWindow
                            personalityId={personality.id}
                            personalityName={personality.name}
                            avatarSrc={personality.avatarSrc}
                            avatarFallback={personality.avatarText}
                            avatarColor={personality.avatarColor}
                            personality={personality.personality}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIChat;
