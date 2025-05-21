
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Image } from 'lucide-react';

const PremiumFeatures = () => {
  return (
    <div className="w-full md:w-80 space-y-4">
      <Card className="bg-dark-card border-dark-border">
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-3 text-berry">Premium Features</h3>
          <p className="text-sm text-gray-400 mb-4">Connect your wallet to unlock premium features:</p>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-berry" />
              Unlimited chat messages
            </li>
            <li className="flex items-center">
              <Image className="h-4 w-4 mr-2 text-berry" />
              AI image generation
            </li>
          </ul>
          <div className="mt-4">
            <Button className="w-full bg-dark-lighter hover:bg-dark-card border border-dark-border">
              Connect Wallet
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Only 10 $BUSTY/month
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-dark-card border-dark-border">
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-3 gradient-text">Coming Soon</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• AI Image Generation</li>
            <li>• Voice Chat</li>
            <li>• Token Price Alerts</li>
            <li>• Personalized Memes</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumFeatures;
