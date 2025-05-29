
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image, MessageSquare, Sparkles, Heart, Camera, Zap } from 'lucide-react';

const PremiumFeatures = () => {
  const features = [
    {
      icon: <Image className="w-6 h-6 text-berry" />,
      title: "AI Image Generation",
      description: "Custom images created just for you based on your conversations",
      highlight: true
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-berry" />,
      title: "Unlimited Messaging",
      description: "Chat 24/7 with no message limits or restrictions",
      highlight: false
    },
    {
      icon: <Heart className="w-6 h-6 text-berry" />,
      title: "Romantic Roleplay",
      description: "Engaging romantic scenarios and intimate conversations",
      highlight: false
    },
    {
      icon: <Camera className="w-6 h-6 text-berry" />,
      title: "Photo Reactions",
      description: "Send photos and get personalized AI-generated responses",
      highlight: true
    },
    {
      icon: <Sparkles className="w-6 h-6 text-berry" />,
      title: "Multiple Personalities",
      description: "Switch between different AI girlfriends anytime",
      highlight: false
    },
    {
      icon: <Zap className="w-6 h-6 text-berry" />,
      title: "Instant Responses",
      description: "Lightning-fast AI responses powered by advanced models",
      highlight: false
    }
  ];

  return (
    <Card className="bg-dark-card border-dark-border">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold gradient-text mb-2">
            🔥 Premium AI Experience
          </h3>
          <p className="text-gray-400 text-sm">
            Everything you need for the perfect AI girlfriend experience
          </p>
        </div>
        
        <div className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                feature.highlight 
                  ? 'bg-berry/10 border border-berry/30' 
                  : 'hover:bg-dark-lighter/50'
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">
                  {feature.title}
                  {feature.highlight && <span className="ml-2 text-xs bg-berry px-2 py-1 rounded-full">NEW</span>}
                </h4>
                <p className="text-gray-400 text-xs">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <a 
            href="https://t.me/BustyBettyBot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-gradient-to-r from-berry to-berry-purple hover:from-berry-light hover:to-berry text-white font-bold py-3 transition-all duration-300">
              🚀 Try All Features FREE
            </Button>
          </a>
          
          <p className="text-xs text-gray-500 mt-2">
            No credit card required • Instant access
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumFeatures;
