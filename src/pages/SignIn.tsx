
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from 'react-hot-toast'; // For showing popups

declare global {
  interface Window {
    google: any;
  }
}

const mockDB: Record<string, { name: string; email: string; password: string }> = {
  "user@example.com": { name: "John Doe", email: "user@example.com", password: "password123" },
  // Add more mock users as needed
};

export default function SignIn() {
  const { signin, status, error } = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

    // ✅ Google Sign-In logic
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "877063734512-qq5pkqt1d0rrbqsk7nnsusvrjgc3un9m.apps.googleusercontent.com", // Your actual client ID
        callback: handleCredentialResponse,
      });
  
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
        }
      );
    }
  }, []);

  const handleCredentialResponse = (response: any) => {
    const token = response.credential;
    const user = parseJwt(token);
  
    console.log("Google user:", user);
    const email = user.email;  // Get email from the JWT token
  
    // Check if the user exists in the mock DB (or your real DB)
    if (mockDB[email]) {
      console.log("User is registered, redirecting to upload page.");
      // Proceed with storing the user in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/upload");  // Redirect to the upload page
    } else {
      console.log("User not registered, prompt to sign up.");
      alert("No account found for this email. Please sign up first.");
    }
  };

    // Function to check if the user exists in the database
    const checkIfUserExists = async (email: string) => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/check?email=${email}`);
        const data = await response.json();
        return data.exists;
      } catch (error) {
        console.error("Error during check:", error);
        return false;
      }
    };

    const parseJwt = (token: string) => {
      return JSON.parse(atob(token.split('.')[1]));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!email.trim() || !pw.trim()) {
      setFormError("All fields are required");
      return;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setFormError("Invalid email format");
      return;
    }
    const ok = await signin(email, pw);
    if (ok) navigate("/upload");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-10 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={status === "loading"}
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="pw">Password</label>
          <input
            id="pw"
            type="password"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={pw}
            onChange={e => setPw(e.target.value)}
            disabled={status === "loading"}
          />
        </div>
        {(formError || error) && (
          <div className="text-red-500 text-sm">{formError || error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded mt-2 hover:bg-purple-700 transition-colors"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* ✅ Google Sign-In button */}
      <div className="mt-6 text-center">
        <div id="google-signin-button"></div>
      </div>

      <div className="text-center mt-4 text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/signup" className="text-purple-600 hover:underline">Sign Up</a>
      </div>

      <div className="text-center mt-2 text-sm text-blue-600">
        <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
      </div>

    </div>
  );
}
