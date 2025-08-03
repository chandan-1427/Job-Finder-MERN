import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Users, FileText, PlusCircle } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout";
import axios from "axios";

export default function EmployerHomePage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/jobs/employer/my-jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data.jobs);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePostJob = () => navigate("/post-job");
  const handleGoToDashboard = () => navigate("/employer/dashboard");

  const jobsPosted = jobs.length;
  const applicantsCount = jobs.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
  const positionsFilled = jobs.reduce((sum, job) => sum + (job.filledPositions || 0), 0);

  return (
    <AuthLayout
      title={
        <>
          Empower Your Hiring <br /> Process with JobFinder
        </>
      }
      description="Welcome to your employer dashboard. Post jobs, manage applicants, and build your dream team."
    >
      <div className="space-y-8 animate-fadeIn">
        <h2 className="text-xl text-white font-semibold mb-4 text-center">Dashboard Overview</h2>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center space-x-4 shadow">
            <Briefcase className="text-blue-200 w-6 h-6" />
            <div>
              <h4 className="font-semibold text-white">
                {loading ? "Loading..." : `${jobsPosted} Jobs Posted`}
              </h4>
              <p className="text-white/70 text-sm">Active opportunities</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center space-x-4 shadow">
            <Users className="text-green-200 w-6 h-6" />
            <div>
              <h4 className="font-semibold text-white">
                {loading ? "Loading..." : `${applicantsCount} Applicants`}
              </h4>
              <p className="text-white/70 text-sm">In the past 30 days</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center space-x-4 shadow sm:col-span-2">
            <FileText className="text-purple-200 w-6 h-6" />
            <div>
              <h4 className="font-semibold text-white">
                {loading ? "Loading..." : `${positionsFilled} Positions Filled`}
              </h4>
              <p className="text-white/70 text-sm">This hiring cycle</p>
            </div>
          </div>
        </div>

        {/* Post Job and Manage Jobs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePostJob}
            className="inline-flex items-center gap-2 bg-white text-[#5d4037] font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Post a New Job
          </button>

          <button
            onClick={handleGoToDashboard}
            className="inline-flex items-center gap-2 border border-white text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-white hover:text-[#5d4037] transition"
          >
            <Briefcase className="w-5 h-5" />
            Manage Jobs
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
