
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, DollarSign, Zap, Star, MessageCircle } from 'lucide-react';

const SocialProofSection = () => {
  const [liveStats, setLiveStats] = useState({
    totalHolders: 1247,
    volume24h: 847293,
    transactions: 15647,
    avgHolding: 127000
  });

  const testimonials = [
    {
      name: "CryptoWhale47",
      avatar: "💎",
      text: "Best AI adult token investment I've made. The utility is insane!",
      amount: "$50K",
      verified: true
    },
    {
      name: "AIEnthusiast",
      avatar: "🚀",
      text: "Finally, an adult AI project with real tokenomics. Moon bound!",
      amount: "$25K",
      verified: true
    },
    {
      name: "DegenTrader",
      avatar: "🔥",
      text: "10x since I bought in. Still accumulating more $BUSTY!",
      amount: "$100K",
      verified: true
    }
  ];

  const recentTransactions = [
    { type: "buy", amount: "15,420", usd: "$2,847", time: "2m ago", whale: true },
    { type: "buy", amount: "8,250", usd: "$1,523", time: "5m ago", whale: false },
    { type: "buy", amount: "45,000", usd: "$8,310", time: "8m ago", whale: true },
    { type: "buy", amount: "3,200", usd: "$590", time: "12m ago", whale: false },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        totalHolders: prev.totalHolders + Math.floor(Math.random() * 3),
        volume24h: prev.volume24h + Math.floor(Math.random() * 1000),
        transactions: prev.transactions + Math.floor(Math.random() * 5),
        avgHolding: prev.avgHolding + Math.floor(Math.random() * 100)
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
          🔥 FOMO Alert: Everyone's Buying $BUSTY! 🔥
        </h2>
        <p className="text-gray-300 text-lg">
          Join thousands of smart investors already earning with $BUSTYBERRY
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Stats */}
        <Card className="glass-card border-green-500/30 hover:border-green-500/50 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <TrendingUp className="h-5 w-5" />
              Live Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Holders</span>
                <span className="font-bold text-green-400 animate-pulse">
                  {liveStats.totalHolders.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">24h Volume</span>
                <span className="font-bold text-green-400">
                  ${liveStats.volume24h.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Transactions</span>
                <span className="font-bold text-green-400">
                  {liveStats.transactions.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Avg Holding</span>
                <span className="font-bold text-green-400">
                  {liveStats.avgHolding.toLocaleString()} $BUSTY
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="glass-card border-berry/30 hover:border-berry/50 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-berry">
              <MessageCircle className="h-5 w-5" />
              Community Love
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-3 rounded-lg bg-dark-lighter/50 border border-dark-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{testimonial.avatar}</span>
                    <span className="font-medium text-sm">{testimonial.name}</span>
                    {testimonial.verified && (
                      <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                        Verified
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs text-green-400 border-green-400/30">
                      {testimonial.amount}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions (Whale Watching) */}
        <Card className="glass-card border-yellow-500/30 hover:border-yellow-500/50 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Zap className="h-5 w-5" />
              Whale Watching 🐋
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((tx, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border transition-all ${
                    tx.whale 
                      ? 'bg-yellow-500/10 border-yellow-500/30' 
                      : 'bg-dark-lighter/50 border-dark-border'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {tx.whale && <span className="text-yellow-400">🐋</span>}
                      <span className={`text-sm font-medium ${tx.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                        BUY
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{tx.time}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-white">{tx.amount} $BUSTY</span>
                    <span className="text-sm text-gray-300">{tx.usd}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FOMO Timer */}
      <Card className="glass-card border-red-500/30 mt-8 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold text-red-400 mb-2">
            ⚡ Early Investor Bonus Ending Soon! ⚡
          </h3>
          <p className="text-gray-300 mb-4">
            Get in now before the next price tier kicks in
          </p>
          <div className="flex justify-center gap-4 text-2xl font-bold">
            <div className="flex flex-col items-center">
              <span className="text-red-400">23</span>
              <span className="text-xs text-gray-400">Hours</span>
            </div>
            <span className="text-red-400">:</span>
            <div className="flex flex-col items-center">
              <span className="text-red-400">45</span>
              <span className="text-xs text-gray-400">Minutes</span>
            </div>
            <span className="text-red-400">:</span>
            <div className="flex flex-col items-center">
              <span className="text-red-400">12</span>
              <span className="text-xs text-gray-400">Seconds</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialProofSection;
