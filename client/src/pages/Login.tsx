import React, { useState } from "react";
import { LoginForm } from "../interfaces/Login";
import { studentLogin } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({
    rollNo: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.rollNo || !form.password) {
      setError("Please enter both Roll No. and Password.");
      return;
    }

    try {
      const response = await studentLogin(form);
      console.log("Login successful:", response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.data.student)
        );
        navigate("/student/profile");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #000000 0%, #1e3a8a 100%)",
      }}
      className="h-screen py-20 pt-40 px-5 text-white"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Login to Your Account</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-gray-800 p-8 rounded-md shadow-md"
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-left mb-1">
              Roll Number
            </label>
            <input
              type="text"
              id="rollNo"
              value={form.rollNo}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-md"
              placeholder="Enter your roll number"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-left mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-md transition-all duration-300"
          >
            Login
          </button>
          <p className="mt-4 text-sm">
            Don't have an account?{" "}
            <a href="/registration" className="text-blue-400">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
