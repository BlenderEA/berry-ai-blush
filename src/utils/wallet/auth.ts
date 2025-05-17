
import { supabase } from "@/integrations/supabase/client";
import { WalletType } from './types';
import { connectWallet, signMessage } from './connection';

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
