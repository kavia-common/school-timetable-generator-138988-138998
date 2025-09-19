import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import AuthCallback from '../auth/AuthCallback';

const ResetPassword = () => <div style={{ padding: 24 }}>Reset password page placeholder.</div>;
const AuthError = () => <div style={{ padding: 24, color: 'red' }}>Authentication error.</div>;

const AppWithRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/error" element={<AuthError />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppWithRoutes;
