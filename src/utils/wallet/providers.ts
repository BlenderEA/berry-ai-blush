
import { WalletType } from './types';
import { supabase } from '@/integrations/supabase/client';

// Check if wallet is installed
export const isWalletInstalled = (walletType: WalletType): boolean => {
  if (typeof window === 'undefined') return false;
  
  if (walletType === 'phantom') {
    return window && 'phantom' in window && window.phantom?.solana?.isPhantom;
  } else if (walletType === 'solflare') {
    return window && 'solflare' in window && window.solflare?.isSolflare;
  }
  return false;
};

// Connect to wallet
export const connectWallet = async (walletType: WalletType): Promise<string | null> => {
  try {
    console.info(`Starting connection to ${walletType}...`);
    let provider;
    
    if (walletType === 'phantom') {
      provider = window.phantom?.solana;
      if (!provider) {
        console.error('Phantom provider not found');
        return null;
      }
      
      // Request connection if not already connected
      if (!provider.isConnected) {
        console.info(`Attempting to connect to ${walletType}...`);
        await provider.connect();
      }
    } else if (walletType === 'solflare') {
      provider = window.solflare;
      if (!provider) {
        console.error('Solflare provider not found');
        return null;
      }
      
      // Request connection if not already connected
      if (!provider.isConnected) {
        console.info(`Attempting to connect to ${walletType}...`);
        await provider.connect();
      }
    }

    if (!provider) {
      throw new Error(`${walletType} wallet not found`);
    }

    // Get public key
    const publicKey = provider.publicKey.toString();
    console.info(`Connected to ${walletType} with public key: ${publicKey}`);
    return publicKey;
  } catch (error) {
    console.error(`Error connecting to ${walletType}:`, error);
    return null;
  }
};

// Sign message using wallet
export const signMessage = async (walletType: WalletType, message: string): Promise<{ signature: string; publicKey: string } | null> => {
  try {
    const encoder = new TextEncoder();
    const encodedMessage = encoder.encode(message);
    
    let provider;
    if (walletType === 'phantom') {
      provider = window.phantom?.solana;
    } else if (walletType === 'solflare') {
      provider = window.solflare;
    }

    if (!provider) {
      throw new Error(`${walletType} wallet not found`);
    }

    console.info(`Signing message with ${walletType} wallet...`);
    // Sign the message
    const { signature } = await provider.signMessage(encodedMessage, 'utf8');
    console.info('Got signature:', signature);
    
    // Convert signature to hex string
    const signatureHex = Array.from(signature)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    return {
      signature: signatureHex,
      publicKey: provider.publicKey.toString()
    };
  } catch (error) {
    console.error(`Error signing with ${walletType}:`, error);
    return null;
  }
};

// Disconnect wallet
export const disconnectWallet = async (): Promise<void> => {
  try {
    // Use imported supabase client instead of window.supabase
    await supabase.auth.signOut();
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
  }
};
