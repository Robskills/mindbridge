'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = 'MindBridge',
  showBackButton = false 
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-earth-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-earth-700">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Left section */}
        <div className="flex items-center gap-3">
          {showBackButton ? (
            <Button variant="ghost" size="sm" className="p-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-semibold text-earth-900 dark:text-white hidden sm:block">
                {title}
              </span>
            </motion.div>
          )}
        </div>
        
        {/* Center - Title (mobile only) */}
        <h1 className="text-lg font-semibold text-earth-900 dark:text-white sm:hidden">
          {title}
        </h1>
        
        {/* Right section */}
        <div className="flex items-center gap-2">
          <Link href="/chat">
            <Button variant="ghost" size="sm" className="p-2">
              <MessageCircle className="w-5 h-5 text-earth-600 dark:text-earth-300" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="sm" className="p-2">
            <Bell className="w-5 h-5 text-earth-600 dark:text-earth-300" />
          </Button>
          
          <Button variant="ghost" size="sm" className="p-2 sm:hidden">
            <Menu className="w-5 h-5 text-earth-600 dark:text-earth-300" />
          </Button>
        </div>
      </div>
    </header>
  );
};
