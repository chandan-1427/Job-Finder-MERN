import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfileView from "../../components/Profile/UserProfileView";
import UserProfileEdit from "../../components/Profile/UserProfileEdit";
import MainLayout from "../../components/MainLayout";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored || stored.role !== "user") {
      window.location.href = "/login";
      return;
    }
    setUser(stored);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/profile/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
      } catch (err) {
        console.error("Failed to load user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user, refreshTrigger]);

  const handleEditToggle = () => setEditMode((prev) => !prev);
  const handleUpdateSuccess = () => {
    setEditMode(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  if (!user || !profile || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#5d4037] to-[#4e342e] text-white flex items-center justify-center font-[Outfit]">
        <p className="text-lg font-medium">Loading user profile...</p>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#5d4037] to-[#4e342e] text-white px-6 py-10 font-[Outfit,sans-serif]">
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">User Profile</h1>
            <button
              onClick={handleEditToggle}
              className={`inline-flex items-center gap-2 font-semibold px-6 py-2 rounded-full shadow transition ${
                editMode
                  ? "border border-white text-white hover:bg-white hover:text-[#5d4037]"
                  : "bg-white text-[#5d4037] hover:bg-gray-200"
              }`}
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 shadow-md text-white/90">
            {editMode ? (
              <UserProfileEdit profile={profile} onSuccess={handleUpdateSuccess} />
            ) : (
              <UserProfileView user={user} profile={profile} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
