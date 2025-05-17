
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AgeVerification = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const hasVerified = localStorage.getItem('bustyberry-age-verified');
    if (!hasVerified) {
      setOpen(true);
    }
  }, []);
  
  const handleVerify = () => {
    localStorage.setItem('bustyberry-age-verified', 'true');
    setOpen(false);
    toast({
      title: "Welcome to Busty Berry!",
      description: "You've successfully verified your age.",
    });
  };
  
  const handleReject = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-dark-card border-dark-border text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center gradient-text">Age Verification</DialogTitle>
          <DialogDescription className="text-center text-gray-300 text-lg pt-2">
            You must be 18+ to enter Busty Berry
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 text-center">
          <p className="mb-6">This website contains adult-themed content. Please confirm you are at least 18 years of age.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleVerify} 
              className="w-full sm:w-auto bg-berry hover:bg-berry-light"
            >
              I am 18+ years old
            </Button>
            <Button 
              onClick={handleReject} 
              variant="outline" 
              className="w-full sm:w-auto border-dark-border text-gray-300 hover:bg-dark-lighter"
            >
              Exit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgeVerification;
