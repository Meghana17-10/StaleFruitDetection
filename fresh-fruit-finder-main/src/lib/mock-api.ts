
import { FruitAnalysisResult } from './types';

// Simulates a delay for API request
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock function to analyze fruit freshness
export const analyzeFruitImage = async (imageFile: File): Promise<FruitAnalysisResult> => {
  // Simulate API processing time (1-3 seconds)
  const processingTime = Math.floor(Math.random() * 2000) + 1000;
  await simulateDelay(processingTime);
  
  // Generate mock prediction (80% chance of fresh for demo purposes)
  const isFresh = Math.random() > 0.2;
  
  // Generate confidence score between 70% and 99%
  const confidence = Math.floor(Math.random() * 29) + 70;
  
  return {
    prediction: isFresh ? 'fresh' : 'stale',
    confidence: confidence / 100,
    processingTimeMs: processingTime,
  };
};

// Mock function to submit feedback
export const submitFeedback = async (
  imageId: string, 
  feedback: 'correct' | 'incorrect'
): Promise<{ success: boolean }> => {
  // Simulate API delay
  await simulateDelay(500);
  
  // Always return success in mock
  return { success: true };
};
