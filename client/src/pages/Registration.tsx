import React, { useState } from "react";
import { RegistrationForm } from "../interfaces/RegistrationForm";

// icons
import {
  FaUser,
  FaAddressCard,
  FaGraduationCap,
  FaUserFriends,
  FaPlusCircle,
  FaTrashAlt,
} from "react-icons/fa";

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationForm>({
    personalDetails: { name: "", dob: "", gender: "" },
    addressDetails: { presentAddress: "", permanentAddress: "" },
    educationDetails: [{ qualification: "", board: "", yearOfPassing: "" }],
    parentDetails: { fatherName: "", motherName: "", contact: "" },
  });

  // handle input change
  const handleChange = (
    section: string,
    field: string,
    value: string,
    index?: number
  ) => {
    if (section === "educationDetails" && index !== undefined) {
      const newEducationDetails: any = [...formData.educationDetails];
      newEducationDetails[index][field] = value;
      setFormData((prev: any) => ({
        ...prev,
        educationDetails: newEducationDetails,
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    }
  };

  // add more education fields
  const addMoreEducation = () => {
    setFormData((prev: any) => ({
      ...prev,
      educationDetails: [
        ...prev.educationDetails,
        { qualification: "", board: "", yearOfPassing: "" },
      ],
    }));
  };

  // remove education field
  const removeEducation = (index: number) => {
    const newEducationDetails = formData.educationDetails.filter(
      (_, i) => i !== index
    );
    setFormData((prev: any) => ({
      ...prev,
      educationDetails: newEducationDetails,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen pt-20 md:pt-28 bg-gradient-to-b from-indigo-100 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-indigo-900">
        Exam Registration Form
      </h1>
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-12">
        {/* Personal Details Section */}
        <div className="bg-white shadow-lg rounded-xl p-8 border-t-4 border-indigo-600 relative">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
            <FaUser className="text-indigo-600" /> Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-gray-600 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                className="input"
                value={formData.personalDetails.name}
                onChange={(e) =>
                  handleChange("personalDetails", "name", e.target.value)
                }
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="dob" className="text-sm text-gray-600 mb-2">
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                className="input"
                value={formData.personalDetails.dob}
                onChange={(e) =>
                  handleChange("personalDetails", "dob", e.target.value)
                }
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="gender" className="text-sm text-gray-600 mb-2">
                Gender
              </label>
              <select
                id="gender"
                className="input"
                value={formData.personalDetails.gender}
                onChange={(e) =>
                  handleChange("personalDetails", "gender", e.target.value)
                }
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Details Section */}
        <div className="bg-white shadow-lg rounded-xl p-8 border-t-4 border-teal-500 relative">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
            <FaAddressCard className="text-teal-500" /> Address Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="presentAddress"
                className="text-sm text-gray-600 mb-2"
              >
                Present Address
              </label>
              <input
                id="presentAddress"
                type="text"
                className="input"
                placeholder="Present Address"
                value={formData.addressDetails.presentAddress}
                onChange={(e) =>
                  handleChange(
                    "addressDetails",
                    "presentAddress",
                    e.target.value
                  )
                }
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="permanentAddress"
                className="text-sm text-gray-600 mb-2"
              >
                Permanent Address
              </label>
              <input
                id="permanentAddress"
                type="text"
                className="input"
                placeholder="Permanent Address"
                value={formData.addressDetails.permanentAddress}
                onChange={(e) =>
                  handleChange(
                    "addressDetails",
                    "permanentAddress",
                    e.target.value
                  )
                }
                required
              />
            </div>
          </div>
        </div>

        {/* Education Details Section */}
        <div className="bg-white shadow-lg rounded-xl p-8 border-t-4 border-green-500 relative">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
            <FaGraduationCap className="text-green-500" /> Educational Details
          </h2>

          {formData.educationDetails.map((education, index) => (
            <div key={index} className="relative mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor={`qualification-${index}`}
                    className="text-sm text-gray-600 mb-2"
                  >
                    Qualification
                  </label>
                  <input
                    id={`qualification-${index}`}
                    type="text"
                    className="input"
                    placeholder="Qualification"
                    value={education.qualification}
                    onChange={(e) =>
                      handleChange(
                        "educationDetails",
                        "qualification",
                        e.target.value,
                        index
                      )
                    }
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor={`board-${index}`}
                    className="text-sm text-gray-600 mb-2"
                  >
                    Board
                  </label>
                  <input
                    id={`board-${index}`}
                    type="text"
                    className="input"
                    placeholder="Board"
                    value={education.board}
                    onChange={(e) =>
                      handleChange(
                        "educationDetails",
                        "board",
                        e.target.value,
                        index
                      )
                    }
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor={`yearOfPassing-${index}`}
                    className="text-sm text-gray-600 mb-2"
                  >
                    Year of Passing
                  </label>
                  <input
                    id={`yearOfPassing-${index}`}
                    type="text"
                    className="input"
                    placeholder="Year of Passing"
                    value={education.yearOfPassing}
                    onChange={(e) =>
                      handleChange(
                        "educationDetails",
                        "yearOfPassing",
                        e.target.value,
                        index
                      )
                    }
                    required
                  />
                </div>
              </div>
              {formData.educationDetails.length > 1 && (
                <button
                  type="button"
                  className="absolute top-0 right-0 text-red-600 hover:text-red-800"
                  onClick={() => removeEducation(index)}
                >
                  <FaTrashAlt className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-700 transition duration-200"
              onClick={addMoreEducation}
            >
              <FaPlusCircle /> Add More Education
            </button>
          </div>
        </div>

        {/* Parent Details Section */}
        <div className="bg-white shadow-lg rounded-xl p-8 border-t-4 border-pink-500 relative">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
            <FaUserFriends className="text-pink-500" /> Parent Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="fatherName"
                className="text-sm text-gray-600 mb-2"
              >
                Father's Name
              </label>
              <input
                id="fatherName"
                type="text"
                className="input"
                placeholder="Father's Name"
                value={formData.parentDetails.fatherName}
                onChange={(e) =>
                  handleChange("parentDetails", "fatherName", e.target.value)
                }
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="motherName"
                className="text-sm text-gray-600 mb-2"
              >
                Mother's Name
              </label>
              <input
                id="motherName"
                type="text"
                className="input"
                placeholder="Mother's Name"
                value={formData.parentDetails.motherName}
                onChange={(e) =>
                  handleChange("parentDetails", "motherName", e.target.value)
                }
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="contact" className="text-sm text-gray-600 mb-2">
                Contact Number
              </label>
              <input
                id="contact"
                type="text"
                className="input"
                placeholder="Contact Number"
                value={formData.parentDetails.contact}
                onChange={(e) =>
                  handleChange("parentDetails", "contact", e.target.value)
                }
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-8 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
