
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gradient-bg p-4">
      <div className="text-center">
        <div className="inline-block p-4 bg-white rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 6.5c1.4-1 2.5-.4 3.4.6.9 1 1.5 2.5.5 3.9-.9 1.4-5.2 6.2-9.7 9.8-4.8 4-8.3 1.8-10.6-.4C-.6 18.2.1 15.3 2 13l3.5-4.4c1.9-2.1 5.7-5 9.8-2.6 1 .6 1.1 1.2 1.5 1.8" />
            <path d="M15 6.5 16 7" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn't find the page you're looking for. Let's get you back on track.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
