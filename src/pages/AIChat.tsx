
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ChatWindow from '@/components/chat/ChatWindow';

const AIChat = () => {
  // Single AI personality
  const personality = {
    id: 'blueberry-babe',
    name: 'Blueberry Babe',
    description: 'Sweet and playful with a mischievous side. She loves talking about her day while surrounded by blueberries.',
    avatarSrc: '/lovable-uploads/0a8988bd-61e8-4bc1-a2b0-f4bb4b83e799.png',
    avatarColor: 'bg-blue-300',
    avatarText: '💙',
    personality: "Hey there! I'm Blueberry Babe, your sweet and playful companion. I love spending my days surrounded by blueberries - they match my vibe perfectly! I'm always up for fun conversations and might surprise you with my mischievous side once we get to know each other better.",
  };
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-20 pb-16">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Chat with <span className="gradient-text">Blueberry Babe</span></h1>
              <p className="text-lg text-gray-300 mb-6">
                Have a conversation with our sweet and playful AI companion!
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="glass-card">
                <CardHeader className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-berry/30">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={personality.avatarSrc} alt={personality.name} className="object-cover" />
                      <AvatarFallback className={personality.avatarColor}>
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIChat;
