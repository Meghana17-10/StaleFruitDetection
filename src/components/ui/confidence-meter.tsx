
import { cn } from '@/lib/utils';

interface ConfidenceMeterProps {
  value: number;
  predictionType: 'fresh' | 'stale';
}

export const ConfidenceMeter = ({ value, predictionType }: ConfidenceMeterProps) => {
  const percentage = Math.round(value * 100);
  
  const getColor = () => {
    if (predictionType === 'fresh') {
      return {
        bg: 'bg-fresh-100',
        fill: 'bg-fresh-500'
      };
    } else {
      return {
        bg: 'bg-stale-100',
        fill: 'bg-stale-500'
      };
    }
  };
  
  const { bg, fill } = getColor();
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Confidence</span>
        <span className="text-sm font-medium text-gray-700">{percentage}%</span>
      </div>
      <div className={cn("w-full h-3 rounded-full", bg)}>
        <div 
          className={cn("h-full rounded-full transition-all duration-1000", fill)} 
          style={{ width: `${percentage}%` }}
        >
        </div>
      </div>
    </div>
  );
};
