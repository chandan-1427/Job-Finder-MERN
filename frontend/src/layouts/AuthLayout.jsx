import React from "react";

export default function AuthLayout({
  children,
  title,
  description,
  illustrationSrc,
  logoSrc,
  logoAlt,
}) {
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

      {/* Left Side */}
      <div className="text-white flex flex-col justify-center items-start px-6 py-12 md:px-10 md:py-16 space-y-4 lg:space-y-6 lg:w-[55%] relative overflow-hidden">
        <div className="relative z-10 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
          {logoSrc && (
            <img
              src={logoSrc}
              alt={logoAlt || "Logo"}
              className="h-10 mb-4 rounded-full shadow-md"
            />
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-white/90 text-sm max-w-md">{description}</p>
        </div>

        {illustrationSrc && (
          <img
            src={illustrationSrc}
            alt="Illustration"
            className="mt-10 w-full max-w-md relative z-10 animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          />
        )}
      </div>

      {/* Right Side */}
      <div className="bg-transparent flex items-center justify-center px-6 py-12 lg:w-[45%] relative z-0">
        <div className="w-full max-w-sm md:max-w-md animate-slideInRight">
          {children}
        </div>
      </div>
    </div>
  );
}
