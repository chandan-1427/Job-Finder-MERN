export default function ProfileHeader({ name, role, profilePicture }) {
  const imageSrc = profilePicture?.startsWith("http")
    ? profilePicture
    : `http://localhost:5000${profilePicture || "/default-avatar.png"}`;

  return (
    <div className="flex items-center gap-4 mb-6">
      <img
        src={imageSrc}
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow"
      />
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-gray-300 capitalize">{role}</p>
      </div>
    </div>
  );
}
