'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CapturedAnimal, typeColors, rarityColors } from '@/types/animal';
import { X, MapPin, Utensils, Clock, Ruler, Sparkles, Lightbulb } from 'lucide-react';

interface AnimalDetailProps {
  animal: CapturedAnimal | null;
  onClose: () => void;
}

export default function AnimalDetail({ animal, onClose }: AnimalDetailProps) {
  if (!animal) return null;

  const typeColor = typeColors[animal.type];
  const rarityColor = rarityColors[animal.rarity];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl"
          style={{ backgroundColor: typeColor }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-start gap-3">
              <div>
                <h2 className="text-2xl font-bold text-white">{animal.name}</h2>
                <p className="text-white/70 italic text-sm">{animal.scientificName}</p>
              </div>
              <div className="flex gap-2">
                <span className="type-badge bg-white/20 text-white">
                  {animal.type}
                </span>
                <span
                  className="type-badge flex items-center gap-1"
                  style={{ backgroundColor: rarityColor }}
                >
                  {animal.rarity === 'legendary' && <Sparkles size={10} />}
                  {animal.rarity}
                </span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="bg-white rounded-t-3xl p-6 space-y-6">
            {/* Image */}
            {animal.imageData && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                <img
                  src={animal.imageData}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4">
              <InfoItem icon={MapPin} label="Habitat" value={animal.habitat} />
              <InfoItem icon={Utensils} label="Diet" value={animal.diet} />
              <InfoItem icon={Clock} label="Lifespan" value={animal.lifespan} />
              <InfoItem icon={Ruler} label="Size" value={animal.size} />
            </div>

            {/* Stats */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Stats</h3>
              <div className="space-y-2">
                <DetailStatBar label="Speed" value={animal.stats.speed} color="#F7D02C" />
                <DetailStatBar label="Strength" value={animal.stats.strength} color="#DC0A2D" />
                <DetailStatBar label="Intelligence" value={animal.stats.intelligence} color="#6390F0" />
                <DetailStatBar label="Cuteness" value={animal.stats.cuteness} color="#EE8130" />
                <DetailStatBar label="Stealth" value={animal.stats.stealth} color="#7AC74C" />
              </div>
            </div>

            {/* Fun facts */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Lightbulb className="text-yellow-500" size={20} />
                Fun Facts
              </h3>
              <ul className="space-y-2">
                {animal.funFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-lg">🔹</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            {/* Capture info */}
            <div className="text-center text-xs text-gray-400 pt-4 border-t">
              Captured on {new Date(animal.capturedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="bg-gray-100 rounded-lg p-3">
      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
        <Icon size={12} />
        {label}
      </div>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}

function DetailStatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-24">{label}</span>
      <div className="stat-bar flex-1">
        <motion.div
          className="stat-bar-fill"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span className="text-sm font-bold text-gray-800 w-8 text-right">{value}</span>
    </div>
  );
}
