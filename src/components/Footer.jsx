import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-linear-to-r from-amber-900 to-yellow-700 text-amber-50 mt-6 border-t border-yellow-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base font-semibold text-yellow-300">
              🧮 Calculator
            </h3>
            <p className="text-[0.72rem] md:text-sm text-amber-100">
              Compact scientific calculator with Goldenwoody styling
            </p>
          </div>

          <div className="space-y-1 text-center md:text-center">
            <h3 className="text-base font-semibold text-yellow-300">
              Quick Links
            </h3>
            <NavLink
              to="/"
              className="text-amber-100 hover:text-yellow-300 transition-colors text-[0.72rem] md:text-sm"
            >
              → Home
            </NavLink>
          </div>

          <div className="space-y-1 text-center md:text-right">
            <h3 className="text-base font-semibold text-yellow-300">
              Tech Stack
            </h3>
            <p className="text-[0.72rem] md:text-sm text-amber-100">
              React · TailwindCSS · React Router
            </p>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-yellow-600 text-center text-[0.68rem] text-amber-100">
          © {new Date().getFullYear()} Scientific Calculator | Designed by
          Olusoga-Peters
        </div>
      </div>
    </footer>
  );
}

export default Footer;
