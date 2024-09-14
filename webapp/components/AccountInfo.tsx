'use client';

import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { Button } from './ui/button';
import { useModal } from '@/contexts/ModalContext';
import { formatAddress, formatBalance } from '@/lib/utils';
import { Pen } from 'lucide-react';

const AccountInfo: React.FC = () => {
  const { account, balance, username } = useWeb3();

  const { openModal } = useModal();
  return (
    <div className="rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Account Details</h2>
      <p>
        Address: <span className="truncate max-w-[150px]">{account && formatAddress(account)}</span>
      </p>
      <p>
        Balance: <span className="truncate max-w-[150px]">{formatBalance(balance)}</span> ETH
      </p>
      <p>
        User name: <span className="truncate max-w-[150px]">{username || 'Not set'}</span>
      </p>
      <Button variant={'outline'} onClick={() => openModal('setUsername')} className="w-full mt-4">
        <Pen size={16} className="mr-2" /> Set Username
      </Button>
    </div>
  );
};

export default AccountInfo;
