import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import JobApplyCard from "./user/JobApplyCard.jsx";
import { Briefcase, MapPin, Clock } from "lucide-react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openApplyJobId, setOpenApplyJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/jobs");
        setJobs(data.jobs);
        setLoading(false);
      } catch (err) {
        setError("Failed to load jobs. Please try again.");
        console.log(err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyClick = (jobId) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please log in to apply.");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role === "employer") {
      alert("Employers cannot apply to jobs. Please create a job seeker account.");
      return;
    }

    setOpenApplyJobId(openApplyJobId === jobId ? null : jobId);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#5d4037] to-[#4e342e] text-white px-6 py-10 font-[Outfit]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Available Jobs</h1>

          {loading && <p className="text-center text-white/80">Loading jobs...</p>}
          {error && <p className="text-center text-red-300">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/10 backdrop-blur rounded-xl p-6 shadow-md space-y-4 hover:shadow-lg transition relative"
              >
                <h2 className="text-2xl font-semibold text-white">{job.title}</h2>
                <p className="text-white/80 text-sm">{job.description.slice(0, 100)}...</p>

                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Briefcase className="w-4 h-4" />
                  <span>{job.jobType}</span>
                </div>

                {job.deadline && (
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>
                      Apply by {new Date(job.deadline).toLocaleDateString()}
                    </span>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skillsRequired?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-white/20 px-3 py-1 rounded-full text-xs text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  className="mt-4 bg-white text-[#5d4037] font-semibold px-5 py-2 rounded-full hover:bg-gray-100 transition"
                  onClick={() => handleApplyClick(job._id)}
                >
                  {openApplyJobId === job._id ? "Close Application" : "Apply Now"}
                </button>

                {openApplyJobId === job._id && (
                  <div className="mt-6">
                    <JobApplyCard jobId={job._id} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
