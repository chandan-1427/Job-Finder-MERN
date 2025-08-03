import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/logout";
import { LogOut } from "lucide-react";
import axios from "axios";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [unverifiedEmployers, setUnverifiedEmployers] = useState([]);
  const [verifiedEmployers, setVerifiedEmployers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else if (storedUser.role !== "admin") {
      setAuthorized(false);
    } else {
      setUser(storedUser);
      setAuthorized(true);
      fetchEmployers();
    }
  }, [navigate]);

  const fetchEmployers = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [unverifiedRes, verifiedRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/employers/unverified", { headers }),
        axios.get("http://localhost:5000/api/admin/employers/verified", { headers }),
      ]);

      setUnverifiedEmployers(unverifiedRes.data);
      setVerifiedEmployers(verifiedRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const verifyEmployer = async (employerId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/employers/verify/${employerId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Employer verified successfully!");
      setTimeout(() => {
      setMessage("");
    }, 3000);
      fetchEmployers(); // Refresh
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to verify employer.");
    }
  };

  const unverifyEmployer = async (employerId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5000/api/admin/employers/unverify/${employerId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setMessage("Employer unverification completed.");
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage("");
    }, 3000);

    fetchEmployers(); // Refresh lists
  } catch (err) {
    console.error(err);
    setMessage("Failed to unverify employer.");

    // Optionally clear error message after delay
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }
};

  const deleteEmployer = async (employerId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/admin/employers/${employerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Employer profile deleted.");
      fetchEmployers();
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete employer.");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f3f2ef] p-8 font-[Outfit]">
      {authorized ? (
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#5d4037]">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Logged in as: <span className="font-medium">{user.email}</span></p>
            <button
            onClick={() => logout(navigate)}
            className="inline-flex items-center gap-2 border border-white text-black font-semibold px-6 py-2 rounded-full shadow hover:bg-white hover:text-[#5d4037] transition"
          >
            <LogOut size={16} />
            Logout
          </button>
          </div>

          {message && (
            <div className="text-sm font-medium text-green-700 bg-green-100 p-2 rounded">{message}</div>
          )}

          {/* Unverified Employers */}
          <section>
            <h2 className="text-xl font-semibold text-[#4e342e] mb-3">🛡️ Unverified Employers</h2>
            {unverifiedEmployers.length === 0 ? (
              <p className="text-gray-500">All employers are verified ✅</p>
            ) : (
              <ul className="space-y-3">
                {unverifiedEmployers.map((emp) => (
                  <li key={emp._id} className="bg-gray-100 p-4 rounded flex justify-between items-center shadow">
                    <div>
                      <p className="font-semibold text-[#5d4037]">{emp.companyName}</p>
                      <p className="text-sm text-gray-700">{emp.user?.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => verifyEmployer(emp._id)}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => deleteEmployer(emp._id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Verified Employers */}
          <section>
            <h2 className="text-xl font-semibold text-[#4e342e] mb-3">Verified Employers</h2>
            {verifiedEmployers.length === 0 ? (
              <p className="text-gray-500">No verified employers yet.</p>
            ) : (
              <ul className="space-y-3">
                {verifiedEmployers.map((emp) => (
                  <li key={emp._id} className="bg-green-50 p-4 rounded flex justify-between items-center shadow">
                    <div>
                      <p className="font-semibold text-[#2e7d32]">{emp.companyName}</p>
                      <p className="text-sm text-gray-700">{emp.user?.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded">Verified</span>
                      <button
                        onClick={() => unverifyEmployer(emp._id)}
                        className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                      >
                        Unverify
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Future Admin Controls
          <section className="grid gap-6 md:grid-cols-2">
            <AdminCard title="User Management" desc="View, edit, or delete user accounts." />
            <AdminCard title="Job Post Moderation" desc="Approve, reject, or delete job listings." />
            <AdminCard title="System Analytics" desc="View usage statistics and reports." />
            <AdminCard title="Admin Settings" desc="Manage system-wide settings and controls." />
          </section> */}
        </div>
      ) : (
        <div className="text-center text-red-600 text-lg">
          ❌ You are not authorized to access this page.
        </div>
      )}
    </div>
  );
}

function AdminCard({ title, desc }) {
  return (
    <div className="border border-gray-300 p-4 rounded-md shadow-sm bg-gray-50 hover:bg-white transition">
      <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
