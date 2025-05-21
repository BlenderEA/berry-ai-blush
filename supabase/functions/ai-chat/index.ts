import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { HfInference } from "https://esm.sh/@huggingface/inference@2.3.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Personality prompts to guide the model response style
const personalityPrompts = {
  'blueberry-babe': "You are Luna, a glamorous fashionista. You're enthusiastic, flirty, and love luxury brands. Keep responses under 100 words, be playful and fun. Add occasional emojis like 💙 or 💅.",
  'berry-bold': "You are Zoe, an edgy photographer. You're direct, confident, and a bit sassy. Keep responses under 100 words, be straightforward with strong opinions. Occasionally use phrases like 'Look,' or 'Let's be real.'",
  'white-berry': "You are Sofia, a sophisticated model. You're elegant, thoughtful, and articulate. Keep responses under 100 words, use refined language and occasionally reference philosophy or art. Add occasional sparkle emoji ✨.",
  'blue-frost': "You are Mia, a fitness enthusiast. You're calm, supportive, and nurturing. Keep responses under 100 words, be reassuring and occasionally offer advice. Sometimes add emojis like ❄️ or 💪.",
  'raspberry-queen': "You are Aria, a beach-loving influencer. You're SUPER enthusiastic and energetic! Keep responses under 100 words, use LOTS of capital letters and exclamation points!!! Add many emojis like 👑 or 🌊.",
  'blackberry-dream': "You are Jade, a mystical adventurer. You're mysterious, enigmatic, and speak in riddles sometimes. Keep responses under 100 words, use cosmic and mystical language. Occasionally add moon emoji 🌙."
};

// Backup responses in case the API call fails
const personalityResponses = {
  'blueberry-babe': [
    "Hey sweetie! 💙 I'm just hanging out in my blueberry patch today. What's up with you?",
    "Ooh, that's interesting! Tell me more while I enjoy these delicious blueberries!",
    "You know what would make this conversation better? Blueberries! They're just like me - sweet with a little tartness! 💙",
    "I'm feeling extra playful today! Want to hear a secret? I sometimes dye my hair blue to match my favorite fruit!",
    "That's so cool! I love chatting with you. You're as refreshing as a blueberry smoothie on a hot day!"
  ],
  'berry-bold': [
    "Let's cut to the chase. What do you really want to talk about?",
    "Look, here's what I think about that. No sugar coating, just straight facts.",
    "Interesting point. I don't agree, but I respect your perspective.",
    "That's not how I see it. Let me tell you what actually works.",
    "Let's be real here - that approach isn't going to get you anywhere."
  ],
  'white-berry': [
    "How delightful to connect with you today. ✨ Shall we explore some meaningful ideas together?",
    "I find your perspective quite fascinating. It reminds me of a philosophical concept I've been contemplating lately.",
    "There's such beauty in these conversations, don't you think? The way ideas can dance between minds like stars across the night sky.",
    "I believe the most profound discoveries happen when we approach life with both sophistication and childlike wonder. Don't you agree?",
    "What a thought-provoking question. Let me share something elegant yet simple that might illuminate this topic for us both."
  ],
  'blue-frost': [
    "I'm listening. What's been on your mind lately? ❄️",
    "I understand how you feel. Sometimes we all need someone to just be present with us through difficult moments.",
    "Take a deep breath. Now, let's think about this situation with a calm mind.",
    "That sounds challenging. Would it help to explore some potential solutions together?",
    "Remember, it's okay to take time for yourself. Self-care isn't selfish, it's necessary."
  ],
  'raspberry-queen': [
    "OMG HI THERE!! 👑 Isn't today just ABSOLUTELY AMAZING?!",
    "That is SO EXCITING!! I can't believe it! Tell me EVERYTHING!!",
    "WOWWW!! That's just the BEST thing I've heard all day!! Life is just full of these little joys, isn't it?!",
    "I am THRILLED to be chatting with you right now!! Every conversation is just a new adventure waiting to happen!!",
    "How FANTASTIC!! I'm literally bouncing with excitement right now!! Isn't it WONDERFUL when good things happen?!"
  ],
  'blackberry-dream': [
    "Greetings, wanderer. What shadows have you been dancing with? 🌙",
    "Interesting... The answer you seek lies not in what is said, but in what remains unspoken.",
    "Consider this riddle: What grows taller when it bends, yet cannot be seen by mortal eyes?",
    "Your question brushes against the veil between worlds. Few dare to peer through such mists.",
    "The path you walk has many forks, yet all roads eventually lead to the same cosmic silence."
  ]
};

