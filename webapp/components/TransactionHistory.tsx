'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { ethers } from 'ethers';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Transaction {
  sender: string;
  receiver: string;
  amount: bigint;
  message: string;
  timestamp: number;
  isRequest: boolean;
  isPaid: boolean;
  senderUsername: string;
  receiverUsername: string;
}

const TransactionHistory: React.FC = () => {
  const { contract, account } = useWeb3();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async () => {
    if (contract) {
      try {
        const txs = await contract.getTransactions();
        setTransactions(txs);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }
  }, [contract]);

  useEffect(() => {
    fetchTransactions();

    // Set up event listeners
    const onPaymentSent = (from: string, to: string, amount: bigint, message: string, timestamp: number) => {
      console.log('New payment sent:', { from, to, amount, message, timestamp });
      fetchTransactions();
    };

    const onPaymentRequested = (from: string, to: string, amount: bigint, message: string, timestamp: number) => {
      console.log('New payment requested:', { from, to, amount, message, timestamp });
      fetchTransactions();
    };

    const onRequestPaid = (requestIndex: number) => {
      console.log('Request paid:', requestIndex);
      fetchTransactions();
    };

    if (contract) {
      contract.on('PaymentSent', onPaymentSent);
      contract.on('PaymentRequested', onPaymentRequested);
      contract.on('RequestPaid', onRequestPaid);
    }

    // Set up polling
    // const pollInterval = setInterval(fetchTransactions, 30000); // Poll every 30 seconds

    // Cleanup function
    return () => {
      if (contract) {
        contract.off('PaymentSent', onPaymentSent);
        contract.off('PaymentRequested', onPaymentRequested);
        contract.off('RequestPaid', onRequestPaid);
      }
      // clearInterval(pollInterval);
    };
  }, [contract, fetchTransactions]);

  const handlePayRequest = async (tx: Transaction, index: number) => {
    if (contract && account) {
      try {
        console.log('Attempting to pay request:', {
          index,
          to: tx.sender,
          value: tx.amount.toString(),
          message: tx.message,
        });

        const gasEstimate = await contract.payRequest.estimateGas(index, { value: tx.amount });
        console.log('Estimated gas:', gasEstimate.toString());

        // const gasLimit = gasEstimate.mul(120).div(100); // 20% buffer

        const payTx = await contract.payRequest(index, {
          value: tx.amount,
          // gasLimit: gasLimit
        });

        console.log('Payment transaction sent:', payTx.hash);

        const receipt = await payTx.wait();
        console.log('Payment transaction confirmed, receipt:', receipt);

        alert('Payment sent successfully!');

        // Refresh transactions
        fetchTransactions();
      } catch (error) {
        console.error('Detailed error:', error);
        if (error.error && error.error.message) {
          console.error('Error message:', error.error.message);
        }
        if (error.transaction) {
          console.error('Failed transaction details:', error.transaction);
        }
        alert(`Failed to pay request: ${error.message}`);
      }
    }
  };

  return (
    <div className="rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-primary">
            <TableHead>Type</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow key={index} className="hover:bg-primary/10 border-primary">
              <TableCell>{tx.isRequest ? 'Request' : 'Payment'}</TableCell>
              <TableCell className="truncate max-w-[100px]">{tx.senderUsername || tx.sender}</TableCell>
              <TableCell className="truncate max-w-[100px]">{tx.receiverUsername || tx.receiver}</TableCell>
              <TableCell>{ethers.formatEther(tx.amount)} ETH</TableCell>
              <TableCell className="truncate max-w-[200px]">{tx.message}</TableCell>
              <TableCell>{tx.isPaid ? 'Paid' : 'Pending'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <ul>
        {transactions.map((tx, index) => (
          <li key={index} className="mb-4 p-4 border rounded">
            <p>{tx.isRequest ? 'Request' : 'Payment'} from {tx.senderUsername || tx.sender} to {tx.receiverUsername || tx.receiver}</p>
            <p>Amount: {ethers.formatEther(tx.amount)} ETH</p>
            <p>Message: {tx.message}</p>
            <p>Time: {new Date(Number(tx.timestamp) * 1000).toLocaleString()}</p>
            <p>Status: {tx.isPaid ? 'Paid' : 'Unpaid'}</p>
            {tx.isRequest && !tx.isPaid && tx.receiver === account && (
              <Button onClick={() => handlePayRequest(tx, index)} className="mt-2">Pay Request</Button>
            )}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default TransactionHistory;
