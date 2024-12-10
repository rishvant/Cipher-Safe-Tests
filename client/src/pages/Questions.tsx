import React, { useEffect, useRef, useState } from "react";
import { getQuestions } from "../services/questionService";
import axios from "axios";

interface Option {
  value: string;
  label: string;
}

interface Question {
  text: string;
  options: Option[];
}

const QuestionExamPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [questionStatuses, setQuestionStatuses] = useState<string[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<(Option | null)[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(2700);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : "";

  useEffect(() => {
    fetchQuestions();

    // Initialize WebSocket connection
    const ws = new WebSocket("http://localhost:3000");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connection established.");
      const studentId = user?.rollNo;
      ws.send(JSON.stringify({ studentid: studentId }));
    };

    ws.onmessage = (event) => {
      const message = event.data;
      console.log("Message received from WebSocket:", message);

      if (message === "positive") {
        setModalMessage(
          "Congratulations! You have received a positive result."
        );
        setIsResultModalOpen(true);
      } else if (message === "negative") {
        setModalMessage("Unfortunately, your result is negative. Keep trying!");
        setIsResultModalOpen(true);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      ws.close();
    };
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await getQuestions();
      const fetchedQuestions: Question[] = [];
      console.log(response.data.questions[0]);

      const subjectsData = response.data.questions[0];

      // Flatten the received questions into a usable format
      for (const subject in subjectsData) {
        const questionsArray = subjectsData[subject]; // Access the array for each subject

        // Ensure it's an array before using forEach
        if (Array.isArray(questionsArray)) {
          questionsArray.forEach((q: any) => {
            const options: Option[] = [
              { value: q.option1, label: q.option1 },
              { value: q.option2, label: q.option2 },
              { value: q.option3, label: q.option3 },
              { value: q.option4, label: q.option4 },
            ];
            fetchedQuestions.push({ text: q.text, options });
          });
        } else {
          console.error(
            `Expected an array for ${subject}, but got:`,
            questionsArray
          );
        }
      }

      setQuestions(fetchedQuestions);
      setQuestionStatuses(
        new Array(fetchedQuestions.length).fill("unanswered")
      );
      setSelectedAnswers(new Array(fetchedQuestions.length).fill(null));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setSelectedOption(selectedAnswers[currentQuestionIndex]);
  }, [currentQuestionIndex, selectedAnswers]);

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = (status: string = "answered") => {
    const updatedStatuses = [...questionStatuses];
    if (selectedOption !== null && status === "answered") {
      updatedStatuses[currentQuestionIndex] = "answered";
    } else if (status === "markedForReview") {
      updatedStatuses[currentQuestionIndex] = "markedForReview";
    }
    setQuestionStatuses(updatedStatuses);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

      // Send data to WebSocket on moving to the next question
      if (wsRef.current) {
        wsRef.current.send(
          JSON.stringify({
            studentid: user?.rollNo,
            questionIndex: currentQuestionIndex + 1,
          })
        );
      }
    }
  };

  // Function to send data to the REST API server
  const sendAnswerToServer = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/submitAnswer",
        data
      );
      console.log("Answer submitted successfully:", response.data);
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };
  // };

  const handleReviewLater = () => {
    handleSubmit("markedForReview");
  };

  const handleQuestionClick = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const getAnsweredCount = () =>
    questionStatuses.filter((status) => status === "answered").length;
  const getUnansweredCount = () =>
    questionStatuses.filter((status) => status === "unanswered").length;
  const getMarkedForReviewCount = () =>
    questionStatuses.filter((status) => status === "markedForReview").length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Submit Exam</h2>
            <p className="mb-4">
              You have {getAnsweredCount()} answered questions,{" "}
              {getUnansweredCount()} unanswered questions, and{" "}
              {getMarkedForReviewCount()} marked for review.
            </p>
            <p>Are you sure you want to submit the exam?</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => {
                  setIsModalOpen(false);
                  // Logic to submit the exam
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {isResultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Notification</h2>
            <p>{modalMessage}</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={() => setIsResultModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen flex bg-gray-50">
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between mb-4">
            <div className="text-lg font-bold">
              Exam Timer: {formatTime(timeLeft)}
            </div>
            <div className="text-lg">
              Question {currentQuestionIndex + 1}/{questions.length}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold">
              {questions[currentQuestionIndex]?.text}
            </h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-4 border rounded-lg cursor-pointer ${
                    selectedOption === option
                      ? "border-blue-500"
                      : "border-gray-300"
                  } hover:bg-gray-100`}
                >
                  <input
                    type="radio"
                    name={`option-${currentQuestionIndex}`}
                    className="mr-2"
                    value={option.value}
                    onChange={() => handleOptionChange(option)}
                    checked={selectedOption?.value === option.value}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              className={`px-6 py-2 font-bold text-white bg-gray-400 rounded ${
                currentQuestionIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-500"
              }`}
              onClick={() =>
                setCurrentQuestionIndex((prevIndex) =>
                  Math.max(prevIndex - 1, 0)
                )
              }
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <div>
              <button
                className="px-6 py-2 mr-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-600"
                onClick={handleReviewLater}
              >
                Mark for Review
              </button>
              <button
                className="px-6 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={() => handleSubmit()}
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Submit Exam"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/3 p-4 bg-gray-100 shadow-md flex flex-col items-between justify-between">
          <div>
            <div className="mb-4 text-center font-bold">Question Summary</div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span>Answered:</span>
                <span>{getAnsweredCount()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Unanswered:</span>
                <span>{getUnansweredCount()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Marked for Review:</span>
                <span>{getMarkedForReviewCount()}</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(index)}
                  className={`p-2 rounded ${
                    questionStatuses[index] === "answered"
                      ? "bg-green-500 text-white"
                      : questionStatuses[index] === "markedForReview"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-300 text-black"
                  } ${
                    currentQuestionIndex === index &&
                    "border border-2 border-black"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button
              className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => setIsModalOpen(true)}
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionExamPage;
