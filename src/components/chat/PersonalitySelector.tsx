
import { PersonalityType, personalities } from '@/types/chat';

type PersonalitySelectorProps = {
  selectedPersonality: PersonalityType;
};

const PersonalitySelector = ({ selectedPersonality }: PersonalitySelectorProps) => {
  return (
    <div className="mb-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Object.entries(personalities).map(([key, personality]) => (
          <a 
            key={key}
            href={`/ai-chat?personality=${key}`}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedPersonality === key ? 'bg-berry text-white' : 'bg-dark-lighter text-gray-300'
            }`}
          >
            {personality.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default PersonalitySelector;
