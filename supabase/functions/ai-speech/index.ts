
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const HUGGINGFACE_API_KEY = Deno.env.get('HUGGING_FACE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Updated with highly available TTS models
const voiceModels = {
  'blueberry-babe': 'espnet/kan-bayashi_ljspeech_vits',
  'berry-bold': 'facebook/fastspeech2-en-ljspeech',
  'white-berry': 'espnet/kan-bayashi_ljspeech_fastspeech',
  'blue-frost': 'espnet/kan-bayashi_ljspeech_tacotron2',
  'raspberry-queen': 'microsoft/speecht5_tts',
  'blackberry-dream': 'facebook/mms-tts-eng'
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

    const modelId = voiceModels[personalityId];
    
    console.log("Calling Hugging Face TTS API with model:", modelId);
    console.log("Text prompt (first 50 chars):", text.substring(0, 50));
    console.log("API Key first 5 chars:", HUGGINGFACE_API_KEY ? HUGGINGFACE_API_KEY.substring(0, 5) + "..." : "undefined");
    
    // Updated error handling for API call
    let response;
    try {
      response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      });
    } catch (fetchError) {
      console.error("Network error:", fetchError);
      throw new Error(`Network error: ${fetchError.message}`);
    }

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Hugging Face API error (${response.status}):`, errorText);
      
      if (response.status === 401) {
        throw new Error("Authentication failed. Please check your Hugging Face API key.");
      } else if (response.status === 404) {
        throw new Error(`Model not found: ${modelId}. This model may not be publicly available.`);
      } else {
        throw new Error(`Hugging Face API returned ${response.status}: ${errorText}`);
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
        details: error.toString()
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
