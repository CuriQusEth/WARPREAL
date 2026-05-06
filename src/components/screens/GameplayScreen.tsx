import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSwipeable } from 'react-swipeable';
import { Zap, Coins } from 'lucide-react';

interface Props {
  score: number;
  realmsExplored: number;
  onWarp: () => void;
  onCollapse: () => void;
  isWarping: boolean;
}

export const GameplayScreen: React.FC<Props> = ({ score, realmsExplored, onWarp, onCollapse, isWarping }) => {
  const [stabilizeProgress, setStabilizeProgress] = useState(0);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      if (!isWarping && stabilizeProgress >= 100) {
        onWarp();
        setStabilizeProgress(0);
      }
    },
    trackMouse: true,
  });

  const handleTapToStabilize = () => {
    if (!isWarping && stabilizeProgress < 100) {
      setStabilizeProgress(prev => {
        const next = Math.min(prev + 15 + Math.random() * 10, 100);
        if (next === 100) {
          // Play sound or effect
        }
        return next;
      });
    }
  };

  return (
    <div {...handlers} className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-auto" onClick={handleTapToStabilize}>
      
      {/* HUD */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 flex justify-between items-start"
      >
        <div className="glass rounded-2xl p-4 flex flex-col gap-1">
          <div className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Realm Depth</div>
          <div className="font-mono text-3xl font-bold text-white">{realmsExplored}</div>
        </div>

        <div className="flex gap-2">
          <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="font-mono font-bold text-indigo-100">{score}</span>
          </div>
          <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="font-mono font-bold text-amber-100 text-sm">Shards</span>
          </div>
        </div>
      </motion.div>

      {/* Interactions */}
      <div className="flex-1 flex items-center justify-center flex-col gap-8">
        {isWarping && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="text-4xl text-white font-black tracking-widest italic drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          >
            WARPING...
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-8 pb-12 flex flex-col items-center gap-6"
      >
        <div className="w-full max-w-sm">
          <div className="flex justify-between text-xs font-bold text-zinc-400 mb-2 uppercase">
            <span>Stability</span>
            <span>{Math.floor(stabilizeProgress)}%</span>
          </div>
          <div className="h-3 w-full glass rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-400"
              animate={{ width: `${stabilizeProgress}%` }}
              transition={{ type: 'spring', bounce: 0 }}
            />
          </div>
        </div>

        {stabilizeProgress < 100 ? (
          <div className="text-zinc-300 font-medium animate-pulse">
            Tap repeatedly to stabilize realm
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-white font-bold text-lg flex flex-col items-center gap-2"
          >
            <div className="animate-bounce">↑</div>
            <span>Swipe UP to Warp Gate</span>
          </motion.div>
        )}

        <button 
          onClick={onCollapse}
          className="mt-4 text-xs text-red-400/60 hover:text-red-400 border border-red-500/20 px-3 py-1 rounded-full uppercase tracking-widest"
        >
          Let it Collapse
        </button>
      </motion.div>

    </div>
  );
};
