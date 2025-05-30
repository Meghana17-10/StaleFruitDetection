import MainLayout from '@/components/layout/MainLayout';
import { useState, useRef } from 'react';
import { Upload as UploadIcon, CheckCircle, AlertCircle, Loader, Sparkles, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModelResult {
  model: string;
  label: string;
  confidence: number;
}

interface ApiResponse {
  swin_prediction?: {  // Note: This matches your API's response structure
    label: string;
    confidence: number;
  };
  vit_prediction?: {
    label: string;
    confidence: number;
  };
  hybrid_prediction?: {
    label: string;
    confidence: number;
  };
  fruit_class?: string;
  status?: string;
  message?: string;
  detail?: string;
}

const Upload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [results, setResults] = useState<ModelResult[] | null>(null);
  const [fruitClass, setFruitClass] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInvalidImage, setIsInvalidImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    processUploadedFile(file);
  };

  const processUploadedFile = async (file: File) => {
    setImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setResults(null);
    setFruitClass(null);
    setError(null);
    setIsInvalidImage(false);

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || 'Failed to analyze image');
      }

      // Check for invalid image flag in response
      if (data.status === "invalid") {
        setIsInvalidImage(true);
        setResults(null);
        return;
      }

      // Transform the API response into the expected format
      const transformedResults: ModelResult[] = [];
      
      if (data.swin_prediction) {
        transformedResults.push({
          model: "swin_prediction",
          label: data.swin_prediction.label,
          confidence: data.swin_prediction.confidence
        });
      }

      if (data.vit_prediction) {
        transformedResults.push({
          model: "vit_prediction",
          label: data.vit_prediction.label,
          confidence: data.vit_prediction.confidence
        });
      }

      if (data.hybrid_prediction) {
        transformedResults.push({
          model: "hybrid_prediction",
          label: data.hybrid_prediction.label,
          confidence: data.hybrid_prediction.confidence
        });
      }

      if (transformedResults.length === 0) {
        throw new Error('No prediction results returned from server');
      }

      setResults(transformedResults);
      setFruitClass(data.fruit_class || null);

      // Save primary result to history if user is logged in
      const primaryResult = transformedResults.find(r => r.model === "hybrid_prediction") || transformedResults[0];
      const user = JSON.parse(localStorage.getItem('sf_user') || '{}');
      
      if (user.email) {
        const historyData = {
          user_email: user.email,
          image_url: previewUrl,
          prediction: primaryResult.label,
          confidence: primaryResult.confidence,
          timestamp: new Date().toISOString()
        };

        await fetch(`${import.meta.env.VITE_API_URL}/save_prediction`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token || ''}`,
          },
          body: JSON.stringify(historyData)
        });
      }

    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]?.type.startsWith("image/")) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getPrimaryResult = () => {
    if (!results) return null;
    return results.find(r => r.model === "hybrid_prediction") || results[0];
  };

  const formatModelName = (name: string) => {
    return name.replace('_prediction', '')
      .replace('swin', 'Swin Transformer')
      .replace('vit', 'Vision Transformer')
      .replace('hybrid', 'Hybrid Model');
  };

  const formatLabel = (label: string) => {
    return label.replace('_', ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getThemeClasses = () => {
    if (isInvalidImage) {
      return {
        border: 'border-gray-200',
        text: 'text-gray-700',
        bg: 'bg-gray-50',
        icon: <XCircle size={28} className="text-gray-500" />,
        title: 'Invalid Image',
        message: 'The uploaded image could not be processed. Please try with a different image.',
        highlight: 'text-gray-800',
        highlightBg: 'bg-gray-100'
      };
    }

    const primaryResult = getPrimaryResult();
    if (primaryResult?.label.includes('fresh')) {
      return {
        border: 'border-green-200',
        text: 'text-green-700',
        bg: 'bg-green-50',
        icon: <CheckCircle size={28} className="text-green-500" />,
        title: 'Fresh Fruit Detected',
        message: 'Our analysis indicates this fruit is fresh and safe to consume.',
        highlight: 'text-green-800',
        highlightBg: 'bg-green-100'
      };
    } else if (primaryResult?.label.includes('stale')) {
      return {
        border: 'border-red-200',
        text: 'text-red-700',
        bg: 'bg-red-50',
        icon: <AlertCircle size={28} className="text-red-500" />,
        title: 'Stale Fruit Detected',
        message: 'Our analysis suggests this fruit may be stale and should be discarded.',
        highlight: 'text-red-800',
        highlightBg: 'bg-red-100'
      };
    }

    // Default case
    return {
      border: 'border-gray-200',
      text: 'text-gray-700',
      bg: 'bg-gray-50',
      icon: <XCircle size={28} className="text-gray-500" />,
      title: 'Analysis Result',
      message: 'The image has been processed.',
      highlight: 'text-gray-800',
      highlightBg: 'bg-gray-100'
    };
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const pulse = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const cardHover = {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  };

  const theme = getThemeClasses();
  const primaryResult = getPrimaryResult();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Freshness Detection
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upload Your <span className="text-indigo-600">Fruit Image</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant analysis of your fruit's freshness with our advanced computer vision technology
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div 
          className="w-full max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className={`border-2 border-dashed rounded-2xl p-8 transition-all duration-300 relative overflow-hidden ${
              isDragging 
                ? "border-indigo-500 bg-indigo-50" 
                : "border-gray-200 hover:border-indigo-400 hover:bg-gray-50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            whileHover={cardHover}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center py-6 cursor-pointer">
              <motion.div animate={pulse}>
                <UploadIcon size={56} className="text-indigo-500 mb-6" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Drag & drop your fruit image
              </h3>
              <p className="text-gray-500 mb-6 text-center max-w-md">
                Supported formats: JPG, PNG, WEBP. Max size: 5MB
              </p>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Select Image
              </motion.button>
            </div>
          </motion.div>

          {/* Status Messages */}
          <AnimatePresence>
            {loading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 flex items-center justify-center space-x-3 bg-blue-50 p-4 rounded-xl"
              >
                <Loader className="animate-spin text-blue-500" size={20} />
                <p className="font-medium text-blue-700">Analyzing your fruit...</p>
              </motion.div>
            )}
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 flex items-center justify-center space-x-3 bg-red-50 p-4 rounded-xl"
              >
                <AlertCircle className="text-red-500" size={20} />
                <p className="font-medium text-red-700">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {(imagePreview || isInvalidImage) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-16 max-w-5xl mx-auto"
            >
              <div className={`bg-white p-8 rounded-2xl shadow-lg border transition-all duration-500 overflow-hidden relative ${theme.border}`}>
                {/* Decorative elements */}
                {!isInvalidImage && primaryResult && (
                  <div className={`absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10 ${
                    primaryResult.label.includes('fresh') ? 'bg-green-400' : 
                    primaryResult.label.includes('stale') ? 'bg-red-400' : 'bg-gray-400'
                  }`}></div>
                )}

                <h3 className={`text-xl font-semibold mb-6 pb-3 border-b ${theme.text} ${
                  isInvalidImage ? 'border-gray-200' : 
                  primaryResult?.label.includes('fresh') ? 'border-green-100' : 
                  primaryResult?.label.includes('stale') ? 'border-red-100' : 'border-gray-200'
                }`}>
                  Analysis Results
                </h3>
                
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Image Preview */}
                  <motion.div 
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-md aspect-square">
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Uploaded Preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                      
                      {(primaryResult || isInvalidImage) && (
                        <div className={`absolute bottom-0 left-0 right-0 p-4 text-white ${
                          isInvalidImage ? 'bg-gradient-to-t from-gray-900/80 to-transparent' :
                          primaryResult?.label.includes('fresh') ? 
                          'bg-gradient-to-t from-green-900/80 to-transparent' : 
                          'bg-gradient-to-t from-red-900/80 to-transparent'
                        }`}>
                          <div className="flex items-center space-x-2">
                            {isInvalidImage ? (
                              <XCircle size={20} className="text-gray-300" />
                            ) : primaryResult?.label.includes('fresh') ? (
                              <CheckCircle size={20} className="text-green-300" />
                            ) : (
                              <AlertCircle size={20} className="text-red-300" />
                            )}
                            <p className="font-bold">
                              {isInvalidImage ? 'Invalid Image' : formatLabel(primaryResult?.label || '')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                  
                  {/* Results Panel */}
                  <div className="w-full lg:w-1/2">
                    <AnimatePresence mode="wait">
                      {isInvalidImage ? (
                        <motion.div
                          key="invalid"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                          className="h-full flex flex-col"
                        >
                          {/* Invalid Image Card */}
                          <div className="p-6 rounded-xl border border-gray-200 bg-gray-50 mb-6">
                            <div className="flex items-center space-x-3 mb-4">
                              <XCircle size={28} className="text-gray-500" />
                              <h4 className="font-bold text-2xl text-gray-800">
                                Invalid Image
                              </h4>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="p-4 rounded-lg bg-gray-100 text-gray-800">
                                <p className="font-medium">
                                  The uploaded image could not be processed. Please try with a different image.
                                </p>
                              </div>

                              <div>
                                <p className="text-gray-700 font-medium mb-2">Possible issues:</p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                  <li>Image is not a fruit/vegetable</li>
                                  <li>Image is too blurry</li>
                                  <li>Unsupported file format</li>
                                  <li>Image is corrupted</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl border border-gray-200 p-6 flex-grow">
                            <h4 className="font-semibold text-lg text-gray-800 mb-4">Try Again</h4>
                            <p className="text-gray-600 mb-4">
                              Upload a clear, well-lit photo of a single fruit or vegetable.
                            </p>
                            <motion.button 
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={triggerFileInput}
                              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium"
                            >
                              Upload New Image
                            </motion.button>
                          </div>
                        </motion.div>
                      ) : results ? (
                        <motion.div
                          key="result"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                          className="h-full flex flex-col"
                        >
                          {/* Primary Result Card */}
                          <div className={`p-6 rounded-xl border mb-6 ${theme.bg} ${theme.border}`}>
                            <div className="flex items-center space-x-3 mb-4">
                              {theme.icon}
                              <h4 className={`font-bold text-2xl ${theme.highlight}`}>
                                {theme.title}
                              </h4>
                            </div>
                            
                            <div className="space-y-4">
                              {primaryResult && (
                                <>
                                  <div>
                                    <p className="text-gray-700 font-medium mb-2">Fruit Type:</p>
                                    <p className="text-gray-900 text-lg font-semibold">
                                      {fruitClass ? 
                                        fruitClass.charAt(0).toUpperCase() + fruitClass.slice(1) : 
                                        primaryResult.label.split('_')[1].charAt(0).toUpperCase() + 
                                        primaryResult.label.split('_')[1].slice(1)}
                                    </p>
                                  </div>
                                  
                                  <div>
                                    <div className="flex justify-between mb-2">
                                      <p className="text-gray-700 font-medium">Confidence:</p>
                                      <p className="font-semibold text-indigo-600">
                                        {(primaryResult.confidence * 100).toFixed(1)}%
                                      </p>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                      <div 
                                        className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                                          primaryResult.label.includes('fresh') ? 'bg-green-500' : 
                                          primaryResult.label.includes('stale') ? 'bg-red-500' : 'bg-gray-500'
                                        }`} 
                                        style={{ width: `${primaryResult.confidence * 100}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </>
                              )}

                              {/* Summary Message Box */}
                              <div className={`p-4 rounded-lg ${theme.highlightBg} ${theme.text}`}>
                                <p className="font-medium">
                                  {theme.message}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Model Comparison */}
                          {results && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6 flex-grow">
                              <h4 className="font-semibold text-lg text-gray-800 mb-4">Model Comparison</h4>
                              <div className="space-y-4">
                                {results.map((result) => (
                                  <div key={result.model} className="border-b border-gray-100 pb-4 last:border-0">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium text-gray-800">
                                          {formatModelName(result.model)}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                          {formatLabel(result.label)}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          result.label.includes('fresh') ? 
                                          'bg-green-100 text-green-800' : 
                                          result.label.includes('stale') ? 
                                          'bg-red-100 text-red-800' : 
                                          'bg-gray-100 text-gray-800'
                                        }`}>
                                          {(result.confidence * 100).toFixed(1)}%
                                        </span>
                                      </div>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                                      <div 
                                        className={`h-2 rounded-full ${
                                          result.label.includes('fresh') ? 'bg-green-400' : 
                                          result.label.includes('stale') ? 'bg-red-400' : 'bg-gray-400'
                                        }`}
                                        style={{ width: `${result.confidence * 100}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-gray-50 p-8 rounded-xl border border-gray-200 h-full flex items-center justify-center"
                        >
                          <div className="text-center">
                            <Loader size={40} className="text-gray-400 animate-spin mx-auto mb-4" />
                            <p className="text-gray-600 font-medium">Processing your image...</p>
                            <p className="text-gray-500 text-sm mt-2">This usually takes a few seconds</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Section */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Technology Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced computer vision trained on thousands of fruit images
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Upload Image",
                description: "Simply take or upload a clear photo of your fruit",
                icon: "📷",
                color: "text-blue-500"
              },
              {
                title: "AI Processing",
                description: "Our Vision Transformer model analyzes visual features",
                icon: "🤖",
                color: "text-purple-500"
              },
              {
                title: "Instant Results",
                description: "Get accurate freshness assessment with confidence scores",
                icon: "⚡",
                color: "text-green-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all border border-gray-100"
                whileHover={cardHover}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`text-5xl mb-6 ${feature.color}`}>{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Upload;