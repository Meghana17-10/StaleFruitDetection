// import MainLayout from '@/components/layout/MainLayout';
// import { useState } from 'react';

// const Upload = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setImage(file);
//     setImagePreview(URL.createObjectURL(file)); // Generate a preview URL for the image
//     setResult(null);
//     setError(false);

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       setLoading(true);
//       const response = await fetch('http://127.0.0.1:8000/predict', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`API error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       if (!data || !data.label || !data.confidence) {
//         throw new Error('Invalid response from API');
//       }

//       setResult(data);
//     } catch (err) {
//       console.error('Error fetching prediction:', err);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="max-w-4xl mx-auto text-center animate-fade-in">
//         <h1 className="text-3xl font-bold mb-4">Upload Fruit Image</h1>
//         <p className="text-gray-600 mb-8">
//           Upload an image of your fruit to check if it's fresh or stale
//         </p>
//       </div>

//       <div className="text-center">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="mb-4 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
//         />
//         {imagePreview && (
//           <div className="mt-4">
//             <p className="text-lg font-semibold mb-2">Uploaded Image:</p>
//             <img
//               src={imagePreview}
//               alt="Uploaded Preview"
//               className="mx-auto w-64 h-64 object-cover rounded-lg shadow-md"
//             />
//           </div>
//         )}
//         {loading && <p className="mt-4 text-blue-500 font-semibold">Analyzing...</p>}
//         {error && <p className="mt-4 text-red-500 font-semibold">Prediction failed. Please try again.</p>}
//         {result && (
//           <div className="mt-6 bg-green-100 p-4 rounded-lg shadow-md">
//             <p className="text-lg font-bold text-green-700">Prediction Result:</p>
//             <p className="text-gray-800">Label: {result.label}</p>
//             <p className="text-gray-800">Confidence: {(result.confidence * 100).toFixed(2)}%</p>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default Upload;



//NEW CODE
// import MainLayout from '@/components/layout/MainLayout';
// import { useState, useRef } from 'react';
// import { Upload as UploadIcon, CheckCircle, AlertCircle, Loader } from 'lucide-react';

// const Upload = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     processUploadedFile(file);
//   };

//   const processUploadedFile = async (file: File) => {
//     setImage(file);
//     setImagePreview(URL.createObjectURL(file)); // Generate a preview URL for the image
//     setResult(null);
//     setError(false);

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       setLoading(true);
//       const response = await fetch('http://127.0.0.1:8000/predict', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`API error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       if (!data || !data.label || !data.confidence) {
//         throw new Error('Invalid response from API');
//       }

//       setResult(data);
//     } catch (err) {
//       console.error('Error fetching prediction:', err);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const file = e.dataTransfer.files[0];
//       if (file.type.startsWith("image/")) {
//         processUploadedFile(file);
//       }
//     }
//   };

//   const triggerFileInput = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {/* Animated Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold mb-4 text-indigo-700 animate-fade-in relative">
//             <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 animate-bounce inline-block text-green-500">
//               🍎
//             </span>
//             Upload Fruit Image
//           </h1>
//           <p className="text-gray-600 mb-2 max-w-2xl mx-auto">
//             Upload an image of your fruit to check if it's fresh or stale
//           </p>
//           <div className="w-32 h-1 bg-indigo-500 mx-auto my-6 rounded-full"></div>
//         </div>

//         {/* Main Content */}
//         <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
//           {/* Upload Section */}
//           <div className="w-full md:w-1/2">
//             <div
//               className={`border-4 border-dashed rounded-xl p-8 transition-all duration-300 ${
//                 isDragging 
//                   ? "border-indigo-500 bg-indigo-50" 
//                   : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
//               }`}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               onDrop={handleDrop}
//               onClick={triggerFileInput}
//             >
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//               <div className="flex flex-col items-center justify-center py-6 cursor-pointer">
//                 <UploadIcon size={48} className="text-indigo-500 mb-4" />
//                 <h3 className="text-xl font-semibold mb-2 text-indigo-700">
//                   Drop your fruit image here
//                 </h3>
//                 <p className="text-gray-500 mb-6 text-center">
//                   or click to browse files
//                 </p>
//                 <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-lg hover:bg-indigo-700 transition-colors duration-300">
//                   Select Image
//                 </button>
//               </div>
//             </div>

//             {/* Status Messages */}
//             <div className="mt-6">
//               {loading && (
//                 <div className="flex items-center justify-center space-x-2 text-blue-500">
//                   <Loader className="animate-spin" size={20} />
//                   <p className="font-semibold">Analyzing your fruit...</p>
//                 </div>
//               )}
              
