
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, DollarSign, Zap, Star, Trophy } from 'lucide-react';

const SocialProofSection = () => {
  const [stats, setStats] = useState({
    holders: 1247,
    volume24h: 2847,
    marketCap: 12500000,
    transactions: 15420
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        holders: prev.holders + Math.floor(Math.random() * 3),
        volume24h: prev.volume24h + Math.floor(Math.random() * 50),
        marketCap: prev.marketCap + Math.floor(Math.random() * 10000),
        transactions: prev.transactions + Math.floor(Math.random() * 5)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "CryptoWhale_88",
      amount: "$50K",
      text: "Best AI token project I've seen this year. The team delivers!",
      verified: true
    },
    {
      name: "SolanaKing",
      amount: "$25K", 
      text: "Finally, an AI project with real utility. Already 5x my investment!",
      verified: true
    },
    {
      name: "DiamondHands_2024",
      amount: "$100K",
      text: "This is the next big thing in AI. Early investors will be millionaires.",
      verified: true
    }
  ];

  const liveActivities = [
    "Anonymous bought $15,000 worth of BUSTY",
    "Diamond holder staked 500K BUSTY for 365 days",
    "Whale alert: 1M BUSTY transferred to cold storage",
    "New holder joined with $5,000 purchase",
    "VIP member upgraded to Gold tier"
  ];

  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    const activityInterval = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % liveActivities.length);
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
          Join 1,200+ Smart Investors
        </h2>
        <p className="text-gray-300 text-lg">
          Don't miss out on the AI revolution that's making millionaires
        </p>
      </div>

      {/* Live Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="glass-card border-green-500/30 hover:border-green-500/50 transition-all hover:scale-105">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400 animate-pulse">
              {stats.holders.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">Holders</div>
          </CardContent>
        </Card>

        <Card className="glass-card border-blue-500/30 hover:border-blue-500/50 transition-all hover:scale-105">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400 animate-pulse">
              ${(stats.volume24h * 1000).toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">24h Volume</div>
          </CardContent>
        </Card>

        <Card className="glass-card border-purple-500/30 hover:border-purple-500/50 transition-all hover:scale-105">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400 animate-pulse">
              ${(stats.marketCap / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-300">Market Cap</div>
          </CardContent>
        </Card>

        <Card className="glass-card border-yellow-500/30 hover:border-yellow-500/50 transition-all hover:scale-105">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-400 animate-pulse">
              {stats.transactions.toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">Transactions</div>
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
          <div className="bg-dark-lighter/50 rounded-lg p-4 font-mono text-sm text-green-400 animate-fade-in">
            {liveActivities[currentActivity]}
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
