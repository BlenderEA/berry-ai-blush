
import { PersonalityType } from '@/types/chat';

type PersonalitySelectorProps = {
  selectedPersonality: PersonalityType;
};

const PersonalitySelector = ({ selectedPersonality }: PersonalitySelectorProps) => {
  return (
    <div className="mb-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        <a 
          href="/ai-chat?personality=default" 
          className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedPersonality === 'default' ? 'bg-berry text-white' : 'bg-dark-lighter text-gray-300'}`}
        >
          Berry Buddy
        </a>
        <a 
          href="/ai-chat?personality=raspberry-queen" 
          className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedPersonality === 'raspberry-queen' ? 'bg-berry text-white' : 'bg-dark-lighter text-gray-300'}`}
        >
          Raspberry Queen
        </a>
        <a 
          href="/ai-chat?personality=crypto-guru" 
          className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedPersonality === 'crypto-guru' ? 'bg-berry text-white' : 'bg-dark-lighter text-gray-300'}`}
        >
          Crypto Guru
        </a>
      </div>
    </div>
  );
};

export default PersonalitySelector;
