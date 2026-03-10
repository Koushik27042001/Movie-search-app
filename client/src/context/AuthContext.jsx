import { createContext, useContext, useMemo, useState } from "react";
import { loginRequest, registerRequest } from "../services/authApi";

const AuthContext = createContext(null);

const getStoredAuth = () => {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const storeAuth = (auth) => {
  try {
    if (auth) localStorage.setItem("auth", JSON.stringify(auth));
    else localStorage.removeItem("auth");
  } catch {}
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => getStoredAuth());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!auth?.token;

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const data = await loginRequest({ email, password });
      const nextAuth = { token: data.token, user: { _id: data._id, name: data.name, email: data.email } };
      setAuth(nextAuth);
      storeAuth(nextAuth);
      return { ok: true };
    } catch (err) {
      setError(err.message || "Login failed");
      return { ok: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError("");
    try {
      const data = await registerRequest({ name, email, password });
      const nextAuth = { token: data.token, user: { _id: data._id, name: data.name, email: data.email } };
      setAuth(nextAuth);
      storeAuth(nextAuth);
      return { ok: true };
    } catch (err) {
      setError(err.message || "Registration failed");
      return { ok: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuth(null);
    storeAuth(null);
  };

  const value = useMemo(
    () => ({ auth, isAuthenticated, login, register, logout, loading, error, setError }),
    [auth, isAuthenticated, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};