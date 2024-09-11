'use client';

import React from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import TransactionHistory from '@/components/TransactionHistory';
import { Button } from '@/components/ui/button';
import AccountInfo from '@/components/AccountInfo';
import { ArrowLeftRight, CircleDollarSignIcon } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';

const Home: React.FC = () => {
  const { account } = useWeb3();
  const { openModal } = useModal();

  return (
    <div>
      {account ? (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
          <div className="space-y-4">
            <div className=" shadow rounded-lg p-6">
              <AccountInfo />
            </div>
            {account && (
              <div className=" shadow rounded-lg p-6">
                <div className="space-y-2">
                  <Button onClick={() => openModal('sendPayment')} className="w-full">
                    <CircleDollarSignIcon size={16} className="mr-2" /> Send Payment
                  </Button>
                  <Button onClick={() => openModal('requestPayment')} className="w-full">
                    <ArrowLeftRight size={16} className="mr-2" /> Request Payment
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className=" shadow rounded-lg p-6 col-span-2">
            <TransactionHistory />
          </div>
        </div>
      ) : (
        <div className="flex justify-center   h-screen">
          <p> Connect your wallet to continue</p>
        </div>
      )}
    </div>
  );
};

export default Home;
