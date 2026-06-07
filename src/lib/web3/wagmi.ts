import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected, coinbaseWallet } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'Warp Realm',
      preference: 'smartWalletOnly', // To ensure Base Account (Smart Wallet) is prioritized
    }),
    injected()
  ],
  transports: {
    [base.id]: http(),
  },
})
