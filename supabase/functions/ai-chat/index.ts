
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
    
    // Use Grok API with your Grok API key
    const GROK_API_KEY = Deno.env.get('GROK_API_KEY');
    
    if (!GROK_API_KEY) {
      console.error("Grok API key not configured");
      throw new Error('Grok API key not configured');
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

    console.log("Making Groq API call with system prompt:", systemPrompt);

    // Grok API call
    const apiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192', // Using Llama3 model through Groq
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500
      })
    });

    // Check HTTP status
    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error(`Groq API error: ${apiResponse.status}`, errorText);
      throw new Error(`Groq API returned ${apiResponse.status}: ${errorText}`);
    }

    const data = await apiResponse.json();
    console.log("Groq API response received:", data);
    
    // Check if we have a valid response
    if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response structure from Groq API:', data);
      throw new Error('Invalid response from Groq API');
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
