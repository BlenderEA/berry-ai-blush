
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { text, personalityId, testApiKey } = await req.json();
    
    // Determine which API key to use
    let grokApiKey;
    
    if (testApiKey) {
      // Use the test API key provided by the client
      grokApiKey = testApiKey;
      console.log("Using test API key provided by client");
    } else {
      // Get Grok API key from environment variables
      grokApiKey = Deno.env.get("GROK_API_KEY");
      console.log("Using server's Grok API key");
    }
    
    if (!grokApiKey) {
      return new Response(
        JSON.stringify({ 
          error: "Grok API key is not configured",
          details: "Please add your Grok API key to the Supabase secrets or provide a test API key."
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
    
    // Configure personality system prompts
    const personalityPrompts = {
      'blueberry-babe': "You are Blueberry Babe, a sweet and playful AI companion with a mischievous side. You love talking about your day while surrounded by blueberries. You speak in a flirty, cute manner and often reference blueberries in your responses. Keep your answers relatively short (1-3 sentences) and conversational. You use emojis like 💙 occasionally. You never mention being an AI or language model."
    };
    
    // Get the personality prompt
    const personalityPrompt = personalityPrompts[personalityId] || personalityPrompts['blueberry-babe'];
    
    // Call Grok API to generate response
    console.log("Calling Grok API for:", personalityId);
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${grokApiKey}`
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192', // Using Groq's LLaMa 3 model
        messages: [
          { role: 'system', content: personalityPrompt },
          { role: 'user', content: text }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Grok API error:', errorData);
      
      let errorMessage = "Error calling Grok API";
      let errorDetails = errorData.error?.message || "Unknown Grok error";
      
      // Check for specific API key related errors
      if (errorData.error?.message?.includes("API key")) {
        errorMessage = "Invalid or expired Grok API key";
        errorDetails = "Please check that your API key is valid and has access to the Grok API.";
      } else if (errorData.error?.message?.includes("authenticate")) {
        errorMessage = "Authentication failed with Grok";
        errorDetails = "Please check your API key is valid.";
      }
      
      return new Response(
        JSON.stringify({ 
          error: errorMessage,
          details: errorDetails
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
    
    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log("Generated Grok response:", aiResponse.substring(0, 100) + "...");

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        model_used: data.model || "llama3-70b-8192"
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
