'use client';

import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { Button } from './ui/button';

const WalletConnect: React.FC = () => {
  const { account, connectWallet, disconnectWallet } = useWeb3();

  return (
    <div>
      {account ? (
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-700 truncate max-w-[70px] leading-6">{account}</p>
          <Button onClick={disconnectWallet} variant="outline" className="">
            Disconnect
          </Button>
        </div>
      ) : (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
    </div>
  );
};

export default WalletConnect;
