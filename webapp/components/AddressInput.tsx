import React, { useState, forwardRef, InputHTMLAttributes } from 'react';
import { ethers } from 'ethers';
import { Input } from './ui/input';
import { cn } from "../lib/utils";

interface AddressInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onValidChange?: (isValid: boolean) => void;
}

const AddressInput = forwardRef<HTMLInputElement, AddressInputProps>(
  ({ className, onValidChange, ...props }, ref) => {
    const [isValid, setIsValid] = useState(true);

    const validateAddress = (input: string) => {
      try {
        if (input) {
          ethers.getAddress(input);
          setIsValid(true);
          onValidChange?.(true);
        } else {
          setIsValid(true);
          onValidChange?.(false);
        }
      } catch (e) {
        setIsValid(false);
        onValidChange?.(false);
      }
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      validateAddress(input);
      props.onChange?.(e);
    };

    return (
      <div>
        <Input
          {...props}
          ref={ref}
          onChange={handleAddressChange}
          className={cn(
            className,
            !isValid && 'border-red-500 focus:ring-red-500'
          )}
        />
        {!isValid && (
          <p className="mt-1 text-sm text-red-500">Invalid Ethereum address</p>
        )}
      </div>
    );
  }
);

AddressInput.displayName = 'AddressInput';

export default AddressInput;