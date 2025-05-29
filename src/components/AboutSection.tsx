
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { DollarSign, MessageCircle, UserPlus, Zap, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const features = [
    {
      icon: DollarSign,
      title: "Revolutionary Tokenomics",
      description: "$BUSTYBERRY isn't just another memecoin. Built on Solana for lightning-fast transactions and minimal fees, our token combines viral potential with real utility through AI chatbots, exclusive VIP access, and creator opportunities.",
      cta: "Apply as Creator",
      ctaLink: "/creator-application",
      ctaIcon: UserPlus,
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "hover:border-green-500/30"
    },
    {
      icon: MessageCircle,
      title: "AI Chat Personalities",
      description: "Experience the future of adult entertainment with our advanced AI personalities. Each Berry has unique characteristics, from sweet and innocent to bold and spicy. Enjoy interactive conversations that push AI boundaries.",
      cta: "Start Chatting",
      ctaLink: "/ai-chat",
      ctaIcon: MessageCircle,
      gradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "hover:border-purple-500/30"
    }
  ];

  const highlights = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built on Solana blockchain",
      color: "text-yellow-400"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your privacy is our priority",
      color: "text-blue-400"
    },
    {
      icon: TrendingUp,
      title: "Growing Community",
      description: "400+ active members",
      color: "text-green-400"
    }
  ];

  return (
    <section className="section-padding relative" id="about">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full bg-berry-purple/10 blur-[80px]"></div>
        <div className="absolute bottom-1/4 left-10 w-64 h-64 rounded-full bg-berry/10 blur-[80px]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-berry/10 border border-berry/20 mb-6">
            <span className="text-berry font-semibold">About Busty Berry</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What is <span className="gradient-text">Busty Berry</span>?
          </h2>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            Busty Berry brings together the exciting world of memecoin investments with 
            adult-themed AI personalities, creating a unique ecosystem where 
            <span className="text-berry font-semibold"> fun meets gains</span>.
          </p>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {highlights.map((highlight, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl bg-dark-lighter/30 border border-dark-border/50 hover:border-berry/30 transition-all duration-300"
            >
              <div className={`p-3 rounded-lg bg-dark-card ${highlight.color}`}>
                <highlight.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{highlight.title}</h3>
                <p className="text-sm text-gray-400">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`glass-card ${feature.borderColor} transition-all hover:-translate-y-2 duration-300 group relative overflow-hidden`}
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-full bg-berry/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-berry" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl group-hover:text-berry transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </CardContent>
              
              <CardFooter className="relative z-10">
                <Link to={feature.ctaLink}>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="flex items-center gap-2 group-hover:bg-berry group-hover:border-berry group-hover:text-white transition-all duration-300"
                  >
                    <feature.ctaIcon className="h-4 w-4" />
                    {feature.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-berry/10 to-berry-purple/10 border border-berry/20">
            <h3 className="text-2xl font-bold mb-4">Ready to Join the Revolution?</h3>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Be part of the most innovative adult content platform on the blockchain
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/token">
                <Button className="berry-button">
                  Buy $BUSTY Now
                  <DollarSign className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="outline" className="secondary-button">
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
