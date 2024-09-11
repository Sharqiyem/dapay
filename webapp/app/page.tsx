'use client'

import React, { useState } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import Modal from '@/components/ui/modal';
import SendPaymentModal from '@/components/SendPaymentModal';
import RequestPaymentModal from '@/components/RequestPaymentModal';
import TransactionHistory from '@/components/TransactionHistory';
import { Button } from '@/components/ui/button';
import WalletConnect from '@/components/WalletConnect';
import AccountInfo from '@/components/AccountInfo';
import { ArrowLeftRight, CircleDollarSignIcon } from 'lucide-react';

const Home: React.FC = () => {
  const { account } = useWeb3();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4   ">
      <header className="mb-4 sticky top-0 z-10    ">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary/80">DaPay</h1>
          <WalletConnect />
        </div>
      </header>
      { account ? <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
        <div className="space-y-4">
          <div className=" shadow rounded-lg p-6">
          <AccountInfo />                          
          </div>
          {account && (
            <div className=" shadow rounded-lg p-6">
               <div className="space-y-2">
               
                <Button onClick={() => setActiveModal('sendPayment')} className="w-full">
                <CircleDollarSignIcon size={16} className="mr-2" />  Send Payment
                </Button>
                <Button onClick={() => setActiveModal('requestPayment')} className="w-full">
                <ArrowLeftRight size={16} className="mr-2" />  Request Payment
                </Button>
              </div>
            </div>
          )}
        </div>
       <div className=" shadow rounded-lg p-6 col-span-2">
          <TransactionHistory />
        </div> 
      </div>: (<div className="flex justify-center   h-screen">
        

        <p> Connect your wallet to continue</p>
        </div>)
        }

    

      <Modal
        isOpen={activeModal === 'sendPayment'}
        onClose={() => setActiveModal(null)}
        title="Send Payment"
      >
        <SendPaymentModal onClose={() => setActiveModal(null)} />
      </Modal>

      <Modal
        isOpen={activeModal === 'requestPayment'}
        onClose={() => setActiveModal(null)}
        title="Request Payment"
      >
        <RequestPaymentModal onClose={() => setActiveModal(null)} />
      </Modal>
    </div>
  );
};

export default Home;