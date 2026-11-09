import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected, coinbaseWallet } from 'wagmi/connectors'

// Base Mainnet with Denim Upgrade (Activated Nov 5, 2026: 200ms canonical blocks)
export const baseMainnetDenim = {
  ...base,
  name: 'Base Mainnet (Denim)',
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org'],
    },
    public: {
      http: ['https://mainnet.base.org'],
    },
  },
  blockExplorers: {
    default: { name: 'Basescan', url: 'https://basescan.org' },
  },
} as const

export const config = createConfig({
  chains: [baseMainnetDenim],
  connectors: [
    coinbaseWallet({
      appName: 'Warp Realm',
      preference: 'smartWalletOnly', // Smart Wallet prioritized
    }),
    injected(),
  ],
  transports: {
    [baseMainnetDenim.id]: http('https://mainnet.base.org', {
      batch: { wait: 50 },
      retryCount: 3,
    }),
  },
  pollingInterval: 200, // Denim native 200ms canonical blocks
})
