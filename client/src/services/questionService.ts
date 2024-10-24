import axios from "axios";
import { API_BASE_URI } from "../utils/API";

export const getQuestions = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URI}/question/get-questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 500) {
        throw new Error(
          error.response.data.message ||
            "An error occurred while fetching questions!"
        );
      }
      throw new Error(
        error.response?.data.message || "Failed to fetch questions"
      );
    } else {
      throw new Error("Network error. Please try again later.");
    }
  }
};
