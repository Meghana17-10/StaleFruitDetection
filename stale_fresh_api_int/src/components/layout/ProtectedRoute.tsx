
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;
  return <>{children}</>;
}

// src/components/layout/ProtectedRoute.tsx
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/hooks/useAuth';

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated()) {
//       navigate('/signin');
//     }
//   }, [isAuthenticated, navigate]);

//   return isAuthenticated() ? children : null;
// }