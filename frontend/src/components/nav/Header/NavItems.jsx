import React from "react";

export default function NavItems({ navItems, onItemClick }) {
  return (
    <>
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.onClick();
            onItemClick?.(); // Optional close handler for mobile
          }}
          className="flex items-center gap-1 relative group transition-all duration-300"
        >
          {item.icon}
          <span className="hover:text-orange-200 transition">{item.label}</span>
          <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-orange-200 transition-all duration-300 group-hover:w-full"></span>
        </button>
      ))}
    </>
  );
}
