
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TokenHero = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [priceData, setPriceData] = useState<any>(null);
  
  const contractAddress = "6wA6u3Y9mNpZy7z3oWDaLWUMmp5ourhM6oRFUrsSpump";
  
  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetch("https://api.dexscreener.com/latest/dex/pairs/solana/nxt6pyiaph5wisdmbfuc7zrqkj5btyqco6rypm5bmkw");
        const data = await response.json();
        
        if (data && data.pairs && data.pairs.length > 0) {
          setPriceData(data.pairs[0]);
        }
      } catch (error) {
        console.error("Error fetching price data:", error);
      }
    };
    
    fetchPriceData();
    const intervalId = setInterval(fetchPriceData, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    toast({
      title: "Address Copied!",
      description: "Contract address copied to clipboard",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-b from-dark to-dark-lighter border border-dark-border p-6 sm:p-8 mb-12">
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <svg width="350" height="350" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#D946EF" d="M39.9,-66.8C51.5,-58.4,60.8,-46.8,67.1,-33.6C73.4,-20.4,76.7,-5.7,74.9,8.7C73.1,23,66.2,37,56.5,48C46.7,59,34.1,66.9,20.3,70.8C6.5,74.8,-8.5,74.8,-21.2,69.6C-34,64.4,-44.5,54,-53.3,42.6C-62.1,31.2,-69.3,18.8,-71.2,5.3C-73.1,-8.1,-69.8,-22.5,-62.6,-34.3C-55.4,-46.1,-44.4,-55.3,-32.5,-63.4C-20.5,-71.5,-7.7,-78.5,3.9,-75.4C15.4,-72.2,28.2,-75.1,39.9,-66.8Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">$BUSTYBERRY</span> Token
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            The official utility token powering the BustyBerry AI ecosystem on Solana.
          </p>
          
          <div className="mb-8">
            <h2 className="font-medium mb-2">Contract Address</h2>
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg bg-dark-lighter border border-dark-border">
              <code className="text-sm sm:text-base font-mono text-gray-300 break-all mb-4 sm:mb-0">
                {contractAddress}
              </code>
              <Button 
                variant="outline" 
                size="sm" 
                className="min-w-[100px] bg-dark-card hover:bg-dark-border transition-all"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <a 
              href={`https://jup.ag/swap/SOL-${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="default" className="w-full berry-button">
                Buy on Jupiter
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a 
              href={`https://raydium.io/swap/?inputCurrency=sol&outputCurrency=${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" className="w-full bg-dark-card hover:bg-dark-border transition-all">
                Buy on Raydium
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a 
              href={`https://solscan.io/token/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block col-span-2 sm:col-span-1"
            >
              <Button variant="outline" className="w-full bg-dark-card hover:bg-dark-border transition-all">
                View on Solscan
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
        
        <div className="glass-card p-6 border-dark-border">
          <h2 className="text-xl font-semibold mb-4">Live Market Data</h2>
          
          {priceData ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-dark-border pb-3">
                <span className="text-gray-300">Price (USD)</span>
                <span className="font-mono font-medium text-lg">${parseFloat(priceData.priceUsd || "0").toFixed(8)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-dark-border pb-3">
                <span className="text-gray-300">24h Change</span>
                <span className={`flex items-center ${priceData.priceChange?.h24 >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {priceData.priceChange?.h24 >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(priceData.priceChange?.h24 || 0).toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-dark-border pb-3">
                <span className="text-gray-300">Liquidity</span>
                <span className="font-medium">${parseInt(priceData.liquidity?.usd || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-dark-border pb-3">
                <span className="text-gray-300">Volume 24h</span>
                <span className="font-medium">${parseInt(priceData.volume?.h24 || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Market Cap</span>
                <span className="font-medium">${parseInt(priceData.marketCap || 0).toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[200px]">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-berry"></div>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-dark-border">
            <a 
              href="https://dexscreener.com/solana/nxt6pyiaph5wisdmbfuc7zrqkj5btyqco6rypm5bmkw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center"
            >
              <Button variant="outline" size="sm" className="bg-dark-card hover:bg-dark-border transition-all">
                View more on DEXScreener
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenHero;
