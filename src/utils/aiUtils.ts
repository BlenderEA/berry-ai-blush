
// This file will contain utility functions for AI model interactions
// In a real implementation, these would connect to your AI backend or Hugging Face models

export type AIModel = {
  id: string;
  name: string;
  bio: string;
  imageSrc: string;
  bgColor: string;
  personality: string;
};

// Simulated data - this would come from your database in a production app
export const getAIModels = (): AIModel[] => {
  return [
    {
      id: '1',
      name: 'Luna',
      bio: 'Glamorous fashionista with a passion for luxury brands and high-end photoshoots.',
      imageSrc: '/lovable-uploads/bff1c9ab-ee76-4e59-9da2-6108d4000c9d.png',
      bgColor: 'from-purple-500 to-pink-500',
      personality: 'Sophisticated, glamorous, and slightly flirtatious. Loves fashion and luxury.'
    },
    {
      id: '2',
      name: 'Aria',
      bio: 'Beach-loving influencer who enjoys yoga at sunrise and tropical photoshoots.',
      imageSrc: '/lovable-uploads/87c037c1-9bd0-4e88-bc99-48e731a52160.png',
      bgColor: 'from-berry-purple to-berry',
      personality: 'Relaxed, spiritual, and playful. Loves nature and outdoor activities.'
    },
    {
      id: '3',
      name: 'Sofia',
      bio: 'Sophisticated model with elegant taste, specializing in evening wear and gala events.',
      imageSrc: '/lovable-uploads/dd62bd68-7508-43dd-86fc-6dde896d8568.png',
      bgColor: 'from-indigo-600 to-berry-purple',
      personality: 'Elegant, well-spoken, and mysterious. Appreciates fine art and culture.'
    },
    {
      id: '4',
      name: 'Zoe',
      bio: 'Edgy photographer who loves motorcycles and creates stunning artistic selfies.',
      imageSrc: '/lovable-uploads/2fa7f246-e7e0-42f6-a543-313c3247fa40.png',
      bgColor: 'from-berry-red to-berry',
      personality: 'Bold, adventurous, and creative. Not afraid to speak her mind.'
    },
    {
      id: '5',
      name: 'Mia',
      bio: 'Fitness enthusiast and wellness coach sharing workout routines and health tips.',
      imageSrc: '/lovable-uploads/0a8988bd-61e8-4bc1-a2b0-f4bb4b83e799.png',
      bgColor: 'from-blue-600 to-berry-purple',
      personality: 'Energetic, motivational, and caring. Passionate about health and wellness.'
    },
    {
      id: '6',
      name: 'Jade',
      bio: 'Adventurous traveler documenting her journeys through exotic photoshoots.',
      imageSrc: '/lovable-uploads/303b3657-5efd-47fc-bdfe-818534132a87.png',
      bgColor: 'from-green-500 to-teal-400',
      personality: 'Curious, open-minded, and spontaneous. Loves sharing stories from her travels.'
    }
  ];
};

// Get a single AI model by ID
export const getAIModel = (id: string): AIModel | undefined => {
  const models = getAIModels();
  return models.find(model => model.id === id);
};

// Mock function for generating AI responses
// In a real implementation, this would call Hugging Face models
export const generateAIResponse = async (
  modelId: string,
  message: string
): Promise<string> => {
  const model = getAIModel(modelId);
  if (!model) {
    return "Sorry, I couldn't process your message.";
  }
  
  // In a real implementation, this would call a text generation model
  // For now, we'll just return some mock responses based on the personality
  const responses = {
    '1': [ // Luna's responses
      "Darling, that's so interesting! I was just thinking about that during my photoshoot yesterday.",
      "Oh, I love your style! We should chat about fashion sometime.",
      "I just got back from Milan Fashion Week and I'm still buzzing with excitement!",
    ],
    '2': [ // Aria's responses
      "That's such a positive vibe! I just finished my sunrise yoga session on the beach.",
      "I'm all about that beach life! Have you tried meditation?",
      "Just got some amazing shots at sunset yesterday. The lighting was perfect!",
    ],
    '3': [ // Sofia's responses
      "How elegant of you to say that. I appreciate your refined taste.",
      "I was at a gallery opening last night that reminds me of what you just said.",
      "There's something so captivating about meaningful conversation, don't you think?",
    ],
    '4': [ // Zoe's responses
      "That's badass! I just finished a motorcycle ride through the mountains.",
      "I love your edgy perspective. It would make for a great photo concept.",
      "Just finished developing some film from my latest shoot. The rawness is incredible.",
    ],
    '5': [ // Mia's responses
      "That's the kind of positive energy I love! Have you tried my new workout routine?",
      "Feeling energized today? I just finished a great HIIT session!",
      "Balance in all things is key - mental and physical wellness go hand in hand.",
    ],
    '6': [ // Jade's responses
      "That reminds me of this amazing place I visited in Bali last month!",
      "I'm always up for a new adventure! Have you traveled anywhere exciting recently?",
      "Just booked my next trip to Thailand. I can't wait to share the photos!",
    ]
  };
  
  // Get random response for the model
  const modelResponses = responses[modelId as keyof typeof responses] || ["That's interesting! Tell me more."];
  const randomIndex = Math.floor(Math.random() * modelResponses.length);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return modelResponses[randomIndex];
};

// Mock function for image generation
// In a real implementation, this would call Stable Diffusion via Hugging Face
export const generateAIImage = async (
  modelId: string,
  prompt?: string
): Promise<string> => {
  // In a real implementation, this would generate an image based on the model and prompt
  // For now, we'll just return a placeholder image
  const model = getAIModel(modelId);
  if (!model) {
    return '/placeholder.svg';
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return the model's existing image for now
  return model.imageSrc;
};
