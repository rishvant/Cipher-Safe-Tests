import React from "react";

const featuresList = [
  "Advanced Encryption Techniques",
  "User-Friendly Interface",
  "Real-Time Monitoring",
  "Customizable Exam Formats",
  "Comprehensive Analytics",
];

const Features: React.FC = () => {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #000000 0%, #1e3a8a 100%)", // Same background as HeroSection
      }}
      className="py-20 text-white"
    >
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-8">Features</h3>
        <div className="w-full px-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-5">
          {featuresList.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h4 className="text-xl font-semibold mb-4">{feature}</h4>
              <p className="text-gray-200">
                Learn how this feature enhances your exam experience.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
