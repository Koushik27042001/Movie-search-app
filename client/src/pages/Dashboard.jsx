import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { auth, logout } = useAuth();

  return (
    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-900 dark:border-gray-800">
      <h1 className="mb-2 text-2xl font-semibold">Dashboard</h1>
      <p className="text-sm text-gray-500">Welcome back, {auth?.user?.name || "User"}.</p>

      <div className="mt-6 space-y-2 text-sm">
        <div><span className="font-semibold">Email:</span> {auth?.user?.email}</div>
      </div>

      <button
        onClick={logout}
        className="px-4 py-2 mt-6 text-white bg-black rounded-lg hover:bg-gray-900"
      >
        Logout
      </button>
    </div>
  );
}