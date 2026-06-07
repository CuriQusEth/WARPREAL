import React, { useState } from 'react';
import { WagmiProvider, useAccount, useSendCalls, useCapabilities } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { stringToHex } from 'viem';
import { Sun } from 'lucide-react';
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

  // GM Transaction logic
  const { isConnected, address } = useAccount();
  const { sendCalls } = useSendCalls();
  const { data: capabilities } = useCapabilities({ account: address });

  const sendGMTransaction = async () => {
    // Use our internal proxy endpoint to keep the key safe
    const paymasterServiceUrl = "/api/paymaster";

    // Check if the wallet supports Paymaster on Base Mainnet (8453)
    const baseCapabilities = capabilities?.[8453];
    const hasPaymaster = baseCapabilities?.paymasterService?.supported;

    const capabilitiesConfig = hasPaymaster ? {
      paymasterService: {
        url: paymasterServiceUrl
      }
    } : undefined;

    sendCalls({
      calls: [{
        to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
        value: 0n,
        data: stringToHex('gm'),
      }],
      capabilities: capabilitiesConfig,
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

      {/* GM Button */}
      {isConnected && (
        <div className="absolute top-4 right-4 z-50">
          <button 
            onClick={sendGMTransaction}
            className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
          >
            <Sun size={14} className="text-[#E8A020]" />
            Say GM
          </button>
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
