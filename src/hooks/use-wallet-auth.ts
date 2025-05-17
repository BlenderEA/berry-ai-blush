
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { fetchTokenBalance } from '@/utils/wallet';

export const useWalletAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [balanceLoading, setBalanceLoading] = useState(false);
  
  useEffect(() => {
    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      if (session?.user?.user_metadata?.wallet_address) {
        setWalletAddress(session.user.user_metadata.wallet_address);
      } else {
        setWalletAddress(null);
        setTokenBalance(null);
      }
      setLoading(false);
    });

    // Check current auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (session?.user?.user_metadata?.wallet_address) {
        setWalletAddress(session.user.user_metadata.wallet_address);
      }
      setLoading(false);
    });

    // Cleanup
    return () => subscription.unsubscribe();
  }, []);

  // Fetch token balance when wallet address changes
  useEffect(() => {
    if (walletAddress) {
      const getBalance = async () => {
        setBalanceLoading(true);
        try {
          const balance = await fetchTokenBalance(walletAddress);
          setTokenBalance(balance);
        } catch (error) {
          console.error("Error fetching balance:", error);
          setTokenBalance(null);
        } finally {
          setBalanceLoading(false);
        }
      };
      
      getBalance();
    }
  }, [walletAddress]);

  return {
    session,
    walletAddress,
    tokenBalance,
    isAuthenticated: !!session,
    loading,
    balanceLoading
  };
};
