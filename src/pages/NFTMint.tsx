
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

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
    <div className="flex flex-col items-center bg-dark-card p-3 sm:p-4 rounded-lg min-w-[70px] sm:min-w-[90px]">
      <span className="text-2xl sm:text-3xl font-bold text-berry">{value}</span>
      <span className="text-xs sm:text-sm text-gray-400">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Banner Image - Now with max width and height constraints */}
        <div className="max-w-3xl mx-auto mb-8 rounded-xl overflow-hidden shadow-lg">
          <img 
            src="/lovable-uploads/2fa7f246-e7e0-42f6-a543-313c3247fa40.png" 
            alt="Busty Berry Memorial Day Edition" 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* NFT Collection Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center gradient-text">
            Busty Berries Memorial Day Edition
          </h1>
          
          {/* Description */}
          <p className="text-xl mb-10 text-center text-gray-200">
            A bold and juicy NFT collection featuring seductive, sexy women with curves and luscious berries. This limited drop blends sex appeal with vibrant fruit-inspired aesthetics and adds a patriotic twist and military theme in honor of Memorial Day. A playful, provocative twist on digital art, this collection is for collectors who crave something wild, ripe, and unforgettable.
          </p>
          
          {/* Countdown Timer */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Launch Countdown</h2>
            <div className="flex justify-center items-center gap-3 sm:gap-4 mb-2">
              <CountdownUnit value={timeRemaining.days} label="DAYS" />
              <CountdownUnit value={timeRemaining.hours} label="HOURS" />
              <CountdownUnit value={timeRemaining.minutes} label="MINS" />
              <CountdownUnit value={timeRemaining.seconds} label="SECS" />
            </div>
            <p className="text-center text-gray-400 mt-2">
              <Clock className="inline-block mr-1" size={16} />
              Launching at 12:00 PM EST this Friday
            </p>
          </div>
          
          {/* Notification Sign-up */}
          <div className="bg-dark-card border border-dark-border p-6 rounded-xl max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 text-center">Get Notified at Launch</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 bg-dark-lighter border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-berry"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="bg-berry hover:bg-berry-light text-white"
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
