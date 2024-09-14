import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { RefreshCwIcon } from 'lucide-react';

const CollectedFees: React.FC = () => {
  const { isOwner, collectedFees, fetchCollectedFees } = useWeb3();

  console.log({ isOwner, collectedFees, fetchCollectedFees });

  if (!isOwner) {
    return null; // Don't render anything if the user is not the owner
  }

  return (
    <div className=" rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Collected Fees</h2>
      <p>
        Total Fees: {collectedFees ? `${collectedFees} ETH` : 'Loading...'}
        <button onClick={fetchCollectedFees} className="pl-4 text-primary rounded">
          <RefreshCwIcon size={16} />
        </button>
      </p>
    </div>
  );
};

export default CollectedFees;
