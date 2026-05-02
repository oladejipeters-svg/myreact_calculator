import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-linear-to-r from-amber-900 to-yellow-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-amber-50 drop-shadow-lg">
              🧮 Scientific Calculator
            </h1>
            <div className="hidden md:flex gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-amber-100 font-semibold border-b-2 border-amber-100 pb-2"
                    : "text-amber-50 hover:text-amber-100 transition-colors"
                }
              >
                Calculator
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
