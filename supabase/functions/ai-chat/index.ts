import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const HUGGINGFACE_API_KEY = Deno.env.get('HUGGING_FACE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Updated with smaller, more stable models that are always available
const textModels = {
  'blueberry-babe': 'gpt2',
  'berry-bold': 'distilgpt2',
  'white-berry': 'EleutherAI/gpt-neo-125M',
  'blue-frost': 'gpt2-medium',
  'raspberry-queen': 'gpt2-large',
  'blackberry-dream': 'distilgpt2'
};

// Fallback model if the primary model fails
const FALLBACK_MODEL = 'gpt2';

// Personality prompts remain the same
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

    if (!personalityId || !personalityPrompts[personalityId]) {
      throw new Error('Valid personality ID is required');
    }

    // Check if API key is available
    if (!HUGGINGFACE_API_KEY) {
      console.error('HUGGING_FACE_API_KEY is not set in the environment variables');
      throw new Error('Hugging Face API key is not configured. Please contact the administrator.');
    }

    // Get the model ID with fallback if needed
    let modelId = textModels[personalityId] || FALLBACK_MODEL;
    const systemPrompt = personalityPrompts[personalityId];
    
    // For older models that don't use chat format, convert to a single text prompt
    const combinedPrompt = `${systemPrompt}\n\nConversation history:\n${
      messageHistory.map((msg: { role: string; content: string }) => 
        `${msg.role === 'assistant' ? personalityId : 'User'}: ${msg.content}`
      ).join('\n')
    }\n\nUser: ${text}\n\n${personalityId}:`;

    console.log("Using model:", modelId);
    console.log("API Key first 5 chars:", HUGGINGFACE_API_KEY ? HUGGINGFACE_API_KEY.substring(0, 5) + "..." : "undefined");
    console.log("Prompt length:", combinedPrompt.length);
    
    // Try with primary model
    let response;
    let isUsingFallback = false;
    
    try {
      response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          inputs: combinedPrompt,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
            top_p: 0.9,
            do_sample: true,
            return_full_text: false
          }
        }),
      });
    } catch (fetchError) {
      console.error("Network error with primary model:", fetchError);
      
      // Try with fallback model
      if (modelId !== FALLBACK_MODEL) {
        isUsingFallback = true;
        modelId = FALLBACK_MODEL;
        console.log("Falling back to model:", modelId);
        
        response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            inputs: combinedPrompt,
            parameters: {
              max_new_tokens: 150,
              temperature: 0.7,
              top_p: 0.9,
              do_sample: true,
              return_full_text: false
            }
          }),
        });
      } else {
        throw new Error(`Network error: ${fetchError.message}`);
      }
    }

    // Check response status and handle appropriately
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
        throw new Error("Authentication failed. Invalid Hugging Face API key.");
      } else if (statusCode === 404) {
        throw new Error(`Model not found: ${modelId}. Please try a different personality.`);
      } else if (statusCode === 503) {
        throw new Error("Hugging Face service is currently unavailable. Please try again later.");
      } else {
        throw new Error(`Hugging Face API returned ${statusCode}: ${errorText}`);
      }
    }

    // Try to process the response
    let result;
    let generatedText = '';
    let responseText;
    
    try {
      responseText = await response.text();
      console.log("Raw API response head:", responseText.substring(0, 100));
      
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.log("Response is not JSON, treating as plain text");
        result = responseText;
      }
      
      // Parse different response formats
      if (Array.isArray(result) && result.length > 0) {
        if (result[0].generated_text) {
          generatedText = result[0].generated_text;
        } else if (typeof result[0] === 'string') {
          generatedText = result[0];
        }
      } else if (typeof result === 'object' && result.generated_text) {
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

      console.log("Final generated text head:", generatedText.substring(0, 100));

      // If we got no text back, use a fallback response
      if (!generatedText || generatedText.trim().length === 0) {
        generatedText = `I'm ${personalityId.replace(/-/g, ' ')} and I'm having trouble thinking clearly right now. Can we try again?`;
      }
    } catch (processingError) {
      console.error("Error processing API response:", processingError, "\nResponse text:", responseText);
      throw new Error(`Failed to process AI response: ${processingError.message}`);
    }

    // Add a note if we had to use the fallback model
    if (isUsingFallback) {
      generatedText = `${generatedText}\n\n(Note: I had to switch to a simpler model to respond. My thoughts might be a bit basic.)`;
    }

    return new Response(
      JSON.stringify({ 
        response: generatedText,
        model_used: modelId 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    
    // Return detailed error information in a user-friendly format
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred during AI chat response generation',
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
