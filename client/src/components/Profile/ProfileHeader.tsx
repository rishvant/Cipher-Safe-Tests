interface ProfileHeaderProps {
  imageURL: string;
  candidateName: string;
  rollNo: number;
}

export default function ProfileHeader({
  imageURL,
  candidateName,
  rollNo,
}: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-6">
      <img
        src={
          imageURL ||
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
        }
        alt={candidateName}
        className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
      />
      <div>
        <h1 className="text-3xl font-bold">{candidateName}</h1>
        <p className="text-gray-500">Roll No: {rollNo}</p>
      </div>
    </div>
  );
}
