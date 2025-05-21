
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Camera } from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  bio: string;
  imageSrc: string;
  bgColor: string;
}

interface AIModelCardProps {
  model: AIModel;
}

const AIModelCard: React.FC<AIModelCardProps> = ({ model }) => {
  const navigate = useNavigate();
  
  const handleChatClick = () => {
    navigate(`/ai-models/${model.id}`);
  };
  
  const handleRequestImage = () => {
    navigate(`/ai-models/${model.id}`, { state: { initialTab: 'images' } });
  };

  return (
    <Card 
      className="overflow-hidden transition-transform hover:scale-[1.02] border-dark-border bg-dark-lighter cursor-pointer"
      onClick={() => navigate(`/ai-models/${model.id}`)}
    >
      <div className={`h-80 relative bg-gradient-to-br ${model.bgColor}`}>
        <img 
          src={model.imageSrc} 
          alt={model.name}
          className="object-cover w-full h-full mix-blend-overlay opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-2xl font-bold mb-2 text-white">{model.name}</h3>
        <p className="text-gray-300 mb-5">{model.bio}</p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleChatClick();
            }}
            className="flex-1 bg-berry hover:bg-berry-dark transition-colors"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </Button>
          
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleRequestImage();
            }}
            variant="outline"
            className="flex-1 border-berry text-berry hover:bg-berry/10"
          >
            <Camera className="mr-2 h-4 w-4" />
            Request Image
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIModelCard;
