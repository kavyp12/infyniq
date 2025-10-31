// AppLayout.tsx - Replace your old code with this

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '@/pages/Sidebar'; // Using your import path

const AppLayout = () => {
  const location = useLocation();
  const isSetupPage = location.pathname === '/setup';

  return (
    // 1. Updated background to the light theme
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 product-sans">
      <Sidebar />
      {/* 2. Updated padding and overflow */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10">
        {/* 3. Added logic to center the setup page (max-w-3xl) 
             while keeping other pages wider (max-w-7xl)
        */}
        {isSetupPage ? (
          <div className="flex justify-center items-start min-h-full">
            <div className="w-full max-w-3xl">
              <Outlet />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        )}
      </main>
    </div>
  );
};

export default AppLayout;