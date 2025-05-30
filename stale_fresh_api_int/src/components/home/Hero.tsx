import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  const navigate = useNavigate();
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const pulse = {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto py-12 md:py-20">
        <motion.div 
          className="text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="mb-2">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full">
              AI-Powered Freshness Detection
            </span>
          </motion.div>
          
          <motion.h1 
            variants={item}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            <span className="block">Advanced</span>
            <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Fruit Freshness Analyzer
            </span>
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Leveraging cutting-edge computer vision to ensure optimal freshness and reduce food waste with precision accuracy.
          </motion.p>
          
          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              animate={pulse}
              onClick={() => navigate('/upload')}
              className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10">Analyze Fruit Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/model-info')}
              className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-lg border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300"
            >
              Technology Overview
            </motion.button>
          </motion.div>
          
          <motion.div 
            variants={item}
            className="mt-16 flex justify-center"
          >
            <div className="flex items-center text-gray-500 text-sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Real-time analysis • 98% accuracy • Enterprise-ready
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}