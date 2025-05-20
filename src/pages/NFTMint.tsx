
import React, { useState, useEffect } from 'react';
import { CalendarDays, Clock, Bell, Flag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import CountdownTimer from '@/components/NFT/CountdownTimer';

const NFTMint = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const launchDate = new Date('2025-05-23T12:00:00-04:00'); // Noon EST this Friday

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
      description: "We'll notify you when Busty Berry NFTITTYS are available for minting.",
      variant: "default"
    });
    setEmail('');
  };

  return <div className="min-h-screen bg-dark text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex justify-center items-center">
        {/* Hero Banner Section with Countdown */}
        <div className="flex flex-col items-center mb-12 max-w-5xl w-full">
          <div className="relative w-full max-w-5xl mx-auto mb-6 overflow-hidden rounded-2xl">
            <div className="aspect-[16/9] overflow-hidden">
              <img src="/lovable-uploads/7ba95f21-690e-49fa-87bb-f8b65bcd73bc.png" alt="Busty Berry NFTitties Memorial Day Edition" className="w-full object-cover rounded-2xl shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
            </div>
            
            {/* Countdown overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark p-6">
              <div className="flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">LAUNCHING</h2>
                <CountdownTimer targetDate={launchDate} />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center gradient-text">Busty Berry NFTitties</h1>
          <div className="bg-berry px-6 py-3 rounded-full text-white font-bold text-xl mb-8 shadow-glow flex items-center">
            <Flag className="mr-2 h-5 w-5" /> MEMORIAL DAY EDITION <Flag className="ml-2 h-5 w-5" />
          </div>
          
          {/* Description */}
          <div className="bg-dark-lighter rounded-xl p-6 max-w-3xl mx-auto mb-10 border border-berry/30">
            <p className="text-lg text-center">
              Busty Berries Memorial Day Edition is a bold and juicy NFT collection featuring seductive, sexy women with curves and luscious berries. This limited drop blends sex appeal with vibrant fruit-inspired aesthetics and adds a patriotic twist and military theme in honor of Memorial Day. A playful, provocative twist on digital art, this collection is for collectors who crave something wild, ripe, and unforgettable.
            </p>
          </div>
        </div>
      </main>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* NFT Preview */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md aspect-square bg-dark-card rounded-2xl overflow-hidden border-2 border-berry p-1 mb-4">
              <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-berry-purple to-berry-magenta flex items-center justify-center">
                <div className="text-center p-6">
                  <CalendarDays size={80} className="mx-auto mb-4 text-white/50" />
                  <h3 className="text-2xl font-bold mb-2">Launch Date</h3>
                  <p className="text-lg text-white/80">Friday, May 23rd, 2025</p>
                  <p className="text-md text-white/80">12:00 PM EST</p>
                </div>
              </div>
            </div>
            <div className="bg-dark-lighter p-4 rounded-xl w-full max-w-md">
              <h3 className="font-bold text-lg mb-2">Collection Details</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-400">Collection:</span>
                  <span className="font-medium">Busty Berry NFTitties: Memorial Day Edition</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Total Supply:</span>
                  <span className="font-medium">1,776</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Blockchain:</span>
                  <span className="font-medium">Solana</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Mint Price:</span>
                  <span className="font-medium">0.42 SOL</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Notification Sign-up */}
          <div className="flex flex-col items-center justify-center">
            <Card className="w-full max-w-md bg-dark-card border-berry/30">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 text-center">Get Notified at Launch</h3>
                <p className="text-sm text-white/70 mb-6 text-center">
                  Enter your email to receive a notification when Busty Berry NFTitties are available for minting.
                </p>
                <div className="flex flex-col space-y-4">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="bg-dark-lighter border-dark-border"
                  />
                  <Button 
                    onClick={handleNotify}
                    className="w-full bg-berry hover:bg-berry-light"
                  >
                    <Bell className="mr-2 h-4 w-4" /> Notify Me
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Collection Info */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Memorial Day Edition Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-card p-5 rounded-lg text-center border border-dark-border">
              <h3 className="font-bold text-xl mb-2 text-berry">Exclusive Access</h3>
              <p className="text-sm">Priority access to future Busty Berry drops and events</p>
            </div>
            <div className="bg-dark-card p-5 rounded-lg text-center border border-dark-border">
              <h3 className="font-bold text-xl mb-2 text-berry">Patriotic Perks</h3>
              <p className="text-sm">Special Memorial Day airdrops for holders</p>
            </div>
            <div className="bg-dark-card p-5 rounded-lg text-center border border-dark-border">
              <h3 className="font-bold text-xl mb-2 text-berry">Community</h3>
              <p className="text-sm">Join our patriotic, berry-loving community</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      <style>
        {`.shadow-glow {
          box-shadow: 0 0 15px 5px rgba(217, 70, 239, 0.5);
        }`}
      </style>
    </div>;
};

export default NFTMint;
