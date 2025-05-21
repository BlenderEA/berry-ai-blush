
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { getAIModel, AIModel } from '@/utils/aiUtils';
import { MessageSquare, Image as ImageIcon, Volume, Lock, ArrowLeft, Send, Camera, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ChatMessage from '@/components/chat/ChatMessage';
import ApiKeyWarning from '@/components/chat/ApiKeyWarning';

const AIModelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [model, setModel] = useState<AIModel | null>(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }>>([]);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Map model IDs to personality IDs for our AI chat function
  const modelToPersonalityMap: Record<string, string> = {
    '1': 'blueberry-babe', // Luna - Glamorous fashionista
    '2': 'raspberry-queen', // Aria - Beach-loving influencer
    '3': 'white-berry', // Sofia - Sophisticated model
    '4': 'berry-bold', // Zoe - Edgy photographer
    '5': 'blue-frost', // Mia - Fitness enthusiast
    '6': 'blackberry-dream' // Jade - Adventurous traveler
  };

  useEffect(() => {
    if (id) {
      const modelData = getAIModel(id);
      setModel(modelData || null);
      setIsLoading(false);
      
      // Initialize chat with welcome message
      if (modelData) {
        setChatHistory([
          {
            id: `welcome-${Date.now()}`,
            content: `Hey there! I'm ${modelData.name}. ${modelData.personality}`,
            role: 'assistant',
            timestamp: new Date()
          }
        ]);
      }
    }
  }, [id]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim() || isSending || !model) return;

    // Add user message to chat
    const userMessageId = `user-${Date.now()}`;
    setChatHistory(prev => [
      ...prev, 
      {
        id: userMessageId,
        content: message,
        role: 'user',
        timestamp: new Date()
      }
    ]);
    
    setMessage('');
    setIsSending(true);
    setApiKeyError(null); // Reset any previous API key errors

    try {
      // Get the personality ID for this model
      const personalityId = modelToPersonalityMap[id || ''] || 'blueberry-babe';
      
      console.log("Sending message to AI chat function:", {
        text: message,
        personalityId
      });
      
      // Call Supabase Edge Function to get AI response
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          text: message,
          personalityId: personalityId
        }
      });
      
      if (error) {
        console.error('Error calling AI chat function:', error);
        toast.error('Failed to get AI response. Please try again.');
        return;
      }
      
      console.log("Received response from AI chat function:", data);
      
      // Check for API key error
      if (data.error) {
        console.error('Error from AI chat function:', data.error);
        
        if (data.error_type === 'auth_error' || 
            data.error?.includes('API token') || 
            data.error?.includes('Hugging Face') || 
            data.error?.includes('authentication')) {
          setApiKeyError(data.error);
          toast.error('API key issue detected. Please check your Hugging Face API token.');
        } else {
          toast.error('Error generating AI response: ' + data.error);
        }
        return;
      }

      // Log details for debugging
      if (data.model_used) {
        console.log('AI Model used:', data.model_used);
      }

      if (data.error_reason) {
        console.log('Error reason:', data.error_reason);
      }
      
      // Add AI response to chat
      setChatHistory(prev => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          content: data.response || "I'm sorry, I couldn't process that message.",
          role: 'assistant',
          timestamp: new Date()
        }
      ]);
      
    } catch (error) {
      console.error('Error in AI chat:', error);
      toast.error('Something went wrong with the AI chat. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Header />
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-berry"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Header />
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">AI Model Not Found</h2>
              <Button onClick={() => navigate('/ai-models')}>
                Back to AI Models
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6 text-gray-300 hover:text-white"
            onClick={() => navigate('/ai-models')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to AI Models
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Model Info */}
            <div>
              <Card className={`overflow-hidden border-dark-border bg-dark-lighter`}>
                <div className={`h-80 relative bg-gradient-to-br ${model.bgColor}`}>
                  <img 
                    src={model.imageSrc} 
                    alt={model.name}
                    className="object-cover w-full h-full mix-blend-overlay opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
                </div>
                
                <div className="p-5">
                  <h1 className="text-3xl font-bold mb-2 text-white">{model.name}</h1>
                  <p className="text-gray-300 mb-5">{model.bio}</p>
                  
                  <div className="mb-6 pt-4 border-t border-dark-border">
                    <h3 className="text-xl font-semibold mb-3 text-white">Premium Features</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-300">
                        <Lock className="mr-2 h-4 w-4 text-berry" />
                        <span>Exclusive photoshoots</span>
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Lock className="mr-2 h-4 w-4 text-berry" />
                        <span>Voice messages</span>
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Lock className="mr-2 h-4 w-4 text-berry" />
                        <span>Custom image requests</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-berry hover:bg-berry-dark">
                    Unlock with $BUSTY Tokens
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Column - Interaction Area */}
            <div className="lg:col-span-2">
              <Card className="border-dark-border bg-dark-lighter overflow-hidden">
                <Tabs defaultValue="chat" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full bg-dark border-b border-dark-border rounded-none">
                    <TabsTrigger value="chat" className="flex-1 data-[state=active]:bg-dark-lighter">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="images" className="flex-1 data-[state=active]:bg-dark-lighter">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Images
                    </TabsTrigger>
                    <TabsTrigger value="voice" className="flex-1 data-[state=active]:bg-dark-lighter">
                      <Volume className="mr-2 h-4 w-4" />
                      Voice
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="chat" className="m-0">
                    <div className="flex flex-col h-[600px]">
                      {/* Header */}
                      <div className="flex items-center justify-between p-4 border-b border-dark-border bg-dark-lighter">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={model.imageSrc} alt={model.name} />
                            <AvatarFallback className="bg-berry text-white">{model.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-white">{model.name}</h3>
                            <p className="text-xs text-gray-400">AI Companion Model</p>
                          </div>
                        </div>
                      </div>

                      {/* API Key Error Warning */}
                      {apiKeyError && (
                        <div className="p-4 bg-dark">
                          <ApiKeyWarning 
                            message="There's an issue with the Hugging Face API key" 
                            details={apiKeyError}
                          />
                        </div>
                      )}

                      {/* Chat Messages */}
                      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-dark">
                        {chatHistory.map((chat) => (
                          <ChatMessage
                            key={chat.id}
                            content={chat.content}
                            role={chat.role}
                            timestamp={chat.timestamp}
                            avatarSrc={chat.role === 'assistant' ? model.imageSrc : undefined}
                            avatarFallback={chat.role === 'assistant' ? model.name[0] : 'You'}
                            avatarColor={chat.role === 'assistant' ? 'bg-berry text-white' : undefined}
                          />
                        ))}
                        
                        {/* Loading indicator */}
                        {isSending && (
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-berry/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-2 h-2 bg-berry/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-2 h-2 bg-berry/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                            <span className="text-sm text-gray-400">{model.name} is typing...</span>
                          </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Premium Features */}
                      <div className="p-3 bg-dark-lighter border-t border-dark-border">
                        <div className="flex justify-center space-x-4 mb-3">
                          <Button variant="outline" size="sm" className="text-gray-300 border-dark-border">
                            <Camera className="mr-2 h-4 w-4" />
                            Request Image
                          </Button>
                          <Button variant="outline" size="sm" className="text-gray-300 border-dark-border">
                            <Volume className="mr-2 h-4 w-4" />
                            Voice Message
                          </Button>
                          <Button variant="outline" size="sm" className="text-gray-300 border-dark-border">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Premium
                          </Button>
                        </div>
                      </div>

                      {/* Input Area */}
                      <div className="border-t border-dark-border bg-dark-lighter p-4">
                        <div className="flex items-center">
                          <textarea
                            className="flex-grow bg-dark border border-dark-border rounded-l-md py-2 px-3 text-white resize-none placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-berry"
                            placeholder={`Message ${model.name}...`}
                            rows={1}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isSending}
                          />
                          <Button
                            onClick={handleSendMessage}
                            className="bg-berry hover:bg-berry-dark text-white rounded-l-none rounded-r-md h-full"
                            disabled={isSending || !message.trim()}
                          >
                            <Send className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="images" className="p-6">
                    <div className="text-center py-10">
                      <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                      <h3 className="text-xl font-medium mb-2">Request Custom Images</h3>
                      <p className="text-gray-400 mb-6">
                        Use $BUSTY tokens to request custom AI-generated images of {model.name}.
                        All images are stored on IPFS for true ownership.
                      </p>
                      <Button className="bg-berry hover:bg-berry-dark">
                        Unlock with $BUSTY Tokens
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="voice" className="p-6">
                    <div className="text-center py-10">
                      <Volume className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                      <h3 className="text-xl font-medium mb-2">Voice Messages</h3>
                      <p className="text-gray-400 mb-6">
                        Receive voice messages from {model.name} in her unique voice.
                        Premium feature available with $BUSTY tokens.
                      </p>
                      <Button className="bg-berry hover:bg-berry-dark">
                        Unlock with $BUSTY Tokens
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIModelDetail;
