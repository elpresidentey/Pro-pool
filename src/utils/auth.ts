import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';
import type { User } from '../types';

// Hook to get current user
export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const checkUser = async () => {
      try {
        // First check if there's an existing session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted && session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: (session.user.user_metadata?.role as 'professional' | 'client') || 'client',
          } as User);
        } else if (mounted) {
          setUser(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch user');
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkUser();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: (session.user.user_metadata?.role as 'professional' | 'client') || 'client',
          } as User);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  return { user, loading, error };
};

// Hook to protect routes that require authentication
export const useRequireAuth = () => {
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  return { user, loading };
};

// Hook to protect routes that require professional role
export const useRequireProfessional = () => {
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'professional')) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  return { user, loading };
};

// Auth functions
export const signUp = async (email: string, password: string, role: 'professional' | 'client') => {
  try {
    const trimmedEmail = email.trim().toLowerCase();

    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        data: {
          role,
        },
      },
    });

    if (error) throw error;

    // If signup succeeded but user needs email confirmation,
    // we'll wait a moment for them to be authenticated
    if (data.user?.id) {
      // Wait for auth session to be established
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Try to create user record
      try {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: trimmedEmail,
            role,
          })
          .select()
          .single();

        if (insertError) {
          // Log but don't throw - user signup succeeded in auth
          console.warn('User record creation warning:', insertError.message);
          // This is OK - trigger or next login will create it
        }
      } catch (err) {
        console.warn('User record creation error:', err);
        // Continue anyway - auth user was created successfully
      }
    }

    return { success: true, data, message: 'Signup successful! Please check your email to confirm.' };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Signup failed',
      data: null 
    };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const trimmedEmail = email.trim().toLowerCase();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });

    if (error) throw error;

    // Wait for session to be established
    await new Promise(resolve => setTimeout(resolve, 200));

    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Login failed',
      data: null 
    };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Logout failed' 
    };
  }
};

export const resetPassword = async (email: string) => {
  try {
    const trimmedEmail = email.trim().toLowerCase();

    const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
    return { 
      success: true, 
      message: 'Password reset email sent! Check your inbox.' 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send reset email' 
    };
  }
};

export const updatePassword = async (newPassword: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    return { success: true, message: 'Password updated successfully!' };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update password' 
    };
  }
};
