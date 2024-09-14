import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string, startLength: number = 6, endLength: number = 4): string {
  if (!address) return '';
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

export function formatBalance(balance: string | null, decimals: number = 4): string {
  if (!balance) return '0.0000';

  // Convert the balance to a number
  const balanceNum = parseFloat(balance);

  // Round to the specified number of decimal places and format
  return balanceNum.toFixed(decimals);
}
