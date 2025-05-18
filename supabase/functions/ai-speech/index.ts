
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

    // Enhanced API key validation with more descriptive error
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
    
    // Call OpenAI's TTS API
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
      let errorText;
      
      try {
        const errorData = await response.json();
        errorText = errorData.error?.message || JSON.stringify(errorData);
      } catch (e) {
        errorText = await response.text() || `Status code: ${statusCode}`;
      }
      
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
