import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../contexts/Web3Context';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import AddressInput from './AddressInput';

interface SendPaymentModalProps {
  onClose: () => void;
}

const SendPaymentModal: React.FC<SendPaymentModalProps> = ({ onClose }) => {
  const { contract, account } = useWeb3();
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(false);

  const handleSendPayment = async () => {
    if (!contract || !account) return;
    try {
      const amountInWei = ethers.parseEther(amount);
      const tx = await contract.sendPayment(to, message, { value: amountInWei });
      await tx.wait();
      alert('Payment sent successfully!');
      onClose();
    } catch (error) {
      console.error('Error sending payment:', error);
      alert('Failed to send payment');
    }
  };

  return (
    <div className="space-y-4">
      <AddressInput
        value={to}
        onChange={(e) => setTo(e.target.value)}
        onValidChange={setIsAddressValid}
        placeholder="Recipient address"
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
      <Button onClick={handleSendPayment} disabled={!isAddressValid || !amount}>
        Send Payment
      </Button>
    </div>
  );
};

export default SendPaymentModal;