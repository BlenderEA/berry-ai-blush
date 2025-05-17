
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import BuySteps from './BuySteps';

const HowToBuyTab: React.FC = () => {
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
    <Card className="glass-card border-dark-border bg-gradient-to-br from-dark to-dark-lighter">
      <CardHeader>
        <CardTitle>How to Buy $BUSTYBERRY</CardTitle>
        <CardDescription>
          Follow these simple steps to purchase $BUSTYBERRY tokens
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BuySteps buySteps={buySteps} contractAddress={contractAddress} />
      </CardContent>
    </Card>
  );
};

export default HowToBuyTab;
