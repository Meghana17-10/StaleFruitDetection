
export default function UploadTips() {
  const tips = [
    {
      title: "Clear Image",
      description: "Make sure your fruit is clearly visible and well-lit",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12.5l10-10 10 10-10 10-10-10Z" />
          <path d="M12 7.5v9" />
          <path d="m8 11.5 4-4 4 4" />
        </svg>
      ),
    },
    {
      title: "Close-up View",
      description: "Focus on the fruit, avoid cluttered backgrounds",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M8 11h6" />
          <path d="M11 8v6" />
        </svg>
      ),
    },
    {
      title: "Multiple Angles",
      description: "For better results, upload images from different sides",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
          <path d="m12 16 4-4-4-4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-12 animate-fade-in-slow">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Tips for Best Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-sm card-hover"
          >
            <div className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-lg text-purple-600 mb-4">
              {tip.icon}
            </div>
            <h3 className="text-lg font-medium text-gray-900">{tip.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
