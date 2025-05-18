
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<{message: string, details?: string} | null>(null);

  const speak = async (text: string, personalityId: string) => {
    if (!text || !personalityId) return;

    try {
      setErrorMessage(null);
      setApiKeyError(null);
      setIsLoading(true);
      options.onStart?.();

      console.log("Calling TTS function with:", {
        personalityId,
        textLength: text.length
      });

      // Call our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('ai-speech', {
        body: { text, personalityId }
      });

      if (error) {
        console.error('TTS function error:', error);
        throw new Error(error.message || 'Failed to generate speech');
      }

      if (!data) {
        console.error('Invalid TTS response:', data);
        throw new Error('No response received from speech service');
      }

      // Check for API key related errors
      if (data.error && (data.error === 'Missing API key' || data.error === 'Invalid API Key')) {
        console.error('API key error:', data);
        setApiKeyError({
          message: data.error,
          details: data.details || 'Please check the OpenAI API key configuration.'
        });
        return;
      }

      if (data.error) {
        console.error('Error from TTS function:', data.error);
        throw new Error(data.error || 'Speech service error');
      }

      if (!data.audio) {
        console.error('Invalid TTS response:', data);
        throw new Error('No audio data received');
      }

      console.log("Received audio data of length:", data.audio.length);

      // Stop any currently playing audio
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      // Create and play audio
      const audioBlob = base64ToBlob(data.audio, data.format || 'audio/mp3');
      const audioUrl = URL.createObjectURL(audioBlob);
      const newAudio = new Audio(audioUrl);

      newAudio.onplay = () => setIsPlaying(true);
      newAudio.onended = () => {
        setIsPlaying(false);
        options.onEnd?.();
        URL.revokeObjectURL(audioUrl); // Clean up
      };
      newAudio.onerror = (e) => {
        console.error('Audio playback error:', e);
        setIsPlaying(false);
        const errorMsg = 'Error playing audio';
        setErrorMessage(errorMsg);
        options.onError?.(errorMsg);
        toast.error('Failed to play audio');
        URL.revokeObjectURL(audioUrl); // Clean up
      };

      setAudio(newAudio);

      try {
        await newAudio.play();
      } catch (playError) {
        console.error('Audio play error:', playError);
        throw new Error('Failed to play audio: ' + (playError instanceof Error ? playError.message : String(playError)));
      }
    } catch (error) {
      console.error('TTS error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setErrorMessage(errorMsg);
      options.onError?.(errorMsg);
      toast.error('Speech generation failed');
      throw error; // Re-throw to allow the caller to handle the error
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
    try {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      return new Blob([bytes], { type });
    } catch (error) {
      console.error('Error converting base64 to blob:', error);
      throw new Error('Invalid audio data format');
    }
  };

  return {
    speak,
    stop,
    isLoading,
    isPlaying,
    errorMessage,
    apiKeyError
  };
};
