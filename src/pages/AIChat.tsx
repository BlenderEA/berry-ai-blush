
import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  personality?: string;
};

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
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    'sweet-berry': [],
    'sassy-berry': [],
    'spicy-berry': [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [hasSetApiKey, setHasSetApiKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const generateSystemPrompt = (personalityId: string) => {
    const personality = personalities.find(p => p.id === personalityId);
    return `You are a flirty AI assistant named ${personality?.name}. ${personality?.personality} Always stay in character and respond in a fun, engaging way. Be playful but respectful.`;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (!apiKey && !hasSetApiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Hugging Face API key first.",
      });
      return;
    }

    // Add user message to the chat
    const userMessage: Message = {
      role: 'user',
      content: message,
      personality: activeTab,
    };

    setMessages(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], userMessage],
    }));
    setMessage('');
    setIsLoading(true);

    try {
      // Create conversation history for the API
      const conversationHistory = messages[activeTab].map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Prepare API request
      const response = await fetch('https://api-inference.huggingface.co/models/yukiarimo/yuna-ai-v3-atomic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          inputs: {
            system: generateSystemPrompt(activeTab),
            messages: [
              ...conversationHistory,
              { role: 'user', content: message }
            ]
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Add AI response to chat
      const aiResponse: Message = {
        role: 'assistant',
        content: data.generated_text || "I'm having trouble responding right now. Please try again.",
        personality: activeTab,
      };

      setMessages(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], aiResponse],
      }));
    } catch (error) {
      console.error('Error calling Hugging Face API:', error);
      toast({
        title: "AI Response Error",
        description: "There was an error getting a response. Please try again.",
        variant: "destructive",
      });
      
      // Add error message to chat
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please check your API key or try again later.",
        personality: activeTab,
      };

      setMessages(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], errorMessage],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setHasSetApiKey(true);
      toast({
        title: "API Key Set",
        description: "Your Hugging Face API key has been set. You can now start chatting!",
      });
    } else {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
    }
  };

  const getCurrentPersonality = () => {
    return personalities.find(p => p.id === activeTab);
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
            
            {!hasSetApiKey && (
              <div className="max-w-md mx-auto mb-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Enter Your Hugging Face API Key</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleApiKeySubmit} className="space-y-4">
                      <Input
                        type="password"
                        placeholder="Your Hugging Face API Key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="bg-dark border-dark-border"
                      />
                      <Button type="submit" className="bg-berry hover:bg-berry-light w-full">
                        Set API Key
                      </Button>
                      <p className="text-xs text-gray-400 text-center">
                        Your API key is stored locally and never sent to our servers.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
            
            <div className="max-w-5xl mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                          <h3 className="text-lg font-semibold mb-3">Chat</h3>
                          
                          <div className="bg-dark rounded-lg p-4 h-60 overflow-y-auto mb-4 flex flex-col space-y-4">
                            {messages[personality.id].length > 0 ? (
                              messages[personality.id].map((msg, index) => (
                                <div 
                                  key={index} 
                                  className={`p-3 rounded-lg ${
                                    msg.role === 'user' 
                                      ? 'bg-dark-border self-end' 
                                      : `${personality.avatarColor} bg-opacity-20 self-start`
                                  } max-w-[80%]`}
                                >
                                  {msg.content}
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-400 text-center my-auto">
                                {hasSetApiKey 
                                  ? `Start chatting with ${personality.name}!` 
                                  : "Set your API key to start chatting."}
                              </p>
                            )}
                            <div ref={messagesEndRef} />
                          </div>
                          
                          <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                            <Input
                              placeholder="Type your message..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              className="bg-dark border-dark-border"
                              disabled={isLoading || !hasSetApiKey}
                            />
                            <Button 
                              type="submit" 
                              className="bg-berry hover:bg-berry-light"
                              disabled={isLoading || !hasSetApiKey}
                            >
                              {isLoading ? <Spinner className="mr-2" size="sm" /> : 'Send'}
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
