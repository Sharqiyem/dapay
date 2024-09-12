'use client';

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
  subscribeToPaymentSent: (
    callback: (from: string, to: string, amount: bigint, message: string, timestamp: bigint) => void,
  ) => () => void;
  username: string | null;
  setUsername: (newUsername: string) => Promise<void>;
  feePercentage: number | null;
  isOwner: boolean;
  collectedFees: string | null;
  fetchCollectedFees: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [username, setUsernameState] = useState<string | null>(null);
  const [feePercentage, setFeePercentage] = useState<number | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [collectedFees, setCollectedFees] = useState<string | null>(null);

  const [provider, setProvider] = useState<ethers.Provider | null>(null);

  const updateBalance = async (provider: ethers.Provider, account: string) => {
    if (provider && account) {
      const balance = await provider.getBalance(account);
      const balanceInEth = ethers.formatEther(balance);
      setBalance(balanceInEth);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setSigner(signer);

        await updateBalance(provider, address);
        const paymentSystem = new ethers.Contract(contractAddress, PaymentSystemABI.abi, signer);
        console.log('🚀 ~ connectWal ~ paymentSystem:', paymentSystem);

        setContract(paymentSystem);

        // Fetch username
        const username = await paymentSystem.getUsername(address);
        setUsernameState(username);

        // Fetch fee percentage
        await fetchFeePercentage(paymentSystem);

        if (paymentSystem && address) {
          const contractOwner = await paymentSystem.owner();

          console.log('🚀 ~ connectWal ~ account:', address);
          console.log('🚀 ~ connectWal ~ contractOwner:', contractOwner);
          setIsOwner(contractOwner.toLowerCase() === address.toLowerCase());
        }

        // Listen for PaymentSent events
        paymentSystem.on('PaymentSent', (from, to, amount, message, timestamp) => {
          if (from.toLowerCase() === address.toLowerCase() || to.toLowerCase() === address.toLowerCase()) {
            updateBalance(provider, address);
          }
        });
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
    setFeePercentage(null);
    if (contract) {
      contract.removeAllListeners('PaymentSent');
    }
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

  const subscribeToPaymentSent = (
    callback: (from: string, to: string, amount: bigint, message: string, timestamp: bigint) => void,
  ) => {
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

  const fetchFeePercentage = async (contract: ethers.Contract) => {
    try {
      // Check if the feePercentage function exists
      if (contract.feePercentage) {
        const fee = await contract.feePercentage();
        setFeePercentage(Number(fee) / 100); // Convert basis points to percentage
      } else {
        console.warn('feePercentage function not found in the contract');
        setFeePercentage(null);
      }
    } catch (error) {
      console.error('Failed to fetch fee percentage:', error);
      setFeePercentage(null);
    }
  };

  useEffect(() => {
    if (!contract) return;

    fetchFeePercentage(contract);

    // Set up event listener for fee changes if the event exists
    if (contract.filters.FeePercentageUpdated) {
      contract.on('FeePercentageUpdated', (newFee) => {
        setFeePercentage(Number(newFee) / 100);
      });

      return () => {
        contract.removeAllListeners('FeePercentageUpdated');
      };
    }

    return () => {
      if (contract) {
        contract.removeAllListeners('FeePercentageUpdated');
      }
    };
  }, [contract]);

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
      if (contract) {
        contract.removeAllListeners('PaymentSent');
      }
    };
  }, []);

  const fetchCollectedFees = async () => {
    if (contract && isOwner) {
      try {
        const fees = await contract.collectedFees();
        setCollectedFees(ethers.formatEther(fees));
      } catch (error) {
        console.error('Error fetching collected fees:', error);
        setCollectedFees(null);
      }
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchCollectedFees();
    }
  }, [isOwner, contract]);

  return (
    <Web3Context.Provider
      value={{
        account,
        balance,
        contract,
        signer,
        connectWallet,
        disconnectWallet,
        subscribeToPaymentSent,
        username,
        setUsername,
        feePercentage,
        isOwner,
        collectedFees,
        fetchCollectedFees,
      }}
    >
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
