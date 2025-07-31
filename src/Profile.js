import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const Profile = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 p-10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300">
          {/* Foto Profil */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative">
              <img
                src="/faisal.jpeg"
                alt="Foto Diri"
                className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-green-300 shadow-lg transition duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full ring-4 ring-green-200 animate-pulse blur-sm"></div>
            </div>
            <p className="mt-4 text-sm text-gray-500 italic">
              "Bersemangat tentang teknologi dan inovasi."
            </p>
          </div>

          {/* Biodata */}
          <div className="text-gray-700 space-y-3 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-green-800">
              NAMA: FAISAL FIRMANSYAH
            </h2>
            <p className="text-md">👤 Umur: 25 Tahun</p>
            <p className="text-md">📍 Alamat: Malang, Jawa Timur</p>
            <p className="text-md">💼 Profesi: Web Developer</p>

            <div className="mt-6">
              <div className="flex space-x-4 text-2xl">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href="#"
                  className="text-sky-500 hover:text-sky-700 transition"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-pink-500 hover:text-pink-700 transition"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
