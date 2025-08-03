export default function PrimaryButton({ children, loading, ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="w-full bg-[#5d4037] text-white py-2 md:py-3 rounded-md font-medium transition duration-300 hover:bg-[#4e342e] shadow-md focus:outline-none focus:ring-2 focus:ring-[#5d4037]/50 disabled:opacity-50"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
