
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, personalityId } = await req.json();
    
    if (!text) {
      throw new Error('Text is required');
    }

    if (!personalityId || !voiceModels[personalityId]) {
      throw new Error('Valid personality ID is required');
    }

    // Debug logs for API key
    console.log("API Key exists:", !!OPENAI_API_KEY);
    if (OPENAI_API_KEY) {
      console.log("API Key first 5 chars:", OPENAI_API_KEY.substring(0, 5) + "...");
      console.log("API Key length:", OPENAI_API_KEY.length);
    }

    // Validate API key exists
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set in the environment variables');
      return new Response(
        JSON.stringify({ 
          error: 'Missing API key',
          details: 'OpenAI API key is not configured in Supabase secrets. Please add a valid API key.',
          help: "You need to add an OPENAI_API_KEY secret in Supabase Edge Function secrets."
        }),
        { 
          status: 500, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    const voice = voiceModels[personalityId];
    
    console.log("Calling OpenAI TTS API with voice:", voice);
    console.log("Text prompt (first 50 chars):", text.substring(0, 50));
    
    try {
      // Call OpenAI's TTS API with better error handling
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
            return new Response(
              JSON.stringify({ 
                error: "Invalid API Key",
                details: "The OpenAI API key is invalid or revoked. Please update your API key.",
                help: "You need to replace your OPENAI_API_KEY with a valid key in Supabase Edge Function secrets."
              }),
              { 
                status: 401, 
                headers: { 
                  ...corsHeaders, 
                  'Content-Type': 'application/json' 
                } 
              }
            );
          } else {
            throw new Error(`OpenAI API returned ${statusCode}: ${errorText}`);
          }
        }
        
        console.error(`OpenAI API error (${statusCode}):`, errorData);
        
        if (statusCode === 401) {
          return new Response(
            JSON.stringify({ 
              error: "Invalid API Key",
              details: "The OpenAI API key is invalid or revoked. Please update your API key.",
              help: "You need to replace your OPENAI_API_KEY with a valid key in Supabase Edge Function secrets."
            }),
            { 
              status: 401, 
              headers: { 
                ...corsHeaders, 
                'Content-Type': 'application/json' 
              } 
            }
          );
        } else if (errorData?.error) {
          return new Response(
            JSON.stringify({ 
              error: errorData.error.type || "OpenAI API Error",
              details: errorData.error.message || "An error occurred with the OpenAI API.",
              help: "Check the OpenAI status page or update your API key."
            }),
            { 
              status: statusCode, 
              headers: { 
                ...corsHeaders, 
                'Content-Type': 'application/json' 
              } 
            }
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
    } catch (openAiError) {
      console.error("OpenAI TTS API call error:", openAiError);
      return new Response(
        JSON.stringify({ 
          error: openAiError.message || "Error calling OpenAI Text-to-Speech API",
          details: "There was a problem communicating with the OpenAI API. This could be due to an invalid API key, rate limiting, or a service outage.",
          help: "Please verify your API key and try again later."
        }),
        { 
          status: 500, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }
  } catch (error) {
    console.error('Error in ai-speech function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred during speech generation',
        details: error.toString(),
        help: "Try refreshing the page or checking your OpenAI API key configuration."
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
