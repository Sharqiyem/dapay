'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WalletConnect from './WalletConnect';
import { Activity, ArrowDownLeft, ArrowUpRight, LayoutDashboard, Menu, X } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';
import ThemeToggle from './ThemeToggle';
import Image from 'next/image';
import logo from '../images/logo4.png';
import Logo2 from '../images/logo.svg';
import { useWeb3 } from '@/contexts/Web3Context';
import Logo from './Logo';

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useModal();
  const { account } = useWeb3();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="container mx-auto px-4 mb-4 sticky top-0 z-1 bg-background">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="DaPay"
              width={128}
              height={56}
              className="w-32 h-14 fill-primary"
              objectFit="contain"
            />
            {/* <h1 className="text-2xl sm:text-3xl font-bold text-primary/80 cursor-pointer">DaPay</h1> */}
            <Logo />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:block">
            <ul className="flex space-x-4 items-center">
              {account && (
                <>
                  <li>
                    <Link
                      href="/"
                      className={` font-medium flex items-center space-x-2 ${
                        pathname === '/' ? 'text-primary' : 'text-gray-500 hover:text-primary'
                      }`}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Summary</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/activity"
                      className={` font-medium flex items-center space-x-2 ${
                        pathname === '/activity' ? 'text-primary' : 'text-gray-500 hover:text-primary'
                      }`}
                    >
                      <Activity className="w-5 h-5" />
                      <span>Activity</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => openModal('sendPayment')}
                      className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors duration-200 group"
                    >
                      <ArrowUpRight className="w-6 h-6 text-red-500 transition-colors duration-200 group-hover:text-primary" />
                      <span>Send</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openModal('requestPayment')}
                      className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors duration-200 group"
                    >
                      <ArrowDownLeft className="w-6 h-6 text-green-500 transition-colors duration-200 group-hover:text-primary" />{' '}
                      <span>Request</span>
                    </button>
                  </li>
                </>
              )}
              <li>
                <WalletConnect />
              </li>
              {/* <li>
                <ThemeToggle />
              </li> */}
            </ul>
          </nav>
          <ThemeToggle />

          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="py-4">
            <ul className="space-y-2">
              {account && (
                <>
                  <li>
                    <Link
                      href="/"
                      className={`flex items-center space-x-2  py-2  font-medium ${
                        pathname === '/' ? 'text-primary' : 'text-gray-500 hover:text-primary'
                      }`}
                      onClick={toggleMenu}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Summary</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/activity"
                      className={`flex items-center space-x-2  py-2  font-medium ${
                        pathname === '/activity' ? 'text-primary' : 'text-gray-500 hover:text-primary'
                      }`}
                      onClick={toggleMenu}
                    >
                      <Activity className="w-5 h-5" />
                      <span>Activity</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      className={`flex items-center space-x-2 py-2 text-gray-700 hover:text-primary transition-colors duration-200 group`}
                      onClick={() => openModal('sendPayment')}
                    >
                      <ArrowUpRight className="w-6 h-6 text-red-500 transition-colors duration-200 group-hover:text-primary" />{' '}
                      <span>Send</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center space-x-2 py-2 text-gray-700 hover:text-primary transition-colors duration-200 group`}
                      onClick={() => openModal('requestPayment')}
                    >
                      <ArrowDownLeft className="w-6 h-6 text-green-500 transition-colors duration-200 group-hover:text-primary" />{' '}
                      <span>Request</span>
                    </button>
                  </li>
                </>
              )}
              <li>
                <WalletConnect />
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
