import { NetworkConfig } from "@/types";

export const DEV_NETWORKS: { [key: string]: NetworkConfig } = {
    hardhat: {
        chainId: '0x7A69',
        chainName: 'Hardhat Local',
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ['http://127.0.0.1:8545'],
        blockExplorerUrls: [],
    },
    sepolia: {
        chainId: '0xaa36a7',
        chainName: 'Sepolia Test Network',
        nativeCurrency: {
            name: 'Sepolia ETH',
            symbol: 'SEP',
            decimals: 18,
        },
        rpcUrls: ['https://sepolia.infura.io/v3/0221c9f3cdb044d5b80fce0a54a79244'],
        blockExplorerUrls: ['https://sepolia.etherscan.io'],
    },
};

export const PROD_NETWORKS: { [key: string]: NetworkConfig } = {

    sepolia: {
        chainId: '0xaa36a7',
        chainName: 'Sepolia Test Network',
        nativeCurrency: {
            name: 'Sepolia ETH',
            symbol: 'SEP',
            decimals: 18,
        },
        rpcUrls: ['https://sepolia.infura.io/v3/0221c9f3cdb044d5b80fce0a54a79244'],
        blockExplorerUrls: ['https://sepolia.etherscan.io'],
    },
};

export const NETWORKS = process.env.NODE_ENV === 'production' ? PROD_NETWORKS : DEV_NETWORKS;