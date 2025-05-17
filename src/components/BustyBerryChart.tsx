
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartLine, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BustyBerryChart = () => {
  const dexScreenerUrl = "https://dexscreener.com/solana/nxt6pyiaph5wisdmbfuc7zrqkj5btyqco6rypm5bmkw";
  const contractAddress = "6wA6u3Y9mNpZy7z3oWDaLWUMmp5ourhM6oRFUrsSpump";

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
        <div className="h-[600px] w-full mt-4 rounded-lg overflow-hidden border border-dark-border bg-dark-lighter p-4 flex flex-col items-center justify-center">
          {/* Replace iframe with direct link */}
          <p className="text-center mb-4">DEXScreener doesn't allow embedding in iframes.</p>
          <p className="text-center mb-6">Click the button below to view the chart:</p>
          <a 
            href={dexScreenerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button className="berry-button">
              Open DEXScreener Chart
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
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
