import { GraduationCap } from "lucide-react";

interface Education {
  qualification: string;
  board: string;
  yearOfPassing: string;
}

interface EducationInfoProps {
  educationalDetails: Education[];
}

export default function EducationInfo({
  educationalDetails,
}: EducationInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap className="w-6 h-6 text-gray-500" />
        <h2 className="text-2xl font-semibold">Educational Information</h2>
      </div>
      <div className="space-y-4">
        {educationalDetails?.map((edu, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Qualification</p>
                <p className="font-medium">{edu.qualification}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Board/University</p>
                <p className="font-medium">{edu.board}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year of Passing</p>
                <p className="font-medium">{edu.yearOfPassing}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
