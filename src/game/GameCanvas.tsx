import React, { useRef, useEffect } from 'react';

interface Props {
  isWarping: boolean;
  onWarpComplete: () => void;
  speedMultiplier: number;
}

// Procedural Canvas Generation for Realms
export const GameCanvas: React.FC<Props> = ({ isWarping, onWarpComplete, speedMultiplier }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    // Abstract particles
    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 1000,
      size: Math.random() * 2 + 1,
      velocity: Math.random() * 2 + 0.5
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time++;
      
      // Clear with trail effect
      ctx.fillStyle = isWarping ? 'rgba(5, 5, 10, 0.3)' : 'rgba(10, 10, 20, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw particles
      particles.forEach(p => {
        // Move towards camera (decrease z)
        p.z -= p.velocity * speedMultiplier * (isWarping ? 10 : 1);
        
        if (p.z <= 0) {
          p.z = 1000;
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }

        // Project 3D to 2D
        const perspective = 800 / p.z;
        const x = (p.x - cx) * perspective + cx;
        const y = (p.y - cy) * perspective + cy;
        const size = p.size * perspective;

        const opacity = Math.min(1, Math.max(0, 1 - p.z / 1000));
        
        ctx.fillStyle = isWarping ? `rgba(200, 100, 255, ${opacity})` : `rgba(100, 200, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw warp lines if warping
        if (isWarping && p.z < 500) {
          ctx.strokeStyle = `rgba(200, 100, 255, ${opacity * 0.5})`;
          ctx.lineWidth = size / 2;
          ctx.beginPath();
          ctx.moveTo(x, y);
          const prevPerspective = 800 / (p.z + p.velocity * speedMultiplier * 10);
          const prevX = (p.x - cx) * prevPerspective + cx;
          const prevY = (p.y - cy) * prevPerspective + cy;
          ctx.lineTo(prevX, prevY);
          ctx.stroke();
        }
      });

      // Draw center portal ring
      ctx.strokeStyle = isWarping ? 'rgba(255, 255, 255, 0.8)' : 'rgba(100, 200, 255, 0.2)';
      ctx.lineWidth = isWarping ? 8 : 2;
      ctx.beginPath();
      // Pulsing ring
      const ringRadius = 150 + Math.sin(time * 0.05) * 10;
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    if (isWarping) {
      setTimeout(() => {
        onWarpComplete();
      }, 2000); // Warp transition takes 2 seconds
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isWarping, speedMultiplier, onWarpComplete]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
