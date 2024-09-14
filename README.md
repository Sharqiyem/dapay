# DaPay Technical Documentation

## 1. Project Overview

DaPay is a decentralized payment system built on Ethereum. It allows users to send and request payments, set usernames, and manage transactions across multiple networks.

Technologies used:

- Solidity (Smart Contracts)
- Hardhat (Ethereum development environment)
- Next.js (React framework)
- ethers.js (Ethereum library)
- Tailwind CSS (Styling)
- shadcn/ui (UI components)

Project Structure:

```
/
├── backend/                    # Backend (Hardhat) directory
│   ├── contracts/
│   │   └── PaymentSystem.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── test/
│   │   └── PaymentSystem.test.js
│   └── hardhat.config.js
├── webapp/                 # Frontend (Next.js) directory
│   ├── app/
│   ├── components/
│   ├── contexts/
│   ├── types/
│   ├── constants/
│   ├── hooks/
│   ├── lib/
│   └── next.config.js
└── README.md
```

## 2. Smart Contracts (Backend)

### 2.1. Contract: PaymentSystem

Location: `backend/contracts/PaymentSystem.sol`

The PaymentSystem contract is the core of DaPay. It manages payments, requests, usernames, and fees.

Key Functions:

- `setUsername(string calldata username)`: Sets the username for the caller's address.
- `getUsername(address account)`: Retrieves the username for a given address.
- `sendPayment(address payable to, string calldata message)`: Sends a payment to the specified address.
- `requestPayment(address from, uint256 amount, string calldata message)`: Creates a payment request.
- `getTransactions()`: Retrieves all transactions (payments and requests).
- `setFeePercentage(uint256 _newFeePercentage)`: Sets the fee percentage (owner only).
- `withdrawFees()`: Withdraws collected fees (owner only).

Events:

- `PaymentSent(address indexed from, address indexed to, uint256 amount, string message, uint256 timestamp)`
- `PaymentRequested(address indexed from, address indexed to, uint256 amount, string message, uint256 timestamp)`
- `UsernameSet(address indexed user, string username)`
- `FeePercentageUpdated(uint256 newFeePercentage)`

State Variables:

- `mapping(address => string) private usernames`
- `Transaction[] public transactions`
- `uint256 public feePercentage`
- `uint256 public collectedFees`

Access Control:
The contract uses OpenZeppelin's `Ownable` for owner-only functions.

### 2.2. Deployment

Location: `backend/scripts/deploy.js`

The deployment script handles:

- Deploying the PaymentSystem contract
- Updating the contract address in the frontend configuration
- Copying the contract ABI to the frontend

Networks deployed to:

- Hardhat (local development)
- Sepolia (testnet)
- [Add other networks as applicable]

To deploy:

```
npx hardhat run scripts/deploy.js --network <network-name>
```

### 2.3. Testing

Location: `backend/test/PaymentSystem.test.js`

The test suite covers:

- Username functionality
- Payment sending and receiving
- Payment requests
- Fee management
- Access control

To run tests:

```
npx hardhat test
```

## 3. Front-end Architecture (webapp)

### 3.1. Technology Stack

- Next.js (React framework)
- ethers.js (Ethereum interaction)
- Tailwind CSS (Styling)
- shadcn/ui (UI components)

### 3.2. Project Structure

```
webapp/
├── src/
│   ├── components/
│   │   ├── NetworkSelector.tsx
│   │   ├── WalletConnect.tsx
│   │   ├── SendPayment.tsx
│   │   ├── RequestPayment.tsx
│   │   └── TransactionHistory.tsx
│   ├── contexts/
│   │   └── Web3Context.tsx
│   ├── pages/
│   │   └── index.tsx
│   └── styles/
│       └── globals.css
├── public/
└── next.config.js
```

### 3.3. State Management

- Web3Context (`webapp/src/contexts/Web3Context.tsx`)
  - Manages wallet connection, network selection, and contract interaction
- React hooks for component-level state

### 3.4. Key Components

- NetworkSelector: Allows users to switch between different blockchain networks
- WalletConnect: Handles wallet connection and disconnection
- SendPayment: Interface for sending payments
- RequestPayment: Interface for requesting payments
- TransactionHistory: Displays user's transaction history

### 3.5. Interaction with Smart Contracts

- Web3Context sets up the ethers.js provider and contract instance
- Components use the Web3Context to interact with the contract
- Example (Sending a payment):
  ```typescript
  const { contract } = useWeb3();
  const sendPayment = async () => {
    const tx = await contract.sendPayment(recipient, message, { value: amount });
    await tx.wait();
  };
  ```

## 4. Setup and Installation

### 4.1. Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MetaMask or another Web3 wallet

### 4.2. Installation Steps

1. Clone the repository
2. Install backend dependencies:
   ```
   cd app
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd ../webapp
   npm install
   ```
4. Set up environment variables (create `.env` files in both `app` and `webapp` directories)

### 4.3. Running the Application

Backend (Hardhat node):

```
cd app
npx hardhat node
```

Frontend (Next.js):

```
cd webapp
npm run dev
```

### 4.4. Deployment

- Smart Contract: Use the deployment script in `backend/scripts/deploy.js`
- Frontend: Deploy to Vercel or your preferred hosting platform

## 5. Configuration

### 5.1. Network Configuration

Location: `webapp/src/constants/networks.ts`

Supported networks:

- Hardhat (local)
- Sepolia
- [Add other networks as applicable]

### 5.2. Contract Addresses

Location: `webapp/src/constants/contract.ts`

Contract addresses are managed per network and updated automatically by the deployment script.

## 6. Testing

### 6.1. Smart Contract Tests

Location: `backend/test/PaymentSystem.test.js`
Run with: `npx hardhat test`

### 6.2. Frontend Tests

[Describe your frontend testing setup and how to run tests]

## 7. Troubleshooting

[List common issues and their solutions]

## 8. Future Improvements

- [List planned features]
- [Describe known limitations]
