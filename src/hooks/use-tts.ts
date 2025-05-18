
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface UseTTSOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

export const useTTS = (options: UseTTSOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const speak = async (text: string, personalityId: string) => {
    if (!text || !personalityId) return;

    try {
      setIsLoading(true);
      options.onStart?.();

      // Call our Supabase Edge Function that now returns a message instead of audio
      const { data, error } = await supabase.functions.invoke('ai-speech', {
        body: { text, personalityId }
      });

      if (error) {
        console.error('TTS function error:', error);
        throw new Error(error.message || 'Failed to process speech request');
      }

      // Display the message to the user
      toast.info(data?.message || "Text-to-speech is currently unavailable");
      
      // Simulate completion
      options.onEnd?.();
    } catch (error) {
      console.error('TTS error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      options.onError?.(errorMsg);
      toast.error('Speech feature unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  const stop = () => {
    // No audio to stop, just trigger the onEnd callback
    options.onEnd?.();
  };

  return {
    speak,
    stop,
    isLoading,
    isPlaying,
    errorMessage: null,
    apiKeyError: null
  };
};
