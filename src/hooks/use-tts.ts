
/**
 * This hook has been deprecated as text-to-speech functionality
 * has been removed from the application.
 * 
 * This file is kept as a placeholder for future TTS implementation if needed.
 */

export const useTTS = () => {
  return {
    speak: () => {}, // No-op function
    stop: () => {},  // No-op function
    isLoading: false,
    isPlaying: false,
    errorMessage: null,
    apiKeyError: null
  };
};
