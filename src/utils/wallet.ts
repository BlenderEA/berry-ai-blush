
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

// Get wallet provider
const getWalletProvider = (walletType: WalletType): any => {
  if (typeof window === 'undefined') return null;
  
  if (walletType === 'phantom') {
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

// Connect to wallet
export const connectWallet = async (walletType: WalletType): Promise<string | null> => {
  try {
    const provider = getWalletProvider(walletType);
    
    if (!provider) {
      if (walletType === 'phantom') {
        window.open('https://phantom.app/', '_blank');
      } else if (walletType === 'solflare') {
        window.open('https://solflare.com/', '_blank');
      }
      return null;
    }
    
    console.log(`Attempting to connect to ${walletType}...`);
    
    // Connect to the wallet
    const response = await provider.connect();
    const publicKey = response.publicKey.toString();
    
    console.log(`Connected to ${walletType} with public key: ${publicKey}`);
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
    
    const provider = getWalletProvider(walletType);
    if (!provider) {
      throw new Error(`${walletType} wallet not found`);
    }

    let publicKey = '';
    
    if (walletType === 'phantom') {
      publicKey = provider.publicKey.toString();
    } else if (walletType === 'solflare') {
      publicKey = provider.publicKey.toString();
    }

    console.log(`Signing message with ${walletType} wallet...`);
    
    // Sign the message
    const { signature } = await provider.signMessage(encodedMessage);
    console.log('Got signature:', signature);
    
    // Convert signature to hex string without using Buffer
    const signatureHex = Array.from(signature)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    console.log('Converted signature to hex:', signatureHex);
    
    return {
      signature: signatureHex,
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
    
    console.log('Signed data:', signedData);
    
    // Check if user exists with this wallet
    const { data: existingUser } = await supabase
      .from('wallet_auth')
      .select('user_id')
      .eq('wallet_address', walletAddress)
      .maybeSingle();

    if (existingUser) {
      // User exists, sign in
      console.log('User exists, attempting to sign in with:', {
        email: `${walletAddress}@wallet.bustyberry.com`,
        password: signedData.signature.substring(0, 20)
      });
      
      const { error } = await supabase.auth.signInWithPassword({
        email: `${walletAddress}@wallet.bustyberry.com`,
        password: signedData.signature.substring(0, 20)
      });
      
      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }
    } else {
      // Create new user account
      console.log('Creating new user with:', {
        email: `${walletAddress}@wallet.bustyberry.com`,
        password: signedData.signature.substring(0, 20),
        wallet_address: walletAddress,
        wallet_type: walletType
      });
      
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

      if (signUpError) {
        console.error('Sign up error:', signUpError);
        throw signUpError;
      }

      // Create entry in wallet_auth table
      if (data.user) {
        const { error: walletAuthError } = await supabase
          .from('wallet_auth')
          .insert({
            user_id: data.user.id,
            wallet_address: walletAddress,
            wallet_type: walletType
          });
        
        if (walletAuthError) {
          console.error('Wallet auth insert error:', walletAuthError);
          throw walletAuthError;
        }
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
