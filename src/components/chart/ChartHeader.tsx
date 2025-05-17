
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartLine, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChartHeaderProps {
  priceData: { price: string; change24h: number } | null;
  dexScreenerUrl: string;
  onRefreshChart: () => void;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ 
  priceData, 
  dexScreenerUrl, 
  onRefreshChart 
}) => {
  return (
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
            onClick={onRefreshChart}
          >
            Refresh Chart
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default ChartHeader;
