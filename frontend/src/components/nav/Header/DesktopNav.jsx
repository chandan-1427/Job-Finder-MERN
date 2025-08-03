import React from "react";
import NavItems from "./NavItems";

export default function DesktopNav({ navItems }) {
  return (
    <nav className="hidden md:flex gap-12 font-medium items-center">
      <NavItems navItems={navItems} />
    </nav>
  );
}
