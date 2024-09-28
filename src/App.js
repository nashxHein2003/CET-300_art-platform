import React from 'react';
import AppRoute from './routes/AppRoute';
import { AuthProvider } from './context/Auth/AuthContext';
import SyncUsers from './services/user/syncUser';

export default function App() {
  return (
    <AuthProvider>
      <SyncUsers />
      <div className="h-full w-full">
        <AppRoute />
      </div>
    </AuthProvider>
  );
}
