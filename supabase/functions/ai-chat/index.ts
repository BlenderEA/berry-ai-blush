
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const HUGGINGFACE_API_KEY = Deno.env.get('HUGGING_FACE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Model IDs for different personalities
const textModels = {
  'blueberry-babe': 'mistralai/Mistral-7B-Instruct-v0.2',
  'berry-bold': 'mistralai/Mistral-7B-Instruct-v0.2',
  'white-berry': 'mistralai/Mistral-7B-Instruct-v0.2',
  'blue-frost': 'mistralai/Mistral-7B-Instruct-v0.2',
  'raspberry-queen': 'mistralai/Mistral-7B-Instruct-v0.2',
  'blackberry-dream': 'mistralai/Mistral-7B-Instruct-v0.2'
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
    
    // Format conversation history for the model
    const messages = [
      { role: "system", content: systemPrompt },
      ...messageHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      })),
      { role: "user", content: text }
    ];
    
    // Call Hugging Face Inference API for text generation
    const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        inputs: {
          messages: messages
        },
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API error:', errorText);
      throw new Error(`Hugging Face API returned ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    const generatedText = result.generated_text || result[0]?.generated_text;

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
