'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CatchAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
  success: boolean;
  animalName?: string;
}

export default function CatchAnimation({ isVisible, onComplete, success, animalName }: CatchAnimationProps) {
  const [phase, setPhase] = useState<'throw' | 'shake' | 'result'>('throw');

  useEffect(() => {
    if (isVisible) {
      setPhase('throw');
      
      const shakeTimer = setTimeout(() => setPhase('shake'), 800);
      const resultTimer = setTimeout(() => setPhase('result'), 2500);
      const completeTimer = setTimeout(onComplete, 4000);

      return () => {
        clearTimeout(shakeTimer);
        clearTimeout(resultTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        >
          {/* Pokeball */}
          <motion.div
            className="relative"
            initial={{ y: -200, rotate: 0 }}
            animate={
              phase === 'throw'
                ? { y: 0, rotate: 720 }
                : phase === 'shake'
                ? { y: 0, rotate: [0, -20, 20, -15, 15, -10, 10, 0] }
                : { y: 0, rotate: 0, scale: success ? [1, 1.2, 1] : 1 }
            }
            transition={
              phase === 'throw'
                ? { duration: 0.8, type: 'spring', bounce: 0.4 }
                : phase === 'shake'
                ? { duration: 1.5, times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1] }
                : { duration: 0.3 }
            }
          >
            {/* Pokeball SVG */}
            <svg width="120" height="120" viewBox="0 0 100 100">
              {/* Top half (red) */}
              <path
                d="M 50 5 A 45 45 0 0 1 95 50 L 70 50 A 20 20 0 0 0 30 50 L 5 50 A 45 45 0 0 1 50 5"
                fill="#DC0A2D"
                stroke="#333"
                strokeWidth="3"
              />
              {/* Bottom half (white) */}
              <path
                d="M 50 95 A 45 45 0 0 1 5 50 L 30 50 A 20 20 0 0 0 70 50 L 95 50 A 45 45 0 0 1 50 95"
                fill="#fff"
                stroke="#333"
                strokeWidth="3"
              />
              {/* Center band */}
              <rect x="5" y="47" width="90" height="6" fill="#333" />
              {/* Center button */}
              <circle cx="50" cy="50" r="12" fill="#fff" stroke="#333" strokeWidth="3" />
              <circle cx="50" cy="50" r="6" fill="#fff" stroke="#333" strokeWidth="2" />
              {/* Shine */}
              <ellipse cx="30" cy="25" rx="8" ry="5" fill="rgba(255,255,255,0.4)" />
            </svg>

            {/* Success sparkles */}
            {phase === 'result' && success && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    initial={{ x: 60, y: 60, scale: 0 }}
                    animate={{
                      x: 60 + Math.cos((i / 12) * Math.PI * 2) * 80,
                      y: 60 + Math.sin((i / 12) * Math.PI * 2) * 80,
                      scale: [0, 1, 0],
                    }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Result text */}
          <AnimatePresence>
            {phase === 'result' && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-32 text-center"
              >
                {success ? (
                  <>
                    <motion.p
                      className="text-4xl font-bold text-yellow-400 mb-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      GOTCHA!
                    </motion.p>
                    <p className="text-white text-xl">
                      {animalName} was captured!
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-red-400 mb-2">
                      Oh no!
                    </p>
                    <p className="text-white">
                      Could not identify the animal
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dots indicating shake attempts */}
          {phase === 'shake' && (
            <div className="absolute bottom-48 flex gap-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 rounded-full bg-white/30"
                  animate={{ backgroundColor: ['rgba(255,255,255,0.3)', '#F7D02C', 'rgba(255,255,255,0.3)'] }}
                  transition={{ duration: 0.5, delay: i * 0.5 }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
