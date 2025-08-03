import React from "react";
import Header from '../components/nav/Header';
import Footer from '../components/nav/Footer'

// AuthLayout Component
function AuthLayout({ children, title, description, illustrationSrc, logoSrc, logoAlt }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-[Outfit] bg-gradient-to-br from-[#5d4037] to-[#4e342e]">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

        body {
          font-family: 'Outfit', sans-serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        `}
      </style>

      {/* Left Section */}
      <div className="text-white flex flex-col justify-center items-start px-6 py-12 md:px-10 md:py-16 space-y-4 lg:space-y-6 lg:w-[55%] relative overflow-hidden">
        <div className="relative z-10 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
          {logoSrc && (
            <img
              src={logoSrc}
              alt={logoAlt || "JobFinder Logo"}
              className="h-10 mb-4 rounded-full shadow-md"
            />
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-white/90 text-sm max-w-md">
            {description}
          </p>
        </div>

        {illustrationSrc && (
          <img
            src={illustrationSrc}
            alt="Job illustration"
            className="mt-10 w-full max-w-md relative z-10 animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          />
        )}
      </div>

      {/* Right Section */}
      <div className="bg-transparent flex items-center justify-center px-6 py-12 lg:w-[45%] relative z-0">
        <div className="w-full max-w-sm md:max-w-md animate-slideInRight">
          {children}
        </div>
      </div>
    </div>
  );
}

// Reusable Input Field
function InputField({ label, id, type = "text", placeholder, required = false, hint, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-white block mb-1">
        {label}
        {required && <span className="text-red-300">*</span>}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white transition duration-150 text-gray-900"
        {...props}
      />
      {hint && <p className="text-xs text-white/70 mt-1">{hint}</p>}
    </div>
  );
}

function HomePage({ onNavigate }) {
  return (
    <AuthLayout
      logoSrc="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" // Free generic job logo icon
      logoAlt="JobFinder Logo"
      title={
        <>
          Discover & Hire <br /> Top Talent
        </>
      }
      description="Welcome to JobFinder – where talent meets opportunity. Whether you're searching for your dream job or the perfect hire, we've got you covered."
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center font-[Outfit]">Join the Platform</h2>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
        <button
          onClick={() => onNavigate('register')}
          className="w-full sm:w-auto px-8 py-3 bg-white text-[#5d4037] rounded-lg font-medium text-lg shadow-md hover:bg-gray-200 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
        >
          Create Account
        </button>
        <button
          onClick={() => onNavigate('login')}
          className="w-full sm:w-auto px-8 py-3 border-2 border-white text-white rounded-lg font-medium text-lg shadow-md hover:bg-white hover:text-[#5d4037] transition duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
        >
          Log In
        </button>
      </div>

      <p className="mt-8 text-base md:text-lg text-center text-white/90 font-[Outfit]">
        Empowering job seekers & employers every day.
      </p>
    </AuthLayout>
  );
}

export default HomePage;
