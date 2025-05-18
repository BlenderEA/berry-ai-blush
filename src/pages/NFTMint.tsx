
import React, { useState } from 'react';
import { Wallet, Plus, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const NFTMint = () => {
  const [mintAmount, setMintAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const [mintComplete, setMintComplete] = useState(false);
  const { toast } = useToast();

  const handleDecrease = () => {
    if (mintAmount > 1) setMintAmount(mintAmount - 1);
  };

  const handleIncrease = () => {
    if (mintAmount < 10) setMintAmount(mintAmount + 1);
  };

  const handleMint = () => {
    setIsMinting(true);
    
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false);
      setMintComplete(true);
      
      toast({
        title: "NFTs Minted Successfully!",
        description: `You have minted ${mintAmount} Busty Berry NFTITTYS.`,
        variant: "default",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center gradient-text">
            Mint Your Busty Berry NFTITTYS
          </h1>
          <p className="text-xl mb-8 text-center max-w-2xl">
            Exclusive NFT collection with unique digital assets. Mint yours now before they're gone!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* NFT Preview */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md aspect-square bg-dark-card rounded-2xl overflow-hidden border-2 border-berry p-1 mb-4">
              <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-berry-purple to-berry-magenta flex items-center justify-center animate-pulse-slow">
                <img 
                  src="/placeholder.svg" 
                  alt="Busty Berry NFT Preview" 
                  className="w-4/5 h-4/5 object-cover animate-float"
                />
              </div>
            </div>
            <div className="bg-dark-lighter p-4 rounded-xl w-full max-w-md">
              <h3 className="font-bold text-lg mb-2">Collection Details</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-400">Collection:</span>
                  <span className="font-medium">Busty Berry NFTITTYS</span>
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
                  <span className="font-medium">0.69 SOL</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mint Controls */}
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-2xl">Mint Your NFTs</CardTitle>
              <CardDescription>Select how many NFTs to mint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span>Quantity:</span>
                  <span className="text-berry font-bold">{mintAmount} NFT{mintAmount > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDecrease}
                    disabled={mintAmount <= 1 || isMinting}
                    className="border-berry text-berry hover:bg-berry/10"
                  >
                    -
                  </Button>
                  <div className="flex-grow">
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={mintAmount}
                      onChange={(e) => setMintAmount(parseInt(e.target.value) || 1)}
                      disabled={isMinting}
                      className="bg-dark-lighter border-dark-border text-center"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleIncrease}
                    disabled={mintAmount >= 10 || isMinting}
                    className="border-berry text-berry hover:bg-berry/10"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-t border-dark-border pt-4">
                  <span>Price per NFT:</span>
                  <span className="font-bold">0.69 SOL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total:</span>
                  <span className="font-bold text-lg">{(0.69 * mintAmount).toFixed(2)} SOL</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-berry hover:bg-berry-light text-white font-bold py-3 h-auto"
                disabled={isMinting || mintComplete}
                onClick={handleMint}
              >
                {isMinting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Minting...
                  </span>
                ) : mintComplete ? (
                  <span className="flex items-center">
                    <Check className="mr-2" /> Minted Successfully
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Wallet className="mr-2" /> Mint Now
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Collection Info */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">About Busty Berry NFTITTYS</h2>
          <div className="bg-dark-lighter rounded-xl p-6 mb-8">
            <p className="mb-4">
              Busty Berry NFTITTYS is a limited collection of 10,000 unique NFTs on the Solana blockchain. Each NFT features unique attributes and varying rarities, making them valuable digital collectibles.
            </p>
            <p>
              Holding Busty Berry NFTITTYS grants you exclusive access to community events, airdrops, and upcoming releases in the Busty Berry ecosystem.
            </p>
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
    </div>
  );
};

export default NFTMint;
