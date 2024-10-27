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
import { FaLock } from "react-icons/fa6";
import toast from "react-hot-toast";
import { studentRegister } from "../services/authService";
import { isAxiosError } from "axios";

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationForm>({
    candidateName: "",
    fathersName: "",
    mothersName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    confpassword: "",
    image: null,
    educationDetails: [{ qualification: "", board: "", yearOfPassing: "" }],
  });

  // handle input change
  const handleChange = (
    field: keyof RegistrationForm | "qualification" | "board" | "yearOfPassing",
    value: string | File,
    index?: number
  ) => {
    if (field === "image" && value instanceof File) {
      setFormData({ ...formData, image: value });
    } else if (
      index !== undefined &&
      (field === "qualification" ||
        field === "board" ||
        field === "yearOfPassing")
    ) {
      const updatedEducationDetails = [...formData.educationDetails];
      updatedEducationDetails[index] = {
        ...updatedEducationDetails[index],
        [field]: value,
      };
      setFormData({ ...formData, educationDetails: updatedEducationDetails });
    } else if (field in formData) {
      setFormData({ ...formData, [field]: value });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confpassword) {
      toast.error("Password do not match!");
      return;
    }
    try {
      const response = await studentRegister(formData);
      console.log(response);
      if (response.status === 201) {
        toast.success("Registration successful!");
        setFormData({
          candidateName: "",
          fathersName: "",
          mothersName: "",
          dateOfBirth: "",
          gender: "",
          address: "",
          phoneNumber: "",
          email: "",
          password: "",
          confpassword: "",
          image: null,
          educationDetails: [
            { qualification: "", board: "", yearOfPassing: "" },
          ],
        });
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const { response } = err;
        if (response) {
          const { status, data } = response;
          if (status === 400) {
            toast.error(
              data.message || "Bad Request. Please check your input."
            );
          } else if (status === 500) {
            toast.error("Internal Server Error. Please try again later.");
          } else {
            toast.error(data.message || "An unexpected error occurred.");
          }
        } else {
          toast.error(
            "No response from the server. Please check your network connection."
          );
        }
      } else {
        toast.error(
          "Error: " + (err instanceof Error ? err.message : "Unknown error")
        );
      }
    }
    console.log("Form Submitted:", formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
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
                id="candidateName"
                type="text"
                placeholder="Full Name"
                className="input"
                value={formData.candidateName}
                onChange={(e) => handleChange("candidateName", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="dob" className="text-sm text-gray-600 mb-2">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                className="input"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
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
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="phoneNumber"
                className="text-sm text-gray-600 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                placeholder="Phone Number"
                className="input"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm text-gray-600 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="input"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="photo" className="text-sm text-gray-600 mb-2">
                Photo
              </label>
              <input
                id="photo"
                type="file"
                className="input"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
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
                Permanent Address
              </label>
              <input
                id="address"
                type="text"
                className="input"
                placeholder="Present Address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
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
                      handleChange("qualification", e.target.value, index)
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
                      handleChange("board", e.target.value, index)
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
                      handleChange("yearOfPassing", e.target.value, index)
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="fatherName"
                className="text-sm text-gray-600 mb-2"
              >
                Father's Name
              </label>
              <input
                id="fathersName"
                type="text"
                className="input"
                placeholder="Father's Name"
                value={formData.fathersName}
                onChange={(e) => handleChange("fathersName", e.target.value)}
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
                id="mothersName"
                type="text"
                className="input"
                placeholder="Mother's Name"
                value={formData.mothersName}
                onChange={(e) => handleChange("mothersName", e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white shadow-lg rounded-xl p-8 border-t-4 border-purple-500 relative">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
            <FaLock className="text-purple-500" /> Password
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm text-gray-600 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="confpassword"
                className="text-sm text-gray-600 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confpassword"
                type="password"
                className="input"
                placeholder="Password"
                value={formData.confpassword}
                onChange={(e) => handleChange("confpassword", e.target.value)}
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
