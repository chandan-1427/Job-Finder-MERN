import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Briefcase,
  Bell,
  UserCircle,
  Menu,
} from "lucide-react";
import Logo from "./Header/Logo";
import DesktopNav from "./Header/DesktopNav";
import MobileDrawer from "./Header/MobileDrawer";
import NotificationBadge from "./Header/NotificationBadge";

export default function Header() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
  {
    icon: <Home size={18} />,
    label: "Home",
    onClick: () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role === "user") navigate("/user/home");
      else if (user?.role === "employer") navigate("/employer/home");
      else navigate("/");
    },
  },
  {
    icon: <Briefcase size={18} />,
    label: "Jobs",
    onClick: () => navigate("/jobs"),
  },
  {
    icon: <NotificationBadge onClick={() => navigate("/notifications")} />,
    label: "Notifications",
    onClick: () => navigate("/notifications"),
  },
  {
    icon: <UserCircle size={18} />,
    label: "Profile",
    onClick: () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role === "user") navigate("/user-profile");
      else if (user?.role === "employer") navigate("/employer-profile");
    },
  },
];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transform transition-all duration-300 ${
          showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${
          scrolled
            ? "bg-[#4e342e]/95 py-4 shadow-md backdrop-blur-md"
            : "bg-[#4e342e]/95 py-5"
        } px-4 md:px-6 text-white text-sm md:text-base`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />

          <DesktopNav navItems={navItems} />

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
