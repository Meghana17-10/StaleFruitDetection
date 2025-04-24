
import MainLayout from '@/components/layout/MainLayout';
import ImageUploader from '@/components/upload/ImageUploader';
import UploadTips from '@/components/upload/UploadTips';

const Upload = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Upload Fruit Image</h1>
        <p className="text-gray-600 mb-8">
          Upload an image of your fruit to check if it's fresh or stale
        </p>
      </div>
      
      <ImageUploader />
      <UploadTips />
    </MainLayout>
  );
};

export default Upload;
