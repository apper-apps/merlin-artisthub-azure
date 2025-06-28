import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from '@/components/organisms/BottomNavigation';
import Header from '@/components/organisms/Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 pt-16">
        <Outlet />
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Layout;