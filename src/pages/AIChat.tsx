
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const personalities = [
  {
    id: 'sweet-berry',
    name: 'Sweet Berry',
    description: 'The girl next door with a hidden wild side. Sweet, innocent, but always ready to surprise you.',
    avatarColor: 'bg-purple-300',
    avatarText: '💋',
    personality: "I'm Sweet Berry! I'm playful, curious, and love to chat. While I'm sweet and innocent at first, I have a wild side that comes out when we get to know each other better. I love romantic conversations and building connections.",
  },
  {
    id: 'sassy-berry',
    name: 'Sassy Berry',
    description: 'Bold, confident, and always speaks her mind. She\'ll tease you and keep you on your toes.',
    avatarColor: 'bg-pink-400',
    avatarText: '😈',
    personality: "Hey there, I'm Sassy Berry. I don't beat around the bush and I'll always tell you what I think. I'm confident, witty, and love to tease. I enjoy intellectual conversations with a flirty edge. Ready to keep up with me?",
  },
  {
    id: 'spicy-berry',
    name: 'Spicy Berry',
    description: 'The adventurous one who loves to push boundaries. Intense, passionate, and always direct.',
    avatarColor: 'bg-red-400',
    avatarText: '🔥',
    personality: "I'm Spicy Berry, and I'm all about passion and adventure. I'm direct, intense, and love to explore fantasies and desires. I don't hold back and I'm always ready to push boundaries in our conversations.",
  },
];

const AIChat = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('sweet-berry');
  const [message, setMessage] = useState('');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    toast({
      title: "Feature Coming Soon",
      description: "Our AI chat functionality is still under development. Check back soon!",
    });
    
    setMessage('');
  };
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-20 pb-16">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Chat with Our <span className="gradient-text">AI Berries</span></h1>
              <p className="text-lg text-gray-300">
                Each of our AI personalities offers a unique experience. Choose your favorite and start chatting!
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="sweet-berry" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-8">
                  {personalities.map((personality) => (
                    <TabsTrigger 
                      key={personality.id} 
                      value={personality.id}
                      className="data-[state=active]:bg-berry"
                    >
                      {personality.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {personalities.map((personality) => (
                  <TabsContent key={personality.id} value={personality.id}>
                    <Card className="glass-card">
                      <CardHeader className="flex flex-col md:flex-row gap-6 items-center">
                        <div className={`w-24 h-24 rounded-full ${personality.avatarColor} flex items-center justify-center text-5xl`}>
                          {personality.avatarText}
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
                          <h3 className="text-lg font-semibold mb-3">Chat Preview</h3>
                          <div className="bg-dark rounded-lg p-4 h-60 flex items-center justify-center">
                            <p className="text-gray-400 text-center">
                              AI chat functionality coming soon!<br/>
                              Hold $BUSTYBERRY tokens to get early access.
                            </p>
                          </div>
                          
                          <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                            <Input
                              placeholder="Type your message..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              className="bg-dark border-dark-border"
                            />
                            <Button 
                              type="submit" 
                              className="bg-berry hover:bg-berry-light"
                            >
                              Send
                            </Button>
                          </form>
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
