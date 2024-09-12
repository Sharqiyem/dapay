import React, { useState, useEffect } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { ethers } from 'ethers';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatAddress } from '@/lib/utils';

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

const TransactionCard: React.FC<{
  tx: Transaction;
  currentAccount: string | null;
  onPayRequest: (tx: Transaction) => Promise<void>;
}> = ({ tx, currentAccount, onPayRequest }) => {
  const isIncoming = tx.receiver.toLowerCase() === currentAccount?.toLowerCase();
  const icon =
    tx.isRequest && !tx.isPaid ? (
      <Clock className="w-6 h-6 text-yellow-500" />
    ) : isIncoming ? (
      <ArrowDownLeft className="w-6 h-6 text-green-500" />
    ) : (
      <ArrowUpRight className="w-6 h-6 text-red-500" />
    );

  const statusColor = tx.isPaid ? 'text-green-600' : 'text-yellow-600';
  const amountColor = isIncoming ? 'text-green-600' : 'text-red-600';

  return (
    <div className="rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {icon}
          <span className="ml-2 font-semibold">{tx.isRequest ? 'Request' : isIncoming ? 'Received' : 'Sent'}</span>
        </div>
        <span className={`font-bold ${amountColor}`}>
          {isIncoming ? '+' : '-'}
          {ethers.formatEther(tx.amount)} ETH
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-1">
        {isIncoming ? 'From: ' : 'To: '}
        {isIncoming ? tx.senderUsername || formatAddress(tx.sender) : tx.receiverUsername || formatAddress(tx.receiver)}
      </p>
      {tx.message && <p className="text-sm text-gray-600 mb-1">Message: {tx.message}</p>}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{new Date(Number(tx.timestamp) * 1000).toLocaleString()}</span>
        <span className={statusColor}>{tx.isPaid ? 'Paid' : 'Pending'}</span>
      </div>
      {tx.isRequest && !tx.isPaid && isIncoming && (
        <Button onClick={() => onPayRequest(tx)} className="mt-2 w-full">
          Pay Request
        </Button>
      )}
    </div>
  );
};

const TransactionHistory: React.FC = () => {
  const { contract, account } = useWeb3();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'sent' | 'received' | 'requests'>('all');

  const fetchTransactions = async () => {
    if (contract) {
      try {
        const txs = await contract.getTransactions();
        setTransactions(txs);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }
  };

  useEffect(() => {
    fetchTransactions();

    // Set up event listeners
    if (contract) {
      contract.on('PaymentSent', fetchTransactions);
      contract.on('PaymentRequested', fetchTransactions);
      contract.on('RequestPaid', fetchTransactions);
    }

    // Cleanup function
    return () => {
      if (contract) {
        contract.off('PaymentSent', fetchTransactions);
        contract.off('RequestPaid', fetchTransactions);
        contract.off('PaymentRequested', fetchTransactions);
      }
    };
  }, [contract]);

  const handlePayRequest = async (tx: Transaction) => {
    if (contract && account) {
      try {
        const payTx = await contract.payRequest(transactions.indexOf(tx), { value: tx.amount });
        await payTx.wait();
        alert('Payment sent successfully!');
        // Transactions will be automatically updated by the event listener
      } catch (error) {
        console.error('Error paying request:', error);
        alert(`Failed to pay request: ${error.message}`);
      }
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'all') return true;
    if (filter === 'sent') return tx.sender.toLowerCase() === account?.toLowerCase() && !tx.isRequest;
    if (filter === 'received') return tx.receiver.toLowerCase() === account?.toLowerCase() && !tx.isRequest;
    if (filter === 'requests') return tx.isRequest;
    return true;
  });

  if (!account) {
    return (
      <div className="flex justify-center h-screen text-center">
        Please connect your wallet to view your transaction history.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Transaction History</h2>

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Transaction History" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="received">Received</SelectItem>
            <SelectItem value="requests">Requests</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {filteredTransactions.map((tx, index) => (
        <TransactionCard key={index} tx={tx} currentAccount={account} onPayRequest={handlePayRequest} />
      ))}
    </div>
  );
};

export default TransactionHistory;
