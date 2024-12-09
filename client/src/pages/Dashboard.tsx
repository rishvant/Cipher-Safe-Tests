import { BookOpen, Clock, Award } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Upcoming Exams
              </h2>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">Next Exam</h2>
              <p className="text-xl font-medium text-gray-900">
                Mathematics - 2h
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Award className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Performance
              </h2>
              <p className="text-3xl font-bold text-gray-900">85%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Activity
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">
                  Physics Midterm Completed
                </p>
                <p className="text-sm text-gray-500">Score: 92/100</p>
              </div>
              <span className="text-sm text-gray-500">2 days ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">
                  Chemistry Quiz Scheduled
                </p>
                <p className="text-sm text-gray-500">Date: Next Monday</p>
              </div>
              <span className="text-sm text-gray-500">1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
