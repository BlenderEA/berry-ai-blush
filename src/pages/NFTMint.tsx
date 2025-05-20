
import React from 'react';
import { CalendarDays, Bell } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const NFTMint = () => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  
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

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Image Section */}
        <div className="flex flex-col items-center mb-12 mt-8">
          <div className="relative w-full max-w-4xl mx-auto mb-8">
            <img 
              src="/lovable-uploads/7ba95f21-690e-49fa-87bb-f8b65bcd73bc.png" 
              alt="Busty Berry NFTitties Collection" 
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent rounded-2xl"></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center gradient-text">Busty Berry NFTitties</h1>
          <div className="bg-berry px-6 py-3 rounded-full text-white font-bold text-xl mb-8 animate-pulse shadow-glow">
            COMING SOON!
          </div>
          <p className="text-xl mb-8 text-center max-w-2xl">
            Our exclusive NFT collection will be available for minting soon. Be among the first to get your hands on these unique digital assets!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* NFT Preview */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md aspect-square bg-dark-card rounded-2xl overflow-hidden border-2 border-berry p-1 mb-4">
              <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-berry-purple to-berry-magenta flex items-center justify-center">
                <div className="text-center p-6">
                  <CalendarDays size={80} className="mx-auto mb-4 text-white/50" />
                  <h3 className="text-2xl font-bold mb-2">Launch Date</h3>
                  <p className="text-lg text-white/80">Coming Q3 2025</p>
                </div>
              </div>
            </div>
            <div className="bg-dark-lighter p-4 rounded-xl w-full max-w-md">
              <h3 className="font-bold text-lg mb-2">Collection Details</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-400">Collection:</span>
                  <span className="font-medium">Busty Berry NFTitties</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Total Supply:</span>
                  <span className="font-medium">10,000</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Blockchain:</span>
                  <span className="font-medium">Solana</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Price:</span>
                  <span className="font-medium">TBA</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Notification Sign-up */}
          <Card className="bg-dark-card border-dark-border">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <Bell className="h-12 w-12 mx-auto mb-4 text-berry" />
                <h2 className="text-2xl font-bold mb-2">Get Notified</h2>
                <p className="text-gray-400">Be the first to know when minting goes live</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                  <Input id="email" type="email" placeholder="your@email.com" className="bg-dark-lighter border-dark-border" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                
                <Button className="w-full bg-berry hover:bg-berry-light text-white font-bold py-3 h-auto" onClick={handleNotify}>
                  <Bell className="h-4 w-4 mr-2" />
                  Notify Me When Live
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  We respect your privacy. No spam, just important updates.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Collection Info */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">About Busty Berry NFTitties</h2>
          <div className="bg-dark-lighter rounded-xl p-6 mb-8">
            <p className="mb-4">Busty Berry NFTitties is a limited collection of 10,000 unique NFTs on the Solana blockchain. Each NFT will feature unique attributes and varying rarities, making them valuable digital collectibles.</p>
            <p>Holding Busty Berry NFTitties will grant you exclusive access to community events, airdrops, and upcoming releases in the Busty Berry ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-card p-5 rounded-lg text-center border border-dark-border">
              <h3 className="font-bold text-xl mb-2 text-berry">Exclusive Access</h3>
              <p className="text-sm">Join our private community and get early access to future drops</p>
            </div>
            <div className="bg-dark-card p-5 rounded-lg text-center border border-dark-border">
              <h3 className="font-bold text-xl mb-2 text-berry">Token Rewards</h3>
              <p className="text-sm">Earn $BUSTY tokens as staking rewards for your NFTs</p>
            </div>
            <div className="bg-dark-card p-5 rounded-lg text-center border border-dark-border">
              <h3 className="font-bold text-xl mb-2 text-berry">Future Utility</h3>
              <p className="text-sm">Use your NFTs across the Busty Berry ecosystem</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 15px 5px rgba(217, 70, 239, 0.5);
        }
      `}</style>
    </div>
  );
};

export default NFTMint;
