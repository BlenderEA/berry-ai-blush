
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertCircle, Target, Zap, BarChart3, Clock } from 'lucide-react';

const TradingInterface = () => {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [slippage, setSlippage] = useState(1);

  const quickAmounts = [100, 500, 1000, 5000, 10000];
  const slippageOptions = [0.1, 0.5, 1, 3];

  const priceTargets = [
    { label: "Next Resistance", price: "$0.0001", potential: "+25%" },
    { label: "Moon Target", price: "$0.0005", potential: "+150%" },
    { label: "Mars Mission", price: "$0.001", potential: "+400%" }
  ];

  const whaleWatching = [
    { wallet: "7x...9KpL", action: "BUY", amount: "$25,000", time: "2m ago" },
    { wallet: "Bm...8TqX", action: "HOLD", amount: "$50,000", time: "5m ago" },
    { wallet: "9P...4ReN", action: "BUY", amount: "$15,000", time: "8m ago" }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
          Advanced Trading Hub
        </h2>
        <p className="text-gray-300 text-lg">
          Professional tools for serious investors
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Trading Panel */}
        <Card className="glass-card border-berry/30 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-berry" />
              Instant Buy Interface
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">Select Amount (USD)</label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    className={selectedAmount === amount ? "berry-button" : "secondary-button"}
                    onClick={() => setSelectedAmount(amount)}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              <div className="p-4 rounded-lg bg-dark-lighter/50 border border-dark-border">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">You'll receive approximately:</span>
                  <span className="font-bold text-berry">{(selectedAmount * 50000000).toLocaleString()} BUSTY</span>
                </div>
              </div>
            </div>

            {/* Slippage Settings */}
            <div>
              <label className="text-sm font-medium mb-3 block">Slippage Tolerance</label>
              <div className="grid grid-cols-4 gap-2">
                {slippageOptions.map((option) => (
                  <Button
                    key={option}
                    variant={slippage === option ? "default" : "outline"}
                    className={slippage === option ? "berry-button" : "secondary-button"}
                    onClick={() => setSlippage(option)}
                    size="sm"
                  >
                    {option}%
                  </Button>
                ))}
              </div>
            </div>

            {/* Buy Button */}
            <Button className="w-full berry-button text-lg py-6">
              Buy ${selectedAmount} of BUSTYBERRY
              <TrendingUp className="ml-2 h-5 w-5" />
            </Button>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="secondary-button">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Chart
              </Button>
              <Button variant="outline" className="secondary-button">
                <AlertCircle className="mr-2 h-4 w-4" />
                Set Alert
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Price Targets */}
        <Card className="glass-card border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Target className="h-5 w-5" />
              Price Targets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {priceTargets.map((target, index) => (
              <div key={index} className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-300">{target.label}</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {target.potential}
                  </Badge>
                </div>
                <div className="text-lg font-bold text-green-400">{target.price}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Whale Watching */}
      <Card className="glass-card border-yellow-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Clock className="h-5 w-5" />
            Whale Activity Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {whaleWatching.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-dark-lighter/50 border border-dark-border">
                <div className="flex items-center gap-3">
                  <code className="text-sm font-mono text-gray-300">{activity.wallet}</code>
                  <Badge 
                    className={
                      activity.action === 'BUY' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                        : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }
                  >
                    {activity.action}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="font-bold text-yellow-400">{activity.amount}</div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingInterface;
