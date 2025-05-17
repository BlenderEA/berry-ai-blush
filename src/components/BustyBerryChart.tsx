
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartLine, ExternalLink, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const BustyBerryChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [chartError, setChartError] = useState(false);
  const [priceData, setPriceData] = useState<{ price: string; change24h: number } | null>(null);
  
  const dexScreenerUrl = "https://dexscreener.com/solana/nxt6pyiaph5wisdmbfuc7zrqkj5btyqco6rypm5bmkw";
  const chartUrl = "https://api.dexscreener.com/latest/dex/chart/solana/nxt6pyiaph5wisdmbfuc7zrqkj5btyqco6rypm5bmkw";
  const contractAddress = "6wA6u3Y9mNpZy7z3oWDaLWUMmp5ourhM6oRFUrsSpump";
  
  // Fetch basic price data
  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetch("https://api.dexscreener.com/latest/dex/pairs/solana/nxt6pyiaph5wisdmbfuc7zrqkj5btyqco6rypm5bmkw");
        const data = await response.json();
        
        if (data && data.pairs && data.pairs.length > 0) {
          setPriceData({
            price: data.pairs[0].priceUsd,
            change24h: data.pairs[0].priceChange.h24
          });
        }
      } catch (error) {
        console.error("Error fetching price data:", error);
      }
    };
    
    fetchPriceData();
  }, []);

  // Extract loadDexScreenerChart to component scope so it can be called from button click handler
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
        
        // Clean up any existing script to avoid duplicates
        if (scriptRef.current && document.body.contains(scriptRef.current)) {
          document.body.removeChild(scriptRef.current);
        }
        
        // Load DEXScreener embed script
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

  useEffect(() => {
    // Create DEXScreener embed when component mounts
    loadDexScreenerChart();
    
    // Clean up function to remove script when component unmounts
    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, [toast]);

  return (
    <Card className="glass-card border-dark-border overflow-hidden relative bg-gradient-to-br from-dark to-dark-lighter">
      <div className="absolute inset-0 bg-berry/5 rounded-lg pointer-events-none"></div>
      <CardHeader className="border-b border-dark-border bg-dark-lighter/50 backdrop-blur-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
              <ChartLine className="h-5 w-5 text-berry" />
              $BUSTYBERRY Price Chart
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              {priceData ? (
                <>
                  <span className="font-mono font-medium">${parseFloat(priceData.price || "0").toFixed(8)}</span>
                  <span className={`flex items-center ${priceData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {priceData.change24h >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(priceData.change24h).toFixed(2)}%
                  </span>
                </>
              ) : (
                <span>Loading price data...</span>
              )}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            <a 
              href={dexScreenerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="outline" size="sm" className="flex items-center gap-1 bg-dark-lighter/70 hover:bg-dark-border/70 transition-all">
                View on DEXScreener
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 bg-dark-lighter/70 hover:bg-dark-border/70 transition-all"
              onClick={() => {
                toast({
                  title: "Chart Refreshed",
                  description: "Price chart data has been updated.",
                });
                loadDexScreenerChart();
              }}
            >
              Refresh Chart
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6">
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
        </div>

        <div className="grid grid-cols-2 gap-4 text-center p-6 pt-0">
          <a
            href={`https://solscan.io/token/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-dark-lighter rounded-lg hover:bg-dark-border transition-colors border border-transparent hover:border-berry/30 group"
          >
            <p className="text-sm text-gray-300 mb-1">View on Solscan</p>
            <p className="font-bold flex items-center justify-center gap-1 group-hover:text-berry transition-colors">
              Token Info
              <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </p>
          </a>
          <a
            href={`https://birdeye.so/token/${contractAddress}?chain=solana`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-dark-lighter rounded-lg hover:bg-dark-border transition-colors border border-transparent hover:border-berry/30 group"
          >
            <p className="text-sm text-gray-300 mb-1">View on Birdeye</p>
            <p className="font-bold flex items-center justify-center gap-1 group-hover:text-berry transition-colors">
              Market Data
              <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </p>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default BustyBerryChart;
