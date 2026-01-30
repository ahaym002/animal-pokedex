'use client';

import { useState, useEffect, useCallback } from 'react';
import { CapturedAnimal } from '@/types/animal';

const STORAGE_KEY = 'animal-pokedex-collection';

export function useCollection() {
  const [animals, setAnimals] = useState<CapturedAnimal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const withDates = parsed.map((a: CapturedAnimal) => ({
          ...a,
          capturedAt: new Date(a.capturedAt),
        }));
        setAnimals(withDates);
      }
    } catch (error) {
      console.error('Failed to load collection:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever animals change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(animals));
      } catch (error) {
        console.error('Failed to save collection:', error);
      }
    }
  }, [animals, isLoaded]);

  const addAnimal = useCallback((animal: CapturedAnimal) => {
    setAnimals(prev => [animal, ...prev]);
  }, []);

  const removeAnimal = useCallback((id: string) => {
    setAnimals(prev => prev.filter(a => a.id !== id));
  }, []);

  const clearCollection = useCallback(() => {
    setAnimals([]);
  }, []);

  return {
    animals,
    addAnimal,
    removeAnimal,
    clearCollection,
    isLoaded,
  };
}
