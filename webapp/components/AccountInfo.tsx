'use client';

import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { Button } from './ui/button';
import SetUsernameModal from './SetUsernameModal';
import Modal from '@/components/ui/modal';

const AccountInfo: React.FC = () => {
  const { account, balance, username } = useWeb3();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Account Details</h2>
      <p>
        Address: <p className="truncate max-w-[150px]">{account}</p>
      </p>
      <p>
        Balance: <p className="truncate max-w-[150px]">{balance}</p> ETH
      </p>
      <p>
        User name: <p className="truncate max-w-[150px]">{username || 'Not set'}</p>
      </p>
      <Button variant={'outline'} onClick={() => setActiveModal('setUsername')} className="w-full mt-4">
        Set Username
      </Button>
      <Modal isOpen={activeModal === 'setUsername'} onClose={() => setActiveModal(null)} title="Set Username">
        <SetUsernameModal onClose={() => setActiveModal(null)} />
      </Modal>
    </div>
  );
};

export default AccountInfo;
