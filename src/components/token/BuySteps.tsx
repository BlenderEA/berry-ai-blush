
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BuyStep {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

interface BuyStepsProps {
  buySteps: BuyStep[];
  contractAddress: string;
}

const BuySteps: React.FC<BuyStepsProps> = ({ buySteps, contractAddress }) => {
  return (
    <div className="space-y-8">
      {buySteps.map((step, index) => (
        <div key={index} className="flex">
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 rounded-full bg-dark-lighter border border-berry flex items-center justify-center font-bold text-lg shadow-lg shadow-berry/10">
              {index + 1}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">{step.title}</h3>
            <p className="text-gray-300 mb-3">{step.description}</p>
            {step.link && (
              <a 
                href={step.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-berry hover:text-berry-light flex items-center group"
              >
                {step.linkText}
                <ExternalLink className="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>
      ))}
      
      <div className="mt-8 p-6 bg-dark-lighter rounded-lg border border-dark-border">
        <h3 className="font-medium mb-2">Need Help?</h3>
        <p className="text-gray-300 mb-4">
          If you're having trouble buying $BUSTYBERRY, join our Telegram community for assistance.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="https://t.me/bustyberrycoin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="outline" className="bg-dark-card hover:bg-dark-border transition-all">
              Join Telegram Support
            </Button>
          </a>
          <a 
            href={`https://jup.ag/swap/SOL-${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="default" className="berry-button">
              Buy $BUSTYBERRY Now
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuySteps;