//               {error && (
//                 <div className="flex items-center justify-center space-x-2 text-red-500 bg-red-50 p-4 rounded-lg">
//                   <AlertCircle size={20} />
//                   <p className="font-semibold">Prediction failed. Please try again.</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Result Section */}
//           <div className="w-full md:w-1/2">
//             {imagePreview ? (
//               <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-500 hover:shadow-xl">
//                 <h3 className="text-lg font-semibold mb-4 text-indigo-700 border-b pb-2">
//                   Uploaded Image
//                 </h3>
                
//                 <div className="relative overflow-hidden rounded-lg">
//                   <img
//                     src={imagePreview}
//                     alt="Uploaded Preview"
//                     className="w-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
//                   />
                  
//                   {result && (
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900/80 to-transparent p-4 text-white">
//                       <div className="flex items-center space-x-2">
//                         <CheckCircle size={20} className="text-green-300" />
//                         <p className="font-bold">{result.label}</p>
//                       </div>
//                       <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
//                         <div 
//                           className="bg-green-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
//                           style={{ width: `${result.confidence * 100}%` }}
//                         ></div>
//                       </div>
//                       <p className="text-sm mt-1 text-indigo-100">Confidence: {(result.confidence * 100).toFixed(2)}%</p>
//                     </div>
//                   )}
//                 </div>
                
//                 {result && (
//                   <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100 transform transition-all">
//                     <div className="flex items-center space-x-2 mb-2">
//                       <CheckCircle size={20} className="text-green-500" />
//                       <h4 className="font-bold text-green-800">Prediction Result</h4>
//                     </div>
//                     <p className="text-gray-700 mb-1">
//                       <span className="font-medium">Label:</span> {result.label}
//                     </p>
//                     <p className="text-gray-700">
//                       <span className="font-medium">Confidence:</span> {(result.confidence * 100).toFixed(2)}%
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 h-full flex items-center justify-center">
//                 <div className="text-center text-gray-500">
//                   <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <UploadIcon size={48} className="text-gray-400" />
//                   </div>
//                   <p className="text-lg">Upload an image to see the preview and analysis here</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="mt-16">
//           <h2 className="text-2xl font-bold text-center mb-8 text-indigo-700">How It Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               {
//                 title: "Upload Your Image",
//                 description: "Take a photo of any fruit and upload it to our system",
//                 emoji: "📸"
//               },
//               {
//                 title: "AI Analysis",
//                 description: "Our advanced AI model analyzes the freshness of your fruit",
//                 emoji: "🧠"
//               },
//               {
//                 title: "Get Results",
//                 description: "Receive instant feedback on whether your fruit is fresh or stale",
//                 emoji: "✅"
//               }
//             ].map((feature, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 border border-gray-100"
//               >
//                 <div className="text-4xl mb-4">{feature.emoji}</div>
//                 <h3 className="text-lg font-semibold mb-2 text-indigo-700">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default Upload;


