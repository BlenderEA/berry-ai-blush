
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Tokenomics = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // This would be the actual contract address
  const contractAddress = "DUMMYSoL4ddREssH3re12345678901234567890";
  
  const tokenInfo = [
    { label: "Token Name", value: "Busty Berry" },
    { label: "Symbol", value: "$BUSTYBERRY" },
    { label: "Total Supply", value: "1,000,000,000" },
    { label: "Blockchain", value: "Solana" },
    { label: "Listed On", value: "Jupiter, Raydium" },
  ];
  
  const tokenDistribution = [
    { category: "Public Sale", percentage: 40, color: "bg-berry" },
    { category: "Liquidity", percentage: 30, color: "bg-berry-purple" },
    { category: "Team", percentage: 10, color: "bg-indigo-500" },
    { category: "Marketing", percentage: 15, color: "bg-pink-500" },
    { category: "Development", percentage: 5, color: "bg-violet-500" },
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
    <section className="section-padding relative" id="tokenomics">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">$BUSTYBERRY</span> Tokenomics
          </h2>
          <p className="text-lg text-gray-300">
            Our token is designed for sustainability, community engagement, and long-term growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Token Info Card */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Token Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {tokenInfo.map((item, index) => (
                  <li key={index} className="flex justify-between items-center border-b border-dark-border pb-3">
                    <span className="text-gray-300">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 rounded-lg bg-dark border border-dark-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Contract Address:</span>
                  <button 
                    onClick={copyToClipboard}
                    className="text-sm text-berry hover:text-berry-light flex items-center"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono text-sm bg-dark-lighter p-3 rounded overflow-x-auto">
                  {contractAddress}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Token Distribution Card */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Token Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {tokenDistribution.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">{item.category}</span>
                      <span className="text-sm font-medium">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-dark-lighter rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${item.color}`} 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <Link to="/token">
                  <Button className="berry-button group">
                    Buy $BUSTYBERRY
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
