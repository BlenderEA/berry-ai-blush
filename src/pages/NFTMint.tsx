
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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
      description: "We'll notify you when the Memorial Day Edition is available for minting.",
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
            alt="Busty Berry Memorial Day Edition" 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* NFT Collection Title with animated gradient */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center animate-gradient-flow bg-clip-text text-transparent bg-gradient-to-r from-berry-purple via-berry to-berry-light">
            Busty Berries Memorial Day Edition
          </h1>
          
          {/* Description with better typography and 1/1 info */}
          <div className="mb-10">
            <p className="text-xl md:text-2xl mb-6 text-center text-gray-200 leading-relaxed max-w-3xl mx-auto">
              A bold and juicy 1/1 NFT collection featuring seductive, sexy women with curves and luscious berries. This limited drop blends sex appeal with vibrant fruit-inspired aesthetics and adds a patriotic twist and military theme in honor of Memorial Day.
            </p>
            
            {/* NFT Collection Details Banner */}
            <div className="bg-gradient-to-r from-berry-purple/20 to-berry/20 p-4 rounded-xl border border-berry/40 max-w-2xl mx-auto">
              <h2 className="text-center text-2xl font-bold mb-4 text-berry-light">Exclusive 1/1 Collection</h2>
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-center">
                <div className="flex-1">
                  <p className="text-3xl font-bold text-white mb-1">138</p>
                  <p className="text-sm text-gray-300">Total Unique NFTs</p>
                </div>
                <div className="h-12 w-px bg-berry-purple/50 hidden md:block"></div>
                <div className="flex-1">
                  <p className="text-3xl font-bold text-white mb-1">69</p>
                  <p className="text-sm text-gray-300">Regular Edition</p>
                </div>
                <div className="h-12 w-px bg-berry-purple/50 hidden md:block"></div>
                <div className="flex-1">
                  <p className="text-3xl font-bold text-berry-light mb-1">69</p>
                  <p className="text-sm text-gray-300">Pink Edition</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-dark-card border-dark-border text-white hover:border-berry transition-colors">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2 text-berry">1/1 Unique Art</h3>
                <p className="text-gray-300">Each NFT is completely unique with no duplicates - true digital ownership</p>
              </CardContent>
            </Card>
            <Card className="bg-dark-card border-dark-border text-white hover:border-berry transition-colors">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2 text-berry">Exclusive Benefits</h3>
                <p className="text-gray-300">Holders get special access to future drops and community events</p>
              </CardContent>
            </Card>
            <Card className="bg-dark-card border-dark-border text-white hover:border-berry transition-colors">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2 text-berry">Solana Network</h3>
                <p className="text-gray-300">Minted on Solana for low fees and lightning-fast transactions</p>
              </CardContent>
            </Card>
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
          
          {/* Notification Sign-up with better styling */}
          <div className="bg-dark-card border border-dark-border p-8 rounded-xl max-w-md mx-auto shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">Get Early Access</h3>
            <p className="text-center text-gray-300 mb-6">Be the first to know when these 138 unique 1/1 NFTs drop</p>
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
