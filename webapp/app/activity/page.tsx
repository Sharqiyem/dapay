'use client';

import React from 'react';
import TransactionHistory from '@/components/TransactionHistory';

const ActivityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <TransactionHistory />
    </div>
  );
};

export default ActivityPage;
