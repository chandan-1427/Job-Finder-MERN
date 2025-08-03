import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, FileText, CheckCircle, MapPin, Clock } from "lucide-react";
import axios from "axios";

export default function UserHomePage() {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppliedJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/jobs/user/applied-jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppliedJobs(res.data.appliedJobs || []);
    } catch (err) {
      console.error("Failed to load applied jobs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const handleBrowseJobs = () => navigate("/jobs");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5d4037] to-[#4e342e] text-white px-6 py-10 font-[Outfit,sans-serif]">
      <div className="max-w-5xl mx-auto space-y-10 animate-fadeIn">

        {/* Welcome Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
            Discover Your Next <br /> Career Opportunity
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Welcome to your job seeker dashboard. Apply to top jobs, track your applications, and grow your career with JobFinder.
          </p>
        </div>

        {/* Overview Cards */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Your Career Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center space-x-4 shadow">
              <Briefcase className="text-yellow-200 w-6 h-6" />
              <div>
                <h4 className="font-semibold text-white">Explore Jobs</h4>
                <p className="text-white/70 text-sm">New opportunities posted daily</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center space-x-4 shadow">
              <FileText className="text-blue-200 w-6 h-6" />
              <div>
                <h4 className="font-semibold text-white">Track Applications</h4>
                <p className="text-white/70 text-sm">Monitor your application status</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center space-x-4 shadow">
              <CheckCircle className="text-green-200 w-6 h-6" />
              <div>
                <h4 className="font-semibold text-white">Get Notified</h4>
                <p className="text-white/70 text-sm">Real-time updates on your profile</p>
              </div>
            </div>
          </div>
        </div>

        {/* Apply for Jobs CTA */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleBrowseJobs}
            className="inline-flex items-center gap-2 bg-white text-[#5d4037] font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition"
          >
            <Briefcase className="w-5 h-5" />
            Apply for Jobs
          </button>
        </div>

        {/* Applied Jobs Section */}
        <div className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">Jobs You've Applied For</h2>

          {loading ? (
            <p className="text-white/70">Loading...</p>
          ) : appliedJobs.length === 0 ? (
            <div className="bg-white/10 p-6 rounded-lg text-white/80">
              You haven’t applied to any jobs yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {appliedJobs.map((job) => (
                <div
                  key={job.jobId}
                  className="bg-white/10 backdrop-blur p-4 rounded-lg shadow text-white/90"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        job.status === "Accepted"
                          ? "bg-green-600 text-white"
                          : job.status === "Rejected"
                          ? "bg-red-600 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/80">{job.company}</p>
                  <div className="flex gap-4 mt-2 text-sm text-white/70">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />{" "}
                      {new Date(job.appliedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
