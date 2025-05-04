
export type FruitAnalysisResult = {
  prediction: 'fresh' | 'stale';
  confidence: number;
  processingTimeMs: number;
};

export type FeedbackType = 'correct' | 'incorrect';
