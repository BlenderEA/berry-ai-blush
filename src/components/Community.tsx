
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Twitter, ExternalLink, Users, Crown, Zap, Heart, TrendingUp } from 'lucide-react';

const Community = () => {
  const socialLinks = [
    {
      name: "Telegram",
      icon: MessageSquare,
      link: "https://t.me/BustyBerry1",
      color: "from-[#0088cc] to-[#0077bb]",
      bgColor: "bg-[#0088cc]",
      members: "250+",
      description: "Daily discussions, updates, and community events",
      feature: "Live Chat"
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      link: "https://x.com/BustyBerryAI",
      color: "from-[#1DA1F2] to-[#1a8cd8]", 
      bgColor: "bg-[#1DA1F2]",
      members: "100+",
      description: "Latest news, announcements, and memes",
      feature: "Updates"
    },
    {
      name: "X Community",
      icon: ExternalLink,
      link: "https://x.com/i/communities/1922803262262215153",
      color: "from-[#1DA1F2] to-[#1a8cd8]",
      bgColor: "bg-[#1DA1F2]",
      members: "50+",
      description: "Exclusive community discussions and insights",
      feature: "Exclusive"
    }
  ];

  const communityStats = [
    { label: "Active Members", value: "400+", icon: Users, color: "text-blue-400" },
    { label: "Daily Messages", value: "500+", icon: MessageSquare, color: "text-green-400" },
    { label: "Community Growth", value: "+25%", icon: TrendingUp, color: "text-berry" },
    { label: "AI Interactions", value: "1000+", icon: Zap, color: "text-yellow-400" },
  ];

  return (
    <section className="section-padding bg-dark-lighter relative overflow-hidden" id="community">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-berry/3 via-transparent to-berry-purple/3"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-berry/8 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-berry-purple/8 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Animated elements */}
        <div className="absolute top-1/3 left-1/6 w-2 h-2 bg-berry/40 rounded-full animate-float"></div>
        <div className="absolute top-2/3 right-1/5 w-1.5 h-1.5 bg-berry-purple/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-berry/50 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-berry/10 border border-berry/20 mb-8 animate-fade-in">
            <Users className="w-5 h-5 text-berry animate-pulse" />
            <span className="text-berry font-semibold text-lg">Community</span>
            <Heart className="w-5 h-5 text-berry animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join Our <span className="gradient-text animate-glow">Community</span>
          </h2>
          
          <p className="text-xl text-gray-300 leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Be part of the juiciest community in crypto. Connect with fellow berry enthusiasts,
            get exclusive updates, and participate in exciting events and giveaways.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {communityStats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-dark-card/50 border border-dark-border hover:border-berry/30 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-dark-lighter mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Enhanced Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {socialLinks.map((social, index) => (
            <Card 
              key={social.name} 
              className="glass-card border-dark-border overflow-hidden hover:border-berry/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-berry/20 group relative"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeIn 0.8s ease-out forwards'
              }}
            >
              {/* Enhanced Top Bar */}
              <div className={`h-3 bg-gradient-to-r ${social.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
              
              {/* Card Content */}
              <CardContent className="p-8 flex flex-col items-center relative">
                {/* Feature Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 rounded-full bg-berry/20 border border-berry/30 text-xs text-berry font-semibold">
                    {social.feature}
                  </div>
                </div>
                
                {/* Enhanced Icon */}
                <div className="relative mb-6">
                  <div className={`absolute -inset-3 rounded-full bg-gradient-to-r ${social.color} blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  <div className={`w-20 h-20 rounded-full ${social.bgColor} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <social.icon className="h-10 w-10" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-2 group-hover:text-berry transition-colors">{social.name}</h3>
                <div className="text-3xl font-bold gradient-text mb-2">{social.members}</div>
                <div className="text-sm text-gray-400 mb-1">members</div>
                <p className="text-gray-300 text-center text-sm mb-6 leading-relaxed">{social.description}</p>
                
                {/* Enhanced CTA */}
                <a href={social.link} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className={`w-full bg-gradient-to-r ${social.color} hover:opacity-90 border-0 text-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}>
                    <social.icon className="mr-2 h-4 w-4" />
                    Join {social.name}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-berry/10 via-berry-purple/10 to-berry/10 border border-berry/20 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-8 h-8 text-berry animate-pulse" />
              <h3 className="text-3xl font-bold gradient-text">Become a Berry VIP</h3>
              <Crown className="w-8 h-8 text-berry animate-pulse" />
            </div>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto text-lg">
              Get exclusive access to premium features, early announcements, and special community events
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://t.me/BustyBerry1" target="_blank" rel="noopener noreferrer">
                <Button className="berry-button group text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Join Telegram
                  <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <a href="https://x.com/BustyBerryAI" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="secondary-button text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
                  <Twitter className="mr-2 h-5 w-5" />
                  Follow on X
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
