import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#593328] text-white py-6 px-6 font-[Outfit]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left side: copyright */}
        <p className="text-sm md:text-base text-white/80">
          &copy; {new Date().getFullYear()} JobFinder. All rights reserved.
        </p>

        {/* Right side: nav links */}
        <div className="flex gap-6 text-sm md:text-base font-medium">
          {["Privacy", "Terms", "Support"].map((label, index) => (
            <a
              key={index}
              href="#"
              className="relative group transition-all duration-300"
            >
              <span className="hover:text-orange-200 transition">{label}</span>
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-orange-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
