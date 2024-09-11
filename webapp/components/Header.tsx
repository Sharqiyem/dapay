'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WalletConnect from './WalletConnect';

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="container mx-auto px-4 mb-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto py-6 sm:px-6  flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <h1 className="text-3xl font-bold text-primary/80 cursor-pointer">DaPay</h1>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/"
                  className={`text-sm font-medium ${
                    pathname === '/' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/activity"
                  className={`text-sm font-medium ${
                    pathname === '/activity' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Activity
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <WalletConnect />
      </div>
    </header>
  );
};

export default Header;
