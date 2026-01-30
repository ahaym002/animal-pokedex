'use client';

import { motion } from 'framer-motion';
import { CapturedAnimal, typeColors, rarityColors } from '@/types/animal';
import { MapPin, Clock, Sparkles } from 'lucide-react';

interface AnimalCardProps {
  animal: CapturedAnimal;
  onClick?: () => void;
  isNew?: boolean;
}

export default function AnimalCard({ animal, onClick, isNew }: AnimalCardProps) {
  const typeColor = typeColors[animal.type];
  const rarityColor = rarityColors[animal.rarity];

  return (
    <motion.div
      initial={isNew ? { scale: 0, rotateY: 180 } : { scale: 1 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="pokemon-card cursor-pointer hover:scale-105 transition-transform"
      onClick={onClick}
      style={{ borderColor: typeColor }}
    >
      <div className="pokemon-card-inner">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{animal.name}</h3>
            <p className="text-xs text-gray-500 italic">{animal.scientificName}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              className="type-badge"
              style={{ backgroundColor: typeColor }}
            >
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

        {/* Image */}
        <div 
          className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 border-4"
          style={{ borderColor: typeColor }}
        >
          {animal.imageData && (
            <img
              src={animal.imageData}
              alt={animal.name}
              className="w-full h-full object-cover"
            />
          )}
          {isNew && (
            <div className="sparkle-container">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="sparkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick info */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin size={12} />
            <span className="truncate">{animal.habitat}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Clock size={12} />
            <span>{animal.lifespan}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-1">
          <StatBar label="SPD" value={animal.stats.speed} color="#F7D02C" />
          <StatBar label="STR" value={animal.stats.strength} color="#DC0A2D" />
          <StatBar label="INT" value={animal.stats.intelligence} color="#6390F0" />
          <StatBar label="CUTE" value={animal.stats.cuteness} color="#EE8130" />
          <StatBar label="STLTH" value={animal.stats.stealth} color="#7AC74C" />
        </div>
      </div>
    </motion.div>
  );
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-gray-600 w-10">{label}</span>
      <div className="stat-bar flex-1">
        <motion.div
          className="stat-bar-fill"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>
      <span className="text-xs font-bold text-gray-600 w-6 text-right">{value}</span>
    </div>
  );
}
