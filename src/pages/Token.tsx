
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BustyBerryChart from '@/components/BustyBerryChart';
import TokenHero from '@/components/TokenHero';
import TokenFAQ from '@/components/TokenFAQ';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const Token = () => {
  // Updated contract address
  const contractAddress = "6wA6u3Y9mNpZy7z3oWDaLWUMmp5ourhM6oRFUrsSpump";
  
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
        <div className="container mx-auto px-4">
          <TokenHero />
            
          {/* Live chart section with DEXScreener */}
          <div className="mb-12">
            <BustyBerryChart />
          </div>
            
          <div className="mb-12">
            <Tabs defaultValue="how-to-buy">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="how-to-buy">How to Buy</TabsTrigger>
                <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
              </TabsList>
                
              <TabsContent value="how-to-buy" className="mt-6">
                <Card className="glass-card border-dark-border bg-gradient-to-br from-dark to-dark-lighter">
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
                            <div className="w-12 h-12 rounded-full bg-dark-lighter border border-berry flex items-center justify-center font-bold text-lg shadow-lg shadow-berry/10">
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
                                className="text-berry hover:text-berry-light flex items-center group"
                              >
                                {step.linkText}
                                <ExternalLink className="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                      
                    <div className="mt-8 p-6 bg-dark-lighter rounded-lg border border-dark-border">
                      <h3 className="font-medium mb-2">Need Help?</h3>
                      <p className="text-gray-300 mb-4">
                        If you're having trouble buying $BUSTYBERRY, join our Telegram community for assistance.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <a 
                          href="https://t.me/bustyberrycoin"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Button variant="outline" className="bg-dark-card hover:bg-dark-border transition-all">
                            Join Telegram Support
                          </Button>
                        </a>
                        <a 
                          href={`https://jup.ag/swap/SOL-${contractAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Button variant="default" className="berry-button">
                            Buy $BUSTYBERRY Now
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
                
              <TabsContent value="tokenomics" className="mt-6">
                <Card className="glass-card border-dark-border bg-gradient-to-br from-dark to-dark-lighter">
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
                          <div className="p-4 bg-dark-lighter rounded-lg border border-dark-border hover:border-berry/30 transition-colors">
                            <div className="text-sm text-gray-300 mb-1">Token Name</div>
                            <div className="font-medium">Busty Berry</div>
                          </div>
                          <div className="p-4 bg-dark-lighter rounded-lg border border-dark-border hover:border-berry/30 transition-colors">
                            <div className="text-sm text-gray-300 mb-1">Symbol</div>
                            <div className="font-medium">$BUSTYBERRY</div>
                          </div>
                          <div className="p-4 bg-dark-lighter rounded-lg border border-dark-border hover:border-berry/30 transition-colors">
                            <div className="text-sm text-gray-300 mb-1">Total Supply</div>
                            <div className="font-medium">1,000,000,000</div>
                          </div>
                          <div className="p-4 bg-dark-lighter rounded-lg border border-dark-border hover:border-berry/30 transition-colors">
                            <div className="text-sm text-gray-300 mb-1">Blockchain</div>
                            <div className="font-medium">Solana</div>
                          </div>
                        </div>
                      </div>
                        
                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-5">Token Distribution</h3>
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-300">Public Sale</span>
                              <span>40%</span>
                            </div>
                            <div className="w-full bg-dark-lighter h-3 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-berry to-berry-light h-3 rounded-full transition-all hover:opacity-90" style={{ width: '40%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-300">Liquidity</span>
                              <span>30%</span>
                            </div>
                            <div className="w-full bg-dark-lighter h-3 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-berry-purple to-indigo-400 h-3 rounded-full transition-all hover:opacity-90" style={{ width: '30%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-300">Team</span>
                              <span>10%</span>
                            </div>
                            <div className="w-full bg-dark-lighter h-3 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-indigo-500 to-indigo-300 h-3 rounded-full transition-all hover:opacity-90" style={{ width: '10%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-300">Marketing</span>
                              <span>15%</span>
                            </div>
                            <div className="w-full bg-dark-lighter h-3 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-pink-500 to-pink-300 h-3 rounded-full transition-all hover:opacity-90" style={{ width: '15%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-300">Development</span>
                              <span>5%</span>
                            </div>
                            <div className="w-full bg-dark-lighter h-3 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-violet-500 to-violet-300 h-3 rounded-full transition-all hover:opacity-90" style={{ width: '5%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                        
                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-3">Token Utility</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <li className="flex gap-3 items-start p-4 bg-dark-lighter rounded-lg border border-dark-border hover:border-berry/30 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-berry/10 flex items-center justify-center text-berry">1</div>
                            <div>Access to premium AI chat personalities</div>
                          </li>
                          <li className="flex gap-3 items-start p-4 bg-dark-lighter rounded-lg border border-dark-border hover:border-berry/30 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-berry/10 flex items-center justify-center text-berry">2</div>
                            <div>Early access to new AI features and content</div>
                          </li>
                          <li className="flex gap-3 items-start p-4 bg-dark-lighter rounded-lg border border-dark-border hover:border-berry/30 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-berry/10 flex items-center justify-center text-berry">3</div>
                            <div>Governance voting on future development</div>
                          </li>
                          <li className="flex gap-3 items-start p-4 bg-dark-lighter rounded-lg border border-dark-border hover:border-berry/30 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-berry/10 flex items-center justify-center text-berry">4</div>
                            <div>Potential staking rewards (coming soon)</div>
                          </li>
                          <li className="flex gap-3 items-start p-4 bg-dark-lighter rounded-lg border border-dark-border hover:border-berry/30 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-berry/10 flex items-center justify-center text-berry">5</div>
                            <div>Exclusive access to model content (planned)</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-12">
            <TokenFAQ />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Token;
