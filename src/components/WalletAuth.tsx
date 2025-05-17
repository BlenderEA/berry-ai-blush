
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { Wallet, DollarSign } from 'lucide-react';
import { handleWalletAuth, isWalletInstalled, disconnectWallet, WalletType } from '@/utils/wallet';
import { useWalletAuth } from '@/hooks/use-wallet-auth';
import { Skeleton } from '@/components/ui/skeleton';

const WalletAuth: React.FC = () => {
  const [loading, setLoading] = useState<WalletType | null>(null);
  const { walletAddress, tokenBalance, isAuthenticated, balanceLoading } = useWalletAuth();
  
  const handleConnect = async (walletType: WalletType) => {
    if (!isWalletInstalled(walletType)) {
      toast.error(`${walletType === 'phantom' ? 'Phantom' : 'Solflare'} wallet is not installed`);
      window.open(
        walletType === 'phantom' ? 'https://phantom.app/' : 'https://solflare.com/',
        '_blank'
      );
      return;
    }

    setLoading(walletType);
    
    try {
      const success = await handleWalletAuth(walletType);
      if (success) {
        toast.success(`Connected to ${walletType === 'phantom' ? 'Phantom' : 'Solflare'} wallet`);
      } else {
        toast.error('Make sure your wallet is unlocked and try again');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast.error('Error connecting wallet');
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
          <Button className="berry-button flex items-center">
            <Wallet className="h-4 w-4 mr-2" />
            {truncateAddress(walletAddress)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 bg-dark border-dark-border text-white">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-300 mb-2">Connected Wallet</p>
            <p className="text-xs font-mono bg-dark-lighter p-2 rounded break-all">
              {walletAddress}
            </p>
            
            <div className="mt-3 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-berry" />
                  <span className="text-sm font-medium">$BUSTY Balance:</span>
                </div>
                {balanceLoading ? (
                  <Skeleton className="h-6 w-24" />
                ) : (
                  <span className="font-bold text-berry">
                    {tokenBalance !== null ? tokenBalance.toLocaleString() : '0'}
                  </span>
                )}
              </div>
            </div>
            
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
