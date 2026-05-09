'use client';

import React from 'react';
import { BottomNav } from './BottomNav';
import { Header } from './Header';

interface MobileContainerProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
  showBottomNav?: boolean;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({
  children,
  title = 'MindBridge',
  showHeader = true,
  showBottomNav = true,
}) => {
  return (
    <div className="min-h-screen pb-20">
      {showHeader && <Header title={title} />}
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {children}
      </main>
      
      {showBottomNav && <BottomNav />}
    </div>
  );
};
