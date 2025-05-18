
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generic responses for each personality
const genericResponses = {
  'blueberry-babe': "I'm sorry, but text-to-speech is not available right now. But I'm still happy to chat with you! 💙",
  'berry-bold': "Voice feature is offline. Let's just stick to text for now.",
  'white-berry': "I regret to inform you that the voice synthesis functionality is temporarily unavailable. Shall we continue our delightful conversation in text? ✨",
  'blue-frost': "The voice feature isn't working at the moment. I'm still here to listen and respond through text. ❄️",
  'raspberry-queen': "OH NO!! The voice feature isn't working right now!! But that's TOTALLY OKAY because we can still have an AMAZING chat here!! 👑",
  'blackberry-dream': "The veil between voice and silence remains closed today. We must communicate through written symbols alone. 🌙"
};

// Handle CORS preflight requests
function handleCors(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  return null;
}

// Create error response
function createErrorResponse(error: string, details: string, status = 500) {
  return new Response(
    JSON.stringify({ 
      error: error,
      details: details
    }),
    { 
      status: status, 
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      } 
    }
  );
}

// Main handler function
serve(async (req) => {
  // Handle CORS preflight request
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { text, personalityId } = await req.json();
    
    // Validate request
    if (!text) {
      return createErrorResponse("Invalid request", "Text is required", 400);
    }

    if (!personalityId || !genericResponses[personalityId]) {
      return createErrorResponse("Invalid personality ID", "The requested personality does not exist", 400);
    }
    
    // Return a generic message explaining that TTS is not available
    return new Response(
      JSON.stringify({ 
        message: genericResponses[personalityId],
        success: false
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in ai-speech function:', error);
    
    return createErrorResponse(
      error.message || 'An error occurred during speech processing',
      error.toString()
    );
  }
});
