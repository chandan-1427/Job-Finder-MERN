export default function Logo({ className = "", height = 40 }) {
  return (
    <img
      src="/logo.png"
      alt="JobFinder Logo"
      className={`rounded-full shadow-sm ${className}`}
      style={{ height }}
    />
  );
}
