
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// OpenAI model selection
const CHAT_MODEL = "gpt-4o-mini";

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

    if (!personalityId || !personalityPrompts[personalityId]) {
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

    const systemPrompt = personalityPrompts[personalityId];
    
    // Prepare conversation history for OpenAI format
    const messages = [
      { role: "system", content: systemPrompt }
    ];
    
    // Add message history if available (limited to last 10 messages)
    if (messageHistory && Array.isArray(messageHistory)) {
      const limitedHistory = messageHistory.slice(-10);
      limitedHistory.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      });
    }
    
    // Add current user message
    messages.push({
      role: "user",
      content: text
    });

    console.log("Using OpenAI model:", CHAT_MODEL);
    console.log("API Key first 5 chars:", OPENAI_API_KEY ? OPENAI_API_KEY.substring(0, 5) + "..." : "undefined");
    console.log("Sending messages length:", messages.length);
    
    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 300
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

    // Process the response
    const responseData = await response.json();
    
    if (!responseData.choices || !responseData.choices[0] || !responseData.choices[0].message) {
      console.error("Invalid response format from OpenAI:", responseData);
      throw new Error("Received invalid response format from OpenAI");
    }
    
    const generatedText = responseData.choices[0].message.content;
    console.log("Generated text length:", generatedText.length);

    return new Response(
      JSON.stringify({ 
        response: generatedText,
        model_used: CHAT_MODEL
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
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred during AI chat response generation',
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
