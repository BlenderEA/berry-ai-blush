
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Play, Pause } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useTTS } from '@/hooks/use-tts';

interface ChatWindowProps {
  personalityId: string;
  personalityName: string;
  avatarSrc?: string;
  avatarFallback?: string;
  avatarColor?: string;
  personality: string;
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  modelUsed?: string;
  isPlaying?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  personalityId,
  personalityName,
  avatarSrc,
  avatarFallback,
  avatarColor,
  personality
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hey there! I'm ${personalityName}. ${personality}`,
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add text-to-speech functionality
  const { speak, stop, isLoading: ttsLoading, isPlaying } = useTTS({
    onStart: () => {
      // Update UI to show which message is being spoken
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === 'assistant') {
        setMessages(prev => prev.map(msg => 
          msg.id === lastMessage.id ? { ...msg, isPlaying: true } : { ...msg, isPlaying: false }
        ));
      }
    },
    onEnd: () => {
      // Clear playing status when audio ends
      setMessages(prev => prev.map(msg => ({ ...msg, isPlaying: false })));
    },
    onError: (error) => {
      toast.error(`Audio error: ${error}`);
      setMessages(prev => prev.map(msg => ({ ...msg, isPlaying: false })));
    }
  });
  
  // Generate a response
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

      // Handle specific API errors from the function
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
      return `I'm ${personalityName} and I seem to be having trouble thinking right now. Can you try again?`;
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
    
    // Generate assistant response
    setIsLoading(true);
    try {
      const responseText = await generateResponse(inputMessage);
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: responseText,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Auto-speak the assistant's message
      speak(responseText, personalityId);
      
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Failed to generate response');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle speech for a specific message
  const handleToggleSpeech = (message: Message) => {
    if (message.role === 'assistant') {
      if (message.isPlaying) {
        stop();
        setMessages(prev => prev.map(msg => ({ ...msg, isPlaying: false })));
      } else {
        // Stop any currently playing audio
        stop();
        // Play the selected message
        speak(message.content, personalityId);
        // Update UI
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, isPlaying: true } : { ...msg, isPlaying: false }
        ));
      }
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[400px] bg-dark border border-dark-border rounded-lg">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className="relative">
            <ChatMessage
              key={message.id}
              content={message.content}
              role={message.role}
              timestamp={message.timestamp}
              avatarSrc={message.role === 'assistant' ? avatarSrc : undefined}
              avatarFallback={message.role === 'assistant' ? avatarFallback : undefined}
              avatarColor={message.role === 'assistant' ? avatarColor : undefined}
            />
            
            {/* Audio control button for assistant messages */}
            {message.role === 'assistant' && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleToggleSpeech(message)}
                disabled={ttsLoading && !message.isPlaying}
                className="absolute top-0 right-0 rounded-full w-8 h-8 bg-transparent hover:bg-dark-lighter"
              >
                {message.isPlaying ? (
                  <Pause size={16} className="text-berry" />
                ) : (
                  <Play size={16} className="text-berry" />
                )}
              </Button>
            )}
          </div>
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
      <div className="border-t border-dark-border p-3">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
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
  );
};

export default ChatWindow;
