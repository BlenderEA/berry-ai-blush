
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Bell, ExternalLink, Calculator, Target } from 'lucide-react';

const TradingInterface = () => {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [priceAlerts, setPriceAlerts] = useState([
    { price: 0.00000150, type: 'above', active: true },
    { price: 0.00000120, type: 'below', active: false }
  ]);

  const quickAmounts = [100, 500, 1000, 2500, 5000, 10000];
  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d'];
  
  const exchanges = [
    { name: 'Jupiter', logo: '🪐', volume: '$847K', liquidity: '$2.1M', fee: '0.1%' },
    { name: 'Raydium', logo: '⚡', volume: '$523K', liquidity: '$1.8M', fee: '0.25%' },
    { name: 'Orca', logo: '🐋', volume: '$312K', liquidity: '$980K', fee: '0.3%' }
  ];

  const calculateTokens = (usdAmount: number) => {
    const tokenPrice = 0.00012456; // Mock price
    return (usdAmount / tokenPrice).toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
          📈 Professional Trading Suite 📈
        </h2>
        <p className="text-gray-300 text-lg">
          Advanced tools for serious $BUSTY investors
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Trading Panel */}
        <div className="xl:col-span-2">
          <Card className="glass-card border-berry/30 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-berry" />
                Quick Buy Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => setSelectedAmount(amount)}
                    className={selectedAmount === amount ? "berry-button" : "secondary-button"}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              
              <div className="p-4 rounded-lg bg-dark-lighter/50 border border-dark-border mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">You Pay:</span>
                  <span className="text-xl font-bold text-white">${selectedAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">You Get:</span>
                  <span className="text-xl font-bold text-berry">
                    {calculateTokens(selectedAmount)} $BUSTY
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a 
                  href="https://jup.ag/swap/SOL-6wA6u3Y9mNpZy7z3oWDaLWUMmp5ourhM6oRFUrsSpump"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full berry-button">
                    Buy on Jupiter 🪐
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a 
                  href="https://raydium.io/swap/?inputCurrency=sol&outputCurrency=6wA6u3Y9mNpZy7z3oWDaLWUMmp5ourhM6oRFUrsSpump"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full secondary-button">
                    Buy on Raydium ⚡
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Exchange Comparison */}
          <Card className="glass-card border-blue-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Target className="h-5 w-5" />
                Exchange Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exchanges.map((exchange, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-dark-lighter/50 border border-dark-border hover:border-blue-500/30 transition-all"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{exchange.logo}</span>
                        <span className="font-bold">{exchange.name}</span>
                        {index === 0 && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Best Price
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-gray-300">Fee: {exchange.fee}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-300">24h Volume:</span>
                        <span className="font-medium ml-2">{exchange.volume}</span>
                      </div>
                      <div>
                        <span className="text-gray-300">Liquidity:</span>
                        <span className="font-medium ml-2">{exchange.liquidity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-6">
          {/* Price Alerts */}
          <Card className="glass-card border-yellow-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Bell className="h-5 w-5" />
                Price Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priceAlerts.map((alert, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border transition-all ${
                      alert.active 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-dark-lighter/50 border-dark-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Alert {alert.type} ${alert.price.toFixed(8)}
                      </span>
                      <Badge 
                        variant={alert.active ? "default" : "outline"}
                        className={alert.active ? "bg-green-500/20 text-green-400" : ""}
                      >
                        {alert.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full secondary-button text-sm">
                  + Add New Alert
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Market Sentiment */}
          <Card className="glass-card border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400">Market Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Fear & Greed Index</span>
                  <span className="text-green-400 font-bold">72 (Greed)</span>
                </div>
                <div className="w-full bg-dark-lighter rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: '72%' }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">Bull</span>
                    </div>
                    <span className="text-xl font-bold">68%</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-red-400 mb-1">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-sm font-medium">Bear</span>
                    </div>
                    <span className="text-xl font-bold">32%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass-card border-berry/30">
            <CardHeader>
              <CardTitle className="text-berry">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Market Cap</span>
                  <span className="font-medium">$124.5K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Circulating Supply</span>
                  <span className="font-medium">1B $BUSTY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Burned Tokens</span>
                  <span className="font-medium text-red-400">2.5M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">LP Locked Until</span>
                  <span className="font-medium text-green-400">2025</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TradingInterface;
