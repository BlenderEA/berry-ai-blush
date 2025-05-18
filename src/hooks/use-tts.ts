
import { useState, useRef } from 'react';
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Function to actually play the audio
  const playAudio = (base64Audio: string) => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    // Stop any currently playing audio
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Convert base64 to blob URL
    const byteCharacters = atob(base64Audio);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    
    // Set up audio events
    audioRef.current.src = url;
    audioRef.current.onplay = () => setIsPlaying(true);
    audioRef.current.onended = () => {
      setIsPlaying(false);
      options.onEnd?.();
      // Clean up blob URL
      URL.revokeObjectURL(url);
    };
    audioRef.current.onerror = () => {
      setIsPlaying(false);
      options.onError?.('Audio playback failed');
      URL.revokeObjectURL(url);
    };
    
    // Play audio
    audioRef.current.play().catch(error => {
      console.error('Audio playback error:', error);
      options.onError?.(error.message || 'Failed to play audio');
    });
  };
  
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
        console.error('TTS function error:', error);
        throw new Error(error.message || 'Failed to process speech request');
      }

      if (!data?.audioContent) {
        console.warn('No audio content received:', data);
        toast.info(data?.message || "Text-to-speech is currently unavailable");
        options.onEnd?.();
        return;
      }

      // Play the audio
      playAudio(data.audioContent);
      
    } catch (error) {
      console.error('TTS error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      options.onError?.(errorMsg);
      toast.error('Speech feature unavailable');
      options.onEnd?.();
    } finally {
      setIsLoading(false);
    }
  };

  const stop = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      options.onEnd?.();
    }
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
