import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModelExplainer() {
  const [isVisible, setIsVisible] = useState(false);
  const data = [
    { name: "Accuracy", value: 93 },
    { name: "Error", value: 7 }
  ];
  
  const COLORS = ["#7c3aed", "#e4e4e7"];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl font-bold mb-4 text-gray-900">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  Swin Transformer Model
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Advanced computer vision for precise fruit freshness detection
              </p>
            </motion.div>
          )}
        </AnimatePresence>

         <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
              <span className="w-2 h-6 bg-purple-600 mr-3 rounded-full"></span>
              How It Works
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Our Stale Fruit Detector leverages a Swin Transformer (Swin-T) architecture, 
                a cutting-edge hierarchical vision transformer that outperforms traditional CNNs 
                in image classification tasks.
              </p>
              <p>
                The model uses shifted window self-attention to create hierarchical representations, 
                efficiently processing images at multiple scales while maintaining computational efficiency.
              </p>
              <p>
                This architecture enables detection of subtle visual patterns indicating fruit freshness 
                with industry-leading accuracy, identifying spoilage indicators often imperceptible to humans.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
              Model Performance Metrics
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={data} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={60} 
                    outerRadius={80} 
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Value']}
                    contentStyle={{
                      background: 'rgba(255, 255, 255, 0.96)',
                      border: '1px solid #e4e4e7',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-gray-600">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              Validation results on independent test dataset (n=2,500 samples)
            </p>
          </motion.div>
        </div> 

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white p-8 rounded-xl shadow-md mb-20 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold mb-8 text-gray-800 flex items-center">
            <span className="w-2 h-6 bg-purple-600 mr-3 rounded-full"></span>
            Model Development Process
          </h2>
          
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3 text-gray-700 border-b pb-2">Training Data</h3>
                <p className="text-gray-600 mb-3">
                  Our Swin-T model was fine-tuned on a proprietary dataset containing:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>15,000+ annotated fruit images across freshness stages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>80/20 stratified train-test split</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Comprehensive data augmentation pipeline</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>224×224 resolution with normalized RGB values</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-gray-700 border-b pb-2">Architecture</h3>
                <p className="text-gray-600 mb-3">
                  Modified Swin Transformer architecture with:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Pre-trained ImageNet weights</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Custom classification head</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>4-stage hierarchical processing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Window-based multi-head self-attention</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-700 border-b pb-2">Training Protocol</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium">Optimizer</p>
                  <p className="text-gray-700">AdamW</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium">Learning Rate</p>
                  <p className="text-gray-700">1e-4</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium">Epochs</p>
                  <p className="text-gray-700">50</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium">Batch Size</p>
                  <p className="text-gray-700">32</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6 text-white">Technical Specifications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-purple-100 mb-2">Framework</h3>
                <p className="text-purple-50">
                  PyTorch 2.0 with torchvision's Swin Transformer implementation, optimized with CUDA 11.7
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-purple-100 mb-2">Inference</h3>
                <p className="text-purple-50">
                  Real-time prediction at 120ms per image (RTX 3080), with TensorRT optimization
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-purple-100 mb-2">Optimization</h3>
                <p className="text-purple-50">
                  Mixed precision training (FP16) with gradient scaling, achieving 1.8x speedup
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-purple-100 mb-2">Deployment</h3>
                <p className="text-purple-50">
                  ONNX runtime with WebAssembly backend for browser-based inference
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          {/* <h3 className="text-xl font-medium text-gray-700 mb-4">Ready to integrate our technology?</h3>
          <button className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg">
            Contact Our AI Team
          </button> */}
        </motion.div>
      </div>
    </div>
  );
}