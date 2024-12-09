import { User, Phone, Mail, MapPin, Calendar } from "lucide-react";

interface PersonalInfoProps {
  candidateName: string;
  fathersName: string;
  mothersName: string;
  rollNo: number;
  dateOfBirth: Date;
  gender: string;
  address: string;
  phoneNumber: string;
  email: string;
}

export default function PersonalInfo({
  candidateName,
  fathersName,
  mothersName,
  rollNo,
  dateOfBirth,
  gender,
  address,
  phoneNumber,
  email,
}: PersonalInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Candidate Name</p>
            <p className="font-medium">{candidateName}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Father's Name</p>
          <p className="font-medium">{fathersName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Mother's Name</p>
          <p className="font-medium">{mothersName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Roll Number</p>
          <p className="font-medium">{rollNo}</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium">
              {new Date(dateOfBirth).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Gender</p>
          <p className="font-medium capitalize">{gender}</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{address}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium">{phoneNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
