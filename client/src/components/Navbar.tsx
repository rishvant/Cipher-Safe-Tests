import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiSecurePaymentLine } from "react-icons/ri";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 md:top-5 left-0 md:right-0 md:mx-auto md:w-11/12 w-full bg-blue-600 md:bg-opacity-70 md:backdrop-blur-lg text-white shadow-md z-50 md:rounded-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <RiSecurePaymentLine className="text-[2rem]" />
          <span className="ml-3 text-xl font-bold">Cipher Safe Tests</span>
        </div>
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex md:space-x-4">
          <Link to="/" className="px-4 py-2 hover:bg-blue-700">
            Home
          </Link>
          <Link to="/registration" className="px-4 py-2 hover:bg-blue-700">
            Registration
          </Link>
          <Link to="/contact" className="px-4 py-2 hover:bg-blue-700">
            Contact Us
          </Link>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-blue-600 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        onClick={closeMenu}
      >
        <div className="absolute top-0 left-0 w-full p-4">
          <button
            onClick={closeMenu}
            className="text-black focus:outline-none absolute top-4 right-4"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center mt-16">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-blue-700"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/registration"
            className="block px-4 py-2 hover:bg-blue-700"
            onClick={closeMenu}
          >
            Registration
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 hover:bg-blue-700"
            onClick={closeMenu}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
