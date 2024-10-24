import React from "react";
import heroIcon from "../assets/hero2.png";

// Keyframes for background animation
const heroSectionStyle = {
  background: "linear-gradient(135deg, #000000 0%, #1e3a8a 100%)", // Adjust the colors as needed
};

const HeroSection: React.FC = () => {
  return (
    <section
      style={heroSectionStyle}
      className="text-white h-screen flex items-center justify-center text-center relative overflow-hidden"
    >
      <div className="relative h-full top-52 z-10">
        <h2 className="text-4xl font-bold mb-4 animate-fade-in">
          Welcome to Cipher Safe Tests
        </h2>
        <p className="text-lg mb-8 animate-fade-in delay-200">
          Your secure online exam portal utilizing advanced cryptography
          techniques to prevent exam leaks.
        </p>
        <a
          href="#features"
          className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold transition-transform transform hover:scale-105"
        >
          Discover More
        </a>
        <div className="flex items-center justify-center mt-16">
          <img src={heroIcon} className="w-40" />
        </div>
      </div>

      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-blue-700 opacity-30 animate-pulse"></div>
    </section>
  );
};

export default HeroSection;
