export default function ProfileSection({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-[#4a271c] mb-4 border-b pb-1">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}
