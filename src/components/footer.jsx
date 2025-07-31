import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white py-6 shadow-inner">
      <div className="container mx-auto px-4 text-center">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm font-medium tracking-wide">
          <Link
            to="/"
            className="hover:text-orange-400 transition duration-300"
          >
            Beranda
          </Link>
          <Link
            to="/profile"
            className="hover:text-orange-400 transition duration-300"
          >
            Profil
          </Link>
          <Link
            to="/contact"
            className="hover:text-orange-400 transition duration-300"
          >
            Kontak
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Pemantauan Tanaman. Semua hak
          dilindungi.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
