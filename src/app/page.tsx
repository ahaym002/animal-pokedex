'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera as CameraIcon, BookOpen, Settings, Volume2, VolumeX } from 'lucide-react';
import Camera from '@/components/Camera';
import Collection from '@/components/Collection';
import AnimalCard from '@/components/AnimalCard';
import AnimalDetail from '@/components/AnimalDetail';
import CatchAnimation from '@/components/CatchAnimation';
import { useCollection } from '@/hooks/useCollection';
import { CapturedAnimal, Animal } from '@/types/animal';

type View = 'home' | 'collection';

export default function Home() {
  const [view, setView] = useState<View>('home');
  const [showCamera, setShowCamera] = useState(false);
  const [showCatchAnimation, setShowCatchAnimation] = useState(false);
  const [catchSuccess, setCatchSuccess] = useState(false);
  const [pendingAnimal, setPendingAnimal] = useState<CapturedAnimal | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<CapturedAnimal | null>(null);
  const [newAnimalId, setNewAnimalId] = useState<string | undefined>();
  const [soundEnabled, setSoundEnabled] = useState(true);

  const { animals, addAnimal, isLoaded } = useCollection();

  const handleCapture = useCallback(async (imageData: string) => {
    setShowCamera(false);
    setShowCatchAnimation(true);
    setCatchSuccess(false);

    try {
      // Call identification API
      const response = await fetch('/api/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData }),
      });

      const data = await response.json();

      if (data.success && data.animal) {
        const capturedAnimal: CapturedAnimal = {
          ...data.animal,
          capturedAt: new Date(),
          imageData,
        };
        setPendingAnimal(capturedAnimal);
        setCatchSuccess(true);
      } else {
        setCatchSuccess(false);
      }
    } catch (error) {
      console.error('Capture error:', error);
      setCatchSuccess(false);
    }
  }, []);

  const handleCatchComplete = useCallback(() => {
    setShowCatchAnimation(false);
    if (pendingAnimal && catchSuccess) {
      addAnimal(pendingAnimal);
      setNewAnimalId(pendingAnimal.id);
      setSelectedAnimal(pendingAnimal);
      setTimeout(() => setNewAnimalId(undefined), 3000);
    }
    setPendingAnimal(null);
  }, [pendingAnimal, catchSuccess, addAnimal]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-pokedex-red border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="bg-pokedex-red p-4 flex items-center justify-between shadow-lg z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-inner">
            <div className="w-5 h-5 rounded-full bg-blue-400 animate-pulse" />
          </div>
          <h1 className="text-white font-bold text-xl tracking-wider">
            ANIMAL POKÉDEX
          </h1>
        </div>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </header>

      {/* Main content */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col items-center justify-center p-8"
            >
              {/* Hero section */}
              <motion.div
                className="text-center mb-8"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2">
                  Gotta Catch 'Em All!
                </h2>
                <p className="text-gray-400">
                  Snap photos of real animals to add them to your collection
                </p>
              </motion.div>

              {/* Stats summary */}
              <motion.div
                className="bg-gray-800/50 rounded-2xl p-6 mb-8 w-full max-w-sm"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-pokedex-red">{animals.length}</p>
                    <p className="text-xs text-gray-400">Captured</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-yellow-400">
                      {animals.filter(a => a.rarity === 'legendary').length}
                    </p>
                    <p className="text-xs text-gray-400">Legendary</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-400">
                      {new Set(animals.map(a => a.type)).size}
                    </p>
                    <p className="text-xs text-gray-400">Types</p>
                  </div>
                </div>
              </motion.div>

              {/* Latest capture */}
              {animals.length > 0 && (
                <motion.div
                  className="w-full max-w-sm mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-400 text-sm mb-2">Latest capture:</p>
                  <div className="transform scale-90">
                    <AnimalCard
                      animal={animals[0]}
                      onClick={() => setSelectedAnimal(animals[0])}
                    />
                  </div>
                </motion.div>
              )}

              {/* Capture button */}
              <motion.button
                onClick={() => setShowCamera(true)}
                className="capture-btn transform scale-125 hover:scale-130 active:scale-120 transition-transform"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 1.2 }}
              />
              <p className="text-gray-500 text-sm mt-4">Tap to capture</p>
            </motion.div>
          ) : (
            <motion.div
              key="collection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <Collection
                animals={animals}
                onSelectAnimal={setSelectedAnimal}
                newAnimalId={newAnimalId}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-2 flex justify-around items-center safe-area-inset-bottom">
        <NavButton
          icon={CameraIcon}
          label="Capture"
          active={view === 'home'}
          onClick={() => setView('home')}
        />
        <motion.button
          onClick={() => setShowCamera(true)}
          className="capture-btn -mt-8 shadow-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
        <NavButton
          icon={BookOpen}
          label="Collection"
          active={view === 'collection'}
          onClick={() => setView('collection')}
          badge={animals.length}
        />
      </nav>

      {/* Camera modal */}
      {showCamera && (
        <Camera
          onCapture={handleCapture}
          onClose={() => setShowCamera(false)}
        />
      )}

      {/* Catch animation */}
      <CatchAnimation
        isVisible={showCatchAnimation}
        onComplete={handleCatchComplete}
        success={catchSuccess}
        animalName={pendingAnimal?.name}
      />

      {/* Animal detail modal */}
      <AnimalDetail
        animal={selectedAnimal}
        onClose={() => setSelectedAnimal(null)}
      />
    </main>
  );
}

function NavButton({
  icon: Icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: typeof CameraIcon;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-2 relative ${
        active ? 'text-pokedex-red' : 'text-gray-500'
      }`}
    >
      <Icon size={24} />
      <span className="text-xs">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-pokedex-red rounded-full text-white text-xs flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}
