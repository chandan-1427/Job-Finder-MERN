import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import EditJobModal from "./Dashboard/EditModal";
import JobTable from "./Dashboard/JobTable";
import ApplicantsModal from "./Dashboard/ApplicantsModal";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null); // for ApplicantsModal

  const navigate = useNavigate();

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

  const handleEditJob = (job) => {
    setEditJob(job);
    setShowEditModal(true);
  };

  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs();
    } catch (err) {
      console.error("Failed to delete job", err);
      alert("Error deleting job.");
    }
  };

  const handleViewApplications = (jobId) => {
    setSelectedJobId(jobId); // Show modal for selected job
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/jobs/${editJob._id}`, editJob, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowEditModal(false);
      setEditJob(null);
      fetchJobs();
    } catch (err) {
      console.error("Failed to update job", err);
      alert("Error updating job.");
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditJob(null);
  };

  const handleChange = (e) => {
    setEditJob({ ...editJob, [e.target.name]: e.target.value });
  };

  return (
    <div className="animate-fadeIn px-6 py-10 max-w-6xl mx-auto font-[Outfit] text-white">
      <h2 className="text-2xl font-bold mb-6">Your Posted Jobs</h2>

      {loading ? (
        <p className="text-white/70">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-white/70">No jobs posted yet.</p>
      ) : (
        <JobTable
          jobs={jobs}
          onEdit={handleEditJob}
          onDelete={handleDeleteJob}
          onView={handleViewApplications}
        />
      )}

      {/* Edit Job Modal */}
      <EditJobModal
        job={editJob}
        onClose={handleCloseModal}
        onChange={handleChange}
        onSubmit={handleEditSubmit}
      />

      {/* Applicants Modal */}
      <ApplicantsModal
        jobId={selectedJobId}
        onClose={() => setSelectedJobId(null)}
      />
    </div>
  );
}
