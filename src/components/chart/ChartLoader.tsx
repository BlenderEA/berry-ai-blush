
import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ChartLoaderProps {
  chartUrl: string;
  dexScreenerUrl: string;
}

const ChartLoader: React.FC<ChartLoaderProps> = ({ chartUrl, dexScreenerUrl }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [chartError, setChartError] = useState(false);

  const loadDexScreenerChart = async () => {
    try {
      if (chartContainerRef.current) {
        setIsLoading(true);
        setChartError(false);
        
        // Clear any previous chart
        chartContainerRef.current.innerHTML = '';
        
        // Add chart container with DEXScreener's expected format
        const chartElement = document.createElement('div');
        chartElement.className = 'dexscreener-embed-chart';
        chartElement.setAttribute('data-pairAddress', 'nxt6pyiaph5wisdmbfuc7zrqkj5btyqco6rypm5bmkw');
        chartElement.setAttribute('data-chain', 'solana');
        chartElement.setAttribute('data-theme', 'dark');
        chartElement.setAttribute('data-height', '560');
        chartContainerRef.current.appendChild(chartElement);
        
        // Remove existing script reference if it exists
        if (scriptRef.current) {
          // Instead of trying to remove it, just clean the reference
          scriptRef.current = null;
        }
        
        // Create a new script element
        const script = document.createElement('script');
        script.src = 'https://widgets.dexscreener.com/latest/widget.js';
        script.async = true;
        
        // Store script reference for cleanup
        scriptRef.current = script;
        
        // Set loading state based on script load events
        script.onload = () => {
          setIsLoading(false);
        };
        
        script.onerror = () => {
          setIsLoading(false);
          setChartError(true);
          toast({
            title: "Chart Loading Error",
            description: "Unable to load the DEXScreener chart. Please try again later.",
            variant: "destructive"
          });
        };
        
        // Append to document body
        document.body.appendChild(script);
      }
    } catch (error) {
      console.error('Error loading DEXScreener chart:', error);
      setIsLoading(false);
      setChartError(true);
      toast({
        title: "Chart Loading Error",
        description: "Unable to load the DEXScreener chart. Please try again later.",
        variant: "destructive"
      });
    }
  };

  // Load chart when component mounts
  useEffect(() => {
    loadDexScreenerChart();
    
    // Clean up function - simplified to avoid DOM manipulation errors
    return () => {
      // Do nothing with the script on unmount - let the browser clean it up
    };
  }, []);

  return (
    <div 
      ref={chartContainerRef} 
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
      
      {!isLoading && !chartError && (
        <div className="w-full h-full flex items-center justify-center">
          {/* DEXScreener chart will be loaded here by the widget script */}
        </div>
      )}
    </div>
  );
};

export default ChartLoader;
