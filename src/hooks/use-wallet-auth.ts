
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

export const useWalletAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check current auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (session?.user?.user_metadata?.wallet_address) {
        setWalletAddress(session.user.user_metadata.wallet_address);
      }
      setLoading(false);
    });

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      if (session?.user?.user_metadata?.wallet_address) {
        setWalletAddress(session.user.user_metadata.wallet_address);
      } else {
        setWalletAddress(null);
      }
      setLoading(false);
    });

    // Cleanup
    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
    walletAddress,
    isAuthenticated: !!session,
    loading
  };
};
