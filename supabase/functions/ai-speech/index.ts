
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const HUGGING_FACE_API_KEY = Deno.env.get('HUGGING_FACE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Updated with more reliable open source TTS models
const voiceModels = {
  'blueberry-babe': 'facebook/mms-tts-eng',
  'berry-bold': 'microsoft/speecht5_tts',
  'white-berry': 'speechbrain/tts-tacotron2-ljspeech',
  'blue-frost': 'facebook/fastspeech2-en-ljspeech',
  'raspberry-queen': 'microsoft/speecht5_hifigan',
  'blackberry-dream': 'microsoft/speecht5_tts'
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
    if (!HUGGING_FACE_API_KEY) {
      console.error('HUGGING_FACE_API_KEY is not set in the environment variables');
      return new Response(
        JSON.stringify({ 
          error: 'Missing API key',
          details: 'Hugging Face API key is not configured in Supabase secrets. Please add a valid API key.',
          help: "You need to add a HUGGING_FACE_API_KEY secret in Supabase Edge Function secrets."
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

    const modelId = voiceModels[personalityId];
    
    console.log("Calling Hugging Face TTS API with model:", modelId);
    console.log("Text prompt (first 50 chars):", text.substring(0, 50));
    console.log("API Key first 5 chars:", HUGGING_FACE_API_KEY ? HUGGING_FACE_API_KEY.substring(0, 5) + "..." : "undefined");
    
    // Updated error handling for API call
    let response;
    try {
      response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      });
    } catch (fetchError) {
      console.error("Network error:", fetchError);
      throw new Error(`Network error: ${fetchError.message}`);
    }

    // Enhanced error handling with clear messages for common API key issues
    if (!response.ok) {
      const statusCode = response.status;
      let errorText;
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = "Could not read error response";
      }
      
      console.error(`Hugging Face API error (${statusCode}):`, errorText);
      
      if (statusCode === 401) {
        return new Response(
          JSON.stringify({ 
            error: "Invalid API Key",
            details: "The Hugging Face API key is invalid or revoked. Please update your API key.",
            help: "You need to replace your HUGGING_FACE_API_KEY with a valid key in Supabase Edge Function secrets."
          }),
          { 
            status: 401, 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        );
      } else if (statusCode === 404) {
        throw new Error(`Model not found: ${modelId}. Please try a different personality.`);
      } else if (statusCode === 503) {
        throw new Error("Hugging Face service is currently unavailable. Please try again later.");
      } else {
        throw new Error(`Hugging Face API returned ${statusCode}: ${errorText}`);
      }
    }

    // Check content type to ensure we received audio
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('audio')) {
      console.warn("Unexpected content type:", contentType);
      const responseText = await response.text();
      console.error("Unexpected response:", responseText);
      throw new Error("Received non-audio response from Hugging Face API");
    }

    // Get the audio data as ArrayBuffer
    const audioArrayBuffer = await response.arrayBuffer();
    
    if (!audioArrayBuffer || audioArrayBuffer.byteLength === 0) {
      throw new Error('Received empty audio response from Hugging Face API');
    }
    
    console.log("Received audio data of size:", audioArrayBuffer.byteLength, "bytes");
    
    // Convert to base64 for easier handling in the frontend
    const audioBase64 = btoa(
      String.fromCharCode(...new Uint8Array(audioArrayBuffer))
    );

    return new Response(
      JSON.stringify({ 
        audio: audioBase64,
        format: 'audio/wav' // Most Hugging Face TTS models return WAV
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
        help: "Try refreshing the page or checking your Hugging Face API key configuration."
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
