export interface Animal {
  id: string;
  name: string;
  scientificName: string;
  type: AnimalType;
  habitat: string;
  diet: string;
  lifespan: string;
  size: string;
  funFacts: string[];
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  stats: {
    speed: number;
    strength: number;
    intelligence: number;
    cuteness: number;
    stealth: number;
  };
  capturedAt?: Date;
  imageData?: string;
}

export type AnimalType = 
  | 'mammal'
  | 'bird'
  | 'reptile'
  | 'amphibian'
  | 'fish'
  | 'insect'
  | 'arachnid'
  | 'marine';

export interface CapturedAnimal extends Animal {
  capturedAt: Date;
  imageData: string;
  location?: string;
}

export const typeColors: Record<AnimalType, string> = {
  mammal: '#E2BF65',
  bird: '#A98FF3',
  reptile: '#7AC74C',
  amphibian: '#6390F0',
  fish: '#6390F0',
  insect: '#A8A77A',
  arachnid: '#A33EA1',
  marine: '#96D9D6',
};

export const rarityColors: Record<Animal['rarity'], string> = {
  common: '#A8A77A',
  uncommon: '#6390F0',
  rare: '#A33EA1',
  legendary: '#F7D02C',
};
