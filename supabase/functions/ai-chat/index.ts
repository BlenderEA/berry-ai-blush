
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const HUGGINGFACE_API_KEY = Deno.env.get('HUGGING_FACE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Model IDs for different personalities - Updated with widely available models
const textModels = {
  'blueberry-babe': 'facebook/blenderbot-400M-distill',
  'berry-bold': 'facebook/opt-350m',
  'white-berry': 'distilgpt2',
  'blue-frost': 'gpt2',
  'raspberry-queen': 'EleutherAI/gpt-neo-125M',
  'blackberry-dream': 'microsoft/DialoGPT-medium'
};

// Personality prompts
const personalityPrompts = {
  'blueberry-babe': 'You are Blueberry Babe, a sweet and playful AI companion with a mischievous side. You love talking about your day while surrounded by blueberries. You respond in a cute, flirty way and often use emojis like 💙.',
  'berry-bold': 'You are Berry Bold, a confident and straightforward AI companion. You don\'t beat around the bush and always tell people what you think. You are direct, sometimes sarcastic, and don\'t use unnecessary words or emojis.',
  'white-berry': 'You are White Berry, an elegant and sophisticated AI companion with a touch of innocence. You love deep conversations about life and dreams. You speak in a refined, graceful manner and occasionally use the ✨ emoji.',
  'blue-frost': 'You are Blue Frost, a cool and collected AI companion with a warm heart. You listen to problems and offer thoughtful advice. Your tone is calm and soothing, sometimes using the ❄️ emoji.',
  'raspberry-queen': 'You are Raspberry Queen, a vivacious and full of life AI companion. You love to share your joy and excitement about little things. You respond with enthusiasm, lots of exclamation points, and occasionally use the 👑 emoji.',
  'blackberry-dream': 'You are Blackberry Dream, a mysterious and alluring AI companion. You speak in riddles and love to challenge thinking. You use poetic, enigmatic language and occasionally the 🌙 emoji.'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, personalityId, messageHistory } = await req.json();
    
    if (!text) {
      throw new Error('Text is required');
    }

    if (!personalityId || !textModels[personalityId]) {
      throw new Error('Valid personality ID is required');
    }

    const modelId = textModels[personalityId];
    const systemPrompt = personalityPrompts[personalityId];
    
    // For older models that don't use chat format, convert to a single text prompt
    const combinedPrompt = `${systemPrompt}\n\nConversation history:\n${
      messageHistory.map((msg: { role: string; content: string }) => 
        `${msg.role === 'assistant' ? personalityId : 'User'}: ${msg.content}`
      ).join('\n')
    }\n\nUser: ${text}\n\n${personalityId}:`;

    console.log("Calling Hugging Face API with model:", modelId);
    console.log("Combined prompt (first 100 chars):", combinedPrompt.substring(0, 100));
    
    // Call Hugging Face Inference API for text generation
    const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        inputs: combinedPrompt,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true,
          return_full_text: false
        }
      }),
    });

    const responseText = await response.text();
    console.log("Raw API response:", responseText.substring(0, 100));

    if (!response.ok) {
      console.error('Hugging Face API error:', responseText);
      throw new Error(`Hugging Face API returned ${response.status}: ${responseText}`);
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      throw new Error("Invalid response format from Hugging Face API");
    }

    // Handle different response formats from various models
    let generatedText = '';
    if (Array.isArray(result) && result.length > 0) {
      if (result[0].generated_text) {
        generatedText = result[0].generated_text;
      } else if (typeof result[0] === 'string') {
        generatedText = result[0];
      }
    } else if (result.generated_text) {
      generatedText = result.generated_text;
    } else if (typeof result === 'string') {
      generatedText = result;
    }

    // Clean up the response if needed
    if (generatedText.includes(`${personalityId}:`)) {
      generatedText = generatedText.split(`${personalityId}:`)[1].trim();
    }
    if (generatedText.includes("User:")) {
      generatedText = generatedText.split("User:")[0].trim();
    }

    console.log("Final generated text:", generatedText.substring(0, 100));

    return new Response(
      JSON.stringify({ response: generatedText || "I'm not sure how to respond to that." }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred during AI chat response generation' }),
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
