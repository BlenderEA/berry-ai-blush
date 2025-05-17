
import { supabase } from "@/integrations/supabase/client";

export type WalletType = 'phantom' | 'solflare';

// Check if wallet is installed
export const isWalletInstalled = (walletType: WalletType): boolean => {
  if (walletType === 'phantom') {
    return window && 'solana' in window && 'phantom' in (window as any).solana;
  } else if (walletType === 'solflare') {
    return window && 'solana' in window && 'solflare' in (window as any).solana;
  }
  return false;
};

// Connect to wallet
export const connectWallet = async (walletType: WalletType): Promise<string | null> => {
  try {
    let provider;
    
    if (walletType === 'phantom') {
      provider = (window as any).solana?.phantom?.publicKey;
      if (!provider) {
        await (window as any).solana.connect();
        provider = (window as any).solana?.phantom;
      }
    } else if (walletType === 'solflare') {
      provider = (window as any).solana?.solflare?.publicKey;
      if (!provider) {
        await (window as any).solana.connect();
        provider = (window as any).solana?.solflare;
      }
    }

    if (!provider) {
      throw new Error(`${walletType} wallet not found`);
    }

    // Get public key
    const publicKey = provider.publicKey.toString();
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
      provider = (window as any).solana?.phantom;
    } else if (walletType === 'solflare') {
      provider = (window as any).solana?.solflare;
    }

    if (!provider) {
      throw new Error(`${walletType} wallet not found`);
    }

    // Sign the message
    const { signature } = await provider.signMessage(encodedMessage);
    
    return {
      signature: Buffer.from(signature).toString('hex'),
      publicKey: provider.publicKey.toString()
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
      .single();

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