import MainLayout from '@/components/layout/MainLayout';
import { useState, useRef } from 'react';
import { Upload as UploadIcon, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const Upload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    processUploadedFile(file);
  };

  const processUploadedFile = async (file: File) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Generate a preview URL for the image
    setResult(null);
    setError(false);

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (!data || !data.label || !data.confidence) {
        throw new Error('Invalid response from API');
      }

      // Scroll to results section
      setTimeout(() => {
        window.scrollTo({
          top: document.querySelector('.mt-12')?.getBoundingClientRect().top! + window.scrollY - 100,
          behavior: 'smooth'
        });
      }, 100);

      setResult(data);
    } catch (err) {
      console.error('Error fetching prediction:', err);
      setError(true);
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        processUploadedFile(file);
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Animated Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-indigo-700 animate-fade-in relative">
            <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 animate-bounce inline-block text-green-500">
              🍎
            </span>
            Upload Fruit Image
          </h1>
          <p className="text-gray-600 mb-2 max-w-2xl mx-auto">
            Upload an image of your fruit to check if it's fresh or stale
          </p>
          <div className="w-32 h-1 bg-indigo-500 mx-auto my-6 rounded-full"></div>
        </div>

        {/* Upload Section */}
        <div className="w-full max-w-lg mx-auto">
          <div
            className={`border-4 border-dashed rounded-xl p-8 transition-all duration-300 ${
              isDragging 
                ? "border-indigo-500 bg-indigo-50" 
                : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center py-6 cursor-pointer">
              <UploadIcon size={48} className="text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">
                Drop your fruit image here
              </h3>
              <p className="text-gray-500 mb-6 text-center">
                or click to browse files
              </p>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-lg hover:bg-indigo-700 transition-colors duration-300">
                Select Image
              </button>
            </div>
          </div>

          {/* Status Messages */}
          <div className="mt-6">
            {loading && (
              <div className="flex items-center justify-center space-x-2 text-blue-500">
                <Loader className="animate-spin" size={20} />
                <p className="font-semibold">Analyzing your fruit...</p>
              </div>
            )}
            
            {error && (
              <div className="flex items-center justify-center space-x-2 text-red-500 bg-red-50 p-4 rounded-lg">
                <AlertCircle size={20} />
                <p className="font-semibold">Prediction failed. Please try again.</p>
              </div>
            )}
          </div>
        </div>

        {/* Result Section */}
        {imagePreview && (
          <div className="mt-12 max-w-3xl mx-auto">
            <div className={`bg-white p-6 rounded-xl shadow-lg border transition-all duration-500 hover:shadow-xl ${
              result && result.label.includes('fresh') ? 'border-green-200' : 
              result && result.label.includes('stale') ? 'border-red-200' : 'border-gray-100'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 border-b pb-2 ${
                result && result.label.includes('fresh') ? 'text-green-700' : 
                result && result.label.includes('stale') ? 'text-red-700' : 'text-indigo-700'
              }`}>
                Analysis Result
              </h3>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={imagePreview}
                      alt="Uploaded Preview"
                      className="w-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                    />
                    
                    {result && (
                      <div className={`absolute bottom-0 left-0 right-0 p-4 text-white ${
                        result.label.includes('fresh') ? 'bg-gradient-to-t from-green-900/80 to-transparent' : 
                        'bg-gradient-to-t from-red-900/80 to-transparent'
                      }`}>
                        <div className="flex items-center space-x-2">
                          {result.label.includes('fresh') ? (
                            <CheckCircle size={20} className="text-green-300" />
                          ) : (
                            <AlertCircle size={20} className="text-red-300" />
                          )}
                          <p className="font-bold">{result.label.replace('_', ' ')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  {result && (
                    <div className={`h-full flex flex-col ${
                      result.label.includes('fresh') ? 'bg-green-50 border-green-100' : 
                      'bg-red-50 border-red-100'
                    } p-4 rounded-lg border`}>
                      <div className="flex items-center space-x-2 mb-4">
                        {result.label.includes('fresh') ? (
                          <CheckCircle size={24} className="text-green-500" />
                        ) : (
                          <AlertCircle size={24} className="text-red-500" />
                        )}
                        <h4 className={`font-bold text-xl ${
                          result.label.includes('fresh') ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {result.label.includes('fresh') ? 'Fresh Fruit Detected' : 'Stale Fruit Detected'}
                        </h4>
                      </div>
                      
                      <div className="space-y-4 flex-grow">
                        <div>
                          <p className="text-gray-700 font-medium mb-1">Fruit Type:</p>
                          <p className="text-gray-900 text-lg">{result.label.split('_')[1].charAt(0).toUpperCase() + result.label.split('_')[1].slice(1)}</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-700 font-medium mb-1">Confidence:</p>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`${
                                result.label.includes('fresh') ? 'bg-green-600' : 'bg-red-600'
                              } h-2.5 rounded-full transition-all duration-1000 ease-out`} 
                              style={{ width: `${result.confidence * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-right text-sm mt-1 text-gray-600">
                            {(result.confidence * 100).toFixed(2)}%
                          </p>
                        </div>
                        
                        <div className={`mt-4 p-3 rounded-lg ${
                          result.label.includes('fresh') ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          <p className="font-medium">
                            {result.label.includes('fresh') 
                              ? 'This fruit appears to be fresh and safe to consume.'
                              : 'This fruit appears to be stale and should not be consumed.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!result && (
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-full flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Loader size={32} className="text-gray-400 animate-spin mx-auto mb-4" />
                        <p>Processing your image...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-indigo-700">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Upload Your Image",
                description: "Take a photo of any fruit and upload it to our system",
                emoji: "📸"
              },
              {
                title: "AI Analysis",
                description: "Our advanced AI model analyzes the freshness of your fruit",
                emoji: "🧠"
              },
              {
                title: "Get Results",
                description: "Receive instant feedback on whether your fruit is fresh or stale",
                emoji: "✅"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.emoji}</div>
                <h3 className="text-lg font-semibold mb-2 text-indigo-700">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Upload;