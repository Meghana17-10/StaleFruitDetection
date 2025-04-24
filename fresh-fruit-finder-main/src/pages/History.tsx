
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

export default function History() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Demo placeholder: would fetch real history from backend.
  const predictions = [
    {
      id: 1,
      imageUrl: "/placeholder.svg",
      prediction: "fresh",
      confidence: 93,
      date: "2025-02-14",
    },
    {
      id: 2,
      imageUrl: "/placeholder.svg",
      prediction: "stale",
      confidence: 72,
      date: "2025-02-11",
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto mt-8 animate-fade-in">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-4" 
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-2xl font-bold text-left flex-grow">My History</h2>
        </div>
        <div className="space-y-4">
          {predictions.map(p => (
            <div key={p.id} className="flex bg-white rounded-lg p-4 items-center shadow hover:shadow-lg transition-shadow">
              <img src={p.imageUrl} alt="fruit preview" className="w-20 h-20 rounded-md object-cover mr-6 border" />
              <div>
                <div className="font-semibold capitalize text-lg">{p.prediction} <span className="ml-2 text-sm text-gray-500">({p.confidence}%)</span></div>
                <div className="text-gray-500 text-sm">Analyzed on {p.date}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm mt-6 text-gray-500">Only you can see your prediction history.</p>
      </div>
    </MainLayout>
  );
}
