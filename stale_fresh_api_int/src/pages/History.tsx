// import { useAuth } from "@/hooks/useAuth";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, Loader, History as HistoryIcon, CheckCircle, AlertCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import MainLayout from "@/components/layout/MainLayout";
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface Prediction {
//     id: string;
//     image_url: string;
//     prediction: string;
//     confidence: number;
//     timestamp: string;
// }

// export default function History() {
//     const { user } = useAuth();
//     const navigate = useNavigate();
//     const [predictions, setPredictions] = useState<Prediction[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchHistory = async () => {
//             try {
//                 if (!user?.email) return;
                
//                 const response = await fetch(`${import.meta.env.VITE_API_URL}/get_history?email=${user.email}`, {
//                     headers: {
//                         'Authorization': `Bearer ${user.token}`,
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch history');
//                 }

//                 const data = await response.json();
//                 setPredictions(data.history || []);
//             } catch (err) {
//                 setError(err instanceof Error ? err.message : 'An error occurred');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchHistory();
//     }, [user]);

//     const formatDate = (dateString: string) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     // Animation variants
//     const container = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1
//             }
//         }
//     };

//     const item = {
//         hidden: { opacity: 0, y: 20 },
//         show: { opacity: 1, y: 0 }
//     };

//     const cardHover = {
//         y: -3,
//         boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
//         transition: { duration: 0.2 }
//     };

//     return (
//         <MainLayout>
//             <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
//                 {/* Header */}
//                 <motion.div 
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="flex items-center mb-8"
//                 >
//                     <Button 
//                         variant="ghost" 
//                         size="icon" 
//                         className="mr-4 rounded-full hover:bg-gray-100"
//                         onClick={() => navigate(-1)}
//                     >
//                         <ChevronLeft className="h-5 w-5" />
//                     </Button>
//                     <div className="flex items-center">
//                         <HistoryIcon className="h-6 w-6 text-indigo-600 mr-3" />
//                         <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//                             Prediction History
//                         </h1>
//                     </div>
//                 </motion.div>

//                 {/* Content */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//                     {loading ? (
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             className="flex flex-col items-center justify-center py-16"
//                         >
//                             <Loader className="animate-spin h-10 w-10 text-indigo-600 mb-4" />
//                             <p className="text-gray-600">Loading your history...</p>
//                         </motion.div>
//                     ) : error ? (
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-lg text-center"
//                         >
//                             <AlertCircle className="h-6 w-6 mx-auto mb-3" />
//                             <p className="font-medium">{error}</p>
//                             <Button 
//                                 variant="outline" 
//                                 className="mt-4 border-red-200 text-red-600 hover:bg-red-50"
//                                 onClick={() => window.location.reload()}
//                             >
//                                 Try Again
//                             </Button>
//                         </motion.div>
//                     ) : predictions.length === 0 ? (
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             className="flex flex-col items-center justify-center py-16"
//                         >
//                             <img 
//                                 src="/empty-state.svg" 
//                                 alt="No history" 
//                                 className="h-40 w-40 mb-6 opacity-80" 
//                             />
//                             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                                 No predictions yet
//                             </h3>
//                             <p className="text-gray-500 max-w-md text-center mb-6">
//                                 Your analyzed fruits will appear here once you start using the detector.
//                             </p>
//                             <Button onClick={() => navigate('/upload')}>
//                                 Analyze Your First Fruit
//                             </Button>
//                         </motion.div>
//                     ) : (
//                         <>
//                             <div className="flex justify-between items-center mb-6">
//                                 <h2 className="text-lg font-medium text-gray-700">
//                                     {predictions.length} {predictions.length === 1 ? 'prediction' : 'predictions'}
//                                 </h2>
//                                 <p className="text-sm text-gray-500">
//                                     Sorted by most recent
//                                 </p>
//                             </div>

//                             <motion.div
//                                 variants={container}
//                                 initial="hidden"
//                                 animate="show"
//                                 className="space-y-4"
//                             >
//                                 {predictions.map((prediction) => (
//                                     <motion.div
//                                         key={prediction.id}
//                                         variants={item}
//                                         whileHover={cardHover}
//                                         className={`flex items-center p-5 rounded-xl border transition-all ${
//                                             prediction.prediction.includes('fresh') 
//                                                 ? 'border-green-100 bg-green-50/50' 
//                                                 : 'border-red-100 bg-red-50/50'
//                                         }`}
//                                     >
//                                         <div className="relative mr-6">
//                                             <img 
//                                                 src={prediction.image_url || "/placeholder.svg"} 
//                                                 alt="Fruit preview" 
//                                                 className="w-20 h-20 rounded-lg object-cover border-2 border-white shadow-sm"
//                                             />
//                                             <div className={`absolute -top-2 -right-2 rounded-full w-8 h-8 flex items-center justify-center text-white ${
//                                                 prediction.prediction.includes('fresh') 
//                                                     ? 'bg-green-500' 
//                                                     : 'bg-red-500'
//                                             }`}>
//                                                 {prediction.prediction.includes('fresh') ? (
//                                                     <CheckCircle className="h-5 w-5" />
//                                                 ) : (
//                                                     <AlertCircle className="h-5 w-5" />
//                                                 )}
//                                             </div>
//                                         </div>
//                                         <div className="flex-grow">
//                                             <div className="flex justify-between items-start">
//                                                 <div>
//                                                     <h3 className="font-semibold text-lg capitalize text-gray-800">
//                                                         {prediction.prediction.replace('_', ' ')}
//                                                     </h3>
//                                                     <p className="text-sm text-gray-500">
//                                                         {formatDate(prediction.timestamp)}
//                                                     </p>
//                                                 </div>
//                                                 <div className="text-right">
//                                                     <div className={`text-lg font-bold ${
//                                                         prediction.prediction.includes('fresh') 
//                                                             ? 'text-green-600' 
//                                                             : 'text-red-600'
//                                                     }`}>
//                                                         {(prediction.confidence * 100).toFixed(0)}%
//                                                     </div>
//                                                     <div className="text-xs text-gray-400">
//                                                         Confidence
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
//                                                 <div 
//                                                     className={`h-2 rounded-full ${
//                                                         prediction.prediction.includes('fresh') 
//                                                             ? 'bg-green-500' 
//                                                             : 'bg-red-500'
//                                                     }`}
//                                                     style={{ width: `${prediction.confidence * 100}%` }}
//                                                 ></div>
//                                             </div>
//                                         </div>
//                                     </motion.div>
//                                 ))}
//                             </motion.div>
//                         </>
//                     )}
//                 </div>

//                 {/* Footer */}
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                     className="mt-8 text-center text-sm text-gray-500 flex items-center justify-center"
//                 >
//                     <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                     </svg>
//                     Your prediction history is private and only visible to you
//                 </motion.div>
//             </div>
//         </MainLayout>
//     );
// }

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader, History as HistoryIcon, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModelPrediction {
  model: string;
  label: string;
  confidence: number;
}

interface Prediction {
  id: string;
  image_url: string;
  predictions: ModelPrediction[]; // Now contains all model predictions
  fruit_class?: string;
  status?: string;
  confidence?: number; // For backward compatibility
  prediction?: string; // For backward compatibility
  timestamp: string;
}

export default function History() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                if (!user?.email) return;
                
                const response = await fetch(`${import.meta.env.VITE_API_URL}/get_history?email=${user.email}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch history');
                }

                const data = await response.json();
                // Transform old format to new format if needed
                const transformedHistory = data.history.map((item: any) => {
                  if (item.predictions) {
                    return item; // Already in new format
                  }
                  // Transform old format to new format
                  return {
                    ...item,
                    predictions: [
                      {
                        model: 'hybrid_prediction',
                        label: item.prediction,
                        confidence: item.confidence
                      }
                    ]
                  };
                });
                setPredictions(transformedHistory || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatModelName = (name: string) => {
        return name.replace('_prediction', '')
            .replace('swin', 'Swin')
            .replace('vit', 'ViT')
            .replace('hybrid', 'Hybrid');
    };

    const getPredictionStatus = (prediction: Prediction) => {
        if (prediction.status === 'invalid') return 'invalid';
        const primaryPrediction = prediction.predictions?.find(p => p.model === 'hybrid_prediction') || 
                                prediction.predictions?.[0];
        if (!primaryPrediction) return 'unknown';
        if (primaryPrediction.label.includes('fresh')) return 'fresh';
        if (primaryPrediction.label.includes('stale')) return 'stale';
        return 'unknown';
    };

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const cardHover = {
        y: -3,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 }
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center mb-8"
                >
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="mr-4 rounded-full hover:bg-gray-100"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center">
                        <HistoryIcon className="h-6 w-6 text-indigo-600 mr-3" />
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Prediction History
                        </h1>
                    </div>
                </motion.div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    {loading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-16"
                        >
                            <Loader className="animate-spin h-10 w-10 text-indigo-600 mb-4" />
                            <p className="text-gray-600">Loading your history...</p>
                        </motion.div>
                    ) : error ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-lg text-center"
                        >
                            <AlertCircle className="h-6 w-6 mx-auto mb-3" />
                            <p className="font-medium">{error}</p>
                            <Button 
                                variant="outline" 
                                className="mt-4 border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() => window.location.reload()}
                            >
                                Try Again
                            </Button>
                        </motion.div>
                    ) : predictions.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-16"
                        >
                            <img 
                                src="/empty-state.svg" 
                                alt="No history" 
                                className="h-40 w-40 mb-6 opacity-80" 
                            />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No predictions yet
                            </h3>
                            <p className="text-gray-500 max-w-md text-center mb-6">
                                Your analyzed fruits will appear here once you start using the detector.
                            </p>
                            <Button onClick={() => navigate('/upload')}>
                                Analyze Your First Fruit
                            </Button>
                        </motion.div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-medium text-gray-700">
                                    {predictions.length} {predictions.length === 1 ? 'prediction' : 'predictions'}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Sorted by most recent
                                </p>
                            </div>

                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate="show"
                                className="space-y-4"
                            >
                                {predictions.map((prediction) => {
                                    const status = getPredictionStatus(prediction);
                                    const primaryPrediction = prediction.predictions?.find(p => p.model === 'hybrid_prediction') || 
                                                           prediction.predictions?.[0];
                                    
                                    return (
                                        <motion.div
                                            key={prediction.id}
                                            variants={item}
                                            whileHover={cardHover}
                                            className={`flex flex-col p-5 rounded-xl border transition-all ${
                                                status === 'fresh' 
                                                    ? 'border-green-100 bg-green-50/50' 
                                                    : status === 'stale'
                                                    ? 'border-red-100 bg-red-50/50'
                                                    : 'border-gray-200 bg-gray-50/50'
                                            }`}
                                        >
                                            <div className="flex items-start mb-4">
                                                <div className="relative mr-6">
                                                    <img 
                                                        src={prediction.image_url || "/placeholder.svg"} 
                                                        alt="Fruit preview" 
                                                        className="w-20 h-20 rounded-lg object-cover border-2 border-white shadow-sm"
                                                    />
                                                    <div className={`absolute -top-2 -right-2 rounded-full w-8 h-8 flex items-center justify-center text-white ${
                                                        status === 'fresh' 
                                                            ? 'bg-green-500' 
                                                            : status === 'stale'
                                                            ? 'bg-red-500'
                                                            : 'bg-gray-500'
                                                    }`}>
                                                        {status === 'fresh' ? (
                                                            <CheckCircle className="h-5 w-5" />
                                                        ) : status === 'stale' ? (
                                                            <AlertCircle className="h-5 w-5" />
                                                        ) : (
                                                            <XCircle className="h-5 w-5" />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-semibold text-lg capitalize text-gray-800">
                                                                {status === 'invalid' ? 'Invalid Image' : 
                                                                 prediction.fruit_class ? 
                                                                 prediction.fruit_class.charAt(0).toUpperCase() + prediction.fruit_class.slice(1) : 
                                                                 primaryPrediction?.label.split('_')[1]?.charAt(0).toUpperCase() + 
                                                                 primaryPrediction?.label.split('_')[1]?.slice(1)}
                                                            </h3>
                                                            <p className="text-sm text-gray-500">
                                                                {formatDate(prediction.timestamp)}
                                                            </p>
                                                        </div>
                                                        {status !== 'invalid' && primaryPrediction && (
                                                            <div className="text-right">
                                                                <div className={`text-lg font-bold ${
                                                                    status === 'fresh' 
                                                                        ? 'text-green-600' 
                                                                        : 'text-red-600'
                                                                }`}>
                                                                    {(primaryPrediction.confidence * 100).toFixed(0)}%
                                                                </div>
                                                                <div className="text-xs text-gray-400">
                                                                    Confidence
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {status !== 'invalid' && primaryPrediction && (
                                                        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                                                            <div 
                                                                className={`h-2 rounded-full ${
                                                                    status === 'fresh' 
                                                                        ? 'bg-green-500' 
                                                                        : 'bg-red-500'
                                                                }`}
                                                                style={{ width: `${primaryPrediction.confidence * 100}%` }}
                                                            ></div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Model predictions */}
                                            {status !== 'invalid' && prediction.predictions && (
                                                <div className="border-t border-gray-100 pt-4 mt-4">
                                                    <h4 className="text-sm font-medium text-gray-500 mb-3">
                                                        Model Predictions
                                                    </h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                        {prediction.predictions.map((modelPred) => (
                                                            <div 
                                                                key={modelPred.model} 
                                                                className="bg-white p-3 rounded-lg border border-gray-100 shadow-xs"
                                                            >
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <span className="text-sm font-medium text-gray-700">
                                                                        {formatModelName(modelPred.model)}
                                                                    </span>
                                                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                                                        modelPred.label.includes('fresh')
                                                                            ? 'bg-green-100 text-green-800'
                                                                            : modelPred.label.includes('stale')
                                                                            ? 'bg-red-100 text-red-800'
                                                                            : 'bg-gray-100 text-gray-800'
                                                                    }`}>
                                                                        {modelPred.label.split('_')[0].charAt(0).toUpperCase() + 
                                                                         modelPred.label.split('_')[0].slice(1)}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                                                                        <div 
                                                                            className={`h-2 rounded-full ${
                                                                                modelPred.label.includes('fresh')
                                                                                    ? 'bg-green-400'
                                                                                    : modelPred.label.includes('stale')
                                                                                    ? 'bg-red-400'
                                                                                    : 'bg-gray-400'
                                                                            }`}
                                                                            style={{ width: `${modelPred.confidence * 100}%` }}
                                                                        ></div>
                                                                    </div>
                                                                    <span className="text-xs font-medium text-gray-600">
                                                                        {(modelPred.confidence * 100).toFixed(0)}%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Invalid image message */}
                                            {status === 'invalid' && (
                                                <div className="border-t border-gray-200 pt-4 mt-4">
                                                    <div className="bg-gray-100 p-3 rounded-lg">
                                                        <p className="text-sm text-gray-700">
                                                            This image was not recognized as a valid fruit/vegetable.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center text-sm text-gray-500 flex items-center justify-center"
                >
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Your prediction history is private and only visible to you
                </motion.div>
            </div>
        </MainLayout>
    );
}