'use client';

import { CapturedAnimal } from '@/types/animal';
import AnimalCard from './AnimalCard';
import { motion } from 'framer-motion';
import { Grid3X3, List, Trophy, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface CollectionProps {
  animals: CapturedAnimal[];
  onSelectAnimal: (animal: CapturedAnimal) => void;
  newAnimalId?: string;
}

export default function Collection({ animals, onSelectAnimal, newAnimalId }: CollectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Calculate stats
  const totalSpecies = animals.length;
  const uniqueTypes = new Set(animals.map(a => a.type)).size;
  const legendaryCount = animals.filter(a => a.rarity === 'legendary').length;
  const rareCount = animals.filter(a => a.rarity === 'rare').length;

  return (
    <div className="flex flex-col h-full">
      {/* Stats header */}
      <div className="bg-gradient-to-r from-pokedex-red to-red-700 p-4 rounded-b-3xl shadow-lg">
        <div className="grid grid-cols-4 gap-2 text-center">
          <StatBox icon={BookOpen} label="Captured" value={totalSpecies} />
          <StatBox icon={Grid3X3} label="Types" value={uniqueTypes} />
          <StatBox icon={Trophy} label="Legendary" value={legendaryCount} />
          <StatBox icon="⭐" label="Rare" value={rareCount} />
        </div>
      </div>

      {/* View toggle */}
      <div className="flex justify-end p-4 gap-2">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-pokedex-red text-white' : 'bg-gray-700 text-gray-400'}`}
        >
          <Grid3X3 size={20} />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-pokedex-red text-white' : 'bg-gray-700 text-gray-400'}`}
        >
          <List size={20} />
        </button>
      </div>

      {/* Collection */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {animals.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <BookOpen size={48} className="mb-4 opacity-50" />
            <p className="text-lg">No animals captured yet!</p>
            <p className="text-sm">Tap the camera button to start</p>
          </div>
        ) : viewMode === 'grid' ? (
          <motion.div
            className="grid grid-cols-1 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {animals.map((animal, index) => (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <AnimalCard
                  animal={animal}
                  onClick={() => onSelectAnimal(animal)}
                  isNew={animal.id === newAnimalId}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {animals.map((animal, index) => (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => onSelectAnimal(animal)}
                className="flex items-center gap-3 bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors"
              >
                {animal.imageData && (
                  <img
                    src={animal.imageData}
                    alt={animal.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-white">{animal.name}</h3>
                  <p className="text-xs text-gray-400">{animal.scientificName}</p>
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                  {animal.type}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, value }: { icon: typeof BookOpen | string; label: string; value: number }) {
  return (
    <div className="bg-white/10 rounded-lg p-2">
      <div className="flex justify-center mb-1">
        {typeof Icon === 'string' ? (
          <span className="text-lg">{Icon}</span>
        ) : (
          <Icon size={16} className="text-white/70" />
        )}
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/70">{label}</p>
    </div>
  );
}
