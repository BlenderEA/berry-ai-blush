
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Main handler function
serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, personalityId } = await req.json();
    
    // Get the Grok API key from environment variables
    const apiKey = Deno.env.get("GROK_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: "Missing Grok API key",
          details: "Please add your Grok API key to the Supabase secrets."
        }),
        { 
          status: 401, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    // Prepare system message based on personality
    let systemMessage = "You are Grok, a helpful and insightful AI assistant.";
    
    if (personalityId === 'grok-creative') {
      systemMessage = "You are Grok, a creative AI assistant with a flair for imagination and artistic expression.";
    } else if (personalityId === 'grok-technical') {
      systemMessage = "You are Grok, a technical AI assistant specialized in programming, mathematics, and scientific topics.";
    }
    
    console.log("Using system message:", systemMessage);
    console.log("User message:", text.substring(0, 100));

    // Call Grok API (similar to OpenAI API)
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-2-1212',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: text }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Grok API error:', errorData);
      
      // Special handling for API key related errors
      if (response.status === 401 || response.status === 403) {
        return new Response(
          JSON.stringify({ 
            error: "Invalid Grok API key",
            details: "Your API key was rejected by the Grok AI service."
          }),
          { 
            status: 401, 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        );
      }
      
      throw new Error(`Grok API error: ${errorData.error?.message || JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const grokResponse = data.choices[0].message.content;
    
    console.log("Generated response:", grokResponse.substring(0, 100));

    return new Response(
      JSON.stringify({ 
        response: grokResponse,
        model_used: "grok-2-1212"
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
        error: error.message || 'An error occurred during response generation',
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
