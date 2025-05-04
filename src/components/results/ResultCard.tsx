
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FruitAnalysisResult, FeedbackType } from '@/lib/types';
import { ConfidenceMeter } from '@/components/ui/confidence-meter';
import { submitFeedback } from '@/lib/mock-api';
import { toast } from '@/components/ui/sonner';

interface ResultCardProps {
  result: FruitAnalysisResult;
  imageUrl: string;
}

export default function ResultCard({ result, imageUrl }: ResultCardProps) {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<FeedbackType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const { prediction, confidence, processingTimeMs } = result;

  const handleFeedback = async (feedback: FeedbackType) => {
    setIsSubmitting(true);
    
    try {
      // Submit feedback to mock API
      await submitFeedback('mock-image-id', feedback);
      
      // Update UI
      setFeedbackSubmitted(feedback);
      toast.success('Thank you for your feedback!');
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleTryAgain = () => {
    navigate('/upload');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-3xl mx-auto animate-fade-in">
      <div className="md:flex">
        {/* Image section */}
        <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
          <img 
            src={imageUrl} 
            alt="Analyzed fruit" 
            className="rounded-lg max-h-80 object-contain" 
          />
        </div>
        
        {/* Results section */}
        <div className="md:w-1/2 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1">Analysis Result</h2>
            <p className="text-sm text-gray-500">Processed in {(processingTimeMs / 1000).toFixed(1)}s</p>
          </div>
          
          <div className={`inline-block px-4 py-2 rounded-full text-white font-medium mb-6 ${
            prediction === 'fresh' ? 'bg-fresh-500' : 'bg-stale-500'
          }`}>
            This fruit appears to be {prediction.toUpperCase()}
          </div>
          
          <div className="mb-8">
            <ConfidenceMeter value={confidence} predictionType={prediction} />
          </div>
          
          <div className="border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600 mb-3">Was this prediction accurate?</p>
            
            {feedbackSubmitted ? (
              <div className="text-sm text-gray-600">
                Thank you for your feedback! You marked this prediction as{' '}
                <span className="font-medium">{feedbackSubmitted}</span>.
              </div>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={() => handleFeedback('correct')}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Correct
                </button>
                <button
                  onClick={() => handleFeedback('incorrect')}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Incorrect
                </button>
              </div>
            )}
            
            <button 
              onClick={handleTryAgain} 
              className="mt-6 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Analyze Another Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
