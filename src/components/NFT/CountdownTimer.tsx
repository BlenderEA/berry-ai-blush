
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type CountdownTimerProps = {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setIsLaunched(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return {
        days,
        hours,
        minutes,
        seconds
      };
    };

    // Calculate immediately
    setTimeRemaining(calculateTimeRemaining());
    
    // Then set up interval
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);
      
      if (remaining.days === 0 && remaining.hours === 0 && 
          remaining.minutes === 0 && remaining.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  
  const timeUnits = [
    { label: 'Days', value: timeRemaining.days },
    { label: 'Hours', value: timeRemaining.hours },
    { label: 'Minutes', value: timeRemaining.minutes },
    { label: 'Seconds', value: timeRemaining.seconds }
  ];

  return (
    <div className="w-full">
      {isLaunched ? (
        <div className="flex flex-col items-center py-2">
          <div className="text-2xl font-bold text-berry animate-pulse">LIVE NOW</div>
          <p className="text-white">Minting is now active!</p>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex items-center justify-center mb-2">
            <Clock className="mr-2 text-berry" />
            <span className="text-sm text-white/80">Launch Countdown</span>
          </div>
          
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {timeUnits.map((unit, index) => (
              <div key={index} className="flex flex-col items-center bg-dark-card rounded-lg p-2 md:p-3 border border-berry/30">
                <span className="text-xl md:text-3xl font-bold text-white">
                  {unit.value < 10 ? `0${unit.value}` : unit.value}
                </span>
                <span className="text-xs md:text-sm text-gray-400">{unit.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
