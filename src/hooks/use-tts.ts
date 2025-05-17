
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
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const speak = async (text: string, personalityId: string) => {
    if (!text || !personalityId) return;

    try {
      setIsLoading(true);
      options.onStart?.();

      // Call our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('ai-speech', {
        body: { text, personalityId }
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate speech');
      }

      if (!data || !data.audio) {
        throw new Error('No audio data received');
      }

      // Stop any currently playing audio
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      // Create and play audio
      const audioBlob = base64ToBlob(data.audio, data.format || 'audio/wav');
      const audioUrl = URL.createObjectURL(audioBlob);
      const newAudio = new Audio(audioUrl);

      newAudio.onplay = () => setIsPlaying(true);
      newAudio.onended = () => {
        setIsPlaying(false);
        options.onEnd?.();
      };
      newAudio.onerror = () => {
        setIsPlaying(false);
        options.onError?.('Error playing audio');
        toast.error('Failed to play audio');
      };

      setAudio(newAudio);
      await newAudio.play();
    } catch (error) {
      console.error('TTS error:', error);
      options.onError?.(error instanceof Error ? error.message : 'Unknown error');
      toast.error('Speech generation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const stop = () => {
    if (audio && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      options.onEnd?.();
    }
  };

  // Helper function to convert base64 to Blob
  const base64ToBlob = (base64: string, type: string): Blob => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    return new Blob([bytes], { type });
  };

  return {
    speak,
    stop,
    isLoading,
    isPlaying
  };
};
