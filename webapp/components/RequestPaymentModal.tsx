import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../contexts/Web3Context';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import AddressInput from './AddressInput';

interface RequestPaymentModalProps {
  onClose: () => void;
}

const RequestPaymentModal: React.FC<RequestPaymentModalProps> = ({ onClose }) => {
  const { contract } = useWeb3();
  const [from, setFrom] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(false);

  const handleRequestPayment = async () => {
    if (!contract) return;
    try {
      const amountInWei = ethers.parseEther(amount);
      const tx = await contract.requestPayment(from, amountInWei, message);
      await tx.wait();
      alert('Payment request sent successfully!');
      onClose();
    } catch (error) {
      console.error('Error requesting payment:', error);
      alert('Failed to request payment');
    }
  };

  return (
    <div className="space-y-4">
      <AddressInput
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        onValidChange={setIsAddressValid}
        placeholder="Payer address"
      />
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (ETH)"
        min="0"
        step="0.000000000000000001"
      />
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message (optional, max 280 characters)"
        maxLength={280}
      />
      <Button onClick={handleRequestPayment} disabled={!isAddressValid || !amount}>
        Request Payment
      </Button>
    </div>
  );
};

export default RequestPaymentModal;
