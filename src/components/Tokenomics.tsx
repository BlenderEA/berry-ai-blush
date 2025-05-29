
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Copy, TrendingUp, Shield, Zap, Users, Coins, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Tokenomics = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const contractAddress = "6wA6u3Y9mNpZy7z3oWDaLWUMmp5ourhM6oRFUrsSpump";
  
  const tokenInfo = [
    { label: "Token Name", value: "Busty Berry Token", icon: Coins },
    { label: "Symbol", value: "$BUSTY", icon: DollarSign },
    { label: "Total Supply", value: "1,000,000,000", icon: TrendingUp },
    { label: "Blockchain", value: "Solana", icon: Zap },
  ];
  
  const tokenUtility = [
    { 
      title: "Platform Payments", 
      description: "Use $BUSTY for all platform subscriptions and premium features",
      icon: DollarSign,
      color: "from-green-500/20 to-emerald-500/20"
    },
    { 
      title: "Community Rewards", 
      description: "Earn $BUSTY through community participation and engagement",
      icon: Users,
      color: "from-blue-500/20 to-cyan-500/20"
    }
  ];
  
  const tokenDistribution = [
    { category: "Public Sale", percentage: 75, color: "from-berry to-berry-light", description: "Available for community purchase" },
    { category: "Team", percentage: 10, color: "from-berry-purple to-indigo-400", description: "Locked for 12 months" },
    { category: "Marketing", percentage: 10, color: "from-pink-500 to-pink-300", description: "Growth & partnerships" },
    { category: "Development", percentage: 5, color: "from-violet-500 to-violet-300", description: "Platform improvements" },
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    toast({
      title: "Address Copied!",
      description: "Contract address copied to clipboard",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="section-padding relative overflow-hidden" id="tokenomics">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-berry/3 via-transparent to-berry-purple/3"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-berry/8 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-berry-purple/8 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        {/* Animated particles */}
        <div className="absolute top-1/6 left-1/4 w-2 h-2 bg-berry/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-berry-purple/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 right-1/6 w-1 h-1 bg-berry/50 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }}></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-berry/10 border border-berry/20 mb-8 animate-fade-in">
            <TrendingUp className="w-5 h-5 text-berry animate-pulse" />
            <span className="text-berry font-semibold text-lg">Tokenomics</span>
            <Coins className="w-5 h-5 text-berry animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="gradient-text animate-glow">$BUSTY</span> Tokenomics
          </h2>
          
          <p className="text-xl text-gray-300 leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Our token is designed to power a decentralized creator economy with transparency, 
            community governance, and long-term sustainability built on Solana's lightning-fast blockchain.
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Enhanced Token Info Card */}
          <Card className="glass-card border-dark-border hover:border-berry/30 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-berry/5 via-transparent to-berry-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-3 rounded-full bg-berry/20 group-hover:bg-berry/30 transition-colors">
                  <Coins className="h-6 w-6 text-berry" />
                </div>
                Token Information
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {tokenInfo.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-4 bg-dark-lighter/50 rounded-xl border border-dark-border hover:border-berry/30 transition-all duration-300 hover:scale-105 group/item"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="h-5 w-5 text-berry group-hover/item:scale-110 transition-transform" />
                      <span className="text-sm text-gray-300">{item.label}</span>
                    </div>
                    <div className="font-bold text-lg gradient-text">{item.value}</div>
                  </div>
                ))}
              </div>
              
              {/* Enhanced Utility Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-berry" />
                  Token Utility
                </h3>
                <div className="space-y-4">
                  {tokenUtility.map((utility, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-xl bg-gradient-to-r ${utility.color} border border-dark-border hover:border-berry/30 transition-all duration-300 hover:scale-105 group/utility`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-dark-card">
                          <utility.icon className="h-5 w-5 text-berry group-hover/utility:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{utility.title}</h4>
                          <p className="text-gray-300 text-sm">{utility.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Enhanced Contract Address */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-dark-card to-dark-lighter border border-dark-border hover:border-berry/30 transition-all duration-300">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300 font-medium">Contract Address:</span>
                  <button 
                    onClick={copyToClipboard}
                    className="text-sm text-berry hover:text-berry-light flex items-center gap-2 px-3 py-1 rounded-lg bg-berry/10 hover:bg-berry/20 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono text-sm bg-dark p-4 rounded-lg overflow-x-auto border border-dark-border hover:border-berry/20 transition-colors">
                  {contractAddress}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Enhanced Token Distribution Card */}
          <Card className="glass-card border-dark-border hover:border-berry/30 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-berry-purple/5 via-transparent to-berry/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-3 rounded-full bg-berry-purple/20 group-hover:bg-berry-purple/30 transition-colors">
                  <TrendingUp className="h-6 w-6 text-berry-purple" />
                </div>
                Token Distribution
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <div className="space-y-6 mb-8">
                {tokenDistribution.map((item, index) => (
                  <div key={index} className="group/dist">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-300 font-medium">{item.category}</span>
                      <span className="text-lg font-bold gradient-text">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-dark-lighter rounded-full h-4 overflow-hidden border border-dark-border">
                      <div 
                        className={`h-4 rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000 group-hover/dist:animate-pulse`} 
                        style={{ 
                          width: `${item.percentage}%`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Enhanced Deflationary Section */}
              <div className="p-6 bg-gradient-to-r from-dark-lighter/50 to-dark-card/50 rounded-xl border border-dark-border hover:border-berry/30 transition-all duration-300 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-berry/20">
                    <Shield className="h-5 w-5 text-berry" />
                  </div>
                  <h3 className="font-bold text-lg">Deflationary Mechanisms</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-berry rounded-full animate-pulse"></div>
                    Transaction burn mechanism reduces supply
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-berry-purple rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    Regular token buyback and burn events
                  </li>
                </ul>
              </div>
              
              {/* Enhanced CTA */}
              <div className="flex justify-center">
                <Link to="/token">
                  <Button className="berry-button group text-lg px-8 py-4 hover:scale-105 transition-all duration-300 relative overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      <DollarSign className="mr-2 h-5 w-5" />
                      Buy $BUSTY Now
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-berry-light to-berry opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
