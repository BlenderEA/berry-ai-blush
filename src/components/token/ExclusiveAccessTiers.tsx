
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Gem, Trophy, Check, Zap } from 'lucide-react';

const ExclusiveAccessTiers = () => {
  const tiers = [
    {
      name: "Bronze Member",
      icon: Trophy,
      requirement: "1,000 $BUSTY",
      color: "from-amber-600 to-amber-800",
      borderColor: "border-amber-500/30",
      benefits: [
        "Access to 3 AI Personalities",
        "Basic chat features",
        "Community Discord access",
        "Weekly market updates"
      ],
      popular: false
    },
    {
      name: "Silver VIP",
      icon: Star,
      requirement: "10,000 $BUSTY",
      color: "from-gray-400 to-gray-600",
      borderColor: "border-gray-400/30",
      benefits: [
        "Access to 8 AI Personalities",
        "HD image generation",
        "Priority customer support",
        "Exclusive events invites",
        "Early feature access"
      ],
      popular: false
    },
    {
      name: "Gold Elite",
      icon: Crown,
      requirement: "50,000 $BUSTY",
      color: "from-yellow-400 to-yellow-600",
      borderColor: "border-yellow-400/30",
      benefits: [
        "Access to ALL AI Personalities",
        "4K image generation",
        "Custom AI personality requests",
        "Private Discord channels",
        "Monthly strategy calls",
        "Revenue sharing program"
      ],
      popular: true
    },
    {
      name: "Diamond Royalty",
      icon: Gem,
      requirement: "250,000 $BUSTY",
      color: "from-blue-400 to-purple-600",
      borderColor: "border-purple-400/30",
      benefits: [
        "Everything in Gold Elite",
        "Personal AI companion",
        "Direct access to founders",
        "Co-creation opportunities",
        "Lifetime premium access",
        "Equity participation",
        "Exclusive merch & NFTs"
      ],
      popular: false
    }
  ];

  const stakingRewards = [
    { duration: "30 Days", apy: "12%", bonus: "5% $BUSTY" },
    { duration: "90 Days", apy: "18%", bonus: "15% $BUSTY" },
    { duration: "180 Days", apy: "25%", bonus: "30% $BUSTY" },
    { duration: "365 Days", apy: "35%", bonus: "50% $BUSTY" }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
          💎 Exclusive Access Tiers 💎
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Hold $BUSTYBERRY tokens to unlock premium AI personalities, exclusive features, and VIP benefits
        </p>
      </div>

      {/* Access Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {tiers.map((tier, index) => (
          <Card 
            key={index}
            className={`glass-card ${tier.borderColor} hover:scale-105 transition-all duration-300 relative overflow-hidden ${
              tier.popular ? 'ring-2 ring-berry/50' : ''
            }`}
          >
            {tier.popular && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-berry to-berry-light text-white text-center py-2 text-sm font-bold">
                🔥 MOST POPULAR 🔥
              </div>
            )}
            
            <CardHeader className={tier.popular ? 'pt-12' : ''}>
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${tier.color} mb-4`}>
                  <tier.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">{tier.name}</CardTitle>
                <Badge variant="outline" className="text-berry border-berry/30">
                  {tier.requirement}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 mb-6">
                {tier.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${tier.popular ? 'berry-button' : 'secondary-button'}`}
                variant={tier.popular ? 'default' : 'outline'}
              >
                {tier.popular ? 'Get Elite Access' : 'Upgrade Now'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Staking Rewards */}
      <Card className="glass-card border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400 text-center justify-center">
            <Zap className="h-6 w-6" />
            💰 Stake & Earn Premium Rewards 💰
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stakingRewards.map((reward, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 hover:border-green-500/50 transition-all hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400 mb-2">{reward.duration}</div>
                  <div className="text-2xl font-bold gradient-text mb-1">{reward.apy}</div>
                  <div className="text-sm text-gray-300 mb-3">Annual APY</div>
                  <Badge variant="outline" className="text-green-400 border-green-400/30">
                    +{reward.bonus} Bonus
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Button className="berry-button text-lg px-8 py-3">
              Start Staking Now
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Benefits Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="glass-card border-berry/30 text-center">
          <CardContent className="p-6">
            <Crown className="h-12 w-12 text-berry mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">VIP Access</h3>
            <p className="text-gray-300">Exclusive AI personalities and premium features for token holders</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-green-500/30 text-center">
          <CardContent className="p-6">
            <Zap className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Passive Income</h3>
            <p className="text-gray-300">Earn up to 35% APY by staking your $BUSTY tokens</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-purple-500/30 text-center">
          <CardContent className="p-6">
            <Gem className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Exclusive Perks</h3>
            <p className="text-gray-300">Revenue sharing, early access, and co-creation opportunities</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExclusiveAccessTiers;
