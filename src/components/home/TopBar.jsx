import React, {useState, useEffect} from "react";
import { Share2, Download } from "lucide-react";
import { getUserProfile, downloadWordsPDF, getPDFDownloadLink } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(user) return;
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

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await downloadWordsPDF();

      const url = window.URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );

      const a = document.createElement("a");
      a.href = url;
      a.download = "arabic-vocabulary.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download PDF");
    }
    setLoading(false);
  };

  const handleCopyPDFLink = async () => {
    try {
      const link = await getPDFDownloadLink();
      await navigator.clipboard.writeText(link);
      alert("PDF download link copied!");
    } catch {
      alert("Failed to copy link");
    }
  };
  

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-b-lg sticky top-0 z-30">
      
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
        <button onClick={() => handleCopyPDFLink()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow">
          <Share2 size={16} />
          <span className="hidden md:inline">Share</span>
        </button>
        <button onClick={() => handleDownload()} className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium shadow-sm ${loading ? "cursor-not-allowed opacity-50" : ""}`} disabled={loading  }>
          {!loading && <Download size={16} />}
          <span className="hidden md:inline">{loading ? "Loading..." : "Export"}</span>
        </button>
      </div>
    </div>
  );
}
