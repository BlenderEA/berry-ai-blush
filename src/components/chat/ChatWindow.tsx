
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { useTTS } from '@/hooks/use-tts';
import { toast } from 'sonner';
import { useWalletAuth } from '@/hooks/use-wallet-auth';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { walletAddress } = useWalletAuth();
  const hasWalletAccess = !!walletAddress;

  const { speak, stop, isLoading: isTTSLoading, isPlaying } = useTTS({
    onEnd: () => setSpeakingMessageId(null),
    onError: (error) => {
      console.error('TTS error:', error);
      setSpeakingMessageId(null);
    }
  });

  // Mock response generation - In a real app, this would call an AI API
  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simple mock response based on message content
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    const keywords = ['hello', 'hi', 'hey', 'what', 'who', 'how', 'why', 'where', 'when'];
    const hasCommonKeyword = keywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );
    
    if (hasCommonKeyword) {
      return `Thanks for your message! I'm ${personalityName} and I'm still learning. In the future, I'll have proper AI responses, but for now this is a demonstration of our chat interface.`;
    } else {
      return `That's interesting! I'm ${personalityName} and I'd love to chat more about this when my AI capabilities are fully implemented. Stay tuned!`;
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    if (!hasWalletAccess) {
      toast.error('Connect your wallet to chat with AI Berries', {
        description: 'You need to hold $BUSTYBERRY tokens to access this feature.'
      });
      return;
    }
    
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
      
      // Auto-speak the first assistant message if the user has wallet access
      if (hasWalletAccess) {
        setTimeout(() => {
          handleSpeakMessage(assistantMessage.id, responseText);
        }, 300);
      }
      
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
      speak(content, personalityId);
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
      </div>
      
      {/* Input area */}
      <div className="border-t border-dark-border p-3">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder={hasWalletAccess ? "Type your message..." : "Connect wallet to chat..."}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading || !hasWalletAccess}
            className="bg-dark border-dark-border"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !inputMessage.trim() || !hasWalletAccess}
            className="bg-berry hover:bg-berry-light"
          >
            <Send size={18} />
          </Button>
        </form>
        
        {!hasWalletAccess && (
          <p className="text-xs text-gray-400 mt-2 text-center">
            You need to connect your wallet and hold $BUSTYBERRY tokens to chat
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
