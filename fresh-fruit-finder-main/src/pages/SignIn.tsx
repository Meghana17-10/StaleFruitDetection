
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function SignIn() {
  const { signin, status, error } = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

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
      <div className="text-center mt-4 text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/signup" className="text-purple-600 hover:underline">Sign Up</a>
      </div>
    </div>
  );
}
