
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/' 
}) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // Cleanup
    return () => subscription.unsubscribe();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  // If not authenticated, redirect to specified route
  if (!session) {
    return <Navigate to={redirectTo} replace />;
  }

  // User is authenticated, render children
  return <>{children}</>;
};

export default ProtectedRoute;
