import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Auth App</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold mb-4">
          Welcome 🎉
        </h2>
        <p className="text-gray-600 mb-8">
          You are successfully logged in using cookie-based authentication.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Profile</h3>
            <p className="text-gray-500 text-sm">
              Manage your account settings and password.
            </p>
            <button
              onClick={() => navigate("/change-password")}
              className="mt-4 text-blue-600 font-medium"
            >
              Change Password →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Security</h3>
            <p className="text-gray-500 text-sm">
              Cookie-based authentication enabled.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Status</h3>
            <p className="text-green-600 font-medium">
              Session Active ✔
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
