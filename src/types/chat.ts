
export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUrl?: string;
};

export type AIPersonality = {
  name: string;
  greeting: string;
  avatar: string;
};

export type PersonalityType = 'default' | 'raspberry-queen' | 'crypto-guru';

export const personalities: Record<PersonalityType, AIPersonality> = {
  default: {
    name: "Berry Buddy",
    greeting: "Hey there! I'm your Berry Buddy, ready to chat about $BUSTY and the crypto world! What can I help you with today?",
    avatar: "/lovable-uploads/303b3657-5efd-47fc-bdfe-818534132a87.png"
  },
  "raspberry-queen": {
    name: "Raspberry Queen",
    greeting: "Hello darling! Raspberry Queen at your service. Let's talk about $BUSTY, the juiciest token on Solana!",
    avatar: "/lovable-uploads/dd62bd68-7508-43dd-86fc-6dde896d8568.png"
  },
  "crypto-guru": {
    name: "Crypto Guru",
    greeting: "Greetings, seeker of crypto knowledge. The Crypto Guru is here to enlighten you about $BUSTY and the ways of Solana.",
    avatar: "/lovable-uploads/bff1c9ab-ee76-4e59-9da2-6108d4000c9d.png"
  }
};
