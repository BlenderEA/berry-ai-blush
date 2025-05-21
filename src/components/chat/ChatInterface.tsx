
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import ThreeAnimation from './ThreeAnimation';

interface ChatInterfaceProps {
  personalityId: string;
  setKeyError: (error: string | null) => void;
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  modelUsed?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ personalityId, setKeyError }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi there! I'm Grok AI. How can I assist you today?`,
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Enhanced typing detection
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = e.target.value;
    setInputMessage(newMessage);
    
    // Set typing state to true
    setIsTyping(true);
    
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set a timeout to detect when typing stops
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };
  
  // Generate a response from Grok AI using the grok-2-1212 model
  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      console.log("Sending to AI chat function:", {
        text: userMessage,
        personalityId,
      });

      // Call Supabase Edge Function 
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          text: userMessage, 
          personalityId
        }
      });

      // Handle Supabase invoke error
      if (error) {
        console.error('AI chat function error:', error);
        throw new Error(error.message || 'Failed to generate response');
      }

      // Validate response data exists
      if (!data) {
        console.error('Invalid response from AI chat function:', data);
        throw new Error('Received empty response');
      }

      // Handle API key errors
      if (data.error && data.error.includes('API key')) {
        setKeyError(data.error);
        throw new Error(data.error);
      }

      // Handle other specific errors
      if (data.error) {
        console.error('Error from AI chat function:', data.error);
        throw new Error(data.error || 'Error generating response');
      }

      // Validate response format
      if (!data.response) {
        console.error('Invalid response format:', data);
        throw new Error('Received invalid response format');
      }

      console.log("Received response:", data.response.substring(0, 100));
      
      if (data.model_used) {
        console.log("Model used:", data.model_used);
      }
      
      return data.response;
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Failed to generate response. Please try again later.');
      return `I'm sorry, I seem to be having trouble thinking right now. Can you try again?`;
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(false); // Reset typing state
    
    // Generate assistant response
    setIsLoading(true);
    try {
      const responseText = await generateResponse(inputMessage);
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: responseText,
        role: 'assistant',
        timestamp: new Date(),
        modelUsed: 'grok-2-1212' // Add model information
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Failed to generate response');
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="relative flex flex-col h-[650px]">
      {/* Three.js animation canvas */}
      <ThreeAnimation isTyping={isTyping} className="absolute inset-0 z-0" />
      
      {/* Chat interface */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <ChatMessage
              key={message.id}
              content={message.content}
              role={message.role}
              timestamp={message.timestamp}
              avatarFallback={message.role === 'assistant' ? '🤖' : undefined}
              avatarColor={message.role === 'assistant' ? 'bg-berry-light' : undefined}
            />
          ))}
          <div ref={messagesEndRef} />
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-berry/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-berry/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-berry/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-sm text-gray-400">Thinking...</span>
            </div>
          )}
        </div>
        
        {/* Input area */}
        <div className="border-t border-dark-border p-3 bg-dark bg-opacity-80 backdrop-blur-sm">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={inputMessage}
              onChange={handleInputChange}
              disabled={isLoading}
              className="bg-dark border-dark-border"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !inputMessage.trim()}
              className="bg-berry hover:bg-berry-light"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
