
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartLine, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const BustyBerryChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const dexScreenerUrl = "https://dexscreener.com/solana/nxt6pyiaph5wisdmbfuc7zrqkj5btyqco6rypm5bmkw";
  const chartUrl = "https://api.dexscreener.com/latest/dex/chart/solana/nxt6pyiaph5wisdmbfuc7zrqkj5btyqco6rypm5bmkw";
  const contractAddress = "6wA6u3Y9mNpZy7z3oWDaLWUMmp5ourhM6oRFUrsSpump";
  
  useEffect(() => {
    // Create DEXScreener embed
    const loadDexScreenerChart = async () => {
      try {
        if (chartContainerRef.current) {
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
          
          // Load DEXScreener embed script
          const script = document.createElement('script');
          script.src = 'https://widgets.dexscreener.com/latest/widget.js';
          script.async = true;
          document.body.appendChild(script);
          
          // Clean up
          return () => {
            document.body.removeChild(script);
          };
        }
      } catch (error) {
        console.error('Error loading DEXScreener chart:', error);
        toast({
          title: "Chart Loading Error",
          description: "Unable to load the DEXScreener chart. Please try again later.",
          variant: "destructive"
        });
      }
    };
    
    loadDexScreenerChart();
  }, [toast]);

  return (
    <Card className="glass-card border-dark-border">
      <CardHeader>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
              <ChartLine className="h-5 w-5 text-berry" />
              $BUSTYBERRY Price Chart
            </CardTitle>
            <CardDescription>
              Live market data via DEXScreener
            </CardDescription>
          </div>
          <a 
            href={dexScreenerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              View on DEXScreener
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          ref={chartContainerRef} 
          className="h-[600px] w-full mt-4 rounded-lg overflow-hidden border border-dark-border bg-dark-lighter"
        >
          {/* DEXScreener chart will be loaded here by the widget script */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-400">Loading price chart...</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <a
            href={`https://solscan.io/token/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-dark-lighter rounded-lg hover:bg-dark-border transition-colors"
          >
            <p className="text-sm text-gray-300">View on Solscan</p>
            <p className="font-bold flex items-center justify-center gap-1">
              Token Info
              <ExternalLink className="h-3.5 w-3.5" />
            </p>
          </a>
          <a
            href={`https://birdeye.so/token/${contractAddress}?chain=solana`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-dark-lighter rounded-lg hover:bg-dark-border transition-colors"
          >
            <p className="text-sm text-gray-300">View on Birdeye</p>
            <p className="font-bold flex items-center justify-center gap-1">
              Market Data
              <ExternalLink className="h-3.5 w-3.5" />
            </p>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default BustyBerryChart;
