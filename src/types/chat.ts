
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

export type PersonalityType = 'default' | 'raspberry-queen' | 'crypto-guru' | 'blueberry-babe' | 'berry-bold' | 'white-berry' | 'blue-frost' | 'blackberry-dream';

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
  },
  "blueberry-babe": {
    name: "Blueberry Babe",
    greeting: "Hey cutie! Blueberry Babe here, ready to sweeten up your day with some $BUSTY talk!",
    avatar: "/lovable-uploads/0a8988bd-61e8-4bc1-a2b0-f4bb4b83e799.png"
  },
  "berry-bold": {
    name: "Berry Bold",
    greeting: "What's up? Berry Bold here. Let's cut to the chase and talk about $BUSTY and how we can make some serious gains.",
    avatar: "/lovable-uploads/0ae62df3-dbef-4830-b9d2-215f5ac5fb43.png"
  },
  "white-berry": {
    name: "White Berry",
    greeting: "Greetings. White Berry at your service. Let's have a thoughtful conversation about $BUSTY and its place in the Solana ecosystem.",
    avatar: "/lovable-uploads/dd62bd68-7508-43dd-86fc-6dde896d8568.png"
  },
  "blue-frost": {
    name: "Blue Frost",
    greeting: "Hey there. Blue Frost here. Let me know what's on your mind about $BUSTY, and I'll help you chill with some cool insights.",
    avatar: "/lovable-uploads/87c037c1-9bd0-4e88-bc99-48e731a52160.png"
  },
  "blackberry-dream": {
    name: "Blackberry Dream",
    greeting: "Hello from the shadows... Blackberry Dream awaits your questions about $BUSTY. What mysteries shall we unravel today?",
    avatar: "/lovable-uploads/3ddf135c-0506-43d5-a67b-e067f6fa8dcc.png"
  }
};
