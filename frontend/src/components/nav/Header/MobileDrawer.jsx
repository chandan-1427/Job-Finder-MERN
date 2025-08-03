import React from "react";
import { X } from "lucide-react";
import Logo from "./Logo";
import NavItems from "./NavItems";

export default function MobileDrawer({ isOpen, onClose, navItems }) {
  return (
    <>
      {/* Sidebar Drawer (from left) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#4e342e] text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with Logo & Close */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <Logo />
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col mt-4 gap-2 px-4">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                onClose();
              }}
              className="flex items-center gap-2 relative px-2 py-2 rounded-md transition-all duration-300 group"
            >
              {item.icon}
              <span className="group-hover:text-orange-200 transition">{item.label}</span>
              <span className="absolute bottom-1 left-0 w-0 h-[2px] bg-orange-200 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>
      </div>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
