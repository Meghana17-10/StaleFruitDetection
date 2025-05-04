
import { useState, useEffect, useCallback } from "react";

type User = {
  name: string;
  email: string;
  token: string;
};

type AuthStatus = "idle" | "loading" | "error";

const STORAGE_KEY = "sf_user";

const mockDB: Record<string, { name: string; password: string }> = {};

function saveUser(user: User | null) {
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
}

function getUser(): User | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(getUser());
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setStatus("loading");
    setError(null);
    await new Promise((r) => setTimeout(r, 500));
    if (mockDB[email]) {
      setStatus("error");
      setError("Email already in use");
      return false;
    }
    mockDB[email] = { name, password };
    const token = btoa(`${email}:${Date.now()}`);
    const userData = { name, email, token };
    saveUser(userData);
    setUser(userData);
    setStatus("idle");
    return true;
  }, []);

  const signin = useCallback(async (email: string, password: string) => {
    setStatus("loading");
    setError(null);
    await new Promise((r) => setTimeout(r, 500));
    if (!mockDB[email] || mockDB[email].password !== password) {
      setStatus("error");
      setError("Invalid credentials");
      return false;
    }
    const { name } = mockDB[email];
    const token = btoa(`${email}:${Date.now()}`);
    const userData = { name, email, token };
    saveUser(userData);
    setUser(userData);
    setStatus("idle");
    return true;
  }, []);

  const logout = useCallback(() => {
    saveUser(null);
    setUser(null);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    setStatus("loading");
    setError(null);
    await new Promise((r) => setTimeout(r, 500)); // simulate delay
  
    if (!mockDB[email]) {
      setStatus("error");
      setError("No account found with this email");
      return false;
    }
  
    // Simulate reset link sent
    console.log(`Reset link sent to ${email}`);
    setStatus("idle");
    return true;
  }, []);

  return { user, status, error, signup, signin, logout, resetPassword };
}