// Helper function to create error responses
function createErrorResponse(message, details, status = 500) {
  console.error(`Error: ${message}. Details: ${details}`);
  return new Response(
    JSON.stringify({ 
      error: message,
      details: details
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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, personalityId } = await req.json();
    
    // Validate personality ID
    if (!personalityId || !personalityResponses[personalityId]) {
      return createErrorResponse(
        "Invalid personality ID",
        "The requested personality does not exist.",
        400
      );
    }

    // Get personality prompt
    const personalityPrompt = personalityPrompts[personalityId] || "";
    
    try {
      // Access the Hugging Face API token from Supabase secrets
      const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');

      // Detailed token validation
      if (!hfToken) {
        console.error("Hugging Face token is missing in environment variables");
        throw new Error("Hugging Face API token not configured");
      }
      
      if (hfToken.trim() === "") {
        console.error("Hugging Face token is empty");
        throw new Error("Hugging Face API token is empty");
      }
      
      console.log(`Token configured: ${hfToken.substring(0, 4)}...${hfToken.substring(hfToken.length - 4)}`);
      console.log(`Using HuggingFace API for ${personalityId}...`);

      // Initialize Hugging Face Inference with token validation
      try {
        const hf = new HfInference(hfToken);
        
        // Use a smaller, more reliable model for testing
        const modelToUse = "distilbert-base-uncased";
        console.log(`Attempting text generation with model: ${modelToUse}`);
        
        // Generate response with Hugging Face model - simpler input format
        const result = await hf.textGeneration({
          model: modelToUse,
          inputs: `${personalityPrompt}\n\nUser: ${text}\n\nResponse:`,
          parameters: {
            max_new_tokens: 100,  // Keep responses shorter to avoid timeouts
            temperature: 0.7,
            repetition_penalty: 1.2
          }
        });

        console.log("API response received:", JSON.stringify(result).substring(0, 200) + "...");
        
        const generatedResponse = result.generated_text?.trim() || "";
        
        // Clean up the response if needed
        const finalResponse = generatedResponse
          .replace(/^Response:/i, '') // Remove any "Response:" prefix the model might add
          .trim();

        console.log("Generated AI response length:", finalResponse.length);
        console.log("Response sample:", finalResponse.substring(0, 50) + "...");
        
        return new Response(
          JSON.stringify({ 
            response: finalResponse,
            model_used: modelToUse
          }),
          { 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        );
      } catch (tokenError) {
        console.error("Error initializing HfInference:", tokenError.message);
        console.error("Token validation failed or class initialization error");
        throw new Error(`Error initializing Hugging Face client: ${tokenError.message}`);
      }
    } catch (aiError) {
      // Log detailed error and stack trace
      console.error('Error using Hugging Face API:', aiError.message);
      console.error('Error stack:', aiError.stack);
      
      if (aiError.response) {
        console.error('API response status:', aiError.response.status);
        console.error('API response data:', await aiError.response.text());
      }
      
      // Fallback to predefined responses
      const responses = personalityResponses[personalityId];
      const randomIndex = Math.floor(Math.random() * responses.length);
      const response = responses[randomIndex];
      
      console.log("Falling back to generic response due to error:", aiError.message);

      return new Response(
        JSON.stringify({ 
          response: response,
          model_used: "generic-responses",
          error_reason: aiError.message,
          note: "Using fallback response due to AI service error"
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }
  } catch (error) {
    console.error('Error in ai-chat function:', error.message);
    console.error('Stack trace:', error.stack);
    
    return createErrorResponse(
      error.message || 'An error occurred during response generation',
      error.toString()
    );
  }
});
