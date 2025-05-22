
import { useState, useEffect } from 'react';
import { Message, PersonalityType, personalities } from '@/types/chat';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAIChat = (personalityType: PersonalityType = 'default') => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Initialize chat with greeting message
  useEffect(() => {
    const currentPersonality = personalities[personalityType];
    setMessages([{
      id: '1',
      role: 'assistant',
      content: currentPersonality.greeting,
      timestamp: new Date(),
    }]);
  }, [personalityType]);

  // Handle sending a message to the AI
  const sendMessage = async (inputMessage: string) => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Call our Supabase Edge Function for AI response
      console.log("Calling Supabase Edge Function with:", { message: inputMessage, personality: personalityType });
      
      const { data, error } = await supabase.functions.invoke("ai-chat", {
        body: {
          message: inputMessage,
          personality: personalityType
        }
      });
      
      if (error) {
        console.error('Error from edge function:', error);
        throw new Error(error.message || 'Failed to get response from AI');
      }
      
      console.log("Edge function response:", data);
      
      if (!data) {
        console.error('No data returned from edge function');
        throw new Error('No response data from AI service');
      }
      
      if (data.error) {
        console.error('Error in response data:', data);
        throw new Error(data.message || 'Unexpected response format from AI service');
      }
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.content || "Sorry, I couldn't generate a response at the moment.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
      
      // Add error message to chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error processing your request. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
