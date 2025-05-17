
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

export const useWalletAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log('Auth state changed:', event, currentSession?.user?.id);
      setSession(currentSession);
      
      if (currentSession?.user?.user_metadata?.wallet_address) {
        setWalletAddress(currentSession.user.user_metadata.wallet_address);
      } else {
        setWalletAddress(null);
      }
      
      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Current session:', currentSession?.user?.id);
      setSession(currentSession);
      
      if (currentSession?.user?.user_metadata?.wallet_address) {
        setWalletAddress(currentSession.user.user_metadata.wallet_address);
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
