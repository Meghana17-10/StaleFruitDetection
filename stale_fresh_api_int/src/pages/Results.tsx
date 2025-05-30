import { useLocation, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ResultCard from '@/components/results/ResultCard';
import { FruitAnalysisResult } from '@/lib/types';
import { useEffect, useState } from 'react';

interface LocationState {
  imageUrl: string; // Remove 'result' since we'll fetch it
}

const Results = () => {
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const [result, setResult] = useState<FruitAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // If no imageUrl passed, redirect
  if (!state || !state.imageUrl) {
    return <Navigate to="/upload" replace />;
  }

  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      setError(false);
      try {
        const formData = await getImageAsFormData(state.imageUrl);
        console.log("FormData prepared:", formData);

        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          body: formData,
        });

        console.log("Raw response:", response);
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Parsed response data:", data);

        if (!data || !data.label || !data.confidence) {
          throw new Error("Invalid response from API");
        }

        setResult(data);
      } catch (err) {
        console.error("Error fetching prediction:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [state.imageUrl]);

  const getImageAsFormData = async (imageUrl: string): Promise<FormData> => {
    const formData = new FormData();
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const filename = imageUrl.split("/").pop() || "image.jpg";
    formData.append("file", blob, filename);
    return formData;
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto text-center mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Analysis Results</h1>
        <p className="text-gray-600">
          Here's what our AI model found about your fruit
        </p>
      </div>

      {loading && <p className="text-center">Analyzing...</p>}
      {error && <p className="text-center text-red-500">Prediction failed.</p>}
      {result && <ResultCard result={result} imageUrl={state.imageUrl} />}
    </MainLayout>
  );
};

export default Results;
