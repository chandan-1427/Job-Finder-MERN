import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../components/MainLayout";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error("Failed to load notifications", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const clearAllNotifications = async () => {
    try {
      await axios.delete("http://localhost:5000/api/notifications/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications([]);
    } catch (err) {
      console.error("Failed to clear notifications", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  };

  const getStatusInstruction = (message = "") => {
    const lower = message.toLowerCase();
    if (lower.includes("accepted")) {
      return "✅ Your profile matched this job. You’ll receive a mail soon.";
    } else if (lower.includes("rejected")) {
      return "❌ Unfortunately, your profile didn’t match for this role.";
    } else if (lower.includes("reviewed")) {
      return "⏳ Your application has been reviewed. Stay tuned!";
    }
    return null;
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#5d4037] to-[#4e342e] px-6 py-10 font-[Outfit] text-white">
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Notifications</h1>
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="bg-white text-[#5d4037] font-semibold px-5 py-2 rounded-full hover:bg-gray-200 transition"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Notifications List */}
          {loading ? (
            <p className="text-white/80 text-center">Loading...</p>
          ) : notifications.length === 0 ? (
            <div className="bg-white/10 p-6 rounded-lg text-white/80 text-center">
              <p>No notifications yet.</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {notifications.map((n) => {
                const instruction = getStatusInstruction(n.message);
                return (
                  <li
                    key={n._id}
                    className={`p-5 rounded-xl shadow-md ${
                      n.read ? "bg-white/10" : "bg-white/20"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-lg">{n.message}</p>
                        {instruction && (
                          <p className="mt-2 text-sm text-white/80">
                            {instruction}
                          </p>
                        )}
                        <p className="text-xs text-white/60 mt-2">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteNotification(n._id)}
                        className="text-sm text-red-400 hover:text-red-300 ml-4"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
