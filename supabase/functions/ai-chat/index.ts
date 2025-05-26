
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
    
    // Use your Venice.ai API key directly
    const VENICE_API_KEY = 'eH8_SieGmQiRNiTdUsjx-Vwe2uQC_YWAEhYMnNL4Re';
    const VENICE_API_URL = 'https://api.venice.ai/api/v1/chat/completions';
    
    if (!VENICE_API_KEY) {
      console.error("Venice.ai API key not configured");
      return new Response(
        JSON.stringify({ error: true, message: 'Venice.ai API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
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

    console.log("Making Venice.ai API call with system prompt:", systemPrompt);

    // Venice.ai API call
    const apiResponse = await fetch(VENICE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VENICE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
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
      console.error(`Venice.ai API error: ${errorStatus}`, errorText);
      
      return new Response(
        JSON.stringify({ 
          error: true, 
          message: `Venice.ai API returned status ${errorStatus}: ${errorText}` 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

    const data = await apiResponse.json();
    console.log("Venice.ai API response received:", data);
    
    // Check if we have a valid response
    if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response structure from Venice.ai API:', data);
      return new Response(
        JSON.stringify({ error: true, message: 'Invalid response from Venice.ai API' }),
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
