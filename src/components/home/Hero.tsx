
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  
  return (
    <div className="py-20 text-center md:w-4/5 mx-auto">
      <div className="animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold gradient-text mb-6">
          Stale Fruit Detector
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12">
          Ensuring freshness, one fruit at a time
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
        <button 
          onClick={() => navigate('/upload')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg px-8 py-4 text-lg shadow-md transition-colors btn-pulse"
        >
          Analyze Your Fruit
        </button>
        <button 
          onClick={() => navigate('/model-info')}
          className="bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg px-8 py-4 text-lg border border-gray-200 transition-colors"
        >
          Learn How It Works
        </button>
      </div>
    </div>
  );
}
