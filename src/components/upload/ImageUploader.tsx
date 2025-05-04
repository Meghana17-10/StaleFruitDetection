
import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeFruitImage } from '@/lib/mock-api';
import { toast } from '@/components/ui/sonner';

export default function ImageUploader() {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      await handleFiles(e.target.files);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFiles = async (files: FileList) => {
    const file = files[0];
    
    // Validate file type
    if (!file.type.match('image.*')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    
    // Simulate API call
    try {
      setLoading(true);
      const result = await analyzeFruitImage(file);
      
      // Redirect to results page after delay to show loading state
      setTimeout(() => {
        navigate('/results', { 
          state: { 
            result,
            imageUrl: URL.createObjectURL(file)
          }
        });
      }, 500);
    } catch (error) {
      toast.error('Error analyzing image. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div 
        className={`w-full h-80 border-2 border-dashed rounded-xl flex flex-col justify-center items-center p-4 transition-colors
          ${dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {loading ? (
          <div className="text-center animate-fade-in">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-gray-600 mb-2">Analyzing your fruit...</p>
            <div className="loading-dots text-purple-600">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : imagePreview ? (
          <div className="w-full h-full flex flex-col items-center">
            <img 
              src={imagePreview} 
              alt="Upload preview" 
              className="max-h-full max-w-full object-contain rounded-lg" 
            />
          </div>
        ) : (
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-4 text-lg text-gray-700">Drag & drop an image or click to browse</p>
            <p className="mt-2 text-sm text-gray-500">JPG, PNG, or GIF up to 10MB</p>
            
            <button
              type="button"
              onClick={handleButtonClick}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              Select Fruit Image
            </button>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        id="file-upload"
        name="file-upload"
        accept="image/*"
        onChange={handleChange}
        className="sr-only"
      />
    </div>
  );
}
