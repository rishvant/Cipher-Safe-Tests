import { AlertTriangle, CheckCircle } from "lucide-react";

interface ExamWarningProps {
  onAccept: () => void;
  onCancel: () => void;
}

export default function ExamWarning({ onAccept, onCancel }: ExamWarningProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex items-center gap-2 text-yellow-600 mb-4">
          <AlertTriangle className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Important Exam Rules</h2>
        </div>

        <div className="space-y-3">
          <p className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Do not refresh or close the browser window during the exam.
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Ensure stable internet connection before starting.
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            No tab switching is allowed during the exam.
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Your responses are automatically encrypted and saved.
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Timer will start immediately after clicking "Start Exam".
          </p>
        </div>

        <div className="mt-6 flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            I Understand, Start Exam
          </button>
        </div>
      </div>
    </div>
  );
}
