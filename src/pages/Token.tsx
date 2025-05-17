import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BustyBerryChart from '@/components/BustyBerryChart';

const Token = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // Updated contract address
  const contractAddress = "6wA6u3Y9mNpZy7z3oWDaLWUMmp5ourhM6oRFUrsSpump";
  
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
  
  const buySteps = [
    {
      title: "Set up a Solana Wallet",
      description: "Download and set up a Solana-compatible wallet like Phantom or Solflare.",
      link: "https://phantom.app/",
      linkText: "Get Phantom Wallet"
    },
    {
      title: "Buy SOL",
      description: "Purchase SOL from an exchange like Coinbase or Binance and transfer it to your wallet.",
      link: "https://www.coinbase.com/",
      linkText: "Buy on Coinbase"
    },
    {
      title: "Connect to a DEX",
      description: "Go to Jupiter or Raydium and connect your wallet.",
      link: "https://jup.ag/",
      linkText: "Go to Jupiter"
    },
    {
      title: "Swap SOL for $BUSTYBERRY",
      description: "Enter the contract address, set the amount you want to buy, and confirm the swap.",
      link: "#",
      linkText: "How to Swap (Tutorial)"
    }
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-20 pb-16">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">$BUSTYBERRY</span> Token
              </h1>
              <p className="text-lg text-gray-300">
                Everything you need to know about our token - from tokenomics to how to buy.
              </p>
            </div>
            
            <div className="mb-12">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Contract Address</CardTitle>
                  <CardDescription>Use this address to add $BUSTYBERRY to your wallet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg bg-dark-lighter border border-dark-border">
                    <code className="text-sm sm:text-base font-mono text-gray-300 break-all mb-4 sm:mb-0">
                      {contractAddress}
                    </code>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="min-w-[100px]"
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a 
                      href={`https://solscan.io/token/${contractAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="outline" className="w-full">
                        View on Solscan
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                    <a 
                      href={`https://jup.ag/swap/SOL-${contractAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="outline" className="w-full">
                        Trade on Jupiter
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                    <a 
                      href={`https://raydium.io/swap/?inputCurrency=sol&outputCurrency=${contractAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="outline" className="w-full">
                        Trade on Raydium
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Add chart section */}
            <div className="mb-12">
              <BustyBerryChart />
            </div>
            
            <div className="mb-12">
              <Tabs defaultValue="how-to-buy">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="how-to-buy">How to Buy</TabsTrigger>
                  <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="how-to-buy">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>How to Buy $BUSTYBERRY</CardTitle>
                      <CardDescription>
                        Follow these simple steps to purchase $BUSTYBERRY tokens
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {buySteps.map((step, index) => (
                          <div key={index} className="flex">
                            <div className="flex-shrink-0 mr-4">
                              <div className="w-10 h-10 rounded-full bg-berry flex items-center justify-center font-bold">
                                {index + 1}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                              <p className="text-gray-300 mb-3">{step.description}</p>
                              {step.link && (
                                <a 
                                  href={step.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-berry hover:text-berry-light flex items-center"
                                >
                                  {step.linkText}
                                  <ExternalLink className="ml-1 h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 p-4 bg-dark-lighter rounded-lg border border-dark-border">
                        <h3 className="font-medium mb-2">Need Help?</h3>
                        <p className="text-gray-300">
                          If you're having trouble buying $BUSTYBERRY, join our Telegram community for assistance.
                        </p>
                        <a 
                          href="https://t.me/bustyberrycoin"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block"
                        >
                          <Button variant="outline">
                            Join Telegram Support
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="tokenomics">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>$BUSTYBERRY Tokenomics</CardTitle>
                      <CardDescription>
                        Understanding the distribution and utility of $BUSTYBERRY tokens
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3">Token Details</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-dark-lighter rounded-lg border border-dark-border">
                              <div className="text-sm text-gray-300 mb-1">Token Name</div>
                              <div className="font-medium">Busty Berry</div>
                            </div>
                            <div className="p-4 bg-dark-lighter rounded-lg border border-dark-border">
                              <div className="text-sm text-gray-300 mb-1">Symbol</div>
                              <div className="font-medium">$BUSTYBERRY</div>
                            </div>
                            <div className="p-4 bg-dark-lighter rounded-lg border border-dark-border">
                              <div className="text-sm text-gray-300 mb-1">Total Supply</div>
                              <div className="font-medium">1,000,000,000</div>
                            </div>
                            <div className="p-4 bg-dark-lighter rounded-lg border border-dark-border">
                              <div className="text-sm text-gray-300 mb-1">Blockchain</div>
                              <div className="font-medium">Solana</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-3">Token Distribution</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-gray-300">Public Sale</span>
                                <span>40%</span>
                              </div>
                              <div className="w-full bg-dark-lighter h-2 rounded-full">
                                <div className="bg-berry h-2 rounded-full" style={{ width: '40%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-gray-300">Liquidity</span>
                                <span>30%</span>
                              </div>
                              <div className="w-full bg-dark-lighter h-2 rounded-full">
                                <div className="bg-berry-purple h-2 rounded-full" style={{ width: '30%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-gray-300">Team</span>
                                <span>10%</span>
                              </div>
                              <div className="w-full bg-dark-lighter h-2 rounded-full">
                                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-gray-300">Marketing</span>
                                <span>15%</span>
                              </div>
                              <div className="w-full bg-dark-lighter h-2 rounded-full">
                                <div className="bg-pink-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-gray-300">Development</span>
                                <span>5%</span>
                              </div>
                              <div className="w-full bg-dark-lighter h-2 rounded-full">
                                <div className="bg-violet-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-3">Token Utility</h3>
                          <ul className="list-disc pl-5 space-y-2 text-gray-300">
                            <li>Access to premium AI chat personalities</li>
                            <li>Early access to new AI features and content</li>
                            <li>Governance voting on future development</li>
                            <li>Potential staking rewards (coming soon)</li>
                            <li>Exclusive access to model content (planned)</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">Live Market Data</h2>
              <div className="bg-dark-lighter p-8 rounded-xl border border-dark-border flex items-center justify-center">
                <p className="text-gray-300">
                  Chart integration coming soon. Check price on 
                  <a 
                    href="https://birdeye.so/" 
                    className="text-berry hover:text-berry-light ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Birdeye
                  </a> or 
                  <a 
                    href="https://dexscreener.com/" 
                    className="text-berry hover:text-berry-light ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DexScreener
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Token;
