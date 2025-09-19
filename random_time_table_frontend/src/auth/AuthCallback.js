import { useEffect } from 'react';
import supabase from '../utils/supabase';

const AuthCallback = ({ onSuccess, onError }) => {
  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSessionFromUrl();
      if (error) {
        if (typeof onError === 'function') onError(error);
        // eslint-disable-next-line no-console
        console.error('Auth callback error:', error);
        return;
      }
      if (data?.session) {
        if (typeof onSuccess === 'function') onSuccess(data.session);
      }
    };
    handleAuthCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div style={{ padding: 24 }}>Processing authentication...</div>;
};

export default AuthCallback;
