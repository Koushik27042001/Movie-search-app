import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register, loading, error, setError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);
    if (result.ok) navigate("/dashboard");
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <h1 className="mb-2 text-2xl font-semibold">Create account</h1>
      <p className="mb-6 text-sm text-gray-500">Sign up to save favorites and access your dashboard.</p>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setError("")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setError("")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setError("")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-900 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-orange-600 hover:underline" onClick={() => setError("")}>
          Login
        </Link>
      </p>
    </div>
  );
}