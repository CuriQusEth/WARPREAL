import { useState, useCallback, useEffect } from 'react';

export type GameState = 'TITLE' | 'HUB' | 'GAMEPLAY' | 'GAMEOVER' | 'CODEX';

export interface RealmLogic {
  id: string;
  name: string;
  theme: string;
  crystalColor: string;
}

export function useGameState() {
  const [currentState, setCurrentState] = useState<GameState>('TITLE');
  const [score, setScore] = useState(0);
  const [realmsExplored, setRealmsExplored] = useState(0);
  const [aetherOrbs, setAetherOrbs] = useState(0);
  const [currentRealm, setCurrentRealm] = useState<RealmLogic | null>(null);

  const startGame = useCallback(() => {
    setCurrentState('GAMEPLAY');
    setScore(0);
    setRealmsExplored(1);
    setAetherOrbs(0);
    setCurrentRealm({ id: 'realm-1', name: 'The Awakening', theme: 'nebula', crystalColor: '#4f46e5' });
  }, []);

  const warpToNextRealm = useCallback(() => {
    setRealmsExplored(prev => prev + 1);
    setScore(prev => prev + 100); // 100 points per stabilize
    setAetherOrbs(prev => prev + Math.floor(Math.random() * 5));
  }, []);

  const triggerGameOver = useCallback(() => {
    setCurrentState('GAMEOVER');
  }, []);

  return {
    currentState,
    setCurrentState,
    score,
    realmsExplored,
    aetherOrbs,
    currentRealm,
    startGame,
    warpToNextRealm,
    triggerGameOver
  };
}
