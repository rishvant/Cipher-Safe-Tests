export interface RegistrationForm {
  personalDetails: { name: string; dob: string; gender: string };
  addressDetails: { presentAddress: string; permanentAddress: string };
  educationDetails: [
    {
      schoolName: string;
      percentage: string;
    }
  ];
  parentDetails: { fatherName: string; motherName: string; contact: string };
}
