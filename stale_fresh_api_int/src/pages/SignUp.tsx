// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";
// import { toast } from "@/components/ui/use-toast";

// export default function SignUp() {
//   const { signup, status, error: authError } = useAuth();
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [formError, setFormError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError("");

//     if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
//       setFormError("All fields are required");
//       return;
//     }

//     if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
//       setFormError("Invalid email format");
//       return;
//     }

//     if (password.length < 6) {
//       setFormError("Password must be at least 6 characters");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setFormError("Passwords do not match");
//       return;
//     }

//     try {
//       const success = await signup(name, email, password);
//       if (success) {
//         toast({
//           title: "Account created!",
//           description: "Please sign in with your credentials.",
//           variant: "success"
//         });
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       setFormError(authError || "Signup failed. Please try again.");
//       toast({
//         title: "Signup failed",
//         description: authError || "There was an error creating your account.",
//         variant: "destructive"
//       });
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-10 animate-fade-in">
//       <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      
//       <form className="space-y-5" onSubmit={handleSubmit}>
//         <div>
//           <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="name">
//             Full Name
//           </label>
//           <input
//             id="name"
//             className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             autoFocus
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             disabled={status === "loading"}
//             placeholder="John Doe"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="email">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={status === "loading"}
//             placeholder="your@email.com"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             disabled={status === "loading"}
//             placeholder="••••••••"
//             required
//             minLength={6}
//           />
//           <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="confirmPassword">
//             Confirm Password
//           </label>
//           <input
//             id="confirmPassword"
//             type="password"
//             className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             disabled={status === "loading"}
//             placeholder="••••••••"
//             required
//             minLength={6}
//           />
//         </div>

//         {(formError || authError) && (
//           <div className="text-red-500 text-sm text-center py-2 px-3 bg-red-50 rounded-md">
//             {formError || authError}
//           </div>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 flex justify-center items-center"
//           disabled={status === "loading"}
//         >
//           {status === "loading" ? (
//             <>
//               <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Creating Account...
//             </>
//           ) : (
//             "Create Account"
//           )}
//         </button>
//       </form>

//       <div className="text-center mt-4 text-sm text-gray-600">
//         Already have an account?{" "}
//         <a href="/signin" className="text-purple-600 hover:underline font-medium">
//           Sign In
//         </a>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import MainLayout from "@/components/layout/MainLayout";

export default function SignUp() {
  const { signup, status, error: authError } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setFormError("All fields are required");
      return;
    }

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setFormError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    try {
      const success = await signup(name, email, password);
      if (success) {
        toast({
          title: "Account created!",
          description: "Please sign in with your credentials.",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setFormError(authError || "Signup failed. Please try again.");
      toast({
        title: "Signup failed",
        description: authError || "There was an error creating your account.",
        variant: "destructive"
      });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md my-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === "loading"}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={status === "loading"}
              placeholder="••••••••"
              required
              minLength={6}
            />
            <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={status === "loading"}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {(formError || authError) && (
            <div className="text-red-500 text-sm text-center py-2 px-3 bg-red-50 rounded-md">
              {formError || authError}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 flex justify-center items-center"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-purple-600 hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}