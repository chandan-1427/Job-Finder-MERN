import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/logout";
import ProfileHeader from "./ProfileHeader";
import ProfileField from "./ProfileField";
import ProfileSection from "./ProfileSection";
import { LogOut } from "lucide-react";

export default function UserProfileView({ user, profile }) {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-4xl mx-auto font-[Outfit]">
      {/* Header with Logout Button */}
      <div className="flex justify-between items-center mb-6">
        <ProfileHeader
          name={user.name}
          role="Job Seeker"
          profilePicture={profile.profilePicture}
        />
          <button
            onClick={() => logout(navigate)}
            className="inline-flex items-center gap-2 border border-white text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-white hover:text-[#5d4037] transition"
          >
            <LogOut size={16} />
            Logout
          </button>
      </div>

      {/* Profile Sections */}
      <ProfileSection title="Basic Info">
        <ProfileField label="Email" value={user.email} />
        <ProfileField label="Phone" value={profile.phone} />
        <ProfileField label="Location" value={profile.location} />
        <ProfileField label="Date of Birth" value={profile.dob?.substring(0, 10)} />
      </ProfileSection>

      <ProfileSection title="Skills & Preferences">
        <ProfileField label="Skills" value={profile.skills?.join(", ")} />
        <ProfileField label="Languages" value={profile.languages?.join(", ")} />
        <ProfileField label="Job Type Preference" value={profile.jobTypePreference?.join(", ")} />
        <ProfileField label="Expected Salary" value={profile.expectedSalary} />
      </ProfileSection>

      <ProfileSection title="Online Links">
        <ProfileField label="LinkedIn" value={profile.linkedin} />
        <ProfileField label="GitHub" value={profile.github} />
        <ProfileField label="Website" value={profile.website} />
        <ProfileField label="Resume" value={profile.resumeUrl} />
      </ProfileSection>
    </div>
  );
}
