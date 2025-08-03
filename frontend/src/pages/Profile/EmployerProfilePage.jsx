import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployerProfileView from "../../components/Profile/EmployerProfileView";
import EmployerProfileEdit from "../../components/Profile/EmployerProfileEdit";
import MainLayout from "../../components/MainLayout";

export default function EmployerProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored || stored.role !== "employer") {
      window.location.href = "/login";
      return;
    }

    setUser(stored);
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/profile/employer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(data);
    } catch (err) {
      console.error("Failed to load employer profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdated = () => {
    fetchProfile();
    setEditMode(false);
  };

  if (!user || !profile || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#5d4037] to-[#4e342e] text-white flex items-center justify-center font-[Outfit]">
        <p className="text-lg font-medium">Loading employer profile...</p>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#5d4037] to-[#4e342e] text-white px-6 py-10 font-[Outfit,sans-serif]">
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Employer Profile</h1>
            <button
              className={`inline-flex items-center gap-2 font-semibold px-6 py-2 rounded-full shadow transition ${
                editMode
                  ? "border border-white text-white hover:bg-white hover:text-[#5d4037]"
                  : "bg-white text-[#5d4037] hover:bg-gray-200"
              }`}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 shadow-md text-white/90">
            {editMode ? (
              <EmployerProfileEdit profile={profile} onSuccess={handleProfileUpdated} />
            ) : (
              <EmployerProfileView user={user} profile={profile} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
