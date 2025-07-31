import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-lime-500 via-red-400 to-red-600 p-4 shadow-lg h-24 flex items-center z-50 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-4 text-white font-bold">
          <img
            src="/cabai.png"
            alt="Logo Cabai"
            className="w-16 h-16 rounded-full object-cover border-4 border-white hover:scale-105 transition-transform duration-300"
          />
          <span className="text-2xl tracking-wide drop-shadow-sm">
            ChilliSense
          </span>
        </div>

        {/* Hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none hover:scale-110 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 text-white text-lg font-medium">
          {["/", "/contact", "/profile"].map((path, index) => (
            <Link
              key={index}
              to={path}
              className="hover:underline hover:text-yellow-200 transition-all duration-300 transform hover:scale-105"
            >
              {["Beranda", "Kontak", "Profil"][index]}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-red-500 text-white flex flex-col space-y-4 p-4 mt-2 absolute w-full left-0 top-24 z-40 transition-all duration-500 ease-in-out transform ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {["/", "/contact", "/profile"].map((path, index) => (
          <Link
            key={index}
            to={path}
            className="text-lg hover:text-yellow-200 transition duration-300 transform hover:scale-105"
            onClick={toggleMenu}
          >
            {["Beranda", "Kontak", "Profil"][index]}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
