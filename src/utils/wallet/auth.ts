
import { supabase } from "@/integrations/supabase/client";
import { WalletType } from './types';
import { connectWallet, signMessage } from './connection';
import { toast } from "sonner";

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
      // User exists, sign in with custom token
      console.log('User exists, attempting to sign in');
      
      try {
        // Create JWT signin with wallet address as the id
        const { data, error } = await supabase.auth.signInWithPassword({
          email: `wallet_${walletAddress.substring(0, 10)}@example.com`,
          password: signedData.signature.substring(0, 20)
        });
        
        if (error) {
          console.error('Sign in error:', error);
          
          // If sign in fails, try to create the account first
          const { error: signUpError } = await supabase.auth.signUp({
            email: `wallet_${walletAddress.substring(0, 10)}@example.com`,
            password: signedData.signature.substring(0, 20),
            options: {
              data: {
                wallet_address: walletAddress,
                wallet_type: walletType
              }
            }
          });
          
          if (signUpError) {
            toast.error("Authentication failed", {
              description: "Could not authenticate with your wallet. Please try again."
            });
            console.error('Sign up error:', signUpError);
            return false;
          }
        }
        
        return true;
      } catch (authError) {
        console.error('Authentication error:', authError);
        return false;
      }
    } else {
      // Create new user account with valid email format
      const email = `wallet_${walletAddress.substring(0, 10)}@example.com`;
      const password = signedData.signature.substring(0, 20);
      
      console.log('Creating new user with wallet:', walletAddress);
      console.log('Using email:', email);
      
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            wallet_address: walletAddress,
            wallet_type: walletType
          }
        }
      });

      if (signUpError) {
        console.error('Sign up error:', signUpError);
        toast.error("Account creation failed", {
          description: signUpError.message
        });
        return false;
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
          toast.error("Wallet link failed", {
            description: "Your wallet was authenticated but could not be linked to your account."
          });
          return false;
        }
        
        toast.success("Account created successfully", {
          description: "Your wallet has been connected and your account is ready to use."
        });
      }
    }
    
    return true;
  } catch (error) {
    console.error("Wallet authentication error:", error);
    toast.error("Wallet connection failed", {
      description: error instanceof Error ? error.message : "Unknown error occurred"
    });
    return false;
  }
};

// Disconnect wallet
export const disconnectWallet = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
    toast.success("Wallet disconnected");
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
    toast.error("Error disconnecting wallet");
  }
};
