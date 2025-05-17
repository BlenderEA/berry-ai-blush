
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import ChartHeader from './chart/ChartHeader';
import ChartLoader from './chart/ChartLoader';
import TokenLinks from './chart/TokenLinks';

const BustyBerryChart = () => {
  const { toast } = useToast();
  const [priceData, setPriceData] = useState<{ price: string; change24h: number } | null>(null);
  
  const dexScreenerUrl = "https://dexscreener.com/solana/nxt6pyiaph5wisdmbfuc7zrqkj5btyqco6rypm5bmkw";
  const chartUrl = "https://dexscreener.com/solana/nxt6pyiaph5wisdmbfuc7zrqkj5btyqco6rypm5bmkw?embed=1&theme=dark";
  const contractAddress = "6wA6u3Y9mNpZy7z3oWDaLWUMmp5ourhM6oRFUrsSpump";
  
  // Fetch basic price data
  useEffect(() => {
    fetchPriceData();
  }, []);
  
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

  const handleRefreshChart = () => {
    toast({
      title: "Chart Refreshed",
      description: "Price chart data has been updated.",
    });
    // Just refresh price data
    fetchPriceData();
  };

  return (
    <Card className="glass-card border-dark-border overflow-hidden relative bg-gradient-to-br from-dark to-dark-lighter">
      <div className="absolute inset-0 bg-berry/5 rounded-lg pointer-events-none"></div>
      
      {/* Chart Header */}
      <ChartHeader 
        priceData={priceData} 
        dexScreenerUrl={dexScreenerUrl} 
        onRefreshChart={handleRefreshChart} 
      />
      
      <CardContent className="p-0">
        <div className="p-6">
          {/* Chart Loader Component */}
          <ChartLoader chartUrl={chartUrl} dexScreenerUrl={dexScreenerUrl} />
        </div>

        {/* Token Links */}
        <TokenLinks contractAddress={contractAddress} />
      </CardContent>
    </Card>
  );
};

export default BustyBerryChart;
