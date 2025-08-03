import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ApplicantsModal({ jobId, onClose }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/jobs/${jobId}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data.applications);
    } catch (err) {
      console.error("Failed to fetch applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchApplications();
  }, [jobId]);

  const handleUpdateStatus = async (userId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/jobs/applications/${jobId}/${userId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchApplications(); // refresh list after update
    } catch (err) {
      console.error("Error updating application status", err);
      alert("Failed to update application status.");
    }
  };

  if (!jobId) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center overflow-y-auto px-4 py-8">
      <div className="bg-white text-black rounded-xl shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Applicants</h2>
          <button onClick={onClose} className="text-sm text-red-600 hover:underline">
            Close
          </button>
        </div>

        {loading ? (
          <p>Loading applications...</p>
        ) : applications.length === 0 ? (
          <p>No applications received yet.</p>
        ) : (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            {applications.map((app, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50 space-y-2">
                <h3 className="font-semibold text-lg">{app.name}</h3>
                <p className="text-sm text-gray-700">Email: {app.email}</p>
                {app.profile?.bio && (
                  <p className="text-sm text-gray-600">Bio: {app.profile.bio}</p>
                )}
                {app.profile?.location && (
                  <p className="text-sm text-gray-600">Location: {app.profile.location}</p>
                )}
                <p className="text-sm mt-2 text-gray-800">
                  <strong>Cover Letter:</strong> {app.coverLetter}
                </p>
                <p className="text-sm text-gray-500">
                  Applied On: {new Date(app.appliedAt).toLocaleDateString()}
                </p>
                {app.resumeUrl && (
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View Resume
                  </a>
                )}

                {/* Status Badge */}
                <div className="flex items-center justify-between mt-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      app.status === "Accepted"
                        ? "bg-green-200 text-green-800"
                        : app.status === "Rejected"
                        ? "bg-red-200 text-red-800"
                        : app.status === "Reviewed"
                        ? "bg-purple-200 text-purple-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {app.status}
                  </span>

                  {/* Accept/Reject buttons for Pending apps */}
                  {app.status === "Pending" && (
                    <div className="flex gap-2">
                     <button
  onClick={() => handleUpdateStatus(app.userId, "Accepted")}  // Fix this
  className="text-sm text-green-600 hover:underline font-medium"
>
  Accept
</button>
<button
  onClick={() => handleUpdateStatus(app.userId, "Rejected")}  // Fix this
  className="text-sm text-red-600 hover:underline font-medium"
>
  Reject
</button>

                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
