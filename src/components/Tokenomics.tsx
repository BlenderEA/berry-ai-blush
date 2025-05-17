
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Tokenomics = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // Updated contract address
  const contractAddress = "6wA6u3Y9mNpZy7z3oWDaLWUMmp5ourhM6oRFUrsSpump";
  
  const tokenInfo = [
    { label: "Token Name", value: "Busty Berry Token" },
    { label: "Symbol", value: "$BUSTY" },
    { label: "Total Supply", value: "1,000,000,000" },
    { label: "Blockchain", value: "Solana" },
    { label: "Standard", value: "SPL Token" },
  ];
  
  const tokenUtility = [
    "Platform payments and subscriptions",
    "Governance voting power",
    "Staking rewards and premium features", 
    "Community incentives and rewards"
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
            <span className="gradient-text">$BUSTY</span> Tokenomics
          </h2>
          <p className="text-lg text-gray-300">
            Our token is designed to power a decentralized creator economy with transparency, community governance, and long-term sustainability.
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
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Token Utility</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {tokenUtility.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
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
              
              <div className="mt-8 p-4 bg-dark-lighter rounded-lg border border-dark-border">
                <h3 className="font-medium mb-2">Deflationary Mechanisms</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Transaction burn mechanism</li>
                  <li>Regular token buyback and burn</li>
                </ul>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Link to="/token">
                  <Button className="berry-button group">
                    Buy $BUSTY
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
