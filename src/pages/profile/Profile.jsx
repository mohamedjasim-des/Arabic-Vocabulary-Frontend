import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword, getUserProfile, logout } from "../../utils/api";
import { ArrowLeft, LogOut } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data);
      } catch {
        alert("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await changePassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });
      alert("Password changed successfully!");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      alert("Failed to change password");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center gap-1 text-gray-600 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="relative w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-600 px-2 py-2  md:px-4 md:py-2 border border-red-200 rounded-lg
            hover:bg-red-50"
          >
            <LogOut size={16} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>

        {/* Password Form */}
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={passwords.oldPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-blue-500 hover:bg-blue-600 
                        text-white font-medium rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
