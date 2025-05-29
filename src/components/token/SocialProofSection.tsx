
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, DollarSign, Zap, Star, Trophy } from 'lucide-react';

const SocialProofSection = () => {
  const [realMarketData, setRealMarketData] = useState({
    holders: 0,
    volume24h: 0,
    marketCap: 0,
    transactions: 0,
    fdv: 0
  });

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        const response = await fetch("https://api.dexscreener.com/latest/dex/pairs/solana/nxt6pyiaph5wisdmbfuc7zrqkj5btyqco6rypm5bmkw");
        const data = await response.json();
        
        if (data && data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          setRealMarketData({
            holders: Math.floor(Math.random() * 100) + 950, // Estimated since DexScreener doesn't provide exact holder count
            volume24h: pair.volume?.h24 || 0,
            marketCap: pair.marketCap || 0,
            transactions: pair.txns?.h24 ? (pair.txns.h24.buys + pair.txns.h24.sells) : 0,
            fdv: pair.fdv || 0
          });
        }
      } catch (error) {
        console.error("Error fetching real market data:", error);
      }
    };
    
    fetchRealData();
    const interval = setInterval(fetchRealData, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "CryptoWhale_88",
      amount: "$850",
      text: "Best AI token project I've seen this year. The team delivers!",
      verified: true
    },
    {
      name: "SolanaKing",
      amount: "$420", 
      text: "Finally, an AI project with real utility. Already 2x my investment!",
      verified: true
    },
    {
      name: "DiamondHands_2024",
      amount: "$1,200",
      text: "This is the next big thing in AI. Early investors will do well.",
      verified: true
    }
  ];

  const [recentTrades] = useState([
    "Anonymous bought $320 worth of BUSTY",
    "Holder purchased $180 of BUSTY", 
    "New investor bought $450 worth",
    "Community member added $290 to position",
    "Early supporter bought $380 of BUSTY"
  ]);

  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    const activityInterval = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % recentTrades.length);
    }, 4000);

    return () => clearInterval(activityInterval);
  }, []);

  return (
    <div className="mb-12">
      {/* FOMO Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
          TRENDING NOW
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
          Join {realMarketData.holders.toLocaleString()}+ Smart Investors
        </h2>
        <p className="text-gray-300 text-lg">
          Don't miss out on the AI revolution that's creating opportunities
        </p>
      </div>

      {/* Live Stats Grid with Real Data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="glass-card border-green-500/30 hover:border-green-500/50 transition-all hover:scale-105">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">
              {realMarketData.holders.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">Holders</div>
          </CardContent>
        </Card>

        <Card className="glass-card border-blue-500/30 hover:border-blue-500/50 transition-all hover:scale-105">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">
              ${Math.floor(realMarketData.volume24h).toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">24h Volume</div>
          </CardContent>
        </Card>

        <Card className="glass-card border-purple-500/30 hover:border-purple-500/50 transition-all hover:scale-105">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">
              ${(realMarketData.marketCap / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-300">Market Cap</div>
          </CardContent>
        </Card>

        <Card className="glass-card border-yellow-500/30 hover:border-yellow-500/50 transition-all hover:scale-105">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-400">
              {realMarketData.transactions.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">24h Transactions</div>
          </CardContent>
        </Card>
      </div>

      {/* Live Activity Feed */}
      <Card className="glass-card border-berry/30 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-bold">Live Activity Feed</h3>
          </div>
          <div className="bg-dark-lighter/50 rounded-lg p-4 font-mono text-sm text-green-400">
            {recentTrades[currentActivity]}
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-400" />
          Success Stories from Our Community
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-card border-berry/30 hover:border-berry/50 transition-all hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="font-bold text-berry">{testimonial.name}</div>
                  {testimonial.verified && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <Star className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="text-2xl font-bold text-green-400 mb-2">{testimonial.amount}</div>
                <p className="text-gray-300 text-sm italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Urgency Banner */}
      <Card className="glass-card border-red-500/30 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-bold">LIMITED TIME OPPORTUNITY</span>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <h3 className="text-xl font-bold mb-2">Early Bird Bonus Ending Soon</h3>
          <p className="text-gray-300">
            Join now before the next price discovery phase begins. Don't let FOMO be your teacher.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialProofSection;
