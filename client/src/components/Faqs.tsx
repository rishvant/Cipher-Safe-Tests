import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";

interface FAQItem {
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    question: "What is Cipher Safe Tests?",
    answer:
      "Cipher Safe Tests is an online exam platform that utilizes advanced cryptography techniques to ensure secure assessments.",
  },
  {
    question: "How do I create an account?",
    answer:
      "To create an account, simply click on the 'Sign Up' button on the homepage and fill out the required information.",
  },
  {
    question: "What security measures are in place?",
    answer:
      "We employ advanced encryption and security protocols to protect your data and ensure the integrity of the exam process.",
  },
  {
    question: "Can I retake an exam?",
    answer:
      "Yes, users can retake exams according to the policies set by the exam administrator.",
  },
];

const FAQ: React.FC = () => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    if (activeIndexes.includes(index)) {
      // Remove the index if already active
      setActiveIndexes(activeIndexes.filter((i) => i !== index));
    } else {
      // Add the index to activeIndexes
      setActiveIndexes([...activeIndexes, index]);
    }
  };

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #000000 0%, #1e3a8a 100%)", // Same background as previous sections
      }}
      className="py-20 text-white"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="w-full pl-[20%]">
          {faqList.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-[80%] text-left p-4 bg-blue-600 rounded-md shadow-md hover:bg-blue-500 transition-all duration-300 flex items-center justify-between"
              >
                <h4 className="font-semibold">{faq.question}</h4>
                {/* Using Font Awesome icons for plus/minus */}
                <FaPlus
                  className={`${
                    activeIndexes.includes(index) ? "rotate-180" : ""
                  } transition-transform duration-[700ms]`}
                />
              </button>
              {activeIndexes.includes(index) && (
                <div className="w-[80%] mt-2 p-4 bg-gray-800 rounded-md shadow-md">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
