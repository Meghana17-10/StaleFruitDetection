
import { useLocation, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ResultCard from '@/components/results/ResultCard';
import { FruitAnalysisResult } from '@/lib/types';

interface LocationState {
  result: FruitAnalysisResult;
  imageUrl: string;
}

const Results = () => {
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  
  // Redirect if no results data is available
  if (!state || !state.result || !state.imageUrl) {
    return <Navigate to="/upload" replace />;
  }
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto text-center mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Analysis Results</h1>
        <p className="text-gray-600">
          Here's what our AI model found about your fruit
        </p>
      </div>
      
      <ResultCard result={state.result} imageUrl={state.imageUrl} />
    </MainLayout>
  );
};

export default Results;
