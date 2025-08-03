export default function ProfileField({ label, value }) {
  return (
    <div className="mb-3">
      <label className="text-white font-medium">{label}</label>
      <p className="text-gray-100">{value || "—"}</p>
    </div>
  );
}
