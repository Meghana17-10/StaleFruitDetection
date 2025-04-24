
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function SignUp() {
  const { signup, status, error } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!name.trim() || !email.trim() || !pw.trim() || !pw2.trim()) {
      setFormError("All fields are required");
      return;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setFormError("Invalid email format");
      return;
    }
    if (pw.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }
    if (pw !== pw2) {
      setFormError("Passwords do not match");
      return;
    }
    const ok = await signup(name, email, pw);
    if (ok) navigate("/upload");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-10 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={status === "loading"}
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
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
        <div>
          <label className="block mb-1" htmlFor="pw2">Confirm Password</label>
          <input
            id="pw2"
            type="password"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={pw2}
            onChange={e => setPw2(e.target.value)}
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
          {status === "loading" ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <div className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/signin" className="text-purple-600 hover:underline">Sign In</a>
      </div>
    </div>
  );
}
