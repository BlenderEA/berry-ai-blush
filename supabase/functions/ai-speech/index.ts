
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const HUGGINGFACE_API_KEY = Deno.env.get('HUGGING_FACE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Voice models for each personality - Updated with more available models
const voiceModels = {
  'blueberry-babe': 'espnet/kan-bayashi_ljspeech_vits',
  'berry-bold': 'espnet/kan-bayashi_ljspeech_tacotron2',
  'white-berry': 'espnet/kan-bayashi_ljspeech_fastspeech',
  'blue-frost': 'facebook/fastspeech2-en-ljspeech',
  'raspberry-queen': 'espnet/kan-bayashi_ljspeech_fastspeech2',
  'blackberry-dream': 'espnet/kan-bayashi_ljspeech_joint_finetune_conformer_fastspeech2_hifigan'
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
    console.log("Using API key (first 4 chars):", HUGGINGFACE_API_KEY ? HUGGINGFACE_API_KEY.substring(0, 4) + '...' : 'undefined');
    
    // Call Hugging Face Inference API for text-to-speech
    const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API error:', errorText);
      throw new Error(`Hugging Face API returned ${response.status}: ${errorText}`);
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
      JSON.stringify({ error: error.message || 'An error occurred during speech generation' }),
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
