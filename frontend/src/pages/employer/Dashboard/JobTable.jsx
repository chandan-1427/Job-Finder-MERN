// components/JobTable.jsx
import React from "react";
import { Edit, Trash2, Eye } from "lucide-react";

export default function JobTable({ jobs, onEdit, onDelete, onView }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-white text-sm bg-white/5 rounded-xl overflow-hidden">
        <thead className="bg-white/10">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2">Applicants</th>
            <th className="px-4 py-2">Posted On</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id} className="border-t border-white/10">
              <td className="px-4 py-2">{job.title}</td>
              <td className="px-4 py-2 text-center">{job.applications?.length || 0}</td>
              <td className="px-4 py-2 text-center">
                {new Date(job.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(job)}
                  className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-white flex items-center gap-1"
                >
                  <Edit size={14} /> Edit
                </button>
                <button
                  onClick={() => onDelete(job._id)}
                  className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-white flex items-center gap-1"
                >
                  <Trash2 size={14} /> Delete
                </button>
                <button
                  onClick={() => onView(job._id)}
                  className="bg-green-500 hover:bg-green-600 px-2 py-1 rounded text-white flex items-center gap-1"
                >
                  <Eye size={14} /> Applicants
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
