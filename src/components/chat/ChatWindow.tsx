
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import ApiKeyWarning from './ApiKeyWarning';
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use the TTS hook to access apiKeyError
  const { speak, isLoading: ttsLoading, isPlaying, apiKeyError } = useTTS();

  // Generate AI response using Hugging Face models via Supabase Edge Function
  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      setErrorMessage(null);
      setErrorDetails(null);
      
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
        
        // Store more detailed error information
        if (data.details) {
          setErrorDetails(data.details);
        }
        
        throw new Error(data.error || 'AI generated an error');
      }

      if (!data.response) {
        console.error('Invalid response format:', data);
        throw new Error('Received invalid response format from AI');
      }

      console.log("Received AI response:", data.response.substring(0, 100));
      
      if (data.model_used) {
        console.log("Model used:", data.model_used);
      }
      
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
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Failed to generate response');
    } finally {
      setIsLoading(false);
    }
  };

  // Retry connection with AI
  const handleRetry = () => {
    setErrorMessage(null);
    setErrorDetails(null);
    toast.info('Retrying connection to AI service...');
    
    // Send a small test message to check if connection works
    generateResponse("Hello").then(response => {
      toast.success('Successfully reconnected to AI service!');
      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        content: "I'm back online and ready to chat!",
        role: 'assistant',
        timestamp: new Date()
      }]);
    }).catch(error => {
      toast.error('Still unable to connect to AI service');
    });
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[400px] bg-dark border border-dark-border rounded-lg">
      {/* Show API Key Warning if there's an apiKeyError from the TTS hook */}
      {apiKeyError && (
        <div className="p-4">
          <ApiKeyWarning message={apiKeyError.message} details={apiKeyError.details} />
        </div>
      )}
      
      {/* Chat messages */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${apiKeyError ? 'max-h-[300px]' : ''}`}>
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            content={message.content}
            role={message.role}
            timestamp={message.timestamp}
            avatarSrc={message.role === 'assistant' ? avatarSrc : undefined}
            avatarFallback={message.role === 'assistant' ? avatarFallback : undefined}
            avatarColor={message.role === 'assistant' ? avatarColor : undefined}
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
        
        {/* Error message with retry button */}
        {errorMessage && (
          <Alert variant="destructive" className="bg-red-900/30 border border-red-800 text-white">
            <AlertTitle className="font-semibold">Error with AI service:</AlertTitle>
            <AlertDescription>
              <p>{errorMessage}</p>
              
              {errorDetails && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs">Technical details</summary>
                  <p className="mt-1 text-xs text-gray-300 whitespace-pre-wrap">{errorDetails}</p>
                </details>
              )}
              
              <div className="mt-4 flex gap-4">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={handleRetry}
                  className="bg-gray-700 hover:bg-gray-600"
                >
                  Retry Connection
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setErrorMessage(null);
                    setErrorDetails(null);
                  }}
                  className="text-gray-300 hover:text-white hover:bg-transparent"
                >
                  Dismiss
                </Button>
              </div>
            </AlertDescription>
          </Alert>
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
