
import { WalletType, WalletProvider } from './types';

// Check if wallet is installed
export const isWalletInstalled = (walletType: WalletType): boolean => {
  if (typeof window === 'undefined') return false;
  
  if (walletType === 'phantom') {
    // Fix: Check for phantom in window and solana property
    return window && 'phantom' in window && window.phantom?.solana;
  } else if (walletType === 'solflare') {
    return window && 'solflare' in window;
  }
  return false;
};

// Get wallet provider
export const getWalletProvider = (walletType: WalletType): WalletProvider | null => {
  if (typeof window === 'undefined') return null;
  
  if (walletType === 'phantom') {
    // Improved access to phantom provider
    // @ts-ignore - Phantom is not typed
    const phantomProvider = window.phantom?.solana;
    if (!phantomProvider?.isPhantom) {
      console.error('Phantom is not installed or detected properly');
      return null;
    }
    return phantomProvider;
  } 
  else if (walletType === 'solflare') {
    // @ts-ignore - Solflare is not typed
    const solflareProvider = window.solflare;
    if (!(solflareProvider as any)?.isSolflare) {
      console.error('Solflare is not installed or detected properly');
      return null;
    }
    return solflareProvider as any;
  }
  
  return null;
};
