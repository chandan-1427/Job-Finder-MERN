import React, { useEffect, useState } from "react";
import UserProfileView from "../../components/Profile/UserProfileView";
import EmployerProfileView from "../../components/Profile/EmployerProfileView";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored) return;

    setUser(stored);

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const res = await axios.get(
          `/api/profile/${stored.role}`, // backend should resolve role-specific logic
          config
        );
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user || !profile) return <p className="p-8">Loading profile...</p>;

  return user.role === "user" ? (
    <UserProfileView user={user} profile={profile} />
  ) : (
    <EmployerProfileView user={user} profile={profile} />
  );
}
