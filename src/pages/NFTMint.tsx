
import React, { useState, useEffect } from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const NFTMint = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Set the launch date to noon EST this Friday
  const calculateLaunchDate = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 5 is Friday
    const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 5 + (7 - dayOfWeek);
    
    const fridayDate = new Date(now);
    fridayDate.setDate(fridayDate.getDate() + daysUntilFriday);
    fridayDate.setHours(12, 0, 0, 0); // Noon EST
    
    return fridayDate;
  };
  
  const launchDate = calculateLaunchDate();
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleNotify = () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Notification Set!",
      description: "We'll notify you when the NFTitties collection is available for minting.",
      variant: "default"
    });
    
    setEmail('');
  };
  
  const CountdownUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center bg-dark-card p-3 sm:p-4 rounded-lg min-w-[70px] sm:min-w-[90px] border border-dark-border shadow-lg">
      <span className="text-2xl sm:text-3xl font-bold text-berry">{value}</span>
      <span className="text-xs sm:text-sm text-gray-400">{label}</span>
    </div>
  );

  // NFT Collection Rarities
  const rarities = [
    { type: "Vibrant NFTs", rarity: "Common", count: 58 },
    { type: "Pink NFTs", rarity: "Common", count: 58 },
    { type: "Vibrant Topless NFTs", rarity: "Rare", count: 10 },
    { type: "Pink Topless NFTs", rarity: "Rare", count: 10 },
    { type: "Vibrant Triple Nipple NFT", rarity: "Ultra-Rare", count: 1 },
    { type: "Pink Triple Nipple NFT", rarity: "Ultra-Rare", count: 1 }
  ];

  // Golden Ticket Rewards
  const goldenTicketRewards = [
    { marketCap: "1M", tickets: 3, reward: "$500 worth of $Busty" },
    { marketCap: "3M", tickets: 3, reward: "Weekend Airbnb stay ($1,000 value)" },
    { marketCap: "5M", tickets: 4, reward: "Airline travel voucher ($3,000 value)" },
    { marketCap: "10M", tickets: 7, reward: "VIP Las Vegas Package ($10,000 value)" }
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      
      <div className="relative w-full h-24 sm:h-32 md:h-40 bg-gradient-to-r from-berry-purple to-berry overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/2fa7f246-e7e0-42f6-a543-313c3247fa40.png')] bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark"></div>
      </div>
      
      <main className="container mx-auto px-4 py-12 -mt-8 relative z-10">
        {/* Banner Image with glow effect */}
        <div className="max-w-3xl mx-auto mb-12 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(217,70,239,0.3)]">
          <img 
            src="/lovable-uploads/2fa7f246-e7e0-42f6-a543-313c3247fa40.png" 
            alt="NFTitties Collection" 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* NFT Collection Title with animated gradient */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center animate-gradient-flow bg-clip-text text-transparent bg-gradient-to-r from-berry-purple via-berry to-berry-light">
            NFTitties Utility & Rewards
          </h1>
          
          {/* Description with better typography */}
          <div className="mb-10">
            <p className="text-xl md:text-2xl mb-6 text-center text-gray-200 leading-relaxed max-w-3xl mx-auto">
              Our NFTitties collection isn't just spicy eye candy — it comes with real utility and rewards based on rarity!
            </p>
          </div>

          {/* Rarity Breakdown */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Rarity Breakdown</h2>
            <div className="bg-dark-card rounded-xl p-6 border border-dark-border mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rarities.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 rounded-lg bg-dark-lighter border border-dark-border">
                    <div>
                      <span className="font-medium">{item.count} {item.type}</span>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      item.rarity === "Ultra-Rare" ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black" : 
                      item.rarity === "Rare" ? "bg-purple-700" : "bg-gray-700"
                    }`}>
                      {item.rarity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center font-bold text-xl border-t border-dark-border pt-4">
                Total = 69 Vibrant NFTs + 69 Pink NFTs
              </div>
            </div>
          </div>

          {/* Golden Ticket Utility */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Golden Ticket Utility</h2>
            <div className="bg-dark-card rounded-xl p-6 border border-dark-border mb-6">
              <p className="text-center mb-6 text-lg">
                Triple Nipple NFTs double as Golden Tickets. Collect and redeem Golden Tickets for major rewards tied to $Busty Berry coin's market cap:
              </p>
              <div className="space-y-4">
                {goldenTicketRewards.map((reward, index) => (
                  <div key={index} className="flex flex-col md:flex-row justify-between items-center p-4 rounded-lg bg-dark-lighter border border-dark-border">
                    <div className="flex items-center mb-3 md:mb-0">
                      <span className="bg-yellow-600 text-black px-3 py-1 rounded-full text-xs font-bold mr-3">
                        {reward.tickets} Tickets
                      </span>
                      <span className="text-berry font-medium">${reward.marketCap} Market Cap</span>
                    </div>
                    <p className="text-white font-medium">{reward.reward}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NFT Holder Perks */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">NFT Holder Perks</h2>
            <div className="bg-dark-card rounded-xl p-6 border border-dark-border mb-6">
              <p className="text-center mb-6 text-lg">
                Each NFT comes with a $Busty redemption bonus:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-dark-lighter p-6 rounded-lg border border-dark-border text-center">
                  <h3 className="text-xl font-bold mb-2">Topless NFTs</h3>
                  <p className="text-2xl font-bold text-berry">Redeem $100k in $Busty</p>
                </div>
                <div className="bg-dark-lighter p-6 rounded-lg border border-dark-border text-center">
                  <h3 className="text-xl font-bold mb-2">Triple Nipple NFTs</h3>
                  <p className="text-2xl font-bold text-berry">Redeem $1M in $Busty</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-dark-border bg-opacity-40 rounded-lg">
                <p className="text-center font-medium">
                  <span className="text-berry">*</span> In order to redeem your supply redemption bonus, all NFTs must be purchased.
                </p>
              </div>
            </div>
          </div>
          
          {/* How to Buy */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">How to Buy Your NFTitties</h2>
            <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
              <ol className="space-y-6">
                <li className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 rounded-full bg-dark-lighter border border-berry flex items-center justify-center font-bold text-sm shadow-lg shadow-berry/10">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Set Up a Solana Wallet</h3>
                    <p className="text-gray-300 text-sm">Phantom (Recommended) or Solflare. Save your recovery phrase securely.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 rounded-full bg-dark-lighter border border-berry flex items-center justify-center font-bold text-sm shadow-lg shadow-berry/10">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Load Your Wallet with SOL</h3>
                    <p className="text-gray-300 text-sm">Buy SOL on an exchange and transfer it to your wallet.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 rounded-full bg-dark-lighter border border-berry flex items-center justify-center font-bold text-sm shadow-lg shadow-berry/10">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Go to LaunchMyNFT.io</h3>
                    <p className="text-gray-300 text-sm">Connect your wallet using the button in the top right.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 rounded-full bg-dark-lighter border border-berry flex items-center justify-center font-bold text-sm shadow-lg shadow-berry/10">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Find the Busty Berry Collection</h3>
                    <p className="text-gray-300 text-sm">
                      <a 
                        href="https://tinyurl.com/BustyBerry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-berry hover:text-berry-light flex items-center group"
                      >
                        Visit https://tinyurl.com/BustyBerry
                        <ExternalLink className="ml-1 h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 rounded-full bg-dark-lighter border border-berry flex items-center justify-center font-bold text-sm shadow-lg shadow-berry/10">
                      5
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Mint or Buy Your NFTitty</h3>
                    <p className="text-gray-300 text-sm">Click Mint Now, approve the transaction, and wait for confirmation.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          
          {/* Countdown Timer with enhanced styling */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Launch Countdown</h2>
            <div className="flex justify-center items-center gap-3 sm:gap-6 mb-4">
              <CountdownUnit value={timeRemaining.days} label="DAYS" />
              <CountdownUnit value={timeRemaining.hours} label="HOURS" />
              <CountdownUnit value={timeRemaining.minutes} label="MINS" />
              <CountdownUnit value={timeRemaining.seconds} label="SECS" />
            </div>
            <p className="text-center text-gray-400 flex items-center justify-center gap-2">
              <Clock className="inline-block" size={18} />
              Launching at 12:00 PM EST this Friday
            </p>
          </div>
          
          {/* Direct Buy Link */}
          <div className="text-center mb-16">
            <a 
              href="https://tinyurl.com/BustyBerry"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                className="bg-berry hover:bg-berry-light text-white font-semibold px-8 py-6 text-lg"
              >
                Buy Now on LaunchMyNFT.io
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
          
          {/* Notification Sign-up with better styling */}
          <div className="bg-dark-card border border-dark-border p-8 rounded-xl max-w-md mx-auto shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">Get Early Access</h3>
            <p className="text-center text-gray-300 mb-6">Be the first to know when our spicy NFTitties drop</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-dark-lighter border border-dark-border text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="bg-berry hover:bg-berry-light text-white font-semibold"
                onClick={handleNotify}
              >
                Notify Me
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NFTMint;
