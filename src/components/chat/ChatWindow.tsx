
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { useTTS } from '@/hooks/use-tts';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { speak, stop, isLoading: isTTSLoading, isPlaying } = useTTS({
    onEnd: () => setSpeakingMessageId(null),
    onError: (error) => {
      console.error('TTS error:', error);
      setSpeakingMessageId(null);
      toast.error('Failed to generate speech. Please try again later.');
    }
  });

  // Generate AI response using Hugging Face models via Supabase Edge Function
  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      setErrorMessage(null);
      
      // Format message history for the AI (limited to last 10 messages for context)
      const messageHistory = messages
        .slice(-10)
        .map(msg => ({ role: msg.role, content: msg.content }));

      console.log("Sending to AI chat function:", {
        text: userMessage,
        personalityId,
        messageHistoryLength: messageHistory.length
      });

      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          text: userMessage, 
          personalityId, 
          messageHistory 
        }
      });

      if (error) {
        console.error('AI chat function error:', error);
        throw new Error(error.message || 'Failed to generate response');
      }

      if (!data) {
        console.error('Invalid response from AI chat function:', data);
        throw new Error('Received empty response from AI');
      }

      if (data.error) {
        console.error('Error from AI chat function:', data.error);
        throw new Error(data.error || 'AI generated an error');
      }

      if (!data.response) {
        console.error('Invalid response format:', data);
        throw new Error('Received invalid response format from AI');
      }

      console.log("Received AI response:", data.response.substring(0, 100));
      return data.response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Store the specific error message for display
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
      
      toast.error('Failed to generate AI response. Please try again later.');
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
      
      // Auto-speak the assistant message
      setTimeout(() => {
        handleSpeakMessage(assistantMessage.id, responseText);
      }, 300);
      
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Failed to generate response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeakMessage = (messageId: string, content: string) => {
    if (speakingMessageId === messageId) {
      stop();
      setSpeakingMessageId(null);
    } else {
      if (speakingMessageId) {
        stop(); // Stop any currently playing audio
      }
      setSpeakingMessageId(messageId);
      speak(content, personalityId).catch(error => {
        console.error('Speech generation error:', error);
        toast.error('Failed to generate speech');
        setSpeakingMessageId(null);
      });
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
          <ChatMessage
            key={message.id}
            content={message.content}
            role={message.role}
            timestamp={message.timestamp}
            avatarSrc={message.role === 'assistant' ? avatarSrc : undefined}
            avatarFallback={message.role === 'assistant' ? avatarFallback : undefined}
            avatarColor={message.role === 'assistant' ? avatarColor : undefined}
            onSpeakMessage={message.role === 'assistant' ? 
              () => handleSpeakMessage(message.id, message.content) : undefined}
            isSpeaking={speakingMessageId === message.id && isPlaying}
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
        
        {/* Error message */}
        {errorMessage && (
          <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-sm text-white">
            <p className="font-semibold">Error with AI service:</p>
            <p>{errorMessage}</p>
            <p className="mt-2 text-xs text-gray-300">Please try again or reload the page.</p>
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
