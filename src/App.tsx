import React, { useState } from 'react';
import { WagmiProvider, useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { stringToHex } from 'viem';
import { Sun, CheckCircle2, Loader2 } from 'lucide-react';
import { config } from './lib/web3/wagmi';
import { useGameState } from './game/useGameState';
import { GameCanvas } from './game/GameCanvas';
import { TitleScreen } from './components/screens/TitleScreen';
import { GameplayScreen } from './components/screens/GameplayScreen';
import { GameOverScreen } from './components/screens/GameOverScreen';
import { AnimatePresence } from 'motion/react';

const queryClient = new QueryClient();

function GameApp() {
  const { 
    currentState, 
    score, 
    realmsExplored, 
    startGame, 
    warpToNextRealm, 
    triggerGameOver 
  } = useGameState();

  const [isWarping, setIsWarping] = useState(false);

  // GM Transaction logic on Base Mainnet (Denim - 200ms block inclusion)
  const { isConnected } = useAccount();
  const { sendTransaction, data: txHash, isPending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
    pollingInterval: 200, // Denim 200ms canonical blocks
  });

  const sendGMTransaction = () => {
    sendTransaction({
      chainId: 8453, // Base Mainnet
      to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
      value: 0n,
      data: stringToHex('gm'),
    });
  };

  const handleWarp = () => {
    setIsWarping(true);
  };

  const handleWarpComplete = () => {
    setIsWarping(false);
    warpToNextRealm();
  };

  const speedMultiplier = currentState === 'TITLE' ? 0.2 : (currentState === 'GAMEPLAY' && !isWarping ? 1 : 5);

  return (
    <div className="relative w-full h-screen bg-[#05050a] overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* Background decorations */}
      <div className="mesh-gradient"></div>
      <div className="orbit w-[800px] h-[800px] -top-40 -left-40"></div>
      <div className="orbit w-[600px] h-[600px] bottom-[-100px] right-[-100px]"></div>

      {/* Background Canvas Engine */}
      <GameCanvas 
        isWarping={isWarping} 
        onWarpComplete={handleWarpComplete} 
        speedMultiplier={speedMultiplier} 
      />

      {/* UI Screens */}
      <AnimatePresence mode="wait">
        {currentState === 'TITLE' && (
          <TitleScreen key="title" onStart={startGame} />
        )}
        
        {currentState === 'GAMEPLAY' && (
          <GameplayScreen 
            key="gameplay"
            score={score} 
            realmsExplored={realmsExplored}
            onWarp={handleWarp}
            onCollapse={triggerGameOver}
            isWarping={isWarping}
          />
        )}

        {currentState === 'GAMEOVER' && (
          <GameOverScreen 
            key="gameover"
            score={score}
            realmsExplored={realmsExplored}
            onRestart={() => {
              startGame(); // Need to properly reset state, hook handles it
            }}
          />
        )}
      </AnimatePresence>

      {/* Base Mainnet Denim Network Pill */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-indigo-500/30 text-[11px] text-indigo-200">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-semibold tracking-wide">Base Mainnet</span>
        <span className="text-indigo-400/80 font-mono text-[10px]">Denim • 200ms</span>
      </div>

      {/* GM Button */}
      {isConnected && (
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
          <button 
            onClick={sendGMTransaction}
            disabled={isPending || isConfirming}
            className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 size={14} className="animate-spin text-[#E8A020]" />
                Confirming...
              </>
            ) : isConfirming ? (
              <>
                <Loader2 size={14} className="animate-spin text-[#E8A020]" />
                Denim (200ms)...
              </>
            ) : isConfirmed ? (
              <>
                <CheckCircle2 size={14} className="text-emerald-400" />
                GM Included!
              </>
            ) : (
              <>
                <Sun size={14} className="text-[#E8A020]" />
                Say GM
              </>
            )}
          </button>

          {txHash && (
            <a 
              href={`https://basescan.org/tx/${txHash}`}
              target="_blank" 
              rel="noreferrer"
              className="px-2.5 py-2 rounded-lg glass text-[10px] text-indigo-300 hover:text-white hover:bg-white/10 transition-colors font-mono"
            >
              Basescan ↗
            </a>
          )}
        </div>
      )}

      {/* Global Vignette / Screen FX */}
      <div className="absolute inset-0 pointer-events-none rounded-[40px] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-50"></div>
    </div>
  );
}

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <GameApp />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
