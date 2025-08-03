// src/components/NotificationBadge.jsx
import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import axios from "axios";

export default function NotificationBadge({ onClick }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
  const fetchNotificationCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const unreadCount = (data.notifications || []).filter(n => !n.read).length;
      setCount(unreadCount);
    } catch (err) {
      console.error("Failed to fetch notification count", err);
    }
  };

  fetchNotificationCount(); // initial fetch

  const intervalId = setInterval(fetchNotificationCount, 10000); // every 10 seconds

  return () => clearInterval(intervalId); // cleanup on unmount
}, []);


  return (
    <div onClick={onClick} className="relative cursor-pointer">
  <Bell size={18} />
  {count > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center leading-none shadow">
      {count > 9 ? "9+" : count}
    </span>
  )}
</div>

  );
}
