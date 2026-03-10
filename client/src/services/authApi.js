const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const request = async (path, body) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.message || "Request failed";
    throw new Error(message);
  }
  return data;
};

export const loginRequest = (payload) => request("/api/auth/login", payload);
export const registerRequest = (payload) => request("/api/auth/register", payload);