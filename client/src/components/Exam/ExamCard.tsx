import { Clock, FileText } from "lucide-react";

interface ExamCardProps {
  examTitle: string;
  duration: string;
  totalQuestions: number;
  subject: string;
  onStart: () => void;
}

export default function ExamCard({
  examTitle,
  duration,
  totalQuestions,
  subject,
  onStart,
}: ExamCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2">{examTitle}</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <FileText className="w-4 h-4" />
          <span>{totalQuestions} Questions</span>
        </div>
        <p className="text-gray-600">Subject: {subject}</p>
      </div>
      <button
        onClick={onStart}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Start Exam
      </button>
    </div>
  );
}
