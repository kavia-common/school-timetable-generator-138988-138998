import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithRoutes from './pages/AuthRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWithRoutes />
  </React.StrictMode>
);
