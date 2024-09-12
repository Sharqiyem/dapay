'use client';

import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { Button } from './ui/button';
import { formatAddress } from '@/lib/utils';

const WalletConnect: React.FC = () => {
  const { account, connectWallet, disconnectWallet } = useWeb3();

  return (
    <div>
      {account ? (
        <div className="flex items-center gap-2">
          <p className="order-last md:order-first text-sm text-gray-700 truncate max-w-[100px] leading-6">
            {formatAddress(account)}
          </p>
          <Button onClick={disconnectWallet} variant="outline" className="">
            Disconnect
          </Button>
        </div>
      ) : (
        <Button size={'sm'} onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;
