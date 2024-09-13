import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { NETWORKS } from '@/constants/networks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const NetworkSelector: React.FC = () => {
  const { selectedNetwork, switchNetwork } = useWeb3();
  console.log('🚀 ~ selectedNetwork:', selectedNetwork);

  const handleNetworkChange = (value: string) => {
    console.log('🚀 ~ value:', value);
    switchNetwork(value);
  };

  //   if we have only one network, we don't need to select networks
  if (Object.keys(NETWORKS).length === 1) {
    return null;
  }

  return (
    <Select onValueChange={handleNetworkChange} value={selectedNetwork}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Select Network" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(NETWORKS).map(([key, network]) => (
          <SelectItem key={key} value={key}>
            {network.chainName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default NetworkSelector;
