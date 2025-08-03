import React, { useState } from "react";
import axios from "axios";

export default function JobApplyCard({ jobId }) {
  const [formData, setFormData] = useState({
    resumeUrl: "",
    coverLetter: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `http://localhost:5000/api/jobs/${jobId}/apply`,
        {
          resumeUrl: formData.resumeUrl,
          coverLetter: formData.coverLetter,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(data.message || "Applied successfully!");
      setFormData({ resumeUrl: "", coverLetter: "" });
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur p-6 rounded-xl shadow-md text-white font-[Outfit] max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Apply to this Job</h2>

      <form onSubmit={handleApply} className="space-y-4">
        <div>
          <label className="block mb-1">Resume URL</label>
          <input
            type="url"
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded text-black"
            placeholder="https://drive.google.com/..."
          />
        </div>

        <div>
          <label className="block mb-1">Cover Letter</label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 rounded text-black"
            placeholder="Why are you a great fit for this role?"
          />
        </div>

        {error && <p className="text-red-300 text-sm">{error}</p>}
        {success && <p className="text-green-300 text-sm">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-white text-[#5d4037] font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
