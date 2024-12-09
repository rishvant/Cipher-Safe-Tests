import ProfileHeader from "../components/Profile/ProfileHeader";
import PersonalInfo from "../components/Profile/PersonalInfo";
import EducationInfo from "../components/Profile/EducationInfo";

export default function Profile() {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : "";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProfileHeader
        imageURL={user?.imageURL}
        candidateName={user?.candidateName}
        rollNo={user?.rollNo}
      />

      <div className="mt-6">
        <PersonalInfo {...user} />
      </div>

      <div className="mt-6">
        <EducationInfo educationalDetails={user?.educationalDetails} />
      </div>
    </div>
  );
}
