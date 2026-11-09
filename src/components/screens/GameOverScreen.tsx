import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAccount, useSignMessage, useSendTransaction } from 'wagmi';
import { parseEther, stringToHex } from 'viem';
import { getERC8021AttributionData } from '../../lib/erc8021';
import { submitToTrustlessAgent } from '../../lib/erc8004';

interface Props {
  score: number;
  realmsExplored: number;
  onRestart: () => void;
}

export const GameOverScreen: React.FC<Props> = ({ score, realmsExplored, onRestart }) => {
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { sendTransactionAsync } = useSendTransaction();
  const [submitting, setSubmitting] = useState(false);
  const [txHash, setTxHash] = useState('');

  const submitScoreOnChain = async () => {
    if (!isConnected) return alert('Please connect wallet first!');
    
    setSubmitting(true);
    try {
      // 1. SIWE Signature for Score Verification (Placeholder mechanism)
      const message = `I explored ${realmsExplored} realms with a score of ${score} in Warp Realm. Address: ${address}`;
      const signature = await signMessageAsync({ account: address as `0x${string}`, message });
      console.log('Signed SIWE message:', signature);

      // 2. Trustless Agent Submission using ERC-8004
      await submitToTrustlessAgent({
        action: 'RECORD_SCORE',
        payload: { score, realmsExplored, signature }
      }, address as string);

      // 3. Real On-chain Transaction (Base Mainnet "Say GM") with ERC-8021 attribution
      const attr = getERC8021AttributionData();
      const attrHex = stringToHex(JSON.stringify(attr)).replace('0x', '');
      
      const hash = await sendTransactionAsync({
        chainId: 8453, // Base Mainnet (Denim)
        to: '0x0000000000000000000000000000000000000000', // Burn/Null address for demo payload
        value: parseEther('0'),
        data: `0x676d${attrHex}` as `0x${string}` // "gm" + attribution
      });
      
      setTxHash(hash);
    } catch (e: any) {
      console.error(e);
      alert('Transaction failed: ' + e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6"
    >
      <div className="w-full max-w-md glass p-8 rounded-3xl relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-500/20 blur-[60px] rounded-full pointer-events-none" />

        <h2 className="text-4xl font-black text-white text-center mb-2 tracking-tighter">
          REALM COLLAPSED
        </h2>
        <p className="text-zinc-400 text-center uppercase tracking-widest text-sm mb-8">
          The void has consumed your physical form.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8 text-center">
          <div className="glass p-4 rounded-xl">
            <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Score</div>
            <div className="text-2xl font-mono text-indigo-400 font-bold">{score}</div>
          </div>
          <div className="glass p-4 rounded-xl">
            <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Depth</div>
            <div className="text-2xl font-mono text-cyan-400 font-bold">{realmsExplored}</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={submitScoreOnChain}
            disabled={submitting || !!txHash}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/50 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2"
          >
            {submitting ? 'Confirming in 200ms on Denim...' : txHash ? 'Included on Base Mainnet (Denim)!' : 'Record This Journey On-Chain'}
          </button>

          {txHash && (
            <a href={`https://basescan.org/tx/${txHash}`} target="_blank" rel="noreferrer" className="text-center text-xs text-indigo-400 hover:underline">
              View on Basescan
            </a>
          )}

          <button 
            onClick={onRestart}
            className="w-full py-4 glass hover:bg-white/10 text-indigo-300 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-colors"
          >
            Weave Another Realm
          </button>
        </div>
      </div>
    </motion.div>
  );
};
