'use client';

import React from 'react';
import { useModal } from '@/contexts/ModalContext';
import Modal from '@/components/ui/modal';
import SetUsernameModal from './SetUsernameModal';
import SendPaymentModal from './SendPaymentModal';
import RequestPaymentModal from './RequestPaymentModal';

const ModalContainer: React.FC = () => {
  const { activeModal, closeModal } = useModal();

  return (
    <>
      <Modal isOpen={activeModal === 'setUsername'} onClose={closeModal} title="Set Username">
        <SetUsernameModal onClose={closeModal} />
      </Modal>

      <Modal isOpen={activeModal === 'sendPayment'} onClose={closeModal} title="Send Payment">
        <SendPaymentModal onClose={closeModal} />
      </Modal>

      <Modal isOpen={activeModal === 'requestPayment'} onClose={closeModal} title="Request Payment">
        <RequestPaymentModal onClose={closeModal} />
      </Modal>
    </>
  );
};

export default ModalContainer;
