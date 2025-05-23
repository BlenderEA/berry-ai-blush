import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Set the launch date to 13 minutes from now
  const calculateLaunchDate = () => {
    const now = new Date();
    const launchDate = new Date(now);
    launchDate.setMinutes(launchDate.getMinutes() + 13);
    
    return launchDate;
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

  const CountdownUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center bg-dark-card p-3 sm:p-4 rounded-lg min-w-[70px] sm:min-w-[80px] border border-dark-border shadow-lg">
      <span className="text-xl sm:text-2xl font-bold text-berry">{value}</span>
      <span className="text-xs sm:text-sm text-gray-400">{label}</span>
    </div>
  );

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-berry-purple/10 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-berry/10 blur-[100px] animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-card/80 backdrop-blur-sm border border-dark-border rounded-xl p-6 sm:p-8 shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                <span className="text-berry">Memorial Day NFTitties</span> Launch Collection
              </h2>
              <p className="text-gray-300">
                138 unique 1/1 NFTs - 69 Regular Edition & 69 Pink Edition
              </p>
            </div>
            
            <div className="flex justify-center items-center gap-3 sm:gap-4 mb-6">
              <CountdownUnit value={timeRemaining.days} label="DAYS" />
              <CountdownUnit value={timeRemaining.hours} label="HOURS" />
              <CountdownUnit value={timeRemaining.minutes} label="MINS" />
              <CountdownUnit value={timeRemaining.seconds} label="SECS" />
            </div>
            
            <div className="text-center">
              <p className="flex items-center justify-center gap-2 text-gray-400 mb-4">
                <Clock className="inline-block" size={16} />
                Launching in 13 minutes
              </p>
              
              <Link to="/nft">
                <Button className="berry-button group">
                  Learn More
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
