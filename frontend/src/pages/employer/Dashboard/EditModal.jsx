import React from "react";

export default function EditJobModal({ job, onClose, onChange, onSubmit }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center px-4 py-8 overflow-y-auto">
      <div className="bg-white text-black rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-bold text-center text-[#5d4037]">Edit Job</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="title"
            value={job.title}
            onChange={onChange}
            placeholder="Job Title"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="description"
            value={job.description}
            onChange={onChange}
            placeholder="Job Description"
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="location"
            value={job.location}
            onChange={onChange}
            placeholder="Location"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="jobType"
            value={job.jobType}
            onChange={onChange}
            placeholder="Job Type (e.g., Full-Time)"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="salaryRange"
            value={job.salaryRange}
            onChange={onChange}
            placeholder="Salary Range (e.g., 50K-80K)"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="skillsRequired"
            value={job.skillsRequired}
            onChange={onChange}
            placeholder="Skills Required (comma separated)"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="openings"
            type="number"
            value={job.openings}
            onChange={onChange}
            placeholder="Number of Openings"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="deadline"
            type="date"
            value={job.deadline?.slice(0, 10)}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#5d4037] text-white hover:bg-[#402c26] transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
