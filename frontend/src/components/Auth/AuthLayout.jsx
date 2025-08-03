import React from "react";

export default function AuthLayout({ children, title, description, illustrationSrc, logoSrc, logoAlt }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-[Outfit] bg-[#efebe9] fade-in">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

        body { font-family: 'Outfit', sans-serif; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out both;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out both;
        }

        @media (min-width: 1024px) {
          .lg\\:sloped-bg {
            clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);
          }
        }
        `}
      </style>

      {/* Left Section */}
      <div className="bg-gradient-to-br from-[#6d4c41] to-[#4e342e] text-white flex flex-col justify-center items-start px-6 py-12 md:px-10 md:py-16 space-y-4 lg:space-y-6 lg:w-[55%] relative overflow-hidden lg:sloped-bg">
        <div className="absolute inset-0 bg-[#3e2723] opacity-20 transform -skew-x-12 scale-150 hidden lg:block"></div>

        <div className="relative z-10 animate-slideInRight" style={{ animationDelay: "0.1s" }}>
          {logoSrc && (
            <img
              src={logoSrc}
              alt={logoAlt || "Logo"}
              className="h-8 md:h-10 mb-2 md:mb-4 rounded-full shadow-md"
            />
          )}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight lg:leading-snug">
            {title}
          </h1>
          <p className="mt-2 md:mt-4 text-white/90 text-sm max-w-xs md:max-w-md">{description}</p>
        </div>

        {illustrationSrc && (
          <img
            src={illustrationSrc}
            alt="Illustration"
            className="mt-6 md:mt-10 w-full max-w-xs md:max-w-md relative z-10 animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          />
        )}
      </div>

      {/* Right Section */}
      <div className="bg-white flex items-center justify-center px-6 py-12 lg:w-[45%] relative z-0">
        <div className="w-full max-w-sm md:max-w-md animate-slideInRight">{children}</div>
      </div>
    </div>
  );
}
