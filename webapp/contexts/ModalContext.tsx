'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalType = 'setUsername' | 'sendPayment' | 'requestPayment' | null;

interface ModalContextType {
  activeModal: ModalType;
  openModal: (modalType: Exclude<ModalType, null>) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (modalType: Exclude<ModalType, null>) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
