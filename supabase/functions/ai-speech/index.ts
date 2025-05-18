
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// OpenAI voice mappings for our personalities
const voiceModels = {
  'blueberry-babe': 'nova',
  'berry-bold': 'onyx',
  'white-berry': 'shimmer',
  'blue-frost': 'fable',
  'raspberry-queen': 'alloy',
  'blackberry-dream': 'echo'
};

// Handle CORS preflight requests
function handleCors(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  return null;
}

// Validate request inputs
function validateRequest(text: string, personalityId: string) {
  if (!text) {
    throw new Error('Text is required');
  }

  if (!personalityId || !voiceModels[personalityId]) {
    throw new Error('Valid personality ID is required');
  }
}

// Validate API key
function validateApiKey() {
  // Debug logs for API key
  console.log("API Key exists:", !!OPENAI_API_KEY);
  if (OPENAI_API_KEY) {
    console.log("API Key first 5 chars:", OPENAI_API_KEY.substring(0, 5) + "...");
    console.log("API Key length:", OPENAI_API_KEY.length);
  }

  // Return error if API key is missing
  if (!OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set in the environment variables');
    throw new Error('Missing API key');
  }
}

// Call OpenAI TTS API
async function callOpenAITTS(text: string, voice: string) {
  console.log("Calling OpenAI TTS API with voice:", voice);
  console.log("Text prompt (first 50 chars):", text.substring(0, 50));
  
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1',
      input: text,
      voice: voice,
      response_format: 'mp3',
    }),
  });

  return response;
}

// Handle API response
async function handleApiResponse(response: Response) {
  if (!response.ok) {
    const statusCode = response.status;
    let errorData;
    
    try {
      errorData = await response.json();
    } catch (e) {
      // If we can't parse JSON, use text
      const errorText = await response.text();
      console.error(`OpenAI API error (${statusCode}):`, errorText);
      
      if (statusCode === 401) {
        return createErrorResponse("Invalid API Key", "The OpenAI API key is invalid or revoked. Please update your API key.", 401);
      } else {
        throw new Error(`OpenAI API returned ${statusCode}: ${errorText}`);
      }
    }
    
    console.error(`OpenAI API error (${statusCode}):`, errorData);
    
    if (statusCode === 401) {
      return createErrorResponse("Invalid API Key", "The OpenAI API key is invalid or revoked. Please update your API key.", 401);
    } else if (errorData?.error) {
      return createErrorResponse(
        errorData.error.type || "OpenAI API Error", 
        errorData.error.message || "An error occurred with the OpenAI API.", 
        statusCode
      );
    } else {
      throw new Error(`OpenAI API returned ${statusCode}: Unknown error`);
    }
  }

  // Get the audio data as ArrayBuffer
  const audioArrayBuffer = await response.arrayBuffer();
  
  if (!audioArrayBuffer || audioArrayBuffer.byteLength === 0) {
    throw new Error('Received empty audio response from OpenAI API');
  }
  
  console.log("Received audio data of size:", audioArrayBuffer.byteLength, "bytes");
  
  // Convert to base64 for easier handling in the frontend
  const audioBase64 = btoa(
    String.fromCharCode(...new Uint8Array(audioArrayBuffer))
  );

  return new Response(
    JSON.stringify({ 
      audio: audioBase64,
      format: 'audio/mp3'
    }),
    { 
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      } 
    }
  );
}

// Create error response
function createErrorResponse(error: string, details: string, status = 500) {
  return new Response(
    JSON.stringify({ 
      error: error,
      details: details,
      help: "You need to replace your OPENAI_API_KEY with a valid key in Supabase Edge Function secrets."
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
    validateRequest(text, personalityId);
    
    try {
      // Validate API key
      validateApiKey();
      
      // Get the voice model for the personality
      const voice = voiceModels[personalityId];
      
      // Call OpenAI TTS API
      const response = await callOpenAITTS(text, voice);
      
      // Handle API response
      return await handleApiResponse(response);
    } catch (openAiError) {
      console.error("OpenAI TTS API call error:", openAiError);
      
      return createErrorResponse(
        openAiError.message || "Error calling OpenAI Text-to-Speech API",
        "There was a problem communicating with the OpenAI API. This could be due to an invalid API key, rate limiting, or a service outage."
      );
    }
  } catch (error) {
    console.error('Error in ai-speech function:', error);
    
    return createErrorResponse(
      error.message || 'An error occurred during speech generation',
      error.toString()
    );
  }
});
