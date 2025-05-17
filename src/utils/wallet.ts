
import { supabase } from "@/integrations/supabase/client";

export type WalletType = 'phantom' | 'solflare';

// Check if wallet is installed
export const isWalletInstalled = (walletType: WalletType): boolean => {
  if (typeof window === 'undefined') return false;
  
  if (walletType === 'phantom') {
    return window && 'phantom' in window;
  } else if (walletType === 'solflare') {
    return window && 'solflare' in window;
  }
  return false;
};

// Connect to wallet
export const connectWallet = async (walletType: WalletType): Promise<string | null> => {
  try {
    if (typeof window === 'undefined') return null;
    
    let provider;
    
    if (walletType === 'phantom') {
      if (!('phantom' in window)) {
        window.open('https://phantom.app/', '_blank');
        return null;
      }
      
      // @ts-ignore - Phantom is not typed
      const phantomProvider = window.phantom?.solana;
      
      if (!phantomProvider?.isPhantom) {
        throw new Error('Phantom wallet not found');
      }
      
      const { publicKey } = await phantomProvider.connect();
      return publicKey.toString();
    } 
    else if (walletType === 'solflare') {
      if (!('solflare' in window)) {
        window.open('https://solflare.com/', '_blank');
        return null;
      }
      
      // @ts-ignore - Solflare is not typed
      const solflareProvider = window.solflare;
      
      if (!solflareProvider?.isSolflare) {
        throw new Error('Solflare wallet not found');
      }
      
      const { publicKey } = await solflareProvider.connect();
      return publicKey.toString();
    }

    return null;
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
    let publicKey;
    
    if (walletType === 'phantom') {
      // @ts-ignore - Phantom is not typed
      provider = window.phantom?.solana;
      if (!provider || !provider.isPhantom) {
        throw new Error('Phantom wallet not found');
      }
      publicKey = provider.publicKey.toString();
    } 
    else if (walletType === 'solflare') {
      // @ts-ignore - Solflare is not typed
      provider = window.solflare;
      if (!provider || !provider.isSolflare) {
        throw new Error('Solflare wallet not found');
      }
      publicKey = provider.publicKey.toString();
    }

    if (!provider) {
      throw new Error(`${walletType} wallet not found`);
    }

    // Sign the message
    const { signature } = await provider.signMessage(encodedMessage);
    
    return {
      signature: Buffer.from(signature).toString('hex'),
      publicKey: publicKey
    };
  } catch (error) {
    console.error(`Error signing with ${walletType}:`, error);
    return null;
  }
};

// Handle wallet authentication
export const handleWalletAuth = async (walletType: WalletType): Promise<boolean> => {
  try {
    // Connect to wallet
    const walletAddress = await connectWallet(walletType);
    if (!walletAddress) return false;

    // Sign a message to prove ownership
    const nonce = Math.floor(Math.random() * 1000000).toString();
    const message = `Sign this message to authenticate with BustyBerry. Nonce: ${nonce}`;
    
    const signedData = await signMessage(walletType, message);
    if (!signedData) return false;
    
    // Check if user exists with this wallet
    const { data: existingUser } = await supabase
      .from('wallet_auth')
      .select('user_id')
      .eq('wallet_address', walletAddress)
      .maybeSingle();

    if (existingUser) {
      // User exists, sign in
      const { error } = await supabase.auth.signInWithPassword({
        email: `${walletAddress}@wallet.bustyberry.com`,
        password: signedData.signature.substring(0, 20)
      });
      
      if (error) throw error;
    } else {
      // Create new user account
      const { error: signUpError, data } = await supabase.auth.signUp({
        email: `${walletAddress}@wallet.bustyberry.com`,
        password: signedData.signature.substring(0, 20),
        options: {
          data: {
            wallet_address: walletAddress,
            wallet_type: walletType
          }
        }
      });

      if (signUpError) throw signUpError;

      // Create entry in wallet_auth table
      if (data.user) {
        const { error: walletAuthError } = await supabase
          .from('wallet_auth')
          .insert({
            user_id: data.user.id,
            wallet_address: walletAddress,
            wallet_type: walletType
          });
        
        if (walletAuthError) throw walletAuthError;
      }
    }
    
    return true;
  } catch (error) {
    console.error("Wallet authentication error:", error);
    return false;
  }
};

// Disconnect wallet
export const disconnectWallet = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
  }
};
