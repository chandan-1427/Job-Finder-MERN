import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
        alt="JobFinder Logo"
        className="h-8 w-8 rounded-full shadow-sm"
      />
      <span className="text-lg font-semibold tracking-wide">JobFinder</span>
    </div>
  );
}
