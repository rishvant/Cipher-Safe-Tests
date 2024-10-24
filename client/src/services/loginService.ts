import axios from "axios";
import { LoginForm } from "../interfaces/Login";
import { API_BASE_URI } from "../utils/API";

export const studentLogin = async (form: LoginForm): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URI}/student/login`, form);
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 500) {
        throw new Error(error.response.data.message || "Roll Number or Password is incorrect!");
      }
      throw new Error(error.response?.data.message || "Login failed");
    } else {
      throw new Error("Network error. Please try again later.");
    }
  }
};
