import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Apple, Banana, Cherry, Grape } from "lucide-react";
const FRUIT_ICONS = [{
  icon: Apple,
  color: "#ef4444",
  rotate: "-12deg",
  size: 36,
  style: "animate-bounce"
}, {
  icon: Banana,
  color: "#facc15",
  rotate: "18deg",
  size: 32,
  style: "animate-bounce delay-150"
}, {
  icon: Grape,
  color: "#8b5cf6",
  rotate: "-18deg",
  size: 30,
  style: "animate-bounce delay-300"
}, {
  icon: Cherry,
  color: "#be123c",
  rotate: "-5deg",
  size: 24,
  style: "animate-bounce delay-250"
}];
export default function ModelExplainer() {
  const data = [{
    name: "Accuracy",
    value: 93
  }, {
    name: "Error",
    value: 7
  }];
  const COLORS = ["#8b5cf6", "#e4e4e7"];
  return <div className="min-h-screen py-10 px-2 rounded-md">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center gap-2 mb-4 select-none">
          {FRUIT_ICONS.map(({
          icon: Icon,
          color,
          rotate,
          size,
          style
        }, i) => <span key={i} className={`inline-block transition-transform duration-300 ${style}`} style={{
          transform: `rotate(${rotate})`
        }}>
              <Icon color={color} size={size} strokeWidth={2.2} className="drop-shadow-xl" />
            </span>)}
        </div>
        <h1 className="text-4xl font-extrabold mb-4 flex justify-center gap-0.5 select-none">
          {"Our Swin Transformer Model".split("").map((letter, idx) => letter === " " ? <span key={idx} style={{
          width: "0.4em"
        }} /> : <span key={idx} className="transition-all duration-200 cursor-pointer hover:scale-125 hover:text-white" style={{
          display: "inline-block",
          willChange: "transform, color"
        }}>
                {letter}
              </span>)}
        </h1>
        <p className="text-gray-100 text-lg text-center font-medium animate-fade-in">
          Learn how our advanced AI technology helps detect fresh and stale fruits
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-16 mt-12">
          <div className="animate-fade-in-slow rounded-md bg-neutral-50">
            <h2 className="font-semibold mb-4 drop-shadow text-[purple-70] text-purple-700">
              How It Works
            </h2>
            <p className="mb-4 text-slate-950">
              Our Stale Fruit Detector uses a Swin Transformer (Swin-T) model, a state-of-the-art
              hierarchical vision transformer that excels at image classification tasks.
            </p>
            <p className="mb-4 text-slate-950">
              Unlike traditional CNNs, Swin Transformer uses shifted windows of self-attention,
              creating a hierarchical representation that efficiently processes images at different scales
              while maintaining computational efficiency.
            </p>
            <p className="text-slate-950">
              This advanced architecture allows our model to identify subtle visual patterns of fruit freshness
              with exceptional accuracy, detecting signs of spoilage that might be difficult for the human eye.
            </p>
          </div>

          <div className="bg-white/95 p-2 rounded-xl shadow-sm animate-fade-in-slow">
            <h3 className="text-xl font-semibold mb-4 text-center text-purple-700">Model Accuracy</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" label={({
                  name,
                  percent
                }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-sm text-gray-500">
              Based on evaluation against our test dataset
            </p>
          </div>
        </div>

        <div className="bg-white/95 p-8 rounded-xl shadow-sm mb-16 animate-fade-in-slow">
          <h2 className="text-2xl font-semibold mb-6 text-purple-700 drop-shadow">Training Process</h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Training Data</h3>
                <p className="text-gray-600">
                  Our Swin-T model was fine-tuned on a custom dataset of fruit images in different
                  stages of freshness and decay, with an 80-20 train-test split.
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>Multiple fruit varieties with fresh and stale examples</li>
                  <li>Data augmentation with random flips, rotations, and color jittering</li>
                  <li>Images normalized and resized to 224×224 pixels</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Model Architecture</h3>
                <p className="text-gray-600">
                  We used a pre-trained Swin-T model with ImageNet weights as our base,
                  modifying the classification head for our specific fresh/stale classification task.
                </p>
                <p className="text-gray-600 mt-2">
                  The Swin Transformer processes images using shifted windows of self-attention,
                  creating a hierarchical representation that captures both fine and coarse details.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Training Strategy</h3>
              <p className="text-gray-600">
                The model was trained using mixed precision with NVIDIA CUDA acceleration for 50 epochs,
                using Adam optimizer with a learning rate of 0.0001 and step learning rate scheduler.
                We employed cross-entropy loss and achieved high accuracy on our test dataset.
              </p>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-slow">
          <h2 className="text-2xl font-semibold mb-6 text-purple-700 drop-shadow">
            Technical Implementation
          </h2>
          <div className="bg-purple-50 p-6 rounded-xl">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Framework:</strong> PyTorch with torchvision for the Swin Transformer implementation
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Optimization:</strong> Mixed precision training with gradient scaling for efficiency
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Inference:</strong> Real-time prediction with efficient image preprocessing
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Deployment:</strong> Model converted to a web-friendly format for in-browser fruit freshness detection
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
}