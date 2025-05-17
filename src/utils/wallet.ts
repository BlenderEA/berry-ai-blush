
import { supabase } from "@/integrations/supabase/client";

export type WalletType = 'phantom' | 'solflare';

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

// Handle wallet authentication
export const handleWalletAuth = async (walletType: WalletType): Promise<boolean> => {
  try {
    console.info(`Starting wallet auth process for ${walletType}...`);
    
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
        email: `${walletAddress.toLowerCase()}@wallet.bustyberry.com`,
        password: signedData.signature.substring(0, 20)
      });
      
      if (error) throw error;
    } else {
      // Create new user account
      const { error: signUpError, data } = await supabase.auth.signUp({
        email: `${walletAddress.toLowerCase()}@wallet.bustyberry.com`,
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

// Fetch BUSTY token balance for connected wallet
export const fetchTokenBalance = async (walletAddress: string): Promise<number> => {
  try {
    // BUSTY token mint address
    const tokenMintAddress = "6wA6u3Y9mNpZy7z3oWDaLWUMmp5ourhM6oRFUrsSpump";
    
    // Fetch token account info using Solana web3 RPC API
    const response = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getTokenAccountsByOwner",
        "params": [
          walletAddress,
          {
            "mint": tokenMintAddress
          },
          {
            "encoding": "jsonParsed"
          }
        ]
      })
    });

    const data = await response.json();
    
    // Extract balance from response
    if (data.result?.value && data.result.value.length > 0) {
      const accountInfo = data.result.value[0].account.data.parsed.info;
      const balance = parseFloat(accountInfo.tokenAmount.amount) / 10 ** accountInfo.tokenAmount.decimals;
      return balance;
    }
    
    return 0; // Return 0 if no tokens found
  } catch (error) {
    console.error("Error fetching token balance:", error);
    return 0;
  }
};
