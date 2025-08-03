import { useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileField from "./ProfileField";
import ProfileSection from "./ProfileSection";
import { logout } from "../../utils/logout";
import { LogOut } from "lucide-react";

export default function EmployerProfileView({ user, profile }) {
  const formatValue = (value) => value || "-";
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5d4037] to-[#4e342e] px-6 py-10 text-white font-[Outfit]">
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center">
          <ProfileHeader
            name={profile.companyName || user.name}
            role="Employer"
            profilePicture={profile.logoUrl}
          />
          <button
            onClick={() => logout(navigate)}
            className="inline-flex items-center gap-2 border border-white text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-white hover:text-[#5d4037] transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Profile Info */}
        <div className="bg-white/10 backdrop-blur p-6 rounded-xl shadow-md space-y-6">
          <ProfileSection title="Company Info">
            <ProfileField
              label="Company Email"
              value={
                profile.companyEmail ? (
                  <a
                    href={`mailto:${profile.companyEmail}`}
                    className="text-blue-300 hover:underline"
                  >
                    {profile.companyEmail}
                  </a>
                ) : (
                  "-"
                )
              }
            />
            <ProfileField label="Phone" value={formatValue(profile.companyPhone)} />
            <ProfileField label="Location" value={formatValue(profile.location)} />
            <ProfileField label="Industry" value={formatValue(profile.industry)} />
            <ProfileField label="Team Size" value={formatValue(profile.teamSize)} />
            <ProfileField
              label="Website"
              value={
                profile.companyWebsite ? (
                  <a
                    href={profile.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:underline"
                  >
                    {profile.companyWebsite}
                  </a>
                ) : (
                  "-"
                )
              }
            />
            <ProfileField
              label="Verified"
              value={
                profile.verified ? (
                  <span className="text-green-300 font-semibold">Yes</span>
                ) : (
                  <span className="text-red-300 font-semibold">No</span>
                )
              }
            />
          </ProfileSection>

          <ProfileSection title="About Company">
            <ProfileField label="Description" value={formatValue(profile.description)} />
          </ProfileSection>
        </div>
      </div>
    </div>
  );
}
