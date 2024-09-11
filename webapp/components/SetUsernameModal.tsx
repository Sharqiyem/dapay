import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SetUsernameModalProps {
  onClose: () => void;
}

const SetUsernameModal: React.FC<SetUsernameModalProps> = ({ onClose }) => {
  const { setUsername, username: currentUsername } = useWeb3();
  console.log('🚀 ~ currentUsername:', currentUsername);
  const [newUsername, setNewUsername] = useState(currentUsername || '');

  const handleSetUsername = async () => {
    try {
      await setUsername(newUsername);
      alert('Username set successfully!');
      onClose();
    } catch (error) {
      console.error('Error setting username:', error);
      alert('Failed to set username');
    }
  };

  return (
    <div className="space-y-4">
      <Input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="Enter username" />
      <Button onClick={handleSetUsername}>Set Username</Button>
    </div>
  );
};

export default SetUsernameModal;
