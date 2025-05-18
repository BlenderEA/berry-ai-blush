
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

// Handle CORS preflight requests
function handleCors(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  return null;
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

// Validate request inputs
function validateRequest(text: string, personalityId: string) {
  if (!text) {
    throw new Error('Text is required');
  }

  if (!personalityId || !personalityPrompts[personalityId]) {
    throw new Error('Valid personality ID is required');
  }
}

// Prepare conversation messages
function prepareMessages(text: string, personalityId: string, messageHistory: any[]) {
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
  console.log("Sending messages length:", messages.length);
  
  return messages;
}

// Call OpenAI API
async function callOpenAI(messages: any[]) {
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
    const { text, personalityId, messageHistory } = await req.json();
    
    // Validate request
    validateRequest(text, personalityId);
    
    try {
      // Validate API key
      validateApiKey();
      
      // Prepare messages
      const messages = prepareMessages(text, personalityId, messageHistory);
      
      // Call OpenAI API
      const response = await callOpenAI(messages);
      
      // Handle API response
      return await handleApiResponse(response);
    } catch (openAiError) {
      console.error("OpenAI API call error:", openAiError);
      
      return createErrorResponse(
        openAiError.message || "Error calling OpenAI API",
        "There was a problem communicating with the OpenAI API. This could be due to an invalid API key, rate limiting, or a service outage."
      );
    }
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    
    return createErrorResponse(
      error.message || 'An error occurred during AI chat response generation',
      error.toString()
    );
  }
});
