export default function HowItWorks() {
  const steps = [{
    number: "01",
    title: "Upload an Image",
    description: "Take a photo of your fruit or select an existing image from your device."
  }, {
    number: "02",
    title: "AI Analysis",
    description: "Our Vision Transformer model scans the image for signs of freshness or decay."
  }, {
    number: "03",
    title: "Get Results",
    description: "View a detailed analysis of the fruit's condition with confidence score."
  }];
  return <div className="py-16 bg-white rounded-2xl shadow-sm my-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-4">Simple 3-Step Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get accurate freshness analysis in seconds with our easy to use platform
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          {steps.map((step, index) => <div key={index} className="flex-1 relative animate-fade-in" style={{
          animationDelay: `${0.3 * index}s`
        }}>
              <div className="absolute top-0 left-0 text-6xl font-bold text-gray-100 mx-0 my-0 px-0 py-0">{step.number}</div>
              <div className="pt-10 px-4">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 my-[14px]">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && <div className="hidden md:block absolute top-1/3 right-[-30px] text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>}
            </div>)}
        </div>
      </div>
    </div>;
}