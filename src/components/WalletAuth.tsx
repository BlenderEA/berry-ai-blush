
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { Wallet } from 'lucide-react';
import { handleWalletAuth, isWalletInstalled, disconnectWallet, WalletType } from '@/utils/wallet';
import { useWalletAuth } from '@/hooks/use-wallet-auth';

const WalletAuth: React.FC = () => {
  const [loading, setLoading] = useState<WalletType | null>(null);
  const { session, walletAddress, isAuthenticated } = useWalletAuth();
  
  const handleConnect = async (walletType: WalletType) => {
    if (!isWalletInstalled(walletType)) {
      toast.error(`${walletType === 'phantom' ? 'Phantom' : 'Solflare'} wallet is not installed`, {
        description: "Please install the wallet extension and refresh the page"
      });
      window.open(
        walletType === 'phantom' ? 'https://phantom.app/' : 'https://solflare.com/',
        '_blank'
      );
      return;
    }

    setLoading(walletType);
    
    try {
      console.log(`Starting wallet auth process for ${walletType}...`);
      const success = await handleWalletAuth(walletType);
      if (success) {
        toast.success(`Connected to ${walletType === 'phantom' ? 'Phantom' : 'Solflare'} wallet`);
      } else {
        toast.error('Failed to connect wallet. Please try again.', {
          description: "Make sure your wallet is unlocked and try again."
        });
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast.error('Error connecting wallet', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setLoading(null);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      toast.success('Wallet disconnected');
    } catch (error) {
      toast.error('Error disconnecting wallet');
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  };

  if (isAuthenticated && walletAddress) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button className="berry-button">
            <Wallet className="h-4 w-4 mr-2" />
            {truncateAddress(walletAddress)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 bg-dark border-dark-border text-white">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-300 mb-2">Connected Wallet</p>
            <p className="text-xs font-mono bg-dark-lighter p-2 rounded break-all">
              {walletAddress}
            </p>
            <Button 
              variant="destructive" 
              onClick={handleDisconnect} 
              className="mt-2"
            >
              Disconnect
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="berry-button">
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 bg-dark border-dark-border text-white">
        <div className="flex flex-col gap-2">
          <Button
            className="bg-[#AB9FF2] hover:bg-[#9D8FE3] text-black"
            onClick={() => handleConnect('phantom')}
            disabled={loading !== null}
          >
            {loading === 'phantom' ? 'Connecting...' : 'Phantom Wallet'}
          </Button>
          <Button
            className="bg-[#FE8D41] hover:bg-[#EC7C30] text-black"
            onClick={() => handleConnect('solflare')}
            disabled={loading !== null}
          >
            {loading === 'solflare' ? 'Connecting...' : 'Solflare Wallet'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WalletAuth;
