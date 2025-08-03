import { User, Briefcase } from "lucide-react";

export default function RoleToggle({ role, setRole }) {
  return (
    <div className="flex justify-between gap-4 mb-6">
      <button
        type="button"
        onClick={() => setRole("user")}
        className={`flex-1 px-4 py-3 border rounded-md flex items-center justify-center gap-2 transition-all duration-300 ${
          role === "user"
            ? "bg-[#5d4037] text-white shadow-md scale-[1.03]"
            : "border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
      >
        <User size={20} />
        Job Seeker
      </button>
      <button
        type="button"
        onClick={() => setRole("employer")}
        className={`flex-1 px-4 py-3 border rounded-md flex items-center justify-center gap-2 transition-all duration-300 ${
          role === "employer"
            ? "bg-[#5d4037] text-white shadow-md scale-[1.03]"
            : "border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Briefcase size={20} />
        Employer
      </button>
    </div>
  );
}
