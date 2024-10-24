// QuestionExamPage.tsx

import React, { useEffect, useState } from "react";

// Dummy types for the question structure
interface Option {
  value: string;
  label: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

const dummyQuestions: Question[] = [
  {
    id: "q1",
    text: "What is the capital of France?",
    options: [
      { value: "paris", label: "Paris" },
      { value: "london", label: "London" },
      { value: "berlin", label: "Berlin" },
      { value: "madrid", label: "Madrid" },
    ],
  },
  {
    id: "q2",
    text: "Which is the largest planet in our solar system?",
    options: [
      { value: "earth", label: "Earth" },
      { value: "jupiter", label: "Jupiter" },
      { value: "mars", label: "Mars" },
      { value: "venus", label: "Venus" },
    ],
  },
  {
    id: "q3",
    text: 'Who wrote "To Kill a Mockingbird"?',
    options: [
      { value: "harper_lee", label: "Harper Lee" },
      { value: "mark_twain", label: "Mark Twain" },
      { value: "ernest_hemingway", label: "Ernest Hemingway" },
      { value: "jane_austen", label: "Jane Austen" },
    ],
  },
];

type QuestionStatus = "answered" | "unanswered" | "markedForReview";

const QuestionExamPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [questionStatuses, setQuestionStatuses] = useState<QuestionStatus[]>(
    new Array(dummyQuestions.length).fill("unanswered")
  );
  const [selectedAnswers, setSelectedAnswers] = useState<(Option | null)[]>(
    new Array(dummyQuestions.length).fill(null)
  ); // New state to store answers
  const [timeLeft, setTimeLeft] = useState(2700);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // When the question changes, set the selected option from the stored answers
    setSelectedOption(selectedAnswers[currentQuestionIndex]);
  }, [currentQuestionIndex, selectedAnswers]);

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);

    // Store the selected option for the current question
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = (status: QuestionStatus = "answered") => {
    const updatedStatuses = [...questionStatuses];

    // Only mark as answered if an option is selected
    if (selectedOption !== null && status === "answered") {
      updatedStatuses[currentQuestionIndex] = "answered";
    } else if (status === "markedForReview") {
      updatedStatuses[currentQuestionIndex] = "markedForReview";
    }

    setQuestionStatuses(updatedStatuses);

    // Move to the next question automatically after answering
    if (currentQuestionIndex < dummyQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

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
                onClick={() => setIsModalOpen(false)} // Close modal
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => {
                  // Add the logic to submit the exam
                  setIsModalOpen(false);
                  // Call the submit function here
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen flex bg-gray-50 pt-20">
        {/* Main content */}
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
          {/* Timer */}
          <div className="flex justify-between mb-4">
            <div className="text-lg font-bold">
              Exam Timer: {formatTime(timeLeft)}
            </div>
            <div className="text-lg">
              Question {currentQuestionIndex + 1}/{dummyQuestions.length}
            </div>
          </div>

          {/* Question Area */}
          <div className="mb-6">
            <h3 className="text-xl font-bold">
              {dummyQuestions[currentQuestionIndex].text}
            </h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {dummyQuestions[currentQuestionIndex].options.map(
                (option, index) => (
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
                )
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
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
                {currentQuestionIndex === dummyQuestions.length - 1
                  ? "Submit Exam"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-1/3 p-4 bg-gray-100 shadow-md flex flex-col items-between justify-between">
          <div>
            <div className="mb-4 text-center font-bold">Question Summary</div>

            {/* Status Counts */}
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span>Answered:</span>
                <span>{getAnsweredCount()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Unanswered:</span>
                <span>{getUnansweredCount()}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Marked for Review:</span>
                <span>{getMarkedForReviewCount()}</span>
              </div>
            </div>

            {/* Question Matrix */}
            <div className="grid grid-cols-5 gap-2">
              {dummyQuestions.map((_, index) => (
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
              className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => setIsModalOpen(true)} // Open the modal when clicked
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
