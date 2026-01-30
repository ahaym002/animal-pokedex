import { NextRequest, NextResponse } from 'next/server';
import { getAnimalByKeyword, animalDatabase } from '@/data/animals';
import { Animal } from '@/types/animal';

// Free animal classification using local keyword matching
// In production, you'd use Google Vision, AWS Rekognition, or Hugging Face
export async function POST(request: NextRequest) {
  try {
    const { imageData, mockAnimal } = await request.json();

    // For demo: if mockAnimal is provided, use that
    // In production, you'd send imageData to an AI vision API
    if (mockAnimal) {
      const animal = getAnimalByKeyword(mockAnimal);
      if (animal) {
        return NextResponse.json({
          success: true,
          animal: {
            ...animal,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          },
        });
      }
    }

    // Demo mode: Return a random animal from the database
    // This simulates successful recognition
    const animalKeys = Object.keys(animalDatabase);
    const randomKey = animalKeys[Math.floor(Math.random() * animalKeys.length)];
    const randomAnimal = animalDatabase[randomKey];

    return NextResponse.json({
      success: true,
      animal: {
        ...randomAnimal,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      },
      message: 'Demo mode: Random animal assigned. Connect a vision API for real recognition.',
    });

  } catch (error) {
    console.error('Identification error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to identify animal' },
      { status: 500 }
    );
  }
}
