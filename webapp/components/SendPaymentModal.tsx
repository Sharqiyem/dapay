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
  const { contract, account, feePercentage } = useWeb3();
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateAmount = (value: string) => {
    const floatValue = parseFloat(value);
    return floatValue > 0 && !isNaN(floatValue);
  };

  const validateMessage = (value: string) => {
    return value.length <= 280; // Limit message to 280 characters
  };

  const handleSendPayment = async () => {
    if (!contract || !account) {
      alert('Please connect your wallet');
      return;
    }

    if (!isAddressValid) {
      alert('Please enter a valid Ethereum address');
      return;
    }

    if (!validateAmount(amount)) {
      alert('Please enter a valid amount greater than 0');
      return;
    }

    if (!validateMessage(message)) {
      alert('Message is too long. Please limit it to 280 characters.');
      return;
    }

    if (ethers.getAddress(to).toLowerCase() === account.toLowerCase()) {
      alert('You cannot send payment to yourself');
      return;
    }

    setIsLoading(true);

    try {
      const amountInWei = ethers.parseEther(amount);

      console.log('Sending payment:', {
        to,
        amount: amountInWei.toString(),
        message,
      });

      const tx = await contract.sendPayment(to, message, { value: amountInWei });
      console.log('Transaction sent:', tx.hash);

      const receipt = await tx.wait();
      console.log('Transaction confirmed in block:', receipt.blockNumber);

      alert('Payment sent successfully!');
      onClose();

      // Clear form
      setTo('');
      setAmount('');
      setMessage('');
    } catch (error) {
      console.error('Error sending payment:', error);
      alert(`Failed to send payment: ${error}`);
    } finally {
      setIsLoading(false);
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
      <div>
        <p className="text-sm">Current Fee: {feePercentage !== null ? `${feePercentage}%` : 'Not available'}</p>
      </div>
      <Button
        onClick={handleSendPayment}
        disabled={!isAddressValid || !validateAmount(amount) || !validateMessage(message) || isLoading}
      >
        {isLoading ? 'Sending Payment...' : 'Send Payment'}
      </Button>
    </div>
  );
};

export default SendPaymentModal;
