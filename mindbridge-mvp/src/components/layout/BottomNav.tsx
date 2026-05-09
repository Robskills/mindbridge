'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { bottomNavItems } from '@/config/navigation';
import { twMerge } from 'tailwind-merge';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 safe-area-bottom">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-white/90 dark:bg-earth-900/90 backdrop-blur-lg border-t border-gray-200 dark:border-earth-700" />
      
      {/* Nav items */}
      <div className="relative flex items-center justify-around py-3 px-2">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-16 h-14"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-xl"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              
              <Icon
                className={twMerge(
                  'w-6 h-6 transition-colors relative z-10',
                  isActive 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-earth-500 dark:text-earth-400',
                  item.className
                )}
              />
              
              <span
                className={twMerge(
                  'text-xs mt-1 font-medium relative z-10',
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-earth-500 dark:text-earth-400'
                )}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
