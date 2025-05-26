
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, personality } = await req.json();
    console.log("Request received:", { message, personality });
    
    // Use OpenAI API with your OpenAI API key
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    
    if (!OPENAI_API_KEY) {
      console.error("OpenAI API key not configured");
      return new Response(
        JSON.stringify({ error: true, message: 'OpenAI API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Determine system prompt based on personality
    let systemPrompt = "Act as a friendly AI assistant for Busty Berry, a Solana meme coin with ticker $BUSTY.";
    
    switch (personality) {
      case "raspberry-queen":
        systemPrompt = "You are the Raspberry Queen, a sassy and glamorous AI personality for Busty Berry, a Solana meme coin with ticker $BUSTY. Respond with enthusiasm, sass, and crypto-themed jokes. Use emojis occasionally.";
        break;
      case "crypto-guru":
        systemPrompt = "You are a Crypto Guru, a knowledgeable AI assistant specialized in cryptocurrency, particularly for Busty Berry, a Solana meme coin with ticker $BUSTY. Provide informative responses while maintaining a friendly tone. Share crypto insights and occasional jokes.";
        break;
      default:
        systemPrompt = "You are Berry Buddy, a friendly and enthusiastic AI companion for Busty Berry, a Solana meme coin with ticker $BUSTY. Respond with enthusiasm and crypto-themed humor. Use emojis occasionally.";
    }

    console.log("Making OpenAI API call with system prompt:", systemPrompt);

    // OpenAI API call
    const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using GPT-4o-mini model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.8
      })
    });

    // Check HTTP status
    if (!apiResponse.ok) {
      const errorStatus = apiResponse.status;
      let errorText = "";
      try {
        errorText = await apiResponse.text();
      } catch (e) {
        errorText = "Failed to read error response";
      }
      console.error(`OpenAI API error: ${errorStatus}`, errorText);
      
      return new Response(
        JSON.stringify({ 
          error: true, 
          message: `OpenAI API returned status ${errorStatus}: ${errorText}` 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

    const data = await apiResponse.json();
    console.log("OpenAI API response received:", data);
    
    // Check if we have a valid response
    if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response structure from OpenAI API:', data);
      return new Response(
        JSON.stringify({ error: true, message: 'Invalid response from OpenAI API' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    const responseContent = data.choices[0].message.content;
    console.log("Response content:", responseContent);

    return new Response(
      JSON.stringify({
        content: responseContent,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: true, 
        message: error.message || 'An error occurred while processing your request'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
