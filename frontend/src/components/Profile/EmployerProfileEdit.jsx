import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EmployerProfileEdit({ profile: initialProfile, onSuccess }) {
  const [profile, setProfile] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
      setPreview(initialProfile.logoUrl);
    }
  }, [initialProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreview(URL.createObjectURL(file)); // live preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});

    try {
      const token = localStorage.getItem("token");

      // 1. Update text fields
      const { data: updatedProfile } = await axios.put(
        "http://localhost:5000/api/profile/employer/update",
        profile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 2. Upload logo (if selected)
      if (logoFile) {
        const formData = new FormData();
        formData.append("logo", logoFile);

        await axios.post(
          "http://localhost:5000/api/profile/employer/upload-logo",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      setMessage({ type: "success", text: "Profile updated successfully!" });
      if (onSuccess) onSuccess(); // refresh in parent
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Update failed. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <p className="p-4">Loading profile...</p>;

  return (
  <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl font-[Outfit]">
    <h2 className="text-3xl font-bold mb-6 text-[#5d4037] text-center">
      Edit Company Profile
    </h2>

    {message.text && (
      <p
        className={`mb-6 text-sm text-center ${
          message.type === "success" ? "text-green-600" : "text-red-600"
        }`}
      >
        {message.text}
      </p>
    )}

    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Company Logo Upload */}
      <div className="col-span-full">
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Company Logo
        </label>
        <div className="flex items-center gap-4">
          {preview ? (
            <img
              src={preview}
              alt="Logo Preview"
              className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300 text-gray-400">
              <span className="text-xs">No Logo</span>
            </div>
          )}

          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-[#5d4037] file:text-white hover:file:bg-[#4e342e] cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG or SVG. Max 5MB.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={profile.companyName || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">Company Email</label>
        <input
          type="email"
          name="companyEmail"
          value={profile.companyEmail || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">Phone</label>
        <input
          type="text"
          name="companyPhone"
          value={profile.companyPhone || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">Location</label>
        <input
          type="text"
          name="location"
          value={profile.location || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">Industry</label>
        <input
          type="text"
          name="industry"
          value={profile.industry || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">Team Size</label>
        <input
          type="number"
          name="teamSize"
          value={profile.teamSize || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          min={1}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-800">Company Website</label>
        <input
          type="url"
          name="companyWebsite"
          value={profile.companyWebsite || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="md:col-span-2">
        <label className="text-sm font-medium text-gray-800">Description</label>
        <textarea
          name="description"
          rows="4"
          value={profile.description || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Submit Button */}
      <div className="col-span-full mt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#5d4037] text-white py-3 rounded-md text-center font-semibold hover:bg-[#4e342e] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  </div>
);

}
