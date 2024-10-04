import React from 'react';
import AppRoute from './routes/AppRoute';
import { AuthProvider } from './context/Auth/AuthContext';
import SyncUsers from './services/user/syncUser';
import AppProvider from './providers/AppProviders';

export default function App() {
  return (
    <AppProvider>
      <SyncUsers />
      <div className="h-full w-full">
        <AppRoute />
      </div>
    </AppProvider>
  );
}
