import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainLayout from "../../components/MainLayout";

export default function JobPostPage() {
  const navigate = useNavigate();
  console.log(navigate);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "Full-Time",
    salaryMin: "",
    salaryMax: "",
    skillsRequired: "",
    openings: 1,
    deadline: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/jobs",
        {
          title: jobData.title,
          description: jobData.description,
          location: jobData.location,
          jobType: jobData.jobType,
          salaryRange: {
            min: Number(jobData.salaryMin),
            max: Number(jobData.salaryMax),
          },
          skillsRequired: jobData.skillsRequired
            .split(",")
            .map((s) => s.trim()),
          openings: Number(jobData.openings),
          deadline: jobData.deadline,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("✅ Job posted successfully!");
      setJobData({
        title: "",
        description: "",
        location: "",
        jobType: "Full-Time",
        salaryMin: "",
        salaryMax: "",
        skillsRequired: "",
        openings: 1,
        deadline: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "❌ Failed to post job. Try again."
      );
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#5d4037] to-[#4e342e] text-white px-6 py-10 font-[Outfit]">
        <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-white text-center">
            Post a New Job
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              {
                label: "Job Title",
                name: "title",
                type: "text",
                placeholder: "e.g. Frontend Developer",
              },
              {
                label: "Location",
                name: "location",
                type: "text",
                placeholder: "e.g. Remote, New York",
              },
              {
                label: "Skills Required (comma separated)",
                name: "skillsRequired",
                type: "text",
                placeholder: "e.g. React, Node.js",
              },
              {
                label: "Openings",
                name: "openings",
                type: "number",
                placeholder: "e.g. 3",
              },
              {
                label: "Deadline",
                name: "deadline",
                type: "date",
                className: "text-gray-100"
              },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block mb-1 text-white">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={jobData[name]}
                  onChange={handleChange}
                  className="w-full rounded px-4 py-2 text-gray-100"
                  placeholder={placeholder}
                  required={name !== "skillsRequired" && name !== "deadline"}
                />
              </div>
            ))}

            {/* Description */}
            <div>
              <label className="block mb-1 text-white">Description</label>
              <textarea
                name="description"
                value={jobData.description}
                onChange={handleChange}
                rows="4"
                required
                className="w-full rounded px-4 py-2 text-gray-100"
                placeholder="Job responsibilities, qualifications, etc."
              />
            </div>

            {/* Job Type */}
<div>
  <label className="block mb-2 text-white font-medium">Job Type</label>
  <select
    name="jobType"
    value={jobData.jobType}
    onChange={handleChange}
    required
    className="w-full bg-[#5d4037] text-white rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/60"
  >
    <option value="">Select Job Type</option>
    <option value="Full-Time">Full-Time</option>
    <option value="Part-Time">Part-Time</option>
    <option value="Internship">Internship</option>
    <option value="Contract">Contract</option>
    <option value="Remote">Remote</option>
  </select>
</div>

            {/* Salary */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-white">Salary Min</label>
                <input
                  type="number"
                  name="salaryMin"
                  value={jobData.salaryMin}
                  onChange={handleChange}
                  className="w-full rounded px-4 py-2 text-gray-100"
                  placeholder="e.g. 30000"
                />
              </div>
              <div>
                <label className="block mb-1 text-white">Salary Max</label>
                <input
                  type="number"
                  name="salaryMax"
                  value={jobData.salaryMax}
                  onChange={handleChange}
                  className="w-full rounded px-4 py-2 text-gray-100"
                  placeholder="e.g. 60000"
                />
              </div>
            </div>

            {/* Feedback */}
            {error && <p className="text-red-300 text-sm">{error}</p>}
            {success && <p className="text-green-300 text-sm">{success}</p>}

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-white text-[#5d4037] font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
