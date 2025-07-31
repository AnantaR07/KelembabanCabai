import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="bg-green-50 min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-6">
        <div className="bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full p-8 md:p-12 transition-transform duration-300 hover:scale-[1.01]">
          {/* Left - Kontak Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-green-700 mb-8">
              Hubungi Kami 🌱
            </h2>

            <div className="space-y-6 text-gray-700 text-lg">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-green-600 text-2xl mr-4" />
                <span>Malang, Jawa Timur</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-green-600 text-2xl mr-4" />
                <span>+62 856-9418-6118</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-green-600 text-2xl mr-4" />
                <span>info@website.com</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex space-x-6 mt-10">
              <a
                href="#"
                className="text-blue-600 text-2xl hover:scale-110 transition"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-sky-500 text-2xl hover:scale-110 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-pink-500 text-2xl hover:scale-110 transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Right - Ilustrasi */}
          <div className="flex items-center justify-center">
            <img
              src="/cabai.png"
              alt="Ilustrasi Kontak"
              className="w-64 h-64 object-contain rounded-full shadow-md border-4 border-green-100 hover:rotate-1 transition duration-300"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactInfo;
