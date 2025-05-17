
import React, { useState } from 'react';
import { ExternalLink, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ChartLoaderProps {
  chartUrl: string;
  dexScreenerUrl: string;
}

const ChartLoader: React.FC<ChartLoaderProps> = ({ chartUrl, dexScreenerUrl }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [chartError, setChartError] = useState(false);

  // Using an iframe to load the DEXScreener chart avoids complex DOM manipulation
  // and prevents the "removeChild" errors
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setChartError(true);
    toast({
      title: "Chart Loading Error",
      description: "Unable to load the DEXScreener chart. Please try again later.",
      variant: "destructive"
    });
  };

  return (
    <div 
      className="h-[600px] w-full rounded-lg overflow-hidden border border-dark-border bg-dark-lighter relative"
    >
      {isLoading && (
        <div className="absolute inset-0 bg-dark-lighter/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-berry mb-4"></div>
            <p className="text-gray-300">Loading chart data...</p>
          </div>
        </div>
      )}
      
      {chartError && (
        <div className="absolute inset-0 bg-dark-lighter flex flex-col items-center justify-center z-10">
          <div className="bg-dark-card p-6 rounded-lg max-w-md text-center border border-dark-border">
            <Info className="h-12 w-12 text-berry mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Chart Unavailable</h3>
            <p className="text-gray-300 mb-4">
              We're having trouble loading the DEXScreener chart. Please try again later or visit DEXScreener directly.
            </p>
            <div className="flex justify-center">
              <a 
                href={dexScreenerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="default" className="berry-button">
                  View on DEXScreener
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
      
      <iframe 
        src={`https://dexscreener.com/solana/nxt6pyiaph5wisdmbfuc7zrqkj5btyqco6rypm5bmkw?embed=1&theme=dark&trades=0&info=0`}
        className="w-full h-full border-none"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        title="DEXScreener Chart"
      />
    </div>
  );
};

export default ChartLoader;
