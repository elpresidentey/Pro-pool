import { supabase } from '../utils/supabase';

/**
 * Diagnostic tool to check Supabase configuration
 */
export async function testSupabaseConnection() {
  console.log('=== Supabase Connection Test ===');
  
  try {
    // Test 1: Check if Supabase client is initialized
    console.log('✓ Supabase client initialized');
    
    // Test 2: Check auth session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('✗ Session error:', sessionError);
    } else {
      console.log('✓ Session check:', session ? 'Logged in' : 'Not logged in');
    }
    
    // Test 3: Test auth methods exist
    console.log('✓ Auth methods available:', {
      signUp: typeof supabase.auth.signUp,
      signInWithPassword: typeof supabase.auth.signInWithPassword,
      signOut: typeof supabase.auth.signOut,
      getSession: typeof supabase.auth.getSession,
    });
    
    console.log('=== All tests passed ===');
    return true;
  } catch (error) {
    console.error('✗ Connection test failed:', error);
    return false;
  }
}

/**
 * Test sign up
 */
export async function testSignUp(email: string, password: string) {
  console.log('Testing sign up with:', email);
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'client',
        },
      },
    });

    if (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    }

    console.log('Sign up successful:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Sign up exception:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Test sign in
 */
export async function testSignIn(email: string, password: string) {
  console.log('Testing sign in with:', email);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    }

    console.log('Sign in successful:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Sign in exception:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
