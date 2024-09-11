'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PaymentSystemABI from '@/constants/artifacts/PaymentSystem.sol/PaymentSystem.json';
import { contractAddress } from '@/constants/contract';

interface Web3ContextType {
  account: string | null;
  balance: string | null;
  signer: ethers.Signer | null;
  contract: ethers.Contract | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  subscribeToPaymentSent: (callback: (from: string, to: string, amount: bigint, message: string, timestamp: bigint) => void) => () => void;
  username: string | null;
  setUsername: (newUsername: string) => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [username, setUsernameState] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setSigner(signer);

        const balance = await provider.getBalance(address);
        setBalance(ethers.formatEther(balance));
        const paymentSystem = new ethers.Contract(contractAddress, PaymentSystemABI.abi, signer);
        console.log("🚀 ~ connectWal ~ paymentSystem:", paymentSystem)
        
        setContract(paymentSystem); 

        // Fetch username
        const username = await paymentSystem.getUsername(address);
        setUsernameState(username);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setContract(null);
    setSigner(null);
    setUsernameState(null);
  };

  const setUsername = async (newUsername: string) => {
    if (!contract) {
      throw new Error('Contract not initialized');
    }
    try {
      const tx = await contract.setUsername(newUsername);
      await tx.wait();
      setUsernameState(newUsername);
    } catch (error) {
      console.error('Error setting username:', error);
      throw error;
    }
  };

  const subscribeToPaymentSent = (callback: (from: string, to: string, amount: bigint, message: string, timestamp: bigint) => void) => {
    if (!contract) return () => {};

    const filter = contract.filters.PaymentSent();
    const listener = (from: string, to: string, amount: bigint, message: string, timestamp: bigint) => {
      callback(from, to, amount, message, timestamp);
    };

    contract.on(filter, listener);

    // Return a function to unsubscribe
    return () => {
      contract.off(filter, listener);
    };
  };
  
  useEffect(() => {

    
      const autoConnect = async () => {
          await connectWallet();         
      };
  
      autoConnect();
  
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length > 0) {
            connectWallet();
          } else {
            disconnectWallet();
          }
        });
  
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });
      }
  
    

      return () => {
        if (window.ethereum) {
          window.ethereum.removeAllListeners('accountsChanged');
          window.ethereum.removeAllListeners('chainChanged');
        }
      };
   

    
      
  }, []);

  return (
    <Web3Context.Provider value={{ account, balance, contract, signer, connectWallet, disconnectWallet, subscribeToPaymentSent,  username, 
      setUsername  }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};