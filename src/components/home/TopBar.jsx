import React, {useState, useEffect} from "react";
import { Share2, Download } from "lucide-react";
import { getUserProfile } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await getUserProfile();
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
    fetchUserProfile();
  })
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-b-lg sticky top-0 z-20">
      
      {/* Greeting + Profile */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/profile")}
          className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center 
                     text-white font-bold shadow hover:bg-blue-600 transition"
        >
          {user?.name?.charAt(0)?.toUpperCase() || "?"}
        </button>
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm">Hello,</span>
          <span className="text-gray-900 font-semibold text-lg">{user?.name || "user"}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow">
          <Share2 size={16} />
          Share
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium shadow-sm">
          <Download size={16} />
          Export
        </button>
      </div>
    </div>
  );
}
