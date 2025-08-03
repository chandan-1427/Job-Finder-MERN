import React from "react";

export default function InputField({ label, id, type = "text", placeholder, required = false, hint, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700 block mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5d4037] transition duration-150"
        {...props}
      />
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}
