
import React, { useState } from 'react';
import { Send, Camera, Volume, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ChatMessage from '@/components/chat/ChatMessage';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AIModelChatProps {
  modelId: string;
  modelName: string;
  modelImage: string;
  onClose?: () => void;
}

const AIModelChat: React.FC<AIModelChatProps> = ({
  modelId,
  modelName,
  modelImage,
  onClose
}) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }>>([
    { 
      content: `Hey there! I'm ${modelName}. What would you like to chat about today?`,
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Map model IDs to personality IDs for our AI chat function
  const modelToPersonalityMap: Record<string, string> = {
    '1': 'blueberry-babe', // Luna - Glamorous fashionista
    '2': 'raspberry-queen', // Aria - Beach-loving influencer
    '3': 'white-berry', // Sofia - Sophisticated model
    '4': 'berry-bold', // Zoe - Edgy photographer
    '5': 'blue-frost', // Mia - Fitness enthusiast
    '6': 'blackberry-dream' // Jade - Adventurous traveler
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = {
      content: message,
      role: 'user' as const,
      timestamp: new Date()
    };
    
    setChatHistory([...chatHistory, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Get the personality ID for this model
      const personalityId = modelToPersonalityMap[modelId] || 'blueberry-babe';
      
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
      
      // Add AI response to chat
      const aiMessage = {
        content: data.response || "I'm sorry, I couldn't process that message.",
        role: 'assistant' as const,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
      
      if (data.model_used) {
        console.log('AI Model used:', data.model_used);
      }
      
    } catch (error) {
      console.error('Error in AI chat:', error);
      toast.error('Something went wrong with the AI chat. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-dark-border bg-dark-lighter">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={modelImage} alt={modelName} />
            <AvatarFallback className="bg-berry text-white">{modelName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-white">{modelName}</h3>
            <p className="text-xs text-gray-400">AI Companion Model</p>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-dark">
        {chatHistory.map((chat, index) => (
          <ChatMessage
            key={index}
            content={chat.content}
            role={chat.role}
            timestamp={chat.timestamp}
            avatarSrc={chat.role === 'assistant' ? modelImage : undefined}
            avatarFallback={chat.role === 'assistant' ? modelName[0] : 'You'}
            avatarColor={chat.role === 'assistant' ? 'bg-berry text-white' : undefined}
          />
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-berry/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-berry/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-berry/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm text-gray-400">{modelName} is typing...</span>
          </div>
        )}
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
            placeholder={`Message ${modelName}...`}
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-berry hover:bg-berry-dark text-white rounded-l-none rounded-r-md h-full"
            disabled={isLoading || !message.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIModelChat;
