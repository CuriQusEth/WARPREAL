import React from 'react';
import { motion } from 'motion/react';
import { useConnect } from 'wagmi';

interface Props {
  onStart: () => void;
}

export const TitleScreen: React.FC<Props> = ({ onStart }) => {
  const { connectors, connect } = useConnect();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
        className="text-center"
      >
        <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 mb-4 tracking-tighter title-shadow">
          WARP REALM
        </h1>
        <p className="text-xl md:text-2xl text-purple-200 mb-6 font-light tracking-widest uppercase">
          Become the Realm Weaver
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/30 text-[11px] text-indigo-200 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Base Mainnet • Denim 200ms Native Blocks</span>
        </div>

        <div className="space-y-4 flex flex-col items-center">
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 glass hover:bg-white/10 rounded-full text-white font-bold text-xl transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10">Weave Realm</span>
            <div className="absolute inset-0 rounded-full ring-2 ring-white/50 scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
          </button>
          
          <p className="text-zinc-500 text-sm max-w-xs text-center mt-8">
            Connect wallet to record your journey on-chain.
          </p>
          <div className="flex gap-2 mt-2">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="glass px-4 py-2 text-xs rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                type="button"
              >
                Connect {connector.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
