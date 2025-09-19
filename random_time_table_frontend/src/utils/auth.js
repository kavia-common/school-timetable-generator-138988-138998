import supabase from './supabase';
import { getURL } from './getURL';

export const signUpWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getURL()}auth/callback`,
    },
  });
  return { data, error };
};

export const signInWithMagicLink = async (email) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${getURL()}auth/callback`,
    },
  });
  return { data, error };
};

export const signInWithOAuth = async (provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${getURL()}auth/callback`,
    },
  });
  return { data, error };
};

export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getURL()}auth/reset-password`,
  });
  return { data, error };
};

export const handleAuthError = (error, navigate) => {
  // navigate: function from react-router or a redirect handler
  // We avoid tight coupling; consumer decides routing
  // Fallback: log and return type to help UI decide
  const type = error?.message?.includes('redirect')
    ? 'redirect'
    : error?.message?.includes('email')
    ? 'email'
    : 'generic';

  if (typeof navigate === 'function') {
    navigate(`/auth/error?type=${type}`);
  }
  // Always log
  // eslint-disable-next-line no-console
  console.error('Authentication error:', error);
  return type;
};
