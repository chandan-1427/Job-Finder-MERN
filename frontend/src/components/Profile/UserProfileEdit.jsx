import React, { useEffect, useState } from "react";
import axios from "axios";
import InputField from "../Form/InputField";

export default function UserProfileEdit({ profile: initialProfile, onSuccess }) {
  const [profile, setProfile] = useState({});
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialProfile) {
      setProfile({
        ...initialProfile,
        skills: (initialProfile.skills || []).join(", "),
        languages: (initialProfile.languages || []).join(", "),
        dob: initialProfile.dob ? new Date(initialProfile.dob).toISOString().split("T")[0] : "",
      });
      setPreviewUrl(initialProfile.profilePicture || "");
    }
  }, [initialProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});

    try {
      const token = localStorage.getItem("token");

      // 1. Update user profile (text fields)
      const payload = {
        ...profile,
        skills: profile.skills.split(",").map((s) => s.trim()),
        languages: profile.languages.split(",").map((l) => l.trim()),
      };

      const { data: updatedProfile } = await axios.put(
        "http://localhost:5000/api/profile/user/update",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2. Upload profile picture (if any selected)
      if (profilePictureFile) {
        const formData = new FormData();
        formData.append("profilePicture", profilePictureFile);

        const { data: imageUpload } = await axios.post(
          "http://localhost:5000/api/profile/user/upload-profile-picture",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        updatedProfile.profilePicture = imageUpload.profilePicture;
      }

      // 3. Update local state
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setProfile({
        ...updatedProfile,
        skills: (updatedProfile.skills || []).join(", "),
        languages: (updatedProfile.languages || []).join(", "),
        dob: updatedProfile.dob ? new Date(updatedProfile.dob).toISOString().split("T")[0] : "",
      });
      setPreviewUrl(updatedProfile.profilePicture || "");

      if (onSuccess) onSuccess();
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
      Edit Your Profile
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
      {/* Profile Picture Upload */}
      <div className="col-span-full">
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Profile Picture
        </label>
        <div className="flex items-center gap-4">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300 text-gray-400">
              <span className="text-xs">No Image</span>
            </div>
          )}

          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-[#5d4037] file:text-white hover:file:bg-[#4e342e] cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG or GIF. Max 5MB.
            </p>
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <InputField
        label="Phone"
        id="phone"
        name="phone"
        value={profile.phone || ""}
        onChange={handleChange}
      />

      <InputField
        label="Location"
        id="location"
        name="location"
        value={profile.location || ""}
        onChange={handleChange}
      />

      <InputField
        label="Date of Birth"
        id="dob"
        name="dob"
        type="date"
        value={profile.dob || ""}
        onChange={handleChange}
      />

      <InputField
        label="Skills (comma-separated)"
        id="skills"
        name="skills"
        value={profile.skills || ""}
        onChange={handleChange}
      />

      <InputField
        label="Languages (comma-separated)"
        id="languages"
        name="languages"
        value={profile.languages || ""}
        onChange={handleChange}
      />

      <InputField
        label="Job Type Preference"
        id="jobTypePreference"
        name="jobTypePreference"
        value={profile.jobTypePreference || ""}
        onChange={handleChange}
      />

      <InputField
        label="LinkedIn"
        id="linkedin"
        name="linkedin"
        type="url"
        value={profile.linkedin || ""}
        onChange={handleChange}
      />

      <InputField
        label="GitHub"
        id="github"
        name="github"
        type="url"
        value={profile.github || ""}
        onChange={handleChange}
      />

      <InputField
        label="Website"
        id="website"
        name="website"
        type="url"
        value={profile.website || ""}
        onChange={handleChange}
      />

      <InputField
        label="Resume URL"
        id="resumeUrl"
        name="resumeUrl"
        type="url"
        value={profile.resumeUrl || ""}
        onChange={handleChange}
      />

      <InputField
        label="Expected Salary"
        id="expectedSalary"
        name="expectedSalary"
        type="number"
        value={profile.expectedSalary || ""}
        onChange={handleChange}
      />

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
