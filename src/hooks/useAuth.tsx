import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  user_id: string;
  username: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (username: string, password: string, rememberMe: boolean) => Promise<{ error: Error | null }>;
  signIn: (username: string, password: string, rememberMe: boolean) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  checkUsernameAvailable: (username: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Generate a consistent email from username for internal use
const usernameToEmail = (username: string) => `${username.toLowerCase().trim()}@hellenika.local`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (!error && data) {
      setProfile(data);
    }
  };

  useEffect(() => {
    // Check for remembered session
    const remembered = localStorage.getItem('hellenika_remember');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer profile fetch to avoid deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUsernameAvailable = async (username: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username.toLowerCase().trim())
      .maybeSingle();
    
    return !data && !error;
  };

  const signUp = async (username: string, password: string, rememberMe: boolean) => {
    const trimmedUsername = username.trim().toLowerCase();
    
    // Check if username is available
    const isAvailable = await checkUsernameAvailable(trimmedUsername);
    if (!isAvailable) {
      return { error: new Error('This name is already taken. Please choose another.') };
    }

    // Use username to generate internal email
    const internalEmail = usernameToEmail(trimmedUsername);
    
    const { data, error } = await supabase.auth.signUp({
      email: internalEmail,
      password,
    });

    if (error) {
      if (error.message.includes('already registered')) {
        return { error: new Error('This name is already taken. Please choose another.') };
      }
      return { error };
    }

    // Create profile with username
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: data.user.id,
          username: trimmedUsername
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        return { error: new Error('Account created but profile setup failed. Please try signing in.') };
      }

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem('hellenika_remember', 'true');
        localStorage.setItem('hellenika_username', trimmedUsername);
      } else {
        localStorage.removeItem('hellenika_remember');
        localStorage.removeItem('hellenika_username');
      }
    }

    return { error: null };
  };

  const signIn = async (username: string, password: string, rememberMe: boolean) => {
    const trimmedUsername = username.trim().toLowerCase();
    const internalEmail = usernameToEmail(trimmedUsername);

    const { error } = await supabase.auth.signInWithPassword({
      email: internalEmail,
      password
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return { error: new Error('Invalid name or password. Please try again.') };
      }
      return { error };
    }

    // Handle remember me
    if (rememberMe) {
      localStorage.setItem('hellenika_remember', 'true');
      localStorage.setItem('hellenika_username', trimmedUsername);
    } else {
      localStorage.removeItem('hellenika_remember');
      localStorage.removeItem('hellenika_username');
    }

    return { error: null };
  };

  const signOut = async () => {
    localStorage.removeItem('hellenika_remember');
    localStorage.removeItem('hellenika_username');
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
      checkUsernameAvailable
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function getRememberedUsername(): string | null {
  if (localStorage.getItem('hellenika_remember') === 'true') {
    return localStorage.getItem('hellenika_username');
  }
  return null;
}
